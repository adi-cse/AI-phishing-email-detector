export const analyzeWithOpenRouter = async (email) => {
  try {
    const apiKey = process.env.OPENROUTER_API_KEY;
    if (!apiKey) {
      throw new Error('OPENROUTER_API_KEY not set in .env');
    }

    const prompt = `Analyze this email for phishing indicators. Return ONLY valid JSON:

Subject: ${email.subject}
Body: ${email.body}
Sender: ${email.sender || 'Unknown'}

Return ONLY this JSON (no markdown):
{
  "isPhishing": true/false,
  "confidence": 0.0-1.0,
  "reasoning": "brief explanation",
  "indicators": ["indicator1", "indicator2"]
}`;

    const response = await fetch('https://openrouter.ai/api/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${apiKey}`,
        'HTTP-Referer': 'http://localhost:3000',
        'X-Title': 'Phishing Detection',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        model: 'openai/gpt-4o-mini',
        messages: [{ role: 'user', content: prompt }],
        temperature: 0.5,
        max_tokens: 500
      })
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.error?.message || `OpenRouter error: ${response.status}`);
    }

    const responseText = data.choices[0].message.content;
    const cleanedText = responseText.replace(/```json\n?|\n?```/g, '').trim();
    const analysisResult = JSON.parse(cleanedText);

    return {
      score: analysisResult.confidence * 5,
      isPhishing: analysisResult.isPhishing,
      confidence: analysisResult.confidence,
      reasoning: analysisResult.reasoning,
      indicators: analysisResult.indicators || []
    };
  } catch (error) {
    console.error('OpenRouter error:', error);
    return {
      score: 0,
      error: 'AI analysis failed',
      message: error.message
    };
  }
};