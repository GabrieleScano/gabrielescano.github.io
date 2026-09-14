---
title: ai-augmented-e2e
tagline: Framework E2E con Playwright + TypeScript, POM y un módulo de IA que deriva casos de prueba a partir de criterios de aceptación.
order: 1
repo: https://github.com/GabrieleScano/ai-augmented-e2e
reportUrl: https://gabrielescano.github.io/ai-augmented-e2e/
testCount: 22
stack:
  - Playwright
  - TypeScript
  - Page Object Model
  - GitHub Actions
  - Anthropic API
metrics:
  - label: E2E en Chromium · Firefox · WebKit
    value: 16 specs
  - label: Tests unitarios del parser de IA (proyecto sin navegador)
    value: 6 specs
  - label: CI cross-browser en cada push
    value: 3 navegadores
highlights:
  - Page Object Model con localizadores privados y acciones que solo revelan intención.
  - Localizadores semánticos y web-first (getByRole / getByPlaceholder / getByTestId) - sin esperas fijas.
  - La salida de la IA se valida (forma + enums), nunca se confía ciegamente, y está cubierta por tests unitarios.
  - Los fallos se triagan automáticamente en CI con test-triage-kit - clasificados, deduplicados y publicados como artefacto.
---

Un flujo completo de automatización E2E construido para ser inspeccionable de
principio a fin: diseño mantenible, CI cross-browser, y una capa de IA que
convierte criterios de aceptación en casos de prueba estructurados más
observaciones shift-left. Los tests corren contra SauceDemo, una aplicación
de demo pública y estable.

## Qué demuestra

- **Cobertura funcional** - autenticación (credenciales válidas, cuenta
  bloqueada, logins inválidos con datos parametrizados, redirecciones por
  auth-guard), carrito, ordenación y un flujo de checkout completo con
  validación.
- **Diseño mantenible** - Page Object Model, fixtures personalizadas, datos
  de test centralizados, localizadores semánticos y aserciones web-first.
- **CI cross-browser** - Chromium, Firefox y WebKit en cada push, con
  informes HTML y Allure como artefactos.
- **Triage automático de fallos** - cada ejecución alimenta
  [test-triage-kit](https://github.com/GabrieleScano/test-triage-kit) a
  través de su reporter personalizado; la CI clasifica los fallos (bug /
  flaky / infraestructura), los deduplica por huella de causa raíz y publica
  el informe de triage como artefacto.

## Decisiones de diseño

Los Page Objects exponen solo acciones que revelan intención y mantienen
privados sus localizadores, de modo que los specs se leen como
comportamiento, no como selectores. Los localizadores son semánticos
(`getByRole`, `getByPlaceholder`, `getByTestId`) y las aserciones esperan
automáticamente - no hay ningún `waitForTimeout` en todo el proyecto. Cada
test es aislado e independiente: sin estado compartido, sin orden implícito.

## IA, con criterio

El módulo de IA toma una historia de usuario y sus criterios de aceptación y
devuelve casos de prueba estructurados más observaciones (ambigüedades,
casos límite faltantes). Su salida **nunca se confía ciegamente**: un parser
dedicado elimina los fences de markdown y valida la forma de la respuesta y
los valores de los enums, y ese parser está cubierto por un proyecto de
tests unitarios sin navegador - así que una respuesta mal formada del
modelo falla de forma ruidosa en vez de corromper el resto del pipeline.
