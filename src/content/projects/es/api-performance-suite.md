---
title: api-performance-suite
tagline: Tests de API y de contrato (Playwright + OpenAPI) y tests de carga K6 contra una API en contenedor, con umbrales como gate y una tendencia de rendimiento publicada.
order: 3
repo: https://github.com/GabrieleScano/api-performance-suite
reportUrl: https://gabrielescano.github.io/api-performance-suite/
trendsUrl: https://gabrielescano.github.io/api-performance-suite/trends/
testCount: 29
stack:
  - Playwright
  - TypeScript
  - OpenAPI
  - ajv
  - K6
  - Docker
  - GitHub Actions
metrics:
  - label: Checks de API en vivo + suite de contrato offline
    value: 29 tests
  - label: Cambios incompatibles que el contrato debe rechazar
    value: 13 casos
  - label: Ejecuciones K6 registradas (p95 · errores · throughput)
    value: tendencia
highlights:
  - Cada respuesta se valida contra un contrato OpenAPI con ajv (código de estado, content type y cuerpo), no solo los códigos de estado.
  - Una suite dedicada demuestra que el contrato detecta cambios incompatibles, como campos renombrados, cambios de tipo o códigos de estado alterados.
  - La CI se ejecuta contra un contenedor Docker fijado de la API, así que los resultados son deterministas y comparables entre ejecuciones.
  - Los umbrales de K6 actúan como gate de la CI, y cada ejecución se registra y se muestra en una página pública de tendencias.
---

Las dos disciplinas que complementan la automatización de UI: validar
contratos en la capa de servicio, donde los tests son más rápidos y estables
que a través de la UI, y observar cómo se comportan la latencia, la tasa de
error y el throughput bajo carga. Los tests apuntan a restful-booker, una API
REST de código abierto pensada para practicar testing.

## Un objetivo determinista

La CI no prueba el sandbox público compartido. Cada job arranca la imagen
Docker oficial de la API como **service container**, fijada por digest y con
health check antes de la ejecución, así que cada ejecución parte de los mismos
datos limpios. La misma suite se ejecuta en local contra la instancia pública
cambiando solo `BASE_URL`.

## Testing de contrato (OpenAPI + ajv)

restful-booker no tiene un documento OpenAPI oficial, así que **lo escribí**
a partir de su documentación y lo corregí contra el comportamiento real del
servicio. La documentación se equivoca en algunos puntos: `DELETE` devuelve
201, no 200; los precios son enteros; un campo es opcional.

- Cada respuesta en vivo se comprueba con `expectContract(response, operationId)`.
  El código de estado debe estar documentado, el content type también, y el
  cuerpo debe cumplir el esquema (ajv, modo estricto).
- Una suite offline le pasa al contrato **13 cambios incompatibles realistas**,
  como un campo eliminado o renombrado, un número enviado como texto, una fecha
  con otro formato o un código de estado distinto. Todos deben ser rechazados.
  Los campos añadidos se toleran.
- Una comprobación de cobertura falla si una operación del contrato no tiene
  test en vivo, y el propio documento se valida con Redocly en la CI.

## Testing de API (Playwright)

- Ciclo de vida CRUD completo: crear → leer → actualizar → borrar, con una
  comprobación 404 tras el borrado.
- Actualización parcial (PATCH) que verifica que los campos no tocados se
  conservan.
- Autenticación por token: token con credenciales válidas, rechazo con
  credenciales inválidas.
- Casos negativos: 404 para recursos inexistentes, 403 en escrituras sin
  token válido.

## Testing de rendimiento (K6)

- **smoke**: comprobación de cordura con un solo usuario.
- **load**: subida por etapas → estado estable → pico → bajada, con métricas
  personalizadas.
- **spike**: una ráfaga de tráfico abrupta y su recuperación.

Los umbrales de latencia p95 y tasa de error **hacen fallar el build** si se
superan. Los límites de latencia dependen del entorno, porque el contenedor
responde en milisegundos y el sandbox público en cientos de milisegundos.

Cada ejecución de la CI (en cada push y una vez al día) exporta su resumen de
K6. Los resultados se añaden a un histórico guardado en una rama `data`
dedicada y se publican en una **[página de tendencias de rendimiento](https://gabrielescano.github.io/api-performance-suite/trends/)**
con p95, tasa de error y throughput de las últimas N ejecuciones. Las
regresiones se ven como una línea que se mueve, no solo como un build en rojo.
