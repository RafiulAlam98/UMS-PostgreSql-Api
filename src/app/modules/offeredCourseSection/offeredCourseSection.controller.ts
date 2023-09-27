import {catchAsync} from "../../../shared/catchAsync";
import {Request, Response} from "express";
import {OfferedCourseSectionService} from "./offeredCourseSection.service";
import sendResponse from "../../../shared/sendResponse";
import httpStatus from "http-status";

const insertIntoDb = catchAsync(async (req:Request, res:Response)=>{
    const result = await OfferedCourseSectionService.insertIntoDb(req.body)
    sendResponse(res,{
        statusCode:httpStatus.OK,
        success:true,
        message:"Offered Course Section Created Successfully!",
        data:result
    })
})

export const  OfferedCourseController ={
    insertIntoDb
}