import {catchAsync} from "../../../shared/catchAsync";
import {Request, Response} from "express";
import {OfferedCourseClassScheduleService} from "./offeredCourseClassSchedule.service";
import sendResponse from "../../../shared/sendResponse";
import httpStatus from "http-status";

const insertIntoDb = catchAsync(async (req:Request, res:Response)=>{
    const result = await OfferedCourseClassScheduleService.insertIntoDb(req.body)

    sendResponse(res,{
        statusCode:httpStatus.OK,
        success:true,
        message:"Offered Course Class Schedule Created Successfully",
        data:result
    })
})
export const OfferedCourseClassScheduleController = {
    insertIntoDb
}