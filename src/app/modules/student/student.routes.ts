import express from "express";
import validateRequest from "../../middlewares/validateRequest";

import {StudentValidation} from "./student.validation";
import {StudentController} from "./student.controller";


const router = express.Router()

router.post("/create-student", validateRequest(StudentValidation.create), StudentController.insertIntoDB)
router.get("/:id", StudentController.getByIdFromDB)
router.patch("/:id",validateRequest(StudentValidation.update), StudentController.updateIntoDb)
router.delete("/", StudentController.deleteFromDb)
router.get("/", StudentController.getAllFromDB)

export const StudentRoutes = {router}