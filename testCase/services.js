import { DoctorService } from '../src/domain/services/DoctorService.js'
import { DoctorAvailabilityService } from '../src/domain/services/DoctorAvailabilityService.js'
import { doctorRepository, appointmentRepository, examRepository, patientRepository } from './repositories.js'
import { NotificationService } from '../src/infrastructure/notification/NotificationService.js'
import { AppointmentService } from '../src/application/services/AppointmentService.js'
import { PatientService } from '../src/domain/services/PatientService.js'
import { ExamService } from '../src/domain/services/ExamService.js'
 

export const doctorService = new DoctorService(doctorRepository)
export const examService = new ExamService(examRepository)
export const patientService = new PatientService(patientRepository)
export const doctorAvailabilityService = new DoctorAvailabilityService(appointmentRepository, doctorService)
export const notificationService = new NotificationService()
export const appointmentService = new AppointmentService(
  patientService,
  doctorService,
  appointmentRepository,
  doctorAvailabilityService,
  notificationService
)