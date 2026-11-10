---
title: ai-augmented-e2e
tagline: Framework E2E multi-SUT (Playwright + TypeScript) con tests funcionales, de regresión visual y de accesibilidad, lo bastante seguro para ejecutarse contra una app en producción.
order: 1
repo: https://github.com/GabrieleScano/ai-augmented-e2e
reportUrl: https://gabrielescano.github.io/ai-augmented-e2e/
testCount: 55
stack:
  - Playwright
  - TypeScript
  - Page Object Model
  - axe-core
  - Docker
  - GitHub Actions
  - Anthropic API
metrics:
  - label: Funcionales · visuales · a11y · unitarios, cada uno con un ID de trazabilidad estable
    value: 55 tests
  - label: Una tienda demo y una PWA en producción usada por familias reales
    value: 2 SUTs
  - label: Problemas WCAG reales encontrados en producción y corregidos el mismo día
    value: 4 bugs
highlights:
  - Un proyecto Playwright por sistema bajo prueba, con sus propios page objects, fixtures y specs. Añadir un SUT es añadir una carpeta.
  - Seguro en producción por diseño. Cualquier petición de escritura se aborta y hace fallar el test, los trackers se bloquean, y la suite usa un solo worker y nada de tests de carga.
  - Regresión visual determinista con reloj congelado, datos simulados y máscaras solo donde el contenido varía de verdad. Las baselines se generan en la imagen Docker oficial de Playwright.
  - Gate de accesibilidad (axe, WCAG 2 A/AA) con una allowlist explícita que falla ante violaciones nuevas y ante correcciones ya publicadas.
---

Un framework E2E construido para ser inspeccionable de principio a fin, que
ahora prueba dos sistemas muy distintos. El primero es SauceDemo, una tienda
demo pública. El segundo es
[Menú Escolar](https://menu-escolar-poble-sec-i62w.vercel.app/), mi app del
menú del comedor escolar, una PWA móvil en producción que usan cada día
familias de la escuela.

## Dos sistemas bajo prueba

| SUT | Entorno | Cobertura |
|---|---|---|
| SauceDemo | Escritorio: Chromium, Firefox, WebKit | 16 funcionales · 2 visuales · 2 a11y |
| Menú Escolar | Móvil: Pixel 7 (Chromium), iPhone 13 (WebKit) | 14 funcionales · 6 visuales · 6 a11y |

Cada SUT tiene sus propios proyectos Playwright, page objects, fixtures y
specs, separados por carpeta. Cada título de test empieza con un ID estable
(`MENU-E2E-007`, `SAUCE-VIS-002`, ...), y un test unitario falla si falta un ID
o está duplicado, así que la suite puede alimentar una matriz de trazabilidad.

## Probar producción sin tocarla

Menú Escolar tiene usuarios reales, así que las reglas de seguridad viven en
una fixture y no en cada test. Cualquier petición que no sea GET se aborta y
**hace fallar el test**. El único endpoint de escritura, las etiquetas de
notificaciones push, es inalcanzable. Analítica y servicios push se bloquean,
para no alterar las estadísticas reales. El service worker se desactiva, el
SUT usa **un solo worker** y no hay tests de carga.

## Regresión visual determinista

El menú cambia cada día, lo que haría inútiles unas capturas ingenuas. Por eso
el reloj se congela con `page.clock`, los ficheros mensuales del menú se
sustituyen por datos fijos con `page.route` mientras el código de la app sigue
en vivo, y se esperan las fuentes. La única aleatoriedad que queda es un saludo
de fin de semana elegido al azar, y solo eso se enmascara.

Las baselines se generan en la **imagen Docker oficial de Playwright**, la
misma en la que corre la CI, mediante un workflow manual que las commitea. Un
test unitario falla si la etiqueta de la imagen y la versión de Playwright se
desalinean.

## Accesibilidad que encuentra bugs reales

axe (WCAG 2 A/AA) se ejecuta en cada pantalla de ambas apps. Las violaciones
conocidas van a una allowlist explícita con su motivo y su corrección, nunca se
ignoran en silencio. El checker también falla cuando una violación de la
allowlist *deja* de reproducirse, así que la lista se reduce a medida que se
publican correcciones.

La primera ejecución encontró problemas de contraste y de ARIA en Menú Escolar.
Se corrigieron y publicaron el mismo día, y la propia suite señaló las entradas
obsoletas de la allowlist. Después, el testing exploratorio encontró una fuga
del foco de teclado fuera de los paneles modales, ya corregida y con su test de
regresión.

## IA, con criterio (y opcional)

El módulo de IA convierte una historia de usuario y sus criterios de aceptación
en casos de prueba estructurados más observaciones shift-left. Su salida
**nunca se acepta a ciegas**: un parser valida la forma y los valores enum, y
ese parser está cubierto por tests unitarios sin navegador. El módulo es
opcional: la CI nunca lo llama, y sin clave de API explica cómo activarlo y
termina sin error.

## Triage de fallos

Cada job de CI alimenta
[test-triage-kit](https://github.com/GabrieleScano/test-triage-kit), que
clasifica los fallos (bug / flaky / infraestructura), los deduplica por causa
raíz y publica los veredictos. Los informes de cada job se fusionan en un único
informe HTML en vivo.
