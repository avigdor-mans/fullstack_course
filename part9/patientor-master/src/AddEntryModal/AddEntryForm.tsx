import React from "react";
import { Grid, Button } from "semantic-ui-react";
import { Field, Formik, Form } from "formik";
import { HealthCheckRating } from "../types";
import { TypeOption, EntryType, TextField, DiagnosisSelection, Values, HealthCheckRatingOption, TypeSelectField, HealthCheckRatingSelectField } from "./FormField";
import { useStateValue } from "../state";

interface Props {
  onSubmit: (values: Values) => void;
  onCancel: () => void;
}

const typeOptions: TypeOption[] = [
  { value: EntryType.Health, label: "HealthCheck" },
  { value: EntryType.Hospit, label: "Hospital" },
  { value: EntryType.Occup, label: "OccupationalHealthcare" }
];

const healthCheckRatingOptions: HealthCheckRatingOption[] = [
  { value: HealthCheckRating.CriticalRisk, label: 3 },
  { value: HealthCheckRating.HighRisk, label: 2 },
  { value: HealthCheckRating.LowRisk, label: 1 },
  { value: HealthCheckRating.Healthy, label: 0 },
];

const AddEntryForm: React.FC<Props> = ({ onSubmit, onCancel }) => {

  const [{ diagnosis }] = useStateValue();
  const [type, setType] = React.useState<EntryType>(EntryType.Health);

  const corectField = () => {
    switch (type) {
      case "HealthCheck":
        return (
        <HealthCheckRatingSelectField
          label="HealthCheckRating"
          name="healthCheckRating"
          options={healthCheckRatingOptions}
          onChange={setType}
        />);
      case "Hospital":
        return (
          <div>
            <Field
              label="DischargeDate"
              placeholder="YYYY-MM-DD"
              name="dischargeDate"
              component={TextField}
            />
            <Field
              label="DischargeCriteria"
              placeholder="Discharge Criteria"
              name="dischargeCriteria"
              component={TextField}
            />   
          </div>
        );
      case "OccupationalHealthcare":
        return (
          <div>
            <Field
              label="StartDate"
              placeholder="YYYY-MM-DD"
              name="startDate"
              component={TextField}
            />
            <Field
              label="EndDate"
              placeholder="YYYY-MM-DD"
              name="endDate"
              component={TextField}
            />   
          </div>
        );
      default:
        return null;
    }
  }

  return(
    <Formik
      initialValues={{
        type: EntryType.Occup,
        date: "",
        specialist: "",
        diagnosisCodes: [],
        description: "",
        dischargeDate: "",
        dischargeCriteria: "",
        employerName: "",
        startDate: "",
        endDate: "",
        healthCheckRating: HealthCheckRating.Healthy
      }}
      onSubmit={onSubmit}
      validate={values => {
        const requiredError = "Field is required";
        const errors: { [field: string]: string } = {};
        if (!values.date) {
          errors.date = requiredError;
        }
        if (!values.specialist) {
          errors.specialist = requiredError;
        }
        if (!values.description) {
          errors.description = requiredError;
        }
        if(values.type===EntryType.Hospit &&  !values.dischargeDate){
          errors.dischargeDate = requiredError;
        }
        if(values.type===EntryType.Hospit &&  !values.dischargeCriteria){
          errors.dischargeCriteria = requiredError;
        }
        if(values.type===EntryType.Occup &&  !values.employerName){
          errors.employerName = requiredError;
        }
        return errors;
      }}
    >
      {({ isValid, dirty, setFieldValue, setFieldTouched  }) => {
        return(
          <Form className="form ui">
            <TypeSelectField
              label="Type"
              name="type"
              options={typeOptions}
              onChange={setType}
            />
            <Field
              label="Date"
              placeholder="YYYY-MM-DD"
              name="date"
              component={TextField}
            />
            <DiagnosisSelection
            setFieldValue={setFieldValue}
            setFieldTouched={setFieldTouched}
            diagnoses={Object.values(diagnosis)}
            />
            <Field
              label="Specialist"
              placeholder="Specialist"
              name="specialist"
              component={TextField}
            />
            <Field
              label="Description"
              placeholder="Description"
              name="description"
              component={TextField}
            />
            {corectField()}
            <Grid>
              <Grid.Column floated="left" width={5}>
                <Button type="button" onClick={onCancel} color="red">
                  Cancel
                </Button>
              </Grid.Column>
              <Grid.Column floated="right" width={5}>
                <Button
                  type="submit"
                  floated="right"
                  color="green"
                  disabled={!dirty || !isValid}
                >
                  Add
                </Button>
              </Grid.Column>
            </Grid>
          </Form>
        );
      }}
    </Formik>
  );
};

export default AddEntryForm;