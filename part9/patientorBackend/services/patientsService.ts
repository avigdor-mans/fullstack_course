import patientsData from '../data/patients';
import { Patient, PublicPatient } from '../types';

const getEntries = (): PublicPatient[] => {
  return patientsData.map(({id,name,occupation,gender,dateOfBirth})=>({
    id,
    name,
    occupation,
    gender,
    dateOfBirth,
  }));  
};

const getEntrie = (id:string): Patient | undefined => {
  
  return patientsData.find((p:PublicPatient)=>p.id===id);
};

const addEntry = (entry:Omit<Patient, 'id'>): Patient => {
  
  const newPatientEntry = {
    id: (Math.max(...patientsData.map(d => parseInt(d.id))) + 1).toString(),
    ...entry
  };

  patientsData.push(newPatientEntry);
  return newPatientEntry;
};

const addEntryToPatient = (entry:Patient): Patient => {
  patientsData.map((p) => p.id===entry.id ? entry : p);
  return entry;
};

export default {
  getEntries,
  getEntrie,
  addEntry,
  addEntryToPatient
};