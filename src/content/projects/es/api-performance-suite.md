---
title: api-performance-suite
tagline: Tests funcionales de API (Playwright) y tests de carga por etapas (K6) con umbrales de pass/fail.
order: 3
repo: https://github.com/GabrieleScano/api-performance-suite
reportUrl: https://gabrielescano.github.io/api-performance-suite/
testCount: 11
stack:
  - Playwright
  - TypeScript
  - K6
  - GitHub Actions
metrics:
  - label: CRUD de API, contrato, auth y casos negativos
    value: 11 tests
  - label: Scripts K6 de smoke · carga · pico
    value: 3 escenarios
  - label: Umbrales de latencia p95 / tasa de error
    value: thresholds
highlights:
  - La forma de la respuesta se valida contra el contrato, no solo los códigos de estado.
  - Ciclo de vida CRUD completo con autenticación por token, actualizaciones parciales y rutas negativas.
  - "Rampa K6 por etapas: subida → pico → recuperación con umbrales de pass/fail."
---

Las dos disciplinas que complementan la automatización de UI: validar
contratos en la capa de servicio - donde los tests son más rápidos y
estables que a través de la UI - y observar cómo se comportan la latencia y
la tasa de error bajo carga. Los tests apuntan a restful-booker, una API
REST pública pensada para practicar testing.

## Testing de API (Playwright)

- Ciclo de vida CRUD completo: crear → leer → actualizar → borrar, con una
  comprobación 404 tras el borrado.
- Actualización parcial (PATCH) que verifica que los campos no tocados se
  conservan.
- Autenticación basada en token: se emite token con credenciales válidas, se
  rechaza con credenciales inválidas.
- **Comprobaciones de contrato** - la *forma* de la respuesta se valida
  contra el esquema documentado con validadores sin dependencias, no solo
  los códigos de estado.
- Casos negativos: 404 para recursos inexistentes, 403 en escrituras sin
  token válido.

## Testing de rendimiento (K6)

Tres scripts con umbrales de pass/fail que hacen fallar la ejecución si se
superan:

- **smoke** - comprobación de cordura con un solo usuario.
- **load** - subida por etapas → estado estable → pico → bajada, con
  métricas personalizadas.
- **spike** - una ráfaga de tráfico abrupta y su recuperación, con umbrales
  más laxos pero acotados.

`restful-booker` es un sandbox público compartido, así que cierta latencia
bajo concurrencia es esperable - lo que lo convierte en un objetivo
realista para demostrar gates de rendimiento basados en umbrales.
