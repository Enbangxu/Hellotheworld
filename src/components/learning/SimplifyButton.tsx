"use client";
export const SIMPLIFY_EVENT = "grade9:tutor-simplify";
export function SimplifyButton({ topicId }: { topicId: string }) {
  return (
    <button
      type="button"
      onClick={() =>
        window.dispatchEvent(
          new CustomEvent(SIMPLIFY_EVENT, { detail: { topicId } }),
        )
      }
      aria-label="还是没懂？让 AI 换种说法"
      className="rounded-xl border border-violet-300 px-5 py-3 font-bold text-violet-200 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-violet-300"
    >
      还是没懂？让 AI 换种说法
    </button>
  );
}
