"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const diagnosis_json_1 = __importDefault(require("../data/diagnosis.json"));
const diagnosis = diagnosis_json_1.default;
const getEntries = () => {
    return diagnosis;
};
const addEntry = () => {
    return null;
};
exports.default = {
    getEntries,
    addEntry
};
