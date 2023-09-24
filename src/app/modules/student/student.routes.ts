import express from "express";
import validateRequest from "../../middlewares/validateRequest";

import {StudentValidation} from "./student.validation";
import {StudentController} from "./student.controller";
import auth from "../../middlewares/auth";
import {ENUM_USER_ROLE} from "../../../enums/user";


const router = express.Router()

router.post("/create-student", auth(ENUM_USER_ROLE.SUPER_ADMIN,ENUM_USER_ROLE.ADMIN ),validateRequest(StudentValidation.create), StudentController.insertIntoDB)
router.get("/:id", StudentController.getByIdFromDB)
router.patch("/:id",auth(ENUM_USER_ROLE.SUPER_ADMIN,ENUM_USER_ROLE.ADMIN ), validateRequest(StudentValidation.update), StudentController.updateIntoDb)
router.delete("/", auth(ENUM_USER_ROLE.SUPER_ADMIN,ENUM_USER_ROLE.ADMIN ), StudentController.deleteFromDb)
router.get("/", StudentController.getAllFromDB)

export const StudentRoutes = {router}