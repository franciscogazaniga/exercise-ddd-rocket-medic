export class DoctorAvailabilityService {
  constructor(appointmentRepository, doctorService) {
    this.appointmentRepository = appointmentRepository
    this.doctorService = doctorService
  }

  isDoctorAvailable(doctorId, date) {
    const doctor = this.doctorService.findDoctorById(doctorId)
    if (!doctor) {
      throw new Error("Doctor not found.")
    }

    if(!(date instanceof Date)) {
      throw new Error("Invalid date object.")
    }

    const hasAppointmentConflict = this.hasAppointmentConflict(doctorId, date)
    if(hasAppointmentConflict) {
      console.log("Doctor has a conflicting appointment.")
      return false
    }

    const isWithinWorkingHours = this.isWithinWorkingHours(doctorId, date)
    if(!isWithinWorkingHours) {
      console.log("Doctor is not working at this time.")
      return false
    }

    return true
  }

  hasAppointmentConflict(doctorId, date) {
    const doctorAppointments = this.appointmentRepository.findByDoctorId(doctorId)
    return doctorAppointments.some(
      (appointment) => appointment.date.getTime() === date.getTime()
    )
  }

  isWithinWorkingHours(doctorId, date) {
    const dayOfWeek = date.toLocaleDateString("en-US", { weekday: "long"})
    const timeSlot = date.toLocaleTimeString("en-US", { hour: "2-digit", minute: "2-digit"})

    const doctorWorkingHours = this.doctorService.listDoctorWorkingHours(doctorId)

    return doctorWorkingHours.some((workingHour) => workingHour.day === dayOfWeek && this.isTimeWithinSlot(timeSlot, workingHour.timeSlot))
  }

  isTimeWithinSlot(appointmentAttemptTimeSlot, actualDoctorTimeSlot) {
    const [doctorStartTime, doctorEndTime] = actualDoctorTimeSlot.split(" - ")

    const timeToMinutes = (time) => {
      const [hour, minute] = time.split(/:| /).map(Number)
      const period = time.includes("PM") && hour !== 12 ? 12 : 0

      return (hour + period) * 60 + minute
    }


    const AttemptTimeInMinutes = timeToMinutes(appointmentAttemptTimeSlot)
    const doctorStartInMinutes = timeToMinutes(doctorStartTime)
    const doctorEndInMinutes = timeToMinutes(doctorEndTime)

    return AttemptTimeInMinutes >= doctorStartInMinutes && AttemptTimeInMinutes <= doctorEndInMinutes
  }
}