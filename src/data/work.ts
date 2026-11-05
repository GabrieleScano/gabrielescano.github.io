import type { ImageMetadata } from 'astro';
import alessandraSoi from '../assets/work/alessandra-soi.jpg';
import evaDiez from '../assets/work/eva-diez.jpg';

type Lang = 'en' | 'es';

/** Client websites I built as a freelancer, shown under the QA projects. */
export interface ClientSite {
  name: string;
  url: string;
  image: ImageMetadata;
  sector: Record<Lang, string>;
  description: Record<Lang, string>;
}

export const clientSites: ClientSite[] = [
  {
    name: 'Alessandra Soi',
    url: 'https://alessandrasoi.it/',
    image: alessandraSoi,
    sector: { en: 'Speech therapist', es: 'Logopeda' },
    description: {
      en: 'Website for a speech therapist with practices in Dolianova and Assemini: therapy paths, how sessions work, guides and contact.',
      es: 'Web para una logopeda con consulta en Dolianova y Assemini: tratamientos, cómo funcionan las sesiones, guías y contacto.',
    },
  },
  {
    name: 'Eva Díez',
    url: 'https://eva-diez.com/',
    image: evaDiez,
    sector: { en: 'Actress', es: 'Actriz' },
    description: {
      en: 'Official website of an actress working in film, TV and theatre: bio, CV, demo reel, gallery and contact, in Spanish, English and Italian.',
      es: 'Web oficial de una actriz de cine, televisión y teatro: bio, CV, videobook, galería y contacto, en español, inglés e italiano.',
    },
  },
];
