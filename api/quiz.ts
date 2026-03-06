import { quizService } from "../services/quizService";
import { scoreService } from "../services/scoreService";

export function handleQuiz(body: unknown): { status: number; payload: unknown } {
  const parsedBody = (body as { mode?: string; userId?: string; answer?: string } | undefined) ?? {};
  const mode = String(parsedBody.mode ?? "get");

  if (mode === "answer") {
    const userId = String(parsedBody.userId ?? "guest");
    const answer = String(parsedBody.answer ?? "");
    const result = quizService.checkAnswer(answer);
    const progress = scoreService.recordQuizResult(userId, result.isCorrect);

    return {
      status: 200,
      payload: {
        ...result,
        progress
      }
    };
  }

  return { status: 200, payload: { quiz: quizService.getDailyQuiz() } };
}
