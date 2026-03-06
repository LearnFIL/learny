export const badgeService = {
  getBadgeMessage(badge: string): string {
    if (badge === "New Learner") {
      return "Keep going—your first Filecoin mastery badge is within reach.";
    }

    return `Great progress! You have unlocked the ${badge} badge.`;
  }
};
