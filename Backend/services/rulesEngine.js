const phishingKeywords = {
  urgency: {
    words: ['urgent', 'immediately', 'asap', 'quickly', 'act now', 'time-sensitive', 'hurry'],
    weight: 1.5
  },
  verification: {
    words: ['verify', 'confirm', 'validate', 'authenticate', 'update', 'reactivate'],
    weight: 2.0
  },
  accountAction: {
    words: ['account', 'suspended', 'locked', 'disabled', 'restricted', 'compromised'],
    weight: 2.2
  },
  personalInfo: {
    words: ['password', 'ssn', 'social security', 'pin', 'otp', 'verification code'],
    weight: 2.5
  },
  paymentInfo: {
    words: ['credit card', 'payment', 'billing', 'invoice', 'bank account', 'wire'],
    weight: 2.3
  },
  reward: {
    words: ['congratulations', 'winner', 'prize', 'claim', 'bonus', 'reward'],
    weight: 1.7
  }
};

export const calculateRulesScore = (email) => {
  let score = 0;
  let patterns = [];
  const text = `${email.subject || ''} ${email.body || ''}`.toLowerCase();

  for (const [category, data] of Object.entries(phishingKeywords)) {
    for (const word of data.words) {
      const count = (text.match(new RegExp(`\\b${word}\\b`, 'gi')) || []).length;
      if (count > 0) {
        score += count * data.weight * 0.1;
        patterns.push(`${category}: "${word}" (x${count})`);
      }
    }
  }

  return {
    score: Math.min(parseFloat(score.toFixed(2)), 5),
    patterns: patterns.slice(0, 5)
  };
};