import {catchAsync} from "../../../shared/catchAsync";
import {Request, Response} from "express";
import {SemesterRegistrationService} from "./semesterRegistration.service";
import sendResponse from "../../../shared/sendResponse";
import httpStatus from "http-status";

const insertIntoDb = catchAsync(async(req:Request, res:Response)=>{
    const result = await SemesterRegistrationService.insertIntoDb(req.body)
    sendResponse(res,{
        statusCode:httpStatus.OK,
        success:true,
        message:"Semester Registration Created!",
        data:result
    })

})

export const SemesterRegistrationController ={
    insertIntoDb
}