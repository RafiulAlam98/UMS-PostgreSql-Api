import {catchAsync} from "../../../shared/catchAsync";
import {Request,Response} from "express";
import {CourseService} from "./course.service";
import sendResponse from "../../../shared/sendResponse";
import httpStatus from "http-status";

const insertIntoDb = catchAsync(async (req:Request,res:Response)=>{
    const result = await CourseService.insertIntoDb(req.body)
    sendResponse(res,{
        statusCode:httpStatus.OK,
        success:true,
        message:"Course created Successfully!",
        data:result
    })
})

export const CourseController = {
    insertIntoDb
}