export class ReportRecommendation {
  auditProcessCode: string;
  auditDescription: string;
  auditReportedAt: Date;
  totalRecommendations: number;
  totalRecommendationsEvaluated: number;
  totalRecommendationsCompleted: number;
  totalRecommendationsOngoing: number;
  totalRecommendationsNotCompleted: number;
  totalRecommendationsNotEvaluated: number;
  days: number;
}
