import express from 'express';
import patientsService from '../services/patientsService';
import typeCheck from '../utils';

const router = express.Router();

router.get('/', (_req, res) => {
  res.json(patientsService.getEntries());
});

router.get('/:id', (req, res) => {
  const tmp = patientsService.getEntrie(req.params.id);
  if (tmp){
    res.json(tmp);
  }else{
    res.status(404).send('ther is no patient with that id');
  }
});

router.post('/:id/entries', (req, res) => {
  const patient = patientsService.getEntrie(req.params.id);
  if(patient){
    try{
      switch (req.body.type) {
        case "HealthCheck":
          const newHealthCheckEntry = {
            ...typeCheck.toNewHealthCheckEntry(req.body),
            id: patient.entries.length > 0 ? (Math.max(...patient.entries.map(e => parseInt(e.id))) + 1).toString()
            : '1'
          };
          patient.entries.push(newHealthCheckEntry);
          patientsService.addEntryToPatient(patient);
          res.json(newHealthCheckEntry);
          break;
        case "Hospital":
          const newHospitalEntry = {
            ...typeCheck.toNewHealthCheckEntry(req.body),
            id: patient.entries.length > 0 ? (Math.max(...patient.entries.map(e => parseInt(e.id))) + 1).toString()
            : '1'
          };
          patient.entries.push(newHospitalEntry);
          patientsService.addEntryToPatient(patient);
          res.json(newHospitalEntry);
          break;
        case "OccupationalHealthcare":
          const newOccupationalHealthcareEntry = {
            ...typeCheck.toNewHealthCheckEntry(req.body),
            id: patient.entries.length > 0 ? (Math.max(...patient.entries.map(e => parseInt(e.id))) + 1).toString()
            : '1'
          };
          patient.entries.push(newOccupationalHealthcareEntry);
          patientsService.addEntryToPatient(patient);
          res.json(newOccupationalHealthcareEntry);
          break;
        default:
          throw new Error('Incorrect or missing type: ' + req.body);
      }
    }catch(e){
      res.status(400).send(e.message);
    }
  }else {
    res.status(404).send('ther is no patient with that id');
  };
});

router.post('/', (req, res) => {
  try{
    const newPatieonEntry = typeCheck.toNewPatientEntry(req.body);
    const addedEntry = patientsService.addEntry(newPatieonEntry);
    res.json(addedEntry);
  }catch(e){
    res.status(400).send(e.message);
  }
});

export default router;
