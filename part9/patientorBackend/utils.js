"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const types_1 = require("./types");
/* eslint-disable @typescript-eslint/no-explicit-any */
//isType
const isString = (text) => {
    return typeof text === 'string' || text instanceof String;
};
const isGender = (param) => {
    return Object.values(types_1.Gender).includes(param);
};
const isDate = (date) => {
    return Boolean(Date.parse(date));
};
const isDiagnosis = (diagnosis) => {
    const tmp = diagnosis.reduce((acc, cur) => isDiagnos(cur) && acc, true);
    return tmp;
};
const isDiagnos = (diagnosis) => {
    if (!diagnosis || !diagnosis.code || !isString(diagnosis.code) ||
        !diagnosis.name || !isString(diagnosis.name) ||
        (diagnosis.latin && !isString(diagnosis.latin))) {
        return false;
    }
    return true;
};
const isDischarge = (discharge) => {
    return (discharge.date && isDate(discharge.date) && discharge.criteria && isString(discharge.criteria));
};
const isSickLeave = (sickLeave) => {
    return (sickLeave.startDate && isDate(sickLeave.startDate) && sickLeave.endDate && isDate(sickLeave.endDate));
};
const isHealthCheckRating = (healthCheckRating) => {
    console.log(healthCheckRating);
    console.log(typeof healthCheckRating);
    console.log(Number(healthCheckRating) in types_1.HealthCheckRating);
    return (!isNaN(Number(healthCheckRating)) && (Number(healthCheckRating) in types_1.HealthCheckRating));
};
//patientType
const toNewPatientEntry = (object) => {
    const newEntry = {
        name: parsName(object.name),
        occupation: parsOccupation(object.occupation),
        gender: parsGender(object.gender),
        ssn: parsSsn(object.ssn),
        dateOfBirth: parseDate(object.dateOfBirth),
        entries: []
    };
    return newEntry;
};
//patient parsers
const parsName = (name) => {
    if (!name || !isString(name)) {
        throw new Error('Incorrect or missing name: ' + name);
    }
    return name;
};
const parsOccupation = (occupation) => {
    if (!occupation || !isString(occupation)) {
        throw new Error('Incorrect or missing occupation: ' + occupation);
    }
    return occupation;
};
const parsGender = (gender) => {
    if (!gender || !isGender(gender)) {
        throw new Error('Incorrect or missing gender: ' + gender);
    }
    return gender;
};
const parsSsn = (ssn) => {
    if (!ssn || !isString(ssn)) {
        throw new Error('Incorrect or missing name: ' + name);
    }
    return ssn;
};
const parseDate = (date) => {
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
const toNewHospitalEntry = (object) => {
    const newHospitalEntry = {
        type: object.type,
        description: descriptionParser(object.description),
        date: parseDate(object.date),
        specialist: specialistParser(object.specialist),
        diagnosisCodes: diagnosisCodesParser(object.diagnosisCodes),
        discharge: dischargeParser(object.discharge)
    };
    return newHospitalEntry;
};
const toNewOccupationalHealthcareEntry = (object) => {
    const newOccupationalHealthcareEntry = {
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
const toNewHealthCheckEntry = (object) => {
    const newHealthCheckEntry = {
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
const descriptionParser = (description) => {
    if (!description || !isString(description)) {
        throw new Error('Incorrect or missing description: ' + description);
    }
    return description;
};
const specialistParser = (specialist) => {
    if (!specialist || !isString(specialist)) {
        throw new Error('Incorrect or missing specialist: ' + specialist);
    }
    return specialist;
};
const diagnosisCodesParser = (diagnosisCodes) => {
    if (!diagnosisCodes) {
        return diagnosisCodes;
    }
    if (!Array.isArray(diagnosisCodes) || !isDiagnosis(diagnosisCodes)) {
        throw new Error('Incorrect diagnosisCodes: ' + diagnosisCodes);
    }
    return diagnosisCodes;
};
const dischargeParser = (discharge) => {
    if (!discharge || !isDischarge(discharge)) {
        throw new Error('Incorrect or missing discharge: ' + discharge);
    }
    return discharge;
};
const employerNameParser = (employerName) => {
    if (!employerName || !isString(employerName)) {
        throw new Error('Incorrect or missing employerName: ' + employerName);
    }
    return employerName;
};
const sickLeaveParser = (sickLeave) => {
    if (sickLeave && !isSickLeave(sickLeave)) {
        throw new Error('Incorrect or missing sickLeave: ' + sickLeave);
    }
    return sickLeave;
};
const healthCheckRatingParser = (healthCheckRating) => {
    if (!healthCheckRating || !isHealthCheckRating(healthCheckRating)) {
        throw new Error('Incorrect or missing healthCheckRating: ' + healthCheckRating);
    }
    return healthCheckRating;
};
exports.default = { toNewPatientEntry, toNewHospitalEntry, toNewOccupationalHealthcareEntry, toNewHealthCheckEntry };
