import {Request, Response} from "express";
import {AcademicSemesterService} from "./academicSemester.service";
import sendResponse from "../../../shared/sendResponse";
import {AcademicSemester} from "@prisma/client";
import httpStatus from "http-status";
import {catchAsync} from "../../../shared/catchAsync";
import pick from "../../../shared/pick";
import {AcademicSemesterFilterbaleFields, AcademicSemesterSortingFields} from "./academicSemester.constant";

const insertIntoDb = catchAsync (async (req:Request, res:Response)=>{
    const result = await AcademicSemesterService.insertIntoDb(req.body)

    sendResponse<AcademicSemester>(res,{
        statusCode:httpStatus.OK,
        success:true,
        message:"Academic Semester Created Successfully!",
        data:result

    })
})

const getAllFromDb = catchAsync(async (req:Request, res:Response)=>{

    const filters = pick(req.query, AcademicSemesterFilterbaleFields)
    const options = pick(req.query, AcademicSemesterSortingFields)
    const result = await AcademicSemesterService.getAllSemester(filters,options)

    sendResponse(res,{
        statusCode:httpStatus.OK,
        success:true,
        message:"Academic Semester data fetched!",
        meta:result.meta,
        data:result.data
    })
})

const getDataById = catchAsync(async (req:Request, res:Response)=>{
    const result = await AcademicSemesterService.getDataById(req.params.id)
    sendResponse(res,{
        statusCode:httpStatus.OK,
        success:true,
        message:"Academic Semester data fetched!",

        data:result
    })
})

export const AcademicSemeeterController ={
    insertIntoDb,
    getAllFromDb,
    getDataById
}