import express from "express";
import {SemesterRegistrationController} from "./semesterRegistration.controller";

const router = express.Router()

router.post("/create-registration",
    SemesterRegistrationController.insertIntoDb)
router.patch("/:id",
    SemesterRegistrationController.updateOneDb)

export const SemesterRegistrationRoutes ={
    router
}