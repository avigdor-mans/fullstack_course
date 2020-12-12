import express from 'express';
import diagnosesRouter from './routers/diagnosis';
import patientsRouter from './routers/patients';

const app = express();
app.use(express.json());
app.use(express.static('build'));

app.get('/ping', (_req, res) => {
  console.log('someone pinged here');
  res.send('pong');
});

app.use('/api/diagnosis', diagnosesRouter);
app.use('/api/patients', patientsRouter);

const PORT = 3000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
