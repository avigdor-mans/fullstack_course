import { State } from "./state";
import { Patient, Diagnosis, Entry } from "../types";

export type Action =
  | {
      type: "SET_PATIENT_LIST";
      payload: Patient[];
    }
  | {
      type: "ADD_PATIENT";
      payload: Patient;
    }
  | {
      type: "SET_PATIENT_PAGE";
      payload: Patient;
    }
  | {
    type: "SET_DIAGNOSIS_LIST";
    payload: Diagnosis[];
  }
  | {
    type: "ADD_ENTRY";
    payload: Entry;
  };

export const setPatients = (patients:Patient[]):Action => {
  return({
    type: "SET_PATIENT_LIST",
    payload:patients
  });
};

export const setPatient = (patient:Patient):Action => {
  return({
    type: "SET_PATIENT_PAGE",
    payload:patient
  });
};

export const addPatient = (patient:Patient):Action => {
  return({
    type: "ADD_PATIENT",
    payload:patient
  });
};

export const setDiagnosis = (diagnosis:Diagnosis[]):Action => {
  return({
    type: "SET_DIAGNOSIS_LIST",
    payload: diagnosis
  });
};

export const addEntry = (entry:Entry):Action => {
  return({
    type: "ADD_ENTRY",
    payload:entry
  })
}

export const reducer = (state: State, action: Action): State => {
  switch (action.type) {
    case "SET_PATIENT_LIST":
      return {
        ...state,
        patients: {
          ...action.payload.reduce(
            (memo, patient) => ({ ...memo, [patient.id]: patient }),
            {}
          ),
          ...state.patients
        }
      };
    case "ADD_PATIENT":
      return {
        ...state,
        patients: {
          ...state.patients,
          [action.payload.id]: action.payload
        }
      };
    case "SET_PATIENT_PAGE":
      return {
        ...state,
        patient: action.payload
      };
    case "SET_DIAGNOSIS_LIST":
      return{
        ...state,
        diagnosis: {
          ...action.payload.reduce(
            (memo, diagnos) => ({ ...memo, [diagnos.code]: diagnos }),
            {}
          ),
          ...state.diagnosis
        }
      }
    case "ADD_ENTRY":
      return{
        ...state,
        patient: state.patient ? {
          ...state.patient,
          entries: state.patient.entries.concat(action.payload)
        }
        : undefined
      }
    default:
      return state;
  }
};
