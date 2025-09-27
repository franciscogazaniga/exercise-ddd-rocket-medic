import express from 'express'

export class ExamController {
  constructor(examService) {
    this.router = express.Router()
    this.examService = examService
    this.initializeRoutes()
  }

  initializeRoutes() {
    this.router.post("/", this.scheduleExam.bind(this))
    this.router.get("/:id", this.getExamById.bind(this))
    this.router.get("/", this.getAllExams.bind(this))
    this.router.put("/:id", this.updateExam.bind(this))
    this.router.delete("/:id", this.deleteExam.bind(this))
    this.router.get("/patient/:patientId", this.getExamByPatientId.bind(this))
    this.router.get("/type/:type", this.getExamByType.bind(this))
    this.router.get("/date/:date", this.getExamByDate.bind(this))
  }

  async scheduleExam(req, res) {
    try {
      const exam = req.body
      const scheduledExam = await this.examService.scheduleExam(exam)
      res.status(201).json(scheduledExam)
    } catch(error) {
      res.status(400).json({error: error.message})
    }
  }

  async getExamById(req, res) {
    try{
      const { id } = req.params
      const exams = await this.examService.findExamById(id)
      res.status(200).json(exams)
    } catch(error) {
      res.status(404).json({error: error.message})
    }
  }

  async updateExam(req, res) {
    try{
      const { id } = req.params
      const updatedData = req.body
      const updatedExam = await this.examService.updateExam(id, updatedData)
      res.status(200).json(updatedExam)
    } catch(error) {
      res.status(400).json({error: error.message})
    }
  }

  async deleteExam(req, res) {
    try{
      const { id } = req.params
      const deletedExam = await this.examService.deleteExam(id)
      res.status(200).json(deletedExam)
    } catch(error) {
      res.status(404).json({error: error.message})
    }
  }

  async getAllExams(req, res) {
    try{
      const exams = await this.examService.findAllExams()
      res.status(200).json(exams)
    } catch(error) {
      res.status(500).json({error: error.message})
    }
  }

  async getExamByPatientId(req, res) {
    try{
      const { patientId } = req.params
      const exams = await this.examService.findExamByPatientId(patientId)
      if(!exams || exams.length === 0) {
        throw new Error("No exams found with the given patient id.")
      }
      res.status(200).json(exams)
    } catch(error) {
      res.status(404).json({error: error.message})
    }
  }

  async getExamByType(req, res) {
    try{
      const { type } = req.params
      const exams = await this.examService.findExamByType(type)
      if(!exams || exams.length === 0) {
        throw new Error("No exams found with the given type.")
      }
      res.status(200).json(exams)
    } catch(error) {
      res.status(404).json({error: error.message})
    }
  }

  async getExamByDate(req, res) {
    try{
      const { date } = req.params
      const exams = await this.examService.findExamByType(date)
      if(!exams || exams.length === 0) {
        throw new Error("No exams found with the given date.")
      }
      res.status(200).json(exams)
    } catch(error) {
      res.status(404).json({error: error.message})
    }
  }
}