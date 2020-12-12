import React from 'react';
import {CoursePart,} from '../typs';

interface PartProps {
  course: CoursePart;
}

const assertNever = (value: never): never => {
  throw new Error(
    `Unhandled discriminated union member: ${JSON.stringify(value)}`
  );
};

const Part: React.FC<PartProps> = (props) => {
  switch (props.course.name) {
    case "Fundamentals":
      return (<p>{props.course.name} {props.course.exerciseCount} {props.course.description}</p>);
    case "Using props to pass data":
      return (<p>{props.course.name} {props.course.exerciseCount} {props.course.groupProjectCount}</p>);
    case "Deeper type usage":
      return (<p>{props.course.name} {props.course.exerciseCount} {props.course.description} {props.course.exerciseSubmissionLink}</p>);
    case "My deeper type":
  return (<p>{props.course.name} {props.course.exerciseCount} {props.course.description} {props.course.numberOfStudent} </p>);
    default:
      return assertNever(props.course);
  }  
};

export default Part;