export const CREATIVE_IDEA_LIMIT = 2000;

export type CreativeQuery = { idea: string | null; source: string | null };

export function parseCreativeQuery(search: string): CreativeQuery {
  try {
    const params = new URLSearchParams(search.startsWith("?") ? search.slice(1) : search);
    const idea = params.get("idea");
    const source = params.get("source");
    return {
      idea: idea === null ? null : idea.slice(0, CREATIVE_IDEA_LIMIT),
      source: source === null ? null : source.slice(0, 120),
    };
  } catch {
    return { idea: null, source: null };
  }
}
