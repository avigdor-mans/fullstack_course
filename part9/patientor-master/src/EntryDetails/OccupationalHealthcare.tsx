import React from "react";
import { Header, Icon, Segment } from "semantic-ui-react";
import { OccupationalHealthcareEntry } from "../types";

const OccupationalHealthcare: React.FC<{ entry: OccupationalHealthcareEntry }> = ({entry}) => {
  return(
    <Segment>
      <Header as="h3">{entry.date} <Icon name="stethoscope" />{entry.employerName}</Header>
      <p>{entry.description}</p>
    </Segment>
  );
};

export default OccupationalHealthcare;