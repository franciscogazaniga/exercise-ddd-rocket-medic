import { MedicalRecord } from '../value-objects/medical-record/MedicalRecord.js'

export class Patient {
  constructor(id, identificationDocument, name, birthDate, gender, bloodType, address, phone, email, emergencyContact) {
    this.id = id;
    this.identificationDocument = identificationDocument;
    this.name = name;
    this.birthDate = birthDate;
    this.gender = gender;
    this.bloodType = bloodType;
    this.address = address;
    this.phone = phone;
    this.email = email;
    this.emergencyContact = emergencyContact;
    this.medicalRecord = new MedicalRecord();
    this.allergies = [];
    this.appointments = [];
    this.exams = [];
  }
}