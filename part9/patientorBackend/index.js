"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const diagnosis_1 = __importDefault(require("./routers/diagnosis"));
const patients_1 = __importDefault(require("./routers/patients"));
const app = express_1.default();
app.use(express_1.default.json());
app.use(express_1.default.static('build'));
app.get('/ping', (_req, res) => {
    console.log('someone pinged here');
    res.send('pong');
});
app.use('/api/diagnosis', diagnosis_1.default);
app.use('/api/patients', patients_1.default);
const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
