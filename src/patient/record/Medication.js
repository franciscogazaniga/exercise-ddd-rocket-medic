export class Medication {
  constructor(name, dosage) {
    this.name = name
    this.dosage = dosage
  }

  equals(otherMedication) {
    return (
      this.name === otherTreatment.name &&
      this.dosage === otherMedication.dosage
    )
  }
}