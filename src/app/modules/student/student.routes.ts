import express from "express";
import validateRequest from "../../middlewares/validateRequest";

import {StudentValidation} from "./student.validation";
import {StudnetController} from "./student.controller";

const router = express.Router()

router.post("/create-student", validateRequest(StudentValidation.create), StudnetController.insertIntoDB)
router.get("/:id", StudnetController.getByIdFromDB)
router.get("/", StudnetController.getAllFromDB)

export const StudentRoutes = {router}