import express from "express";
import {CourseController} from "./course.controller";

const router = express.Router()

router.post("/create-course",CourseController.insertIntoDb)
router.patch("/:id",CourseController.updateOneInDb)

export const CourseRoutes ={
    router
}