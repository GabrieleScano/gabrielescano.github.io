---
title: requirements-analyzer
tagline: Una CLI que revisa historias de usuario en busca de ambigüedades y casos límite faltantes — reglas deterministas más una capa opcional de IA.
order: 2
repo: https://github.com/GabrieleScano/requirements-analyzer
testCount: 26
stack:
  - TypeScript
  - Node.js
  - node:test
  - Anthropic API
metrics:
  - label: Tests unitarios + CLI + capa de IA
    value: 26 tests
  - label: Motor de reglas determinista, cero dependencias
    value: offline
  - label: Salida distinta de cero en incidencias de alta severidad
    value: gate de CI
highlights:
  - El motor de reglas es la fuente de verdad; la capa de IA es aditiva y best-effort.
  - Marca lenguaje vago, umbrales sin medir, modales débiles y casos negativos faltantes.
  - Produce una puntuación de claridad y hace fallar un pipeline ante requisitos mal especificados.
---

Shift-left, hecho concreto: el defecto más barato de arreglar es un requisito
ambiguo. Esta CLI convierte esa práctica en algo repetible - el tipo de
revisión que un QA engineer o analista funcional hace durante el refinamiento
del backlog.

## Dos capas

- **Motor de reglas determinista** - sin dependencias, totalmente offline.
  Marca lenguaje vago, umbrales sin medir, verbos modales débiles, criterios
  duplicados, casos negativos faltantes y criterios que no siguen el formato
  Given/When/Then. Produce una puntuación de claridad.
- **Capa de IA opcional** - cuando hay una API key presente, añade los
  hallazgos semánticos que las reglas no pueden detectar: contradicciones
  lógicas, supuestos implícitos, términos de negocio sin definir, flujos
  faltantes.

El motor de reglas es la **fuente de verdad**; la IA es aditiva y
best-effort - un error de red nunca rompe el análisis.

## Usable como gate de CI

La CLI devuelve un código de salida distinto de cero cuando encuentra
incidencias de alta severidad, así que puede hacer fallar un pipeline ante
requisitos mal especificados antes de escribir una sola línea de código. El
motor de reglas, la capa de IA (con un cliente stub) y los códigos de salida
de la CLI están cubiertos por tests.

> Este mismo motor alimenta la **demo en vivo en el navegador** - pega una
> historia de usuario y ve los hallazgos y la puntuación de claridad en
> tiempo real.
