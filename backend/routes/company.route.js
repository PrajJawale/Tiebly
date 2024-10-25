import express from "express"
import isAuthenticated from "../middlewares/isAuthenticated.js"
import { getCompany, getCompanyById, registerCompany, updateCompany } from "../controller/company.controller.js"
import { singleUpload } from "../middlewares/multer.js"

const router = express.Router()
router.route("/register").post(isAuthenticated,registerCompany)
router.route("/getcompany").get(isAuthenticated,getCompany)
router.route("/getcompany/:id").get(isAuthenticated, getCompanyById);
router.route("/updatecompany/:id").put(isAuthenticated,singleUpload,updateCompany)
export default router