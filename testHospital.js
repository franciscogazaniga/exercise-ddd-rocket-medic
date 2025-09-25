import { Address } from './src/shared/Address.js'
import { EmergencyContact } from './src/shared/EmergencyContact.js'

import { Appointment } from './src/patient/Appointment.js'
import { AppointmentRepository } from './src/patient/AppointmentRepository.js'

import { Exam } from './src/patient/Exam.js'
import { ExamRepository } from './src/patient/ExamRepository.js'

import { Patient } from './src/patient/Patient.js'
import { PatientRepository } from './src/patient/PatientRepository.js'

import { Doctor } from './src/doctor/Doctor.js'
import { DoctorRepository } from './src/doctor/DoctorRepository.js'
import { DoctorService } from './src/doctor/DoctorService.js'

// const address = new Address(
//     "Rua das Flores",
//     "123", 
//     "São Paulo",
//     "São Paulo",
//     "111111111"
// )
// const emergencyContact = new EmergencyContact(
//   "Maria Silva", 
//   "(11) 88888-8888"
// )

// const patient = new Patient(
//   1,
//   "123.456.789-00",
//   "João Silva",
//   "1990-01-01",
//   "Masculino",
//   "O+",
//   address,
//   "(11) 99999-9999",
//   "joao.silva@email.com",
//   emergencyContact,
// )

const doctor = new Doctor(
  1,
  "12345",
  "Dr. Smith",
  ["Cardiology"],
  "11987654333"
)

// const appointment = new Appointment(
//   1,
//   new Date(),
//   patient,
//   doctor,
//   "Checkup",
//   "Scheduled",
//   "Regular checkup"
// )

const doctorRepository = new DoctorRepository()
const doctorService = new DoctorService(doctorRepository)
// const patientRepository = new PatientRepository()
// const appointmentRepository = new AppointmentRepository()

doctorService.addDoctor(doctor)
doctorService.addDoctorWorkingHours(1, "Segunda", "14:00-18:00")
doctorService.addDoctorWorkingHours(1, "Quarta", "14:00-18:00")
doctorService.removeWorkingHours(1, "Segunda", "14:00-18:00")

// doctorRepository.add(doctor.id, doctor)
// patientRepository.add(patient.id, patient)
// appointmentRepository.add(appointment.id, appointment)

// const foundPatient = patientRepository.findAll()
// const foundDoctor = doctorRepository.findById(1)
// const foundAppointment = appointmentRepository.findByStatus("Scheduled")

console.log(doctorService.findDoctorById(1).workingHours)