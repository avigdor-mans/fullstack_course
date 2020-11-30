import patientsData from '../data/patients.json';
import { Patient } from '../types';

const patients: Omit<Patient, 'ssn'>[] = patientsData as Omit<Patient, 'ssn'>[];

const getEntries = (): Omit<Patient, 'ssn'>[] => {
  return patients.map(({id,name,occupation,gender,dateOfBirth})=>({
    id,
    name,
    occupation,
    gender,
    dateOfBirth,
  }));  
};

const addEntry = (entry:Omit<Patient, 'id'>): Patient => {
  
  const newPatientEntry = {
    id: (Math.max(...patients.map(d => parseInt(d.id))) + 1).toString(),
    ...entry
  }

  patients.push(newPatientEntry);
  return newPatientEntry;
};

export default {
  getEntries,
  addEntry
};