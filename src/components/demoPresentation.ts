/**
 * Labels and colours for the live demo, shared by the server render (the
 * initial example is analysed at build time) and the client script.
 * Kept outside src/lib/reqcheck, which mirrors the CLI's rule engine.
 */
import type { Severity } from '../lib/reqcheck/types';

type Lang = 'en' | 'es';

export const SEVERITY_COLOR: Record<Severity, string> = {
  high: 'var(--color-high)',
  medium: 'var(--color-medium)',
  low: 'var(--color-low)',
};

const COPY = {
  en: {
    severity: { high: 'HIGH', medium: 'MED', low: 'LOW' },
    tone: { clear: 'Clear', needsWork: 'Needs work', unclear: 'Unclear' },
    noIssues: 'No issues detected. The criteria look clear and testable.',
    empty: 'Paste a user story and its criteria to analyse them.',
    findings: (n: number) => `${n} finding${n === 1 ? '' : 's'}`,
  },
  es: {
    severity: { high: 'ALTO', medium: 'MED', low: 'BAJO' },
    tone: { clear: 'Claro', needsWork: 'Necesita trabajo', unclear: 'Poco claro' },
    noIssues: 'No se detectaron problemas. Los criterios parecen claros y verificables.',
    empty: 'Pega una historia de usuario y sus criterios para analizarlos.',
    findings: (n: number) => `${n} hallazgo${n === 1 ? '' : 's'}`,
  },
} as const;

export const demoCopy = (lang: Lang) => COPY[lang];

export function toneFor(score: number, lang: Lang): { color: string; label: string } {
  const { tone } = COPY[lang];
  if (score >= 80) return { color: 'var(--color-accent)', label: tone.clear };
  if (score >= 50) return { color: 'var(--color-medium)', label: tone.needsWork };
  return { color: 'var(--color-high)', label: tone.unclear };
}

/** Background for a severity pill or score label: its colour at 12% on the surface. */
export const tint = (color: string) => `color-mix(in srgb, ${color} 12%, var(--color-surface))`;

export const FINDING_CLASSES = {
  item: 'flex gap-3 rounded-xl border border-line bg-bg/40 p-3.5 text-sm',
  pill: 'mt-0.5 h-fit shrink-0 rounded-md px-2 py-0.5 font-mono text-[0.65rem] font-semibold',
  body: 'min-w-0',
  category: 'font-mono text-xs text-muted',
  message: 'mt-0.5 text-ink/85',
  criterion: 'mt-1.5 border-l-2 border-line pl-3 italic text-muted',
};
