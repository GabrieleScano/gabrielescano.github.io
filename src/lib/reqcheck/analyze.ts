import { runRuleChecks, scoreClarity } from './rules';
import type { Finding, UserStory } from './types';

export interface DemoReport {
  findings: Finding[];
  clarityScore: number;
}

/**
 * Browser-side entry point for the demo: turns the two text inputs into a
 * UserStory and runs the deterministic rule engine (the AI layer is
 * server-only and intentionally not part of the client demo).
 */
export function analyze(story: string, criteriaText: string): DemoReport {
  const acceptanceCriteria = criteriaText
    .split('\n')
    .map((line) => line.trim())
    .filter(Boolean);

  const userStory: UserStory = {
    id: 'DEMO',
    title: 'Demo',
    story,
    acceptanceCriteria,
  };

  const findings = runRuleChecks(userStory);
  return { findings, clarityScore: scoreClarity(findings) };
}
