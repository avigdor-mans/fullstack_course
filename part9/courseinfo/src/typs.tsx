interface CoursePartBase {
  name: string;
  exerciseCount: number;
}

interface CoursePartBaseD extends CoursePartBase {
  description: string;
}

interface CoursePartOne extends CoursePartBaseD {
  name: "Fundamentals";
}

interface CoursePartTwo extends CoursePartBase {
  name: "Using props to pass data";
  groupProjectCount: number;
}

interface CoursePartThree extends CoursePartBaseD {
  name: "Deeper type usage";
  exerciseSubmissionLink: string;
}

interface CoursePartFour extends CoursePartBaseD {
  name: "My deeper type";
  numberOfStudent: number;
}

export type CoursePart = CoursePartOne | CoursePartTwo | CoursePartThree | CoursePartFour;