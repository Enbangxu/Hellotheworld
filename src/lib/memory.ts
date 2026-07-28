export type UserBehavior = {
  viewed: string[];
  saved: string[];
  created: string[];
};

export type UserMemory = {
  userId: string;
  interests: string[];
  behavior: UserBehavior;
  history: Array<{ action: string; subject: string; timestamp: string }>;
};

const memoryStore = new Map<string, UserMemory>();

function copyMemory(memory: UserMemory): UserMemory {
  return structuredClone(memory);
}

export function saveMemory(memory: UserMemory): UserMemory {
  const normalized = { ...copyMemory(memory), interests: [...new Set(memory.interests.map((interest) => interest.trim()).filter(Boolean))] };
  memoryStore.set(memory.userId, normalized);
  return copyMemory(normalized);
}

export function getMemory(userId: string): UserMemory | null {
  const memory = memoryStore.get(userId);
  return memory ? copyMemory(memory) : null;
}

export function updatePreference(userId: string, interests: string[]): UserMemory {
  const current = getMemory(userId) ?? { userId, interests: [], behavior: { viewed: [], saved: [], created: [] }, history: [] };
  return saveMemory({
    ...current,
    interests: [...new Set([...current.interests, ...interests])],
    history: [...current.history, { action: "preference.updated", subject: interests.join(", "), timestamp: new Date().toISOString() }],
  });
}
