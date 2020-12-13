"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const patientsService_1 = __importDefault(require("../services/patientsService"));
const utils_1 = __importDefault(require("../utils"));
const router = express_1.default.Router();
router.get('/', (_req, res) => {
    res.json(patientsService_1.default.getEntries());
});
router.get('/:id', (req, res) => {
    const tmp = patientsService_1.default.getEntrie(req.params.id);
    if (tmp) {
        res.json(tmp);
    }
    else {
        res.status(404).send('ther is no patient with that id');
    }
});
router.post('/:id/entries', (req, res) => {
    const patient = patientsService_1.default.getEntrie(req.params.id);
    console.log(req.body);
    if (patient) {
        try {
            switch (req.body.type) {
                case "HealthCheck":
                    const newHealthCheckEntry = Object.assign(Object.assign({}, utils_1.default.toNewHealthCheckEntry(req.body)), { id: patient.entries.length > 0 ? (Math.max(...patient.entries.map(e => parseInt(e.id))) + 1).toString()
                            : '1' });
                    patient.entries.push(newHealthCheckEntry);
                    patientsService_1.default.addEntryToPatient(patient);
                    res.json(newHealthCheckEntry);
                    break;
                case "Hospital":
                    const newHospitalEntry = Object.assign(Object.assign({}, utils_1.default.toNewHospitalEntry(req.body)), { id: patient.entries.length > 0 ? (Math.max(...patient.entries.map(e => parseInt(e.id))) + 1).toString()
                            : '1' });
                    patient.entries.push(newHospitalEntry);
                    patientsService_1.default.addEntryToPatient(patient);
                    res.json(newHospitalEntry);
                    break;
                case "OccupationalHealthcare":
                    const newOccupationalHealthcareEntry = Object.assign(Object.assign({}, utils_1.default.toNewOccupationalHealthcareEntry(req.body)), { id: patient.entries.length > 0 ? (Math.max(...patient.entries.map(e => parseInt(e.id))) + 1).toString()
                            : '1' });
                    patient.entries.push(newOccupationalHealthcareEntry);
                    patientsService_1.default.addEntryToPatient(patient);
                    res.json(newOccupationalHealthcareEntry);
                    break;
                default:
                    throw new Error('Incorrect or missing type: ' + req.body);
            }
        }
        catch (e) {
            res.status(400).send(e.message);
        }
    }
    else {
        res.status(404).send('ther is no patient with that id');
    }
    ;
});
router.post('/', (req, res) => {
    try {
        const newPatieonEntry = utils_1.default.toNewPatientEntry(req.body);
        const addedEntry = patientsService_1.default.addEntry(newPatieonEntry);
        res.json(addedEntry);
    }
    catch (e) {
        res.status(400).send(e.message);
    }
});
exports.default = router;
