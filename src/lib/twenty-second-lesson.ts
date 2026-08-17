import type { LearningLocale, Topic } from "@/src/data/grade9";
import { localize } from "@/src/lib/grade9-curriculum";

export type TwentySecondLesson = {
  core: string;
  setup: string;
  result: string;
};

const END_MARKS = new Set(["。", "！", "？", ";", "；", ",", "，", "."]);

/** Keep a short lesson readable without splitting Unicode surrogate pairs. */
function shorten(value: string, limit: number): string {
  const characters = Array.from(value.trim());
  if (characters.length <= limit) return characters.join("");

  const candidate = characters.slice(0, limit);
  // Prefer a natural break near the end, but do not turn useful content into a
  // vague fragment merely because an early comma exists.
  for (let index = candidate.length - 1; index >= Math.floor(limit * 0.7); index--) {
    if (END_MARKS.has(candidate[index])) return candidate.slice(0, index + 1).join("");
  }
  return candidate.join("");
}

/** Build the required reading from the curriculum's existing subject content. */
export function getTwentySecondLesson(
  topic: Topic,
  locale: LearningLocale,
): TwentySecondLesson {
  return {
    core: shorten(localize(topic.quickLesson.memoryLine, locale), 36),
    setup: shorten(localize(topic.quickLesson.microExample.setup, locale), 28),
    result: shorten(localize(topic.quickLesson.microExample.result, locale), 28),
  };
}
