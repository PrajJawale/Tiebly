import express from "express"
import isAuthenticated from "../middlewares/isAuthenticated.js"
import { applyJob, getApplicants, getAppliedJobs, updateStatus } from "../controller/application.controller.js"


const router = express.Router()
router.route("/apply/:id").get(isAuthenticated,applyJob)
router.route("/get").get(isAuthenticated,getAppliedJobs) //for students
router.route("/:id/applicants").get(isAuthenticated,getApplicants) // for recruiter
router.route("/status/:id/update").post(isAuthenticated,updateStatus) // for recruiter

export default router