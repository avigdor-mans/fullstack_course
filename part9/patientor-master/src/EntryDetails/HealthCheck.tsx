import React from "react";
import { Header, Icon, Segment } from "semantic-ui-react";
import { HealthCheckEntry } from "../types";

const HealthCheck: React.FC<{ entry: HealthCheckEntry }> = ({entry}) => {
  const heartColoring =  ():"green" | "yellow" | "orange" | "red" => 
    entry.healthCheckRating === 0 ? "green" :
    entry.healthCheckRating === 1 ? "yellow" :
    entry.healthCheckRating === 2 ? "orange" :
    "orange";

  return(
    <Segment>
      <Header as="h3">{entry.date} <Icon name="doctor" /></Header>
      <p>{entry.description}</p>
      <Icon name="heart" color={heartColoring()} />
    </Segment>
  );
};

export default HealthCheck;