import diagnosesData from '../data/diagnosis.json';
import { Diagnosis } from '../types';

const diagnosis: Array<Diagnosis> = diagnosesData as Array<Diagnosis>;

const getEntries = (): Array<Diagnosis> => {
  return diagnosis;
};

const addEntry = ():null => {
  return null;
};

export default {
  getEntries,
  addEntry
};