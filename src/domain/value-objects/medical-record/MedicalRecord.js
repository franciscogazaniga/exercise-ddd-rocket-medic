import { Diagnosis } from '../../domain/value-objects/medical-record/Diagnosis.js'
import { Medication } from './Medication.js'
import { Treatment } from './Treatment.js'

export class MedicalRecord {
  constructor() {
    this.diagnoses = [];
    this.treatments = [];
    this.medications = [];
  }

  addDiagnosis(diagnosis) {
    if(!(diagnosis instanceof Diagnosis)) {
      throw new Error("Invalid diagnosis object.")
    }
    this.diagnoses.push(diagnosis)
  }

  addTreatment(treatment) {
    if(!(treatment instanceof Treatment)) {
      throw new Error("Invalid treatment object.")
    }
    this.treatments.push(treatment)
  }

  addMedication(medication){
    if(!(medication instanceof Medication)) {
      throw new Error("Invalid medication object.")
    }
    this.medications.push(medication)
  }

  equals(otherMedicalRecord) {
    return (
      this.diagnoses.length === otherMedicalRecord.diagnoses.length &&
      this.treatments.length === otherMedicalRecord.treatments.length &&
      this.medications.length === otherMedicalRecord.medications.length &&
      this.diagnoses.every((diagnosis, index) => diagnosis.equals(otherMedicalRecord.diagnosis[index])) &&
      this.treatments.every((treatment, index) => treatment.equals(otherMedicalRecord.treatment[index])) &&
      this.medications.every((medication, index) => medication.equals(otherMedicalRecord.medication[index])) 
    )
  }
}