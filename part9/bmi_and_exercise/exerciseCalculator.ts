interface ExercisesValues {
  targetValue: number;
  weekValue: number[];
}

const parseExercisesArguments = (args: Array<string>): ExercisesValues => {
  if (args.length < 4) throw new Error('Not enough arguments');
    const isLigal:boolean =  args.reduce((acc:boolean,cur:string,i:number)=>i>1 ? acc && !isNaN(Number(cur)) : true, true);
  if (isLigal) {
    return {
      targetValue: Number(args[2]),
      weekValue: args.filter((_x,i)=>i>2).map((x)=>Number(x))
    };
  } else {
    throw new Error('Provided values were not numbers!');
  }
};

interface exerciseInfo {
  days: number;
  trainingDays: number;
  targetValue: number;
  average: number;
  success: boolean;
  rating: 1|2|3;
  ratingDescription: string;
}

interface ratingAns {
  rating: 1|2|3;
  ratingDescription: string;
}

const ratingAlgorithm = (trainingDays:number, success:boolean):ratingAns => 
  trainingDays < 4 && !success ? {rating:1, ratingDescription:"Bad"}
    : (trainingDays < 4 && success) || (trainingDays >= 4 && !success) ? {rating:2, ratingDescription:"Ok"}
    : {rating:3, ratingDescription:"Good"};


export const calculateExercises = (exerciseHours: number[], target: number):exerciseInfo => {
    const days:number = exerciseHours.length;
    const trainingDays:number = exerciseHours.filter(e=> e!==0).length;
    const average:number = exerciseHours.reduce((acc:number, cur:number)=> acc+cur,0)/days;
    const success:boolean = average>=target;
  return ({
    days: days,
    trainingDays: trainingDays,
    targetValue: target,
    average: average,
    success: success,
    ...ratingAlgorithm(trainingDays, success),
  });
};
try{
  const { targetValue, weekValue } = parseExercisesArguments(process.argv);
  console.log(calculateExercises(weekValue, targetValue));
}catch(e){
  e instanceof Error ? console.log('Error, something bad happened, message: ', e.message) : console.log(e);
}
