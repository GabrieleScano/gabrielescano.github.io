export const defaultLang = 'en' as const;
export const languages = { en: 'English', es: 'Español' } as const;
export type Lang = keyof typeof languages;

export const ui = {
  en: {
    'skip.content': 'Skip to content',

    'home.page.title': 'Gabriele Scano — QA Engineer',
    'home.page.description':
      'QA Engineer & Functional Analyst in Barcelona. Test automation with Playwright + TypeScript, shift-left functional analysis, and AI-augmented QA.',

    'nav.projects': 'Projects',
    'nav.demo': 'Live demo',
    'nav.approach': 'Approach',
    'nav.about': 'About',
    'nav.linkedin': 'LinkedIn profile',
    'nav.theme': 'Toggle dark mode',
    'nav.menu': 'Toggle menu',
    'nav.connect': 'Connect',
    'nav.language': 'Switch to Spanish',

    'hero.title.line1': "I'm Gabriele.",
    'hero.title.line2': 'QA Engineer & Functional Analyst.',
    'hero.lead.pre':
      'I clarify requirements, prevent defects early, and create test automation teams can trust. Less about counting bugs, more about ',
    'hero.lead.em': 'why',
    'hero.lead.post': ' they happen.',
    'hero.cta.projects': 'View projects',
    'hero.cta.github': 'GitHub',

    'projects.heading': 'Featured projects',
    'projects.subheading': 'Self-contained and runnable - clone, run, inspect end to end.',
    'projects.stat.tests': 'automated tests',
    'projects.stat.ci': '3 CI pipelines green',
    'projects.stat.coverage': 'cross-browser · API · load',
    'projects.back': '← All projects',
    'projects.repo': 'GitHub ↗',

    'approach.heading': 'How I work',
    'approach.shiftleft.title': 'shift-left',
    'approach.shiftleft.body':
      'The cheapest defect to fix is an ambiguous requirement. I turn user stories into clear, testable scenarios before any code is written.',
    'approach.automation.title': 'automation that lasts',
    'approach.automation.body':
      'Maintainable design — Page Object Model, semantic locators, web-first assertions, isolated tests — so suites stay trustworthy as they grow.',
    'approach.ai.title': 'AI, with judgement',
    'approach.ai.body':
      'I use AI to accelerate test design and requirements review — validated and bounded, never replacing engineering judgement.',

    'about.heading': 'About',
    'about.subheading': 'Background and career path.',
    'about.p1':
      "My path into QA wasn't direct. Before this, I spent over a decade in cultural management and customer service coordinating theatre productions, managing an EU architecture prize, and handling international mediation for Airbnb and Booking.com. That work involved the same core skills I use now: understanding requirements, communicating with stakeholders, and catching problems early.",
    'about.p2':
      'In 2018 I retrained as a developer at Factoría F5 and spent four years as a Frontend Developer at GFT Group. I moved into QA in 2023, leading the QA team at Basetis. I combine functional testing and automation (Playwright, TypeScript, API and load testing) with AI tools across the QA cycle, from requirements analysis to test generation and bug triage.',
    'about.p3':
      "At Basetis I also managed and coordinated the QA team, working in Agile, Scrum and Kanban environments. I hold a Master's in Cultural Management (Universitat de Barcelona) and a BA in Art History & Cultural Heritage (Università degli Studi di Cagliari), and I'm particularly drawn to projects with social impact.",
    'about.linkedin': 'Connect on LinkedIn',
    'about.timeline.1': 'QA Engineer - Basetis',
    'about.timeline.2': 'Frontend Developer - GFT Group',
    'about.timeline.3':
      'Customer service & international relations - Airbnb, Booking.com, Institut Marquès',
    'about.timeline.4': 'Cultural management - Fundació Mies van der Rohe, Theatre & Dance',

    'footer.heading': "Let's talk quality.",
    'footer.subheading': 'Open to QA Automation and Functional roles in Barcelona or remote.',
    'footer.email': 'Email me',
    'footer.languages': 'Languages',
    'footer.lang.1': 'Italian (native)',
    'footer.lang.2': 'Spanish',
    'footer.lang.3': 'Catalan',
    'footer.lang.4': 'English',
    'footer.built': 'Built with Astro · tested with Playwright',
    'footer.privacy': 'Privacy',
    'footer.cookies': 'Cookie preferences',

    'cookie.text':
      "This site uses Google Analytics to see how it's used. No analytics cookies are set until you accept. Read the",
    'cookie.link': 'privacy policy',
    'cookie.reject': 'Reject',
    'cookie.accept': 'Accept',
    'cookie.aria': 'Cookie consent',

    'demo.eyebrow': 'requirements-analyzer · live',
    'demo.title': 'Analyze a user story',
    'demo.lead':
      'Shift-left, in real time. Paste a story and its acceptance criteria — the deterministic rule engine flags ambiguities, missing edge cases and testability problems, and scores how clear and verifiable the requirement is.',
    'demo.note':
      'Note: the rule engine analyzes English text, so the story, criteria and findings below stay in English.',
    'demo.page.title': 'Live demo — requirements-analyzer',
    'demo.page.description':
      'Paste a user story and acceptance criteria and see ambiguities, missing edge cases and a clarity score in real time — the same rule engine that powers the CLI, running in your browser.',

    'demo.widget.tryExample': 'Try an example',
    'demo.widget.flawed': 'Flawed story',
    'demo.widget.clean': 'Clean story',
    'demo.widget.clear': 'Clear',
    'demo.widget.userStory': 'User story',
    'demo.widget.criteria': 'Acceptance criteria',
    'demo.widget.criteriaHint': '(one per line)',
    'demo.widget.runsInBrowser':
      'Runs entirely in your browser — the same deterministic rule engine that powers the CLI. No data leaves this page.',
    'demo.widget.clarityScore': 'Clarity score',

    'projectDetail.tryDemo': 'Try the live demo ↗',
    'projectDetail.viewRepo': 'View repository ↗',
    'projectDetail.ciPipeline': 'CI pipeline ↗',
    'projectDetail.liveReport': 'Live test report ↗',

    'privacy.page.title': 'Privacy Policy — Gabriele Scano',
    'privacy.page.description': 'How this site uses Google Analytics and cookies, and how to opt out.',
    'privacy.updated': 'Last updated',
    'privacy.title': 'Privacy Policy',
  },
  es: {
    'skip.content': 'Saltar al contenido',

    'home.page.title': 'Gabriele Scano — QA Engineer',
    'home.page.description':
      'QA Engineer y Analista Funcional en Barcelona. Automatización de tests con Playwright + TypeScript, análisis funcional shift-left e IA aplicada al QA.',

    'nav.projects': 'Proyectos',
    'nav.demo': 'Demo en vivo',
    'nav.approach': 'Enfoque',
    'nav.about': 'Sobre mí',
    'nav.linkedin': 'Perfil de LinkedIn',
    'nav.theme': 'Alternar modo oscuro',
    'nav.menu': 'Alternar menú',
    'nav.connect': 'Contacto',
    'nav.language': 'Switch to English',

    'hero.title.line1': 'Soy Gabriele.',
    'hero.title.line2': 'QA Engineer y Analista Funcional.',
    'hero.lead.pre':
      'Clarifico requisitos, prevengo defectos desde el principio y creo automatización de pruebas en la que los equipos pueden confiar. Menos contar bugs, más entender ',
    'hero.lead.em': 'por qué',
    'hero.lead.post': ' ocurren.',
    'hero.cta.projects': 'Ver proyectos',
    'hero.cta.github': 'GitHub',

    'projects.heading': 'Proyectos destacados',
    'projects.subheading': 'Autocontenidos y ejecutables: clona, ejecuta e inspecciona de principio a fin.',
    'projects.stat.tests': 'tests automatizados',
    'projects.stat.ci': '3 pipelines de CI en verde',
    'projects.stat.coverage': 'cross-browser · API · carga',
    'projects.back': '← Todos los proyectos',
    'projects.repo': 'GitHub ↗',

    'approach.heading': 'Cómo trabajo',
    'approach.shiftleft.title': 'shift-left',
    'approach.shiftleft.body':
      'El defecto más barato de arreglar es un requisito ambiguo. Convierto historias de usuario en escenarios claros y verificables antes de escribir una sola línea de código.',
    'approach.automation.title': 'automatización que perdura',
    'approach.automation.body':
      'Diseño mantenible — Page Object Model, localizadores semánticos, aserciones web-first, tests aislados — para que las suites sigan siendo fiables a medida que crecen.',
    'approach.ai.title': 'IA, con criterio',
    'approach.ai.body':
      'Uso IA para acelerar el diseño de tests y la revisión de requisitos, siempre validada y acotada, sin sustituir nunca el criterio de ingeniería.',

    'about.heading': 'Sobre mí',
    'about.subheading': 'Trayectoria profesional.',
    'about.p1':
      'Mi camino hacia el QA no fue directo. Antes de esto, pasé más de una década en gestión cultural y atención al cliente, coordinando producciones teatrales, gestionando un premio europeo de arquitectura y llevando la mediación internacional para Airbnb y Booking.com. Ese trabajo implicaba las mismas habilidades clave que uso ahora: entender requisitos, comunicarme con stakeholders y detectar problemas a tiempo.',
    'about.p2':
      'En 2018 me reciclé como desarrollador en Factoría F5 y pasé cuatro años como Frontend Developer en GFT Group. Di el salto a QA en 2023, liderando el equipo de QA en Basetis. Combino testing funcional y automatización (Playwright, TypeScript, testing de API y de carga) con herramientas de IA en todo el ciclo de QA, desde el análisis de requisitos hasta la generación de tests y el triage de bugs.',
    'about.p3':
      'En Basetis también gestioné y coordiné el equipo de QA, trabajando en entornos Agile, Scrum y Kanban. Tengo un Máster en Gestión Cultural (Universitat de Barcelona) y un grado en Historia del Arte y Patrimonio Cultural (Università degli Studi di Cagliari), y me atraen especialmente los proyectos con impacto social.',
    'about.linkedin': 'Conectar en LinkedIn',
    'about.timeline.1': 'QA Engineer - Basetis',
    'about.timeline.2': 'Frontend Developer - GFT Group',
    'about.timeline.3':
      'Atención al cliente y relaciones internacionales - Airbnb, Booking.com, Institut Marquès',
    'about.timeline.4': 'Gestión cultural - Fundació Mies van der Rohe, Teatro y Danza',

    'footer.heading': 'Hablemos de calidad.',
    'footer.subheading': 'Abierto a puestos de Automatización QA y Análisis Funcional en Barcelona o en remoto.',
    'footer.email': 'Escríbeme',
    'footer.languages': 'Idiomas',
    'footer.lang.1': 'Italiano (nativo)',
    'footer.lang.2': 'Español',
    'footer.lang.3': 'Catalán',
    'footer.lang.4': 'Inglés',
    'footer.built': 'Hecho con Astro · probado con Playwright',
    'footer.privacy': 'Privacidad',
    'footer.cookies': 'Preferencias de cookies',

    'cookie.text':
      'Este sitio usa Google Analytics para saber cómo se utiliza. No se instalan cookies analíticas hasta que aceptes. Lee la',
    'cookie.link': 'política de privacidad',
    'cookie.reject': 'Rechazar',
    'cookie.accept': 'Aceptar',
    'cookie.aria': 'Consentimiento de cookies',

    'demo.eyebrow': 'requirements-analyzer · en vivo',
    'demo.title': 'Analiza una historia de usuario',
    'demo.lead':
      'Shift-left, en tiempo real. Pega una historia y sus criterios de aceptación: el motor de reglas determinista señala ambigüedades, casos límite faltantes y problemas de verificabilidad, y puntúa cuán clara y comprobable es la historia.',
    'demo.note':
      'Nota: el motor de reglas analiza texto en inglés, así que la historia, los criterios y los resultados se mantienen en inglés.',
    'demo.page.title': 'Demo en vivo — requirements-analyzer',
    'demo.page.description':
      'Pega una historia de usuario y sus criterios de aceptación y ve ambigüedades, casos límite faltantes y una puntuación de claridad en tiempo real: el mismo motor de reglas que usa la CLI, corriendo en tu navegador.',

    'demo.widget.tryExample': 'Prueba un ejemplo',
    'demo.widget.flawed': 'Historia con problemas',
    'demo.widget.clean': 'Historia clara',
    'demo.widget.clear': 'Limpiar',
    'demo.widget.userStory': 'Historia de usuario',
    'demo.widget.criteria': 'Criterios de aceptación',
    'demo.widget.criteriaHint': '(uno por línea)',
    'demo.widget.runsInBrowser':
      'Se ejecuta enteramente en tu navegador — el mismo motor de reglas determinista que usa la CLI. Ningún dato sale de esta página.',
    'demo.widget.clarityScore': 'Puntuación de claridad',

    'projectDetail.tryDemo': 'Probar la demo en vivo ↗',
    'projectDetail.viewRepo': 'Ver repositorio ↗',
    'projectDetail.ciPipeline': 'Pipeline de CI ↗',
    'projectDetail.liveReport': 'Informe de tests en vivo ↗',

    'privacy.page.title': 'Política de privacidad — Gabriele Scano',
    'privacy.page.description': 'Cómo usa este sitio Google Analytics y cookies, y cómo desactivarlas.',
    'privacy.updated': 'Última actualización',
    'privacy.title': 'Política de privacidad',
  },
} as const;
