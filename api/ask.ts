import { LearnerAgent } from "../agent/learnerAgent";

export async function handleAsk(body: unknown): Promise<{ status: number; payload: unknown }> {
  const question = String((body as { question?: string } | undefined)?.question ?? "").trim();

  if (!question) {
    return { status: 400, payload: { error: "question is required" } };
  }

  try {
    const agent = new LearnerAgent();
    const answer = await agent.answerQuestion(question);
    return { status: 200, payload: { answer } };
  } catch (error) {
    return {
      status: 500,
      payload: {
        error: "Failed to answer question",
        details: error instanceof Error ? error.message : "unknown_error"
      }
    };
  }
}
