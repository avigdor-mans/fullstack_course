import { Patient, Gender } from './types';

const isString = (text: any): text is string => {
  return typeof text === 'string' || text instanceof String;
};

const isGender = (param: any): param is Gender => {
  return Object.values(Gender).includes(param)
};

const isDate = (date: string): boolean => {
  return Boolean(Date.parse(date));
};

const toNewPatientEntry = (object:any): Omit<Patient, 'id'> => {
  const newEntry: Omit<Patient, 'id'> = {
    name: parsName(object.name),
    occupation: parsOccupation(object.occupation),
    gender: parsGender(object.gender),
    ssn: parsSsn(object.ssn),
    dateOfBirth: parseDate(object.dateOfBirth),
  };

  return newEntry;
};

const parsName = (name:any): string => {
  if(!name || !isString(name)){
    throw new Error('Incorrect or missing name: ' + name);
  }
  return name;
};

const parsOccupation = (occupation:any): string => {
  if(!occupation || !isString(occupation)){
    throw new Error('Incorrect or missing occupation: ' + occupation);
  }
  return occupation;
};

const parsGender = (gender:any): Gender => {
  if(!gender || !isGender(gender)){
    throw new Error('Incorrect or missing gender: ' + gender);
  }
  return gender;
};

const parsSsn = (ssn:any): string => {
  if(!ssn || !isString(ssn)){
    throw new Error('Incorrect or missing name: ' + name);
  }
  return ssn;
};

const parseDate = (date: any): string => {
  if (!date || !isString(date) || !isDate(date)) {
      throw new Error('Incorrect or missing date: ' + date);
  }
  return date;
};

export default toNewPatientEntry;