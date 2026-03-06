import { badgeService } from "../services/badgeService";
import { scoreService } from "../services/scoreService";

export function handleProgress(url: URL): { status: number; payload: unknown } {
  const userId = String(url.searchParams.get("userId") ?? "guest");
  const progress = scoreService.getProgress(userId);
  const message = badgeService.getBadgeMessage(progress.badge);

  return {
    status: 200,
    payload: {
      ...progress,
      message
    }
  };
}
