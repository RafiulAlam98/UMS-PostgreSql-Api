import express from "express";
import {OfferedCourseClassSchedule} from "@prisma/client";
import {OfferedCourseClassScheduleController} from "./offeredCourseClassSchedule.controller";

const router = express.Router()

router.post("/", OfferedCourseClassScheduleController.insertIntoDb)

export const  OfferedCourseClassScheduleRoutes ={
    router
}