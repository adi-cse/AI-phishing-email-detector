import { calculateRulesScore } from './rulesEngine.js';
import { analyzeUrls } from './urlAnalysis.js';
import { analyzeWithOpenRouter } from './aiService.js';

export const detectPhishing = async (email) => {
  try {
    const rulesScore = calculateRulesScore(email);
    const urlScore = analyzeUrls(email);
    const aiScore = await analyzeWithOpenRouter(email);

    const finalScore = (
      rulesScore.score * 0.3 +
      urlScore.score * 0.2 +
      (aiScore.score || 0) * 0.5
    );

    return {
      overallScore: parseFloat(finalScore.toFixed(2)),
      verdict: finalScore > 6 ? 'LIKELY PHISHING' : finalScore > 3 ? 'SUSPICIOUS' : 'LIKELY LEGITIMATE',
      confidence: parseFloat((finalScore / 10).toFixed(2)),
      layers: {
        datasetRules: rulesScore,
        urlAnalysis: urlScore,
        aiAnalysis: aiScore
      },
      timestamp: new Date().toISOString()
    };
  } catch (error) {
    throw new Error(`Phishing detection failed: ${error.message}`);
  }
};