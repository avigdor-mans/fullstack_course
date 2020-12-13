import React from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { Diagnosis, Entry, Patient } from "../types";
import { useStateValue, setPatient, addEntry } from "../state";
import { apiBaseUrl } from "../constants";

import { Button, Container, Header, Icon } from "semantic-ui-react";
import EntryDetails from "../EntryDetails";
import AddEntryModal from "../AddEntryModal";
import { Values } from "../AddEntryModal/FormField";

const PatientPage: React.FC = () => {
  const [{ patient, diagnosis }, dispatch] = useStateValue();
  const { id } = useParams<{ id: string }>();
  const [modalOpen, setModalOpen] = React.useState<boolean>(false);
  const [error, setError] = React.useState<string | undefined>();

  const openModal = (): void => setModalOpen(true);
  const closeModal = (): void => {
    setModalOpen(false);
    setError(undefined);
  };


  const submitNewEntry = async (values: Values) => {
    console.log(values);
    switch (values.type) {
      case "HealthCheck":
        try {
          const { data: updatePatient } = await axios.post<Entry>(
            `${apiBaseUrl}patients/${id}/entries`,
            {
              type: values.type,
              description: values.description,
              date: values.date,
              specialist: values.specialist,
              diagnosisCodes: values.diagnosisCodes.map((d) => diagnosis[d]),
              healthCheckRating: values.healthCheckRating
            }
          );
          dispatch(addEntry(updatePatient));
          closeModal();
          break;
        } catch (e) {
          console.error(e.response.data);
          setError(e.response.data.error);
          break;
        }
      case "OccupationalHealthcare":
        try {
          const { data: updatePatient } = await axios.post<Entry>(
            `${apiBaseUrl}patients/${id}/entries`,
            {
              type: values.type,
              description: values.description,
              date: values.date,
              specialist: values.specialist,
              diagnosisCodes: values.diagnosisCodes.map((d) => diagnosis[d]),
              employerName: values.employerName,
              sickLeave: {
                startDate: values.startDate,
                endDate: values.endDate
              }
            }
          );
          dispatch(addEntry(updatePatient));
          closeModal();
          break;
        } catch (e) {
          console.error(e.response.data);
          setError(e.response.data.error);
          break;
        }
      case "Hospital":
        try {
          const { data: updatePatient } = await axios.post<Entry>(
            `${apiBaseUrl}patients/${id}/entries`,
            {
              type: "Hospital",
              description: values.description,
              date: values.date,
              specialist: values.specialist,
              diagnosisCodes: values.diagnosisCodes.map((d) => diagnosis[d]),
              discharge: {
                date: values.dischargeDate,
                criteria: values.dischargeCriteria
              }
            }
          );
          dispatch(addEntry(updatePatient));
          closeModal();
          break;
        } catch (e) {
          console.error(e.response.data);
          setError(e.response.data.error);
          break;
        }
      default:
        break;
    }
  };
  
  const iconName = 
    patient?.gender==='male' ? 'mars' :
      patient?.gender==='female' ? 'venus':
      'genderless';
  

  if(!patient || patient.id!==id){
    const fetchPatient = async () => {
      try{
        const { data: patientFromApi } = await axios.get<Patient>(
          `${apiBaseUrl}patients/${id}`
        );
        dispatch(setPatient(patientFromApi));
      }catch(e){
        console.error(e.response);
      }
    };
    fetchPatient();
  }  
  
  if(!patient){
    return null;
  }
  
  return (
      <Container>
        <Header as="h2">{patient?.name} <Icon name={iconName} size='big'/></Header>
        <p>ssh: {patient.ssn}</p>
        <p>occupation: {patient.occupation}</p>
        <br/>
        <Header as="h3">entries</Header>
        {patient.entries.map((e) => 
          <EntryDetails entry={e} />
        )}
        <AddEntryModal
        modalOpen={modalOpen}
        onSubmit={submitNewEntry}
        error={error}
        onClose={closeModal}
      />
        <Button onClick={() => openModal()}>Add New Entry</Button>
      </Container>
  );
};

export default PatientPage;