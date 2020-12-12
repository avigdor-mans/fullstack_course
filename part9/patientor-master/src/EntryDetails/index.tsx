import React from "react";
import { Entry } from "../types";
import HealthCheck from "./HealthCheck";
import Hospital from "./Hospital";
import OccupationalHealthcare from "./OccupationalHealthcare";

const EntryDetails:  React.FC<{entry: Entry}> = ({entry}) => {
  switch (entry.type) {
    case "HealthCheck":
      return (<HealthCheck entry={entry} />);
    case "Hospital":
      return (<Hospital entry={entry} />);
    case "OccupationalHealthcare":
      return (<OccupationalHealthcare entry={entry} />);
    default:
      return null;
  }
};

export default EntryDetails