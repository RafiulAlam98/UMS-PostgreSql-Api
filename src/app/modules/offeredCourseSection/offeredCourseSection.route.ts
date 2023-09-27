import express from "express";
import {OfferedCourseController} from "./offeredCourseSection.controller";

const router = express.Router()

router.post("/",OfferedCourseController.insertIntoDb)

export const OfferedCourseSectionRoutes ={
    router
}