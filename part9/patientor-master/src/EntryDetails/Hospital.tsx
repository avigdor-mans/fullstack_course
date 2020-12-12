import React from "react";
import { Header, Icon, Segment } from "semantic-ui-react";
import { HospitalEntry } from "../types";

const Hospital: React.FC<{ entry: HospitalEntry }> = ({entry}) => {
 
  return(
    <Segment>
      <Header as="h3">{entry.date} <Icon name="hospital" /></Header>
      <p>{entry.description}</p>
    </Segment>
  );
}

export default Hospital;