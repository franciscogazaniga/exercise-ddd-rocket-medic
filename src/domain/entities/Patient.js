import { Appointment } from './Appointment.js'
import { MedicalRecord } from '../value-objects/medical-record/MedicalRecord.js'
import { Exam } from './Exam.js'

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

  addExam(exam) {
    if (!(exam instanceof Exam)) {
      throw new Error("Invalid exam object.")
    }
    
    this.exams.push({ exam })
    console.log(`Exam ${exam.type} added with result: ${exam.result}`)
  }

  scheduleAppointment(appointment) {
    if(!(appointment instanceof Appointment)) {
      throw new Error("Invalid appointment object.")
    }

    const hasConflict = this.appointments.some((a) => a.hasConflict(appointment))

    if(!hasConflict) {
      this.appointments.push(appointment)
      console.log(`Appointment scheduled for ${appointment.date} with ${appointment.doctor.name}.`)
    } else {
      console.log(`Appointment conflict detected for patient ${this.name}.`)
    }
  }
}