import { WorkingHours } from "../../value-objects/WorkingHours";

export class DoctorWorkingHoursService {
  constructor(doctorRepository) {
    this.doctorRepository = doctorRepository;
  }

  addDoctorWorkingHours(doctorId, day, timeSlot) {
    const doctor = this.doctorRepository.findById(doctorId)
    if(!doctor) {
      throw new Error("Doctor not found.")
    }

    if(!doctor.workingHours) {
      doctor.workingHours = new WorkingHours()
    }

    const hasWorkingHours = doctor.workingHours.hours.some(
      (workingHour) =>
        workingHour.day === day && workingHour.timeSlot === timeSlot
    )

    if(hasWorkingHours) {
      throw new Error("Working hours already exists.")
    }

    doctor.workingHours = new WorkingHours([
      ...doctor.workingHours.hours,
      { day, timeSlot },
    ])

    this.doctorRepository.update(doctor.id, doctor)
    return doctor
  }

  removeDoctorWorkingHours(doctorId, day, timeSlot) {
    const doctor = this.doctorRepository.findById(doctorId)
    if(!doctor) {
      throw new Error("Doctor not found.")
    }

    if(!doctor.workingHours) {
      doctor.workingHours = new WorkingHours()
    }

    // doctor.workingHours.hours = doctor.workingHours.hours.filter(
    //   (hour) => hour.day !== day || hour.timeSlot !== timeSlot
    // )

    doctor.workingHours = new WorkingHours(
      doctor.workingHours.hours.filter(
        (workingHour) => !(workingHour.day !== day || workingHour.timeSlot !== timeSlot)
      )
    )

    this.doctorRepository.update(doctor.id, doctor)
    return doctor
  }

  listDoctorWorkingHours(doctorId) {
    const doctor = this.doctorRepository.findById(doctorId)
    if(!doctor) {
      throw new Error("Doctor not found.")
    }

    if (!doctor.workingHours) {
      doctor.workingHours = new WorkingHours();
    }

    return doctor.workingHours.hours
  }

  getDoctorWorkingHours(doctorId) {
    const doctor = this.doctorRepository.findById(doctorId);
    if (!doctor) throw new Error('Doctor not found.');

    if (!doctor.workingHours) {
      doctor.workingHours = new WorkingHours();
    }

    return doctor.workingHours;
  }

  isWithinWorkingHours(doctorId, date) {
    const dayOfWeek = date.toLocaleDateString("en-US", { weekday: "long"})
    const timeSlot = date.toLocaleTimeString("en-US", { hour: "2-digit", minute: "2-digit"})

    const doctorWorkingHours = this.listDoctorWorkingHours(doctorId)

    return doctorWorkingHours.some((workingHour) => workingHour.day === dayOfWeek && this.isTimeWithinSlot(timeSlot, workingHour.timeSlot))
  }
}