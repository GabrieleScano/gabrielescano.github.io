import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

/**
 * Single, type-safe source of truth for the featured projects.
 * Each entry lives in src/content/projects/*.md; the body (Markdown)
 * powers the per-project detail pages added in a later phase.
 */
const projects = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/projects' }),
  schema: ({ image }) =>
    z.object({
      title: z.string(),
      /** Short one-liner shown on the card. */
      tagline: z.string(),
      /** Controls ordering on the home page. */
      order: z.number(),
      repo: z.string().url(),
      /** Optional: published live test report (set once CI deploys it). */
      reportUrl: z.string().url().optional(),
      /** Number of automated tests — summed into the hero counter. */
      testCount: z.number(),
      stack: z.array(z.string()),
      /** Headline metrics rendered with a pass-check. */
      metrics: z.array(z.object({ label: z.string(), value: z.string() })),
      /** What the project demonstrates. */
      highlights: z.array(z.string()),
      // Reserved for detail pages / OG images.
      cover: image().optional(),
    }),
});

export const collections = { projects };
