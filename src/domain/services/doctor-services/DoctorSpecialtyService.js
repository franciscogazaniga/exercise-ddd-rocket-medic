export class DoctorSpecialtyService {
  constructor(doctorRepository) {
    this.doctorRepository = doctorRepository;
  }

  addDoctorSpecialty(doctorId, specialty) {
    const doctor = this.doctorRepository.findById(doctorId)
    if(!doctor) {
      throw new Error("Doctor not found.")
    }

    if(!doctor.specialties) {
      doctor.specialties = []
    }

    const hasSpecialty = doctor.specialties.includes(specialty)

    if(hasSpecialty) {
      throw new Error("Specialty already exists.")
    }

    doctor.specialties.push(specialty)
    this.doctorRepository.update(doctor.id, doctor)
    return doctor
  }

  removeSpecialty(doctorId, specialty) {
    const doctor = this.doctorRepository.findById(doctorId);
    if (!doctor) {
      throw new Error('Doctor not found.');
    }

    if (!doctor.specialties) {
      doctor.specialties = [];
    }

    doctor.specialties = doctor.specialties.filter((s) => s !== specialty);

    this.doctorRepository.update(doctor.id, doctor);
    return doctor;
  }

  listSpecialties(doctorId) {
    const doctor = this.doctorRepository.findById(doctorId);
    if (!doctor) {
      throw new Error('Doctor not found.');
    }

    if (!doctor.specialties) {
      doctor.specialties = [];
    }

    return doctor.specialties;
  }
}