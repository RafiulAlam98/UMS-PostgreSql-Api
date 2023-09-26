import express from "express"
import validateRequest from "../../middlewares/validateRequest";
import {FacultyValidation} from "./faculty.validation";
import {FacultyController} from "./faculty.controller";

const router = express.Router()

router.post("/create-faculty",
    validateRequest(FacultyValidation.create),
    FacultyController.insertIntoDB)
router.get("/:id", FacultyController.getByIdFromDB)
router.get("/", FacultyController.getAllFromDB)

export const FacultyRoutes = {router}