import express from 'express';
import patientsService from '../services/patientsService';
import toNewPatientEntry from '../utils';

const router = express.Router();

router.get('/', (_req, res) => {
  res.json(patientsService.getEntries());
});

router.post('/', (req, res) => {
  try{
    const newPatieonEntry = toNewPatientEntry(req.body);
    const addedEntry = patientsService.addEntry(newPatieonEntry);
    res.json(addedEntry);
  }catch(e){
    res.status(400).send(e.message);
  }
});

export default router;
