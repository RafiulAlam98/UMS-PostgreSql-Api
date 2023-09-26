import express from "express";
import {CourseController} from "./course.controller";
import validateRequest from "../../middlewares/validateRequest";
import {CourseValidation} from "./course.validation";
import auth from "../../middlewares/auth";
import {ENUM_USER_ROLE} from "../../../enums/user";

const router = express.Router()

router.post("/create-course",CourseController.insertIntoDb)
router.post("/:id/assign-faculty",
    validateRequest(CourseValidation.assignOrRemoveFaculty),
    auth(ENUM_USER_ROLE.SUPER_ADMIN, ENUM_USER_ROLE.ADMIN),
    CourseController.assignFaculties)
router.delete("/:id/remove-faculty",
    validateRequest(CourseValidation.assignOrRemoveFaculty),
    auth(ENUM_USER_ROLE.SUPER_ADMIN, ENUM_USER_ROLE.ADMIN),
    CourseController.removeFaculties)
router.patch("/:id",CourseController.updateOneInDb)


export const CourseRoutes ={
    router
}