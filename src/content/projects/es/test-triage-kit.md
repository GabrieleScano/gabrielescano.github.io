---
title: test-triage-kit
tagline: Pipeline de triage de fallos para Playwright - clasifica fallos, los deduplica por causa raíz, detecta flakiness y escribe informes de bug enriquecidos con IA en GitHub Issues o Jira.
order: 4
repo: https://github.com/GabrieleScano/test-triage-kit
reportUrl: https://gabrielescano.github.io/test-triage-kit/
testCount: 52
stack:
  - TypeScript
  - Node.js
  - node:test
  - Anthropic API
  - Jira REST API
  - GitHub Actions
metrics:
  - label: Tests unitarios en cada etapa del pipeline
    value: 52 tests
  - label: Clasificación → huella → veredicto, determinista
    value: 5 etapas
  - label: Salidas a GitHub Issues o Jira Cloud
    value: 2 destinos
highlights:
  - El fingerprinting normaliza las partes volátiles (ids, duraciones, puertos), así que diez tests rotos por un selector se convierten en un solo informe.
  - El historial de ejecuciones alimenta la detección de flakiness - "falló 2 de 10 ejecuciones, nunca dos veces seguidas" no se archiva como bug.
  - La IA escribe el informe que un developer quiere leer; los veredictos siguen siendo deterministas y reproducibles.
  - El mismo ciclo de deduplicación por huella se publica en Jira Cloud (plan gratuito, Atlassian Document Format) además de GitHub Issues.
---

Archivar automáticamente un bug por cada test en rojo genera ruido, no
triage. Este kit responde a las preguntas que un único test fallido no
puede: **¿es esto un bug o son diez? ¿Es siquiera un bug? ¿Es nuevo?** - de
forma determinista, y solo usa IA para lo que las reglas no pueden hacer.

## El pipeline

```
ingesta → clasificación → huella/cluster → historial → veredicto → (enriquecimiento IA) → salidas
```

Un motor de reglas clasifica cada fallo (`assertion` / `timeout` /
`network` / `crash` / `setup`); el fingerprinting hashea la categoría
normalizada + selector + mensaje para que los fallos con una misma causa
raíz se agrupen; un historial de ejecuciones de solo-anexado detecta
patrones de flakiness; y cada fallo recibe un veredicto explícito -
`likely-bug`, `likely-flaky` o `infrastructure` - con sus razones. Las
salidas incluyen informes en Markdown, una página HTML estática de triage,
un ciclo de vida en GitHub Issues / Jira (actualizar, no duplicar) y un
resumen para Slack.

## Dos gestores de incidencias, un solo ciclo de vida

`--github` y `--jira` comparten el mismo contrato: buscan issues abiertas y
etiquetadas por la huella incrustada en su cuerpo, comentan en un fallo
conocido en vez de duplicarlo, y proponen (nunca fuerzan) un cierre una vez
que una huella lleva suficiente tiempo en verde. El destino de Jira
construye el cuerpo de su issue como **Atlassian Document Format** en lugar
de Markdown, y corre contra el plan gratuito de Jira Cloud - no hace falta
un plan de pago para probarlo de principio a fin. Como ese plan gratuito no
tiene vista pública anónima de issues, la [vista previa de Jira en
vivo](https://gabrielescano.github.io/test-triage-kit/jira-preview.html)
renderiza el payload ADF real como tarjetas de issue en su lugar.

## IA, solo aditiva

El enriquecimiento añade lo que las reglas no pueden escribir: un título
legible, una hipótesis de causa raíz, una propuesta de severidad y pasos de
reproducción en lenguaje natural, además de una síntesis entre ejecuciones
("12 fallos, una causa sistémica"). Usa salidas estructuradas, y el pipeline
es totalmente funcional sin ella.

## Una integración real, no una demo

El kit se distribuye como un paquete reutilizable con un reporter
personalizado de Playwright, y corre de verdad dentro de
**ai-augmented-e2e**: cada ejecución de CI allí carga
`test-triage-kit/reporter`, triaga sus fallos y publica los veredictos como
artefacto de build.
