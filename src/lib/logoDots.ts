/**
 * The logo mark: a single dot rendered as a halftone, the same technique as
 * the hero portrait. An 8×8 grid on a 32-unit square; each dot's radius
 * shrinks with its distance from a focal point in the lower right.
 */
export function logoDots(): { cx: number; cy: number; r: number }[] {
  const n = 8;
  const step = 32 / n;
  const dots = [];
  for (let y = 0; y < n; y++) {
    for (let x = 0; x < n; x++) {
      const cx = step / 2 + x * step;
      const cy = step / 2 + y * step;
      const d = Math.hypot(cx - 20, cy - 20);
      const r = Math.max(0.3, (1 - d / 22) * step * 0.55);
      dots.push({ cx, cy, r: Math.round(r * 100) / 100 });
    }
  }
  return dots;
}
