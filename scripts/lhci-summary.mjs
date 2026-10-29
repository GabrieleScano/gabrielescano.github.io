// Prints the key Lighthouse metrics for every collected run, as GitHub
// annotations, so a failing budget shows *which* metric dropped without
// having to download the reports. Run after `lhci autorun` (on failure).
import { readdirSync, readFileSync } from 'node:fs';

const dir = '.lighthouseci';
const runs = readdirSync(dir)
  .filter((f) => f.startsWith('lhr-') && f.endsWith('.json'))
  .map((f) => JSON.parse(readFileSync(`${dir}/${f}`, 'utf8')));

for (const r of runs) {
  const a = (id) => r.audits[id];
  const path = new URL(r.finalUrl ?? r.finalDisplayedUrl).pathname;
  const metrics = [
    `perf ${r.categories.performance.score}`,
    `FCP ${a('first-contentful-paint').displayValue}`,
    `LCP ${a('largest-contentful-paint').displayValue}`,
    `SI ${a('speed-index').displayValue}`,
    `TBT ${a('total-blocking-time').displayValue}`,
    `CLS ${a('cumulative-layout-shift').displayValue}`,
  ].join(' · ');

  const lcpEl = a('largest-contentful-paint-element')?.details?.items?.[0];
  const lcpNode = lcpEl?.items?.[0]?.node ?? lcpEl?.node;
  const shifts = (a('layout-shifts')?.details?.items ?? [])
    .slice(0, 3)
    .map((s) => `${s.score?.toFixed(3)} ${s.node?.selector ?? ''}`)
    .join(' | ');

  const level = r.categories.performance.score < 0.95 ? 'warning' : 'notice';
  console.log(
    `::${level} title=Lighthouse ${path}::${metrics} · LCP element: ${lcpNode?.selector ?? 'n/a'}` +
      (shifts ? ` · shifts: ${shifts}` : ''),
  );
}
