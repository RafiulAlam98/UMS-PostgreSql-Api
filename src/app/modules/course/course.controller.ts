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

const updateOneInDb = catchAsync(async (req:Request,res:Response)=>{
    const {id}= req.params
    const data = req.body
    const result = await CourseService.updateOneDb(id, data)
    sendResponse(res,{
        statusCode:httpStatus.OK,
        success:true,
        message:"Course Updated Successfully!",
        data:result
    })
})

const assignFaculties = catchAsync(async (req:Request,res:Response)=>{
    const {id}= req.params
    const data = req.body.faculties
    console.log(id, data)
    const result = await CourseService.assignFaculties(id, data)
    sendResponse(res,{
        statusCode:httpStatus.OK,
        success:true,
        message:"Course Faculty Assigned Successfully!",
        data:result
    })
})



export const CourseController = {
    insertIntoDb,
    updateOneInDb,
    assignFaculties
}