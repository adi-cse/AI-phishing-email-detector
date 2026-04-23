const extractUrls = (text) => {
  const urlRegex = /(https?:\/\/[^\s]+)/gi;
  return text.match(urlRegex) || [];
};

export const analyzeUrls = (email) => {
  const urls = extractUrls(email.body || '');
  let score = 0;
  let suspicious = [];

  for (const url of urls) {
    try {
      const urlObj = new URL(url);
      
      if (/\.(tk|xyz|info|click|download|stream|gq|cf|ga|ml)$/i.test(url)) {
        score += 1.5;
        suspicious.push(`Suspicious TLD: ${url.substring(0, 50)}`);
      }
      
      if (/(bit\.ly|tinyurl|short\.link|goo\.gl)/i.test(url)) {
        score += 1;
        suspicious.push(`URL shortener: ${url.substring(0, 50)}`);
      }
      
      if (/(\d{1,3}\.){3}\d{1,3}/.test(urlObj.hostname)) {
        score += 2;
        suspicious.push(`IP-based URL: ${url.substring(0, 50)}`);
      }
    } catch (e) {
      // Invalid URL
    }
  }

  return {
    score: Math.min(parseFloat(score.toFixed(2)), 5),
    urlCount: urls.length,
    suspiciousUrls: suspicious.slice(0, 3)
  };
};