import express from "express"
import validateRequest from "../../middlewares/validateRequest";
import {AcademicDepartmentValidation} from "./acdemicDepartment.validation";
import {AcademicDepartmentController} from "./acdemicDepartment.controller";

const router = express.Router()

router.post("/create-department", validateRequest(AcademicDepartmentValidation.create), AcademicDepartmentController.insertIntoDB)
router.get("/:id", AcademicDepartmentController.getByIdFromDB)
router.get("/", AcademicDepartmentController.getAllFromDB)

export const AcademicDepartmentRoutes = {router}