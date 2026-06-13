export type DimensionScore = {
  name: string;
  score: number;
  reason: string;
};

export type RewrittenExperience = {
  original: string;
  optimized: string;
};

export type AnalysisResult = {
  overallScore: number;
  matchLevel: "推荐投递" | "可以投递但需优化" | "暂不建议投递";
  summary: string;
  dimensionScores: DimensionScore[];
  strengths: string[];
  weaknesses: string[];
  coveredKeywords: string[];
  missingKeywords: string[];
  resumeSuggestions: string[];
  rewrittenExperience: RewrittenExperience[];
  customResumeSummary: string;
  recommendedDirections: string[];
  interviewTips: string[];
};
