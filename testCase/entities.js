import { Doctor } from '../src/domain/entities/Doctor.js'
import { Patient } from '../src/domain/entities/Patient.js'
import { Address } from '../src/domain/value-objects/Address.js'
import { Appointment } from '../src/domain/entities/Appointment.js'
import { EmergencyContact } from '../src/domain/value-objects/EmergencyContact.js'
import { Exam } from '../src/domain/entities/Exam.js'
 
export const address = new Address(
    "Rua das Flores",
    "123", 
    "São Paulo",
    "São Paulo",
    "111111111"
)
export const emergencyContact = new EmergencyContact(
  "Maria Silva", 
  "(11) 88888-8888"
)

export const patient = new Patient(
  1,
  "123.456.789-00",
  "João Silva",
  "1990-01-01",
  "Masculino",
  "O+",
  address,
  "(11) 99999-9999",
  "joao.silva@email.com",
  emergencyContact,
)

export const doctor = new Doctor(
  1,
  "12345",
  "Smith",
  ["Cardiology"],
  "11987654333"
)

export const appointment = new Appointment(
  1,
  new Date("2025-09-26T10:00:00"),
  patient,
  doctor,
  "Checkup",
  "Scheduled",
  "Regular checkup"
)

export const exam = new Exam(
  1,
  "Blood Test",
  "Normal",
  new Date("2025-09-25T10:00:00"),
  "Lab",
  "Ana",
  patient
)