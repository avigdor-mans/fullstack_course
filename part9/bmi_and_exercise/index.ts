import express from 'express';
import {BmiValues, calculateBmi} from './bmiCalculator';
import {calculateExercises} from './exerciseCalculator';
const app = express();
app.use(express.json());

app.get('/bmi', (req, res) => {
  const hieght = req.query.height;
  const weight = req.query.weight;
  const {value1, value2}:BmiValues = !isNaN(Number(hieght)) && !isNaN(Number(weight)) ? {value1:Number(hieght),value2:Number(weight)}
   : {value1:0,value2:0};
  if(value1!==0 && value2!==0){
    const bmiText = calculateBmi(value1,value2);
    res.json({
      weight: Number(weight),
      height: Number(hieght),
      bmi: bmiText
    });
  }else{
    res.json({
      error: "malformatted parameters"
    });
  }
});

app.post('/exercises', (req, res) => {
  const val1 = req.body.daily_exercises;
  const val2 = req.body.target;
  const dailyExercises = val1
    ? Array.isArray(val1)
    && val1.reduce((acc,cur)=> acc
    && !isNaN(Number(cur))
    && Number(cur) >= 0,true)
      ? val1.map(n=>Number(n))
      : [-1]
    : val1;
  const target = val2 ? !isNaN(Number(val2)) && Number(val2)>=0 ? Number(val2) : -1 : val2;
  
  if(dailyExercises === undefined || target === undefined || dailyExercises.length===0){
    res.json({
      error: "parameters missing"
    });
  }else if(isNaN(target) || (dailyExercises.length===1 && dailyExercises[0]===-1) ){
    res.json({
      error: "malformatted parameters"
    });
  }else{
    res.json(calculateExercises(dailyExercises,target));
  }
});

const PORT = 3003;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});