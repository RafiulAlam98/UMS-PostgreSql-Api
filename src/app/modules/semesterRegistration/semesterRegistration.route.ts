import express from "express";
import {SemesterRegistrationController} from "./semesterRegistration.controller";
import validateRequest from "../../middlewares/validateRequest";
import {SemesterRegistrationValidation} from "./semesterRegistration.validation";
import auth from "../../middlewares/auth";
import {ENUM_USER_ROLE} from "../../../enums/user";

const router = express.Router()

router.post("/create-registration",
    SemesterRegistrationController.insertIntoDb)
router.patch("/:id",
    validateRequest(SemesterRegistrationValidation.update),
    auth(ENUM_USER_ROLE.SUPER_ADMIN, ENUM_USER_ROLE.ADMIN),
    SemesterRegistrationController.updateOneDb)

export const SemesterRegistrationRoutes ={
    router
}