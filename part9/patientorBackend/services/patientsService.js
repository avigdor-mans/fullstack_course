"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const patients_json_1 = __importDefault(require("../data/patients.json"));
const patients = patients_json_1.default;
const getEntries = () => {
    return patients.map(({ id, name, occupation, gender, dateOfBirth }) => ({
        id,
        name,
        occupation,
        gender,
        dateOfBirth,
    }));
};
const addEntry = (entry) => {
    const newPatientEntry = Object.assign({ id: (Math.max(...patients.map(d => parseInt(d.id))) + 1).toString() }, entry);
    patients.push(newPatientEntry);
    return newPatientEntry;
};
exports.default = {
    getEntries,
    addEntry
};
