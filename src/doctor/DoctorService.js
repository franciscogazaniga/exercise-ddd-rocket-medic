import { Doctor } from "./Doctor.js"

export class DoctorService {
  constructor(doctorRepository) {
    this.doctorRepository = doctorRepository
  }

  addDoctor(doctorData) {
    const doctor = new Doctor(
      doctorData.id,
      doctorData.rcm,
      doctorData.name,
      doctorData.specialties,
      doctorData.phone
    )

    this.doctorRepository.add(doctor.id, doctor)
    return doctor
  }

  addDoctorWorkingHours(doctorId, day, timeSlot) {
    const doctor = this.doctorRepository.findById(doctorId)
    if(!doctor) {
      throw new Error("Doctor not found.")
    }

    const hasWorkingHours = doctor.workingHours.hours.some(
      (workingHour) =>
        workingHour.day === day && workingHour.timeSlot === timeSlot
    )

    if(hasWorkingHours) {
      throw new Error("Working hours already exists.")
    }

    doctor.workingHours.hours.push({ day, timeSlot })
    this.doctorRepository.update(doctor.id, doctor)
    return doctor
  }

  removeWorkingHours(doctorId, day, timeSlot) {
    const doctor = this.doctorRepository.findById(doctorId)
    if(!doctor) {
      throw new Error("Doctor not found.")
    }

    doctor.workingHours.hours = doctor.workingHours.hours.filter(
      (hour) => hour.day !== day || hour.timeSlot !== timeSlot
    )

    this.doctorRepository.update(doctor.id, doctor)
    return doctor
  }

  listDoctorWorkingHours(doctorId) {
    const doctor = this.doctorRepository.findById(doctorId)
    if(!doctor) {
      throw new Error("Doctor not found.")
    }

    return doctor.workingHours.hours()
  }

  addDoctorSpecialty(doctorId, specialty) {
    const doctor = this.doctorRepository.findDoctorById(doctorId)
    if(!doctor) {
      throw new Error("Doctor not found.")
    }

    const hasSpecialty = doctor.specialties.includes(specialty)

    if(hasSpecialty) {
      throw new Error("Specialty already exists.")
    }

    doctor.specialties.push(specialty)
    this.doctorRepository.update(doctor.id, doctor)
    return doctor
  }

  findAllDoctors() {
    return this.doctorRepository.findAll()
  }

  findDoctorById(doctorId) {
    return this.doctorRepository.findById(doctorId)
  }

  updateDoctor(doctorId, updatedData) {
    const doctor = this.doctorRepository.findById(doctorId)
    if(!doctor) {
      throw new Error("Doctor not found.")
    }

    Object.assign(doctor, updatedData)

    this.doctorRepository.update(doctor.id, doctor)
    return doctor
  }

  deleteDoctor(doctorId) {
    const doctor = this.doctorRepository.findById(doctorId)
    if(!doctor) {
      throw new Error("Doctor not found.")
    }

    this.doctorRepository.delete(doctor.id)
    return doctor
  }
}