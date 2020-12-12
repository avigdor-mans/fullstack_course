import React from 'react';
import './App.css';
import {CoursePart} from './typs';
import Content from './component/Content';
import Header from './component/Header';
import Total from './component/Total';

const App: React.FC = () => {
  const courseName = "Half Stack application development";
  const courseParts:CoursePart[] = [
    {
      name: "Fundamentals",
      exerciseCount: 10,
      description: "This is an awesome course part"
    },
    {
      name: "Using props to pass data",
      exerciseCount: 7,
      groupProjectCount: 3
    },
    {
      name: "Deeper type usage",
      exerciseCount: 14,
      description: "Confusing description",
      exerciseSubmissionLink: "https://fake-exercise-submit.made-up-url.dev"
    },
    {
      name: "My deeper type",
      exerciseCount: 3,
      description: "How to succeed",
      numberOfStudent: 56
    }
  ];

  return (
    <div>
      <Header name={courseName}/>
      <Content courses={courseParts}/>
      <Total courses={courseParts}/>
    </div>
  );
};

export default App;
