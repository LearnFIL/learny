export interface LearnerProgress {
  correctAnswers: number;
  totalQuizzes: number;
  badge: string;
  nextMilestone: number | null;
}

const userScores = new Map<string, { correctAnswers: number; totalQuizzes: number }>();

const badgeMilestones = [
  { threshold: 30, badge: "FVM Builder" },
  { threshold: 15, badge: "Storage Strategist" },
  { threshold: 5, badge: "CID Explorer" }
];

export const scoreService = {
  recordQuizResult(userId: string, isCorrect: boolean): LearnerProgress {
    const current = userScores.get(userId) ?? { correctAnswers: 0, totalQuizzes: 0 };
    const updated = {
      correctAnswers: current.correctAnswers + (isCorrect ? 1 : 0),
      totalQuizzes: current.totalQuizzes + 1
    };

    userScores.set(userId, updated);
    return this.getProgress(userId);
  },

  getProgress(userId: string): LearnerProgress {
    const current = userScores.get(userId) ?? { correctAnswers: 0, totalQuizzes: 0 };
    const badge =
      badgeMilestones.find((item) => current.correctAnswers >= item.threshold)?.badge ?? "New Learner";
    const nextMilestone =
      badgeMilestones.filter((item) => item.threshold > current.correctAnswers).pop()?.threshold ?? null;

    return {
      correctAnswers: current.correctAnswers,
      totalQuizzes: current.totalQuizzes,
      badge,
      nextMilestone
    };
  }
};
