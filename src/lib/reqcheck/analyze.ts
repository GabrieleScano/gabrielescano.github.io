import { runRuleChecks, scoreClarity } from './rules';
import type { Finding, UserStory } from './types';

export interface DemoReport {
  findings: Finding[];
  clarityScore: number;
}

/** First word of a line, ignoring a leading bullet or list number. */
function firstWord(line: string): string {
  return (line.replace(/^(?:[-*•]|\d+[.)])\s*/, '').match(/^[a-z]+/i)?.[0] ?? '').toLowerCase();
}

/**
 * "One per line" breaks on Gherkin written one step per line:
 *
 *   Given an invalid password
 *   When I submit
 *   Then an error is displayed
 *
 * would be three criteria, each flagged as not Given/When/Then. A When/Then/
 * And/But line is folded into the scenario above it — but only when that
 * scenario opens with a Gherkin step and still lacks the step, so a
 * self-contained "When I type, then …" line stays a criterion of its own.
 */
function joinGherkinSteps(lines: readonly string[]): string[] {
  const criteria: string[] = [];
  for (const line of lines) {
    const previous = criteria[criteria.length - 1];
    const step = firstWord(line);
    const opener = previous === undefined ? '' : firstWord(previous);
    const continues =
      previous !== undefined &&
      ((step === 'when' && opener === 'given' && !/\bwhen\b/i.test(previous)) ||
        (step === 'then' && (opener === 'given' || opener === 'when') && !/\bthen\b/i.test(previous)) ||
        ((step === 'and' || step === 'but') && (opener === 'given' || opener === 'when')));

    if (continues) criteria[criteria.length - 1] = `${previous} ${line}`;
    else criteria.push(line);
  }
  return criteria;
}

/**
 * Browser-side entry point for the demo: turns the two text inputs into a
 * UserStory and runs the deterministic rule engine (the AI layer is
 * server-only and intentionally not part of the client demo).
 *
 * Blank lines are dropped rather than passed through: in a textarea an empty
 * line is formatting, not the unfilled placeholder that the CLI's empty-
 * criterion rule is there to catch in a story JSON file.
 */
export function analyze(story: string, criteriaText: string): DemoReport {
  const acceptanceCriteria = joinGherkinSteps(
    criteriaText
      .split('\n')
      .map((line) => line.trim())
      .filter(Boolean),
  );

  const userStory: UserStory = {
    id: 'DEMO',
    title: 'Demo',
    story,
    acceptanceCriteria,
  };

  const findings = runRuleChecks(userStory);
  return {
    findings,
    clarityScore: scoreClarity(findings, acceptanceCriteria.length),
  };
}
