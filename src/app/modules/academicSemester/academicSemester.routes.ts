import express from "express"
import {AcademicSemeeterController} from "./academicSemester.controller";
import {AcademicSemesterValidation} from "./academicSemester.validation";
import validateRequest from "../../middlewares/validateRequest";

const router = express.Router()

router.post("/create-semester", validateRequest(AcademicSemesterValidation.create), AcademicSemeeterController.insertIntoDb)
router.get("/", AcademicSemeeterController.getAllFromDb)


export const  AcademicSemesterRoutes = {router}