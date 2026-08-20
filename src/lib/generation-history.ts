import { prisma } from "@/src/lib/prisma";

export const SESSION_HISTORY_LIMIT = 20;

export async function listSessionGenerations(sessionId: string) {
  return prisma.generationTask.findMany({ where: { sessionId }, orderBy: { createdAt: "desc" }, take: SESSION_HISTORY_LIMIT });
}

export async function trimSessionGenerations(sessionId: string) {
  const overflow = await prisma.generationTask.findMany({
    where: { sessionId }, orderBy: { createdAt: "desc" }, skip: SESSION_HISTORY_LIMIT, select: { id: true },
  });
  if (overflow.length) await prisma.generationTask.deleteMany({ where: { sessionId, id: { in: overflow.map(({ id }) => id) } } });
  return overflow.length;
}
