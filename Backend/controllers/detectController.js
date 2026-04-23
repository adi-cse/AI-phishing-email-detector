import { detectPhishing } from '../services/phishingService.js';

export const analyzeEmail = async (req, res, next) => {
  try {
    const { email } = req.body;

    if (!email) {
      return res.status(400).json({ error: 'Email data is required' });
    }

    if (!email.subject || !email.body) {
      return res.status(400).json({ 
        error: 'Email must have subject and body' 
      });
    }

    const result = await detectPhishing(email);
    res.json(result);
  } catch (error) {
    next(error);
  }
};