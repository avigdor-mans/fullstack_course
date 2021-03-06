import React from "react";
import { ErrorMessage, Field, FieldProps, FormikProps } from "formik";
import { Dropdown, DropdownProps, Form } from "semantic-ui-react";
import { Diagnosis, HealthCheckRating, HospitalEntry, OccupationalHealthcareEntry, SickLeave } from "../types";

export interface Values {
  date: string,
  type: EntryType,
  specialist: string,
  diagnosisCodes: Array<Diagnosis['code']>,
  description: string,
  dischargeDate?:string;
  dischargeCriteria?: string;
  employerName?: string,
  startDate?: string;
  endDate?: string;
  healthCheckRating?: HealthCheckRating 
}

export enum EntryType {
  Health = "HealthCheck",
  Occup = "OccupationalHealthcare",
  Hospit = "Hospital"
}
export type HealthCheckRatingOption = {
  value: HealthCheckRating;
  label: number;
};

export type TypeOption = {
  value: EntryType;
  label: string;
};

export type EntryForm = Omit<HospitalEntry, 'id'> | Omit<OccupationalHealthcareEntry, 'id'> | Omit<HospitalEntry, 'id'>;

// props for select field component
export type TypeSelectFieldProps = {
  name: string;
  label: string;
  options: TypeOption[];
  onChange: (x:{ target: { value: EntryType; }; }, y:CustomEvent) => void;
};

export const TypeSelectField: React.FC<TypeSelectFieldProps> = ({
  name,
  label,
  options,
  onChange
}: TypeSelectFieldProps) => (
  <Form.Field>
    <label>{label}</label>
    <Field as="select" name={name} className="ui dropdown" 
    onClick={(e: { target: { value: EntryType; }; })=> onChange(e, new CustomEvent("nothing"))}
    >
      {options.map(option => (
        <option key={option.value} value={option.value}>
          {option.label || option.value}
        </option>
      ))}
    </Field>
  </Form.Field>
);

export type HealthCheckRatingSelectFieldProps = {
  name: string;
  label: string;
  options: HealthCheckRatingOption[];
};

export const HealthCheckRatingSelectField: React.FC<HealthCheckRatingSelectFieldProps> = ({
  name,
  label,
  options,
}: HealthCheckRatingSelectFieldProps) => (
  <Form.Field>
    <label>{label}</label>
    <Field as="select" name={name} className="ui dropdown" >
      {options.map(option => (
        <option key={option.value} value={option.value}>
          {option.label || option.value}
        </option>
      ))}
    </Field>
  </Form.Field>
);

interface TextProps extends FieldProps {
  label: string;
  placeholder: string;
}

export const TextField: React.FC<TextProps> = ({
  field,
  label,
  placeholder
}) => (
  <Form.Field>
    <label>{label}</label>
    <Field placeholder={placeholder} {...field} />
    <div style={{ color:'red' }}>
      <ErrorMessage name={field.name} />
    </div>
  </Form.Field>
);

/*
  for exercises 9.24.-
*/
interface NumberProps extends FieldProps {
  label: string;
  errorMessage?: string;
  min: number;
  max: number;
}

export const NumberField: React.FC<NumberProps> = ({ field, label, min, max }) => (
  <Form.Field>
    <label>{label}</label>
    <Field {...field} type='number' min={min} max={max} />

    <div style={{ color:'red' }}>
      <ErrorMessage name={field.name} />
    </div>
  </Form.Field>
);

export const DiagnosisSelection = ({
  diagnoses,
  setFieldValue,
  setFieldTouched
}: {
  diagnoses: Diagnosis[];
  setFieldValue: FormikProps<{ diagnosisCodes: string[] }>["setFieldValue"];
  setFieldTouched: FormikProps<{ diagnosisCodes: string[] }>["setFieldTouched"];
}) => {
  const field = "diagnosisCodes";
  const onChange = (
    _event: React.SyntheticEvent<HTMLElement, Event>,
    data: DropdownProps
  ) => {
    setFieldTouched(field, true);
    setFieldValue(field, data.value);
  };

  const stateOptions = diagnoses.map(diagnosis => ({
    key: diagnosis.code,
    text: `${diagnosis.name} (${diagnosis.code})`,
    value: diagnosis.code
  }));

  return (
    <Form.Field>
      <label>Diagnoses</label>
      <Dropdown
        fluid
        multiple
        search
        selection
        options={stateOptions}
        onChange={onChange}
      />
      <ErrorMessage name={field} />
    </Form.Field>
  );
};
