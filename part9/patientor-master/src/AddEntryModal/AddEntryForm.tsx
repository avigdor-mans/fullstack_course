import React from "react";
import { Grid, Button } from "semantic-ui-react";
import { Field, Formik, Form } from "formik";
import { HealthCheckRating } from "../types";
import { TypeOption, EntryType, TextField, DiagnosisSelection, Values, HealthCheckRatingOption, TypeSelectField, HealthCheckRatingSelectField, HealthCheckRatingSelectFieldProps, TypeSelectFieldProps } from "./FormField";
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
type AllProps = HealthCheckRatingSelectFieldProps | TypeSelectFieldProps;
const AddEntryForm: React.FC<Props> = ({ onSubmit, onCancel }) => {

  const [{ diagnosis }] = useStateValue();
  const [form, setForm] = React.useState<JSX.Element|null>(
    <HealthCheckRatingSelectField
      label="HealthCheckRating"
      name="healthCheckRating"
      options={healthCheckRatingOptions}
    />
  );
  const [type, setType] = React.useState(EntryType.Health)
  
  const corectField = (e:{ target: { value: EntryType; }; }, c:CustomEvent) => {
    c.preventDefault();
    setType(e.target.value);
    switch (e.target.value) {
      case "HealthCheck":
        setForm (
        <HealthCheckRatingSelectField
          label="HealthCheckRating"
          name="healthCheckRating"
          options={healthCheckRatingOptions}
        />);
        break;
      case "Hospital":
        setForm (
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
        break;
      case "OccupationalHealthcare":
        setForm (
          <div>
            <Field
              label="EmployerName"
              placeholder="employerName"
              name="employerName"
              component={TextField}
            />
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
        break;
      default:
        setForm(null);
    }
  }

  return(
    <Formik
      initialValues={{
        type: type,
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
      validateOnChange
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
              onChange={corectField}
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
            {form}
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