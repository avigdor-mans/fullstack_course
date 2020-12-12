"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const patients_1 = __importDefault(require("../data/patients"));
const getEntries = () => {
    return patients_1.default.map(({ id, name, occupation, gender, dateOfBirth }) => ({
        id,
        name,
        occupation,
        gender,
        dateOfBirth,
    }));
};
const getEntrie = (id) => {
    return patients_1.default.find((p) => p.id === id);
};
const addEntry = (entry) => {
    const newPatientEntry = Object.assign({ id: (Math.max(...patients_1.default.map(d => parseInt(d.id))) + 1).toString() }, entry);
    patients_1.default.push(newPatientEntry);
    return newPatientEntry;
};
const addEntryToPatient = (entry) => {
    patients_1.default.map((p) => p.id === entry.id ? entry : p);
    return entry;
};
exports.default = {
    getEntries,
    getEntrie,
    addEntry,
    addEntryToPatient
};
