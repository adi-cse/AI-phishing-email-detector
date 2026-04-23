import express from 'express';
import { analyzeEmail } from '../controllers/detectController.js';

const router = express.Router();

router.post('/', analyzeEmail);

export default router;