import express from 'express';
import diagnoseService from '../services/diagnosisService';

const router = express.Router();

router.get('/', (_req, res) => {
  res.json(diagnoseService.getEntries());
});

router.post('/', (_req, res) => {
  res.send('Saving a diagnoses!');
});

export default router;
