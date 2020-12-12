import { Patient, Gender, HospitalEntry,
  OccupationalHealthcareEntry, HealthCheckEntry,
  Diagnosis, Discharge, SickLeave, HealthCheckRating } from './types';
/* eslint-disable @typescript-eslint/no-explicit-any */

//isType
const isString = (text: any): text is string => {
  return typeof text === 'string' || text instanceof String;
};

const isGender = (param: any): param is Gender => {
  return Object.values(Gender).includes(param);
};

const isDate = (date: string): boolean => {
  return Boolean(Date.parse(date));
};

const isDiagnosis = (diagnosis: any[]): diagnosis is Array<Diagnosis['code']> => {
  const tmp:boolean = diagnosis.reduce((acc,cur) => isDiagnos(cur)&& acc, true)
  return tmp;
};

const isDiagnos = (diagnosis: any):diagnosis is Diagnosis['code'] => {

  if(!diagnosis || !diagnosis.code || !isString(diagnosis.code) ||
      !diagnosis.name || !isString(diagnosis.name) ||
      (diagnosis.latin && !isString(diagnosis.latin)) ){
    
    return false;
  }
  return true;
};

const isDischarge = (discharge:any): discharge is Discharge => {
  return (discharge.date && isDate(discharge.date) && discharge.criteria && isString(discharge.criteria));
};

const isSickLeave = (sickLeave:any): sickLeave is SickLeave => {
  return (sickLeave.startDate && isDate(sickLeave.startDate) && sickLeave.endDate && isDate(sickLeave.endDate));
};

const isHealthCheckRating = (healthCheckRating:any): healthCheckRating is HealthCheckRating => {
  console.log(healthCheckRating);
  console.log(typeof healthCheckRating);
  console.log(Number(healthCheckRating) in HealthCheckRating);
  return (!isNaN(Number(healthCheckRating)) && (Number(healthCheckRating) in HealthCheckRating));
};

//patientType
const toNewPatientEntry = (object:any): Omit<Patient, 'id'> => {
  const newEntry: Omit<Patient, 'id'> = {
    name: parsName(object.name),
    occupation: parsOccupation(object.occupation),
    gender: parsGender(object.gender),
    ssn: parsSsn(object.ssn),
    dateOfBirth: parseDate(object.dateOfBirth),
    entries:[]
  };

  return newEntry;
};

//patient parsers
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

//entryType
// const toNewEntry = (object:any): Omit<Entry, 'id'> => {
//   switch (object.type) {
//     case "HospitalEntry":
//       return toNewHospitalEntry(object);
//     case "OccupationalHealthcareEntry":
//       return toNewOccupationalHealthcareEntry(object);
//     case "HealthCheckEntry":
//       return toNewHealthCheckEntry(object);
//     default:
//       throw new Error('Incorrect or missing type: ' + object);
//   };
// };

const toNewHospitalEntry = (object:any): Omit<HospitalEntry, 'id'> => {
  const newHospitalEntry:Omit<HospitalEntry, 'id'> = {
    type: object.type,
    description: descriptionParser(object.description),
    date: parseDate(object.date),
    specialist: specialistParser(object.specialist),
    diagnosisCodes: diagnosisCodesParser(object.diagnosisCodes),
    discharge: dischargeParser(object.discharge)
  };
  return newHospitalEntry;
};

const toNewOccupationalHealthcareEntry = (object:any): Omit<OccupationalHealthcareEntry, 'id'> => {
  const newOccupationalHealthcareEntry:Omit<OccupationalHealthcareEntry, 'id'> = {
    type: object.type,
    description: descriptionParser(object.description),
    date: parseDate(object.date),
    specialist: specialistParser(object.specialist),
    diagnosisCodes: diagnosisCodesParser(object.diagnosisCodes),
    employerName: employerNameParser(object.employerName),
    sickLeave: sickLeaveParser(object.sickLeave)
  };
  return newOccupationalHealthcareEntry;
};

const toNewHealthCheckEntry = (object:any): Omit<HealthCheckEntry, 'id'> => {
  const newHealthCheckEntry:Omit<HealthCheckEntry, 'id'> = {
    type: object.type,
    description: descriptionParser(object.description),
    date: parseDate(object.date),
    specialist: specialistParser(object.specialist),
    diagnosisCodes: diagnosisCodesParser(object.diagnosisCodes),
    healthCheckRating: healthCheckRatingParser(object.healthCheckRating)  
  };
  return newHealthCheckEntry;
};

//entry parser
const descriptionParser = (description:any):string => {
  if(!description || !isString(description)){
    throw new Error('Incorrect or missing description: ' + description);
  }
  return description;
};

const specialistParser = (specialist:any):string => {
  if(!specialist || !isString(specialist)){
    throw new Error('Incorrect or missing specialist: ' + specialist);
  }
  return specialist;
};

const diagnosisCodesParser = (diagnosisCodes:any):Array<Diagnosis['code']> | undefined => {
  if (!diagnosisCodes){
    return diagnosisCodes;
  }
  if(!Array.isArray(diagnosisCodes) || !isDiagnosis(diagnosisCodes)){
    throw new Error('Incorrect diagnosisCodes: ' + diagnosisCodes);
  }
  return diagnosisCodes;
};

const dischargeParser = (discharge:any):Discharge => {
  if(!discharge || !isDischarge(discharge)){
    throw new Error('Incorrect or missing discharge: ' + discharge);
  }
  return discharge;
};

const employerNameParser = (employerName:any):string => {
  if(!employerName || !isString(employerName)){
    throw new Error('Incorrect or missing employerName: ' + employerName);
  }
  return employerName;
};

const sickLeaveParser = (sickLeave:any):SickLeave | undefined => {
  if(sickLeave && !isSickLeave(sickLeave)){
    throw new Error('Incorrect or missing sickLeave: ' + sickLeave);
  }
  return sickLeave;
};

const healthCheckRatingParser = (healthCheckRating:any):HealthCheckRating => {
  if(!healthCheckRating || !isHealthCheckRating(healthCheckRating)){
    throw new Error('Incorrect or missing healthCheckRating: ' + healthCheckRating);
  }
  return healthCheckRating;
};

export default {toNewPatientEntry, toNewHospitalEntry, toNewOccupationalHealthcareEntry, toNewHealthCheckEntry};