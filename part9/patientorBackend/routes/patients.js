"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const patientsService_1 = __importDefault(require("../services/patientsService"));
const router = express_1.default.Router();
router.get('/', (_req, res) => {
    res.json(patientsService_1.default.getEntries());
});
router.post('/', (req, res) => {
    const { name, occupation, gender, ssn, dateOfBirth } = req.body;
    const newPatieonEntry = patientsService_1.default.addEntry({
        name, occupation, gender, ssn, dateOfBirth,
    });
    res.json(newPatieonEntry);
});
exports.default = router;
