import { Exam } from "../entities/Exam.js"

export class ExamService {
  constructor(examRepository) {
    this.examRepository = examRepository
  }

  scheduleExam(exam) {
    this.examRepository.add(exam.id, exam)
    return exam
  }

  findExamById(examId) {
    return this.examRepository.findById(examId)
  }

  findExamByPatientId(patientId) {
    return this.examRepository.findByPatientId(patientId)
  }

  findExamByType(type) {
    return this.examRepository.findByType(type)
  }

  findExamByDate(date) {
    return this.examRepository.findByDate(date)
  }

  findAllExams() {
    return this.examRepository.findAll()
  }

  updateExam(examId, updatedData) {
    const exam = this.findExamById(examId)
    if(!exam) {
      throw new Error("Exam not found.")
    }

    Object.assign(exam, updatedData)

    this.examRepository.update(exam.id, exam)
    return exam
  }

  deleteExam(examId) {
    const exam = this.examRepository.findExamById(examId)
    if(!exam) {
      throw new Error("Exam not found.")
    }

    this.examRepository.delete(exam.id)
    return exam
  }
}