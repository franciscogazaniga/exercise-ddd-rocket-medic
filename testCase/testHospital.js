import { patient, doctor, appointment } from "./entities.js"
import { appointmentService, patientService, doctorService } from "./services.js"

doctorService.addDoctor(doctor)
doctorService.addDoctorWorkingHours(doctor.id, "Friday", "09:00 AM - 08:00 PM")

patientService.addPatient(patient)

appointmentService.execute(appointment)