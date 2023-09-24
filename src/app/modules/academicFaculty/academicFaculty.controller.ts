import {Request, Response} from "express";

import sendResponse from "../../../shared/sendResponse";
import {AcademicFaculty} from "@prisma/client";
import httpStatus from "http-status";
import {catchAsync} from "../../../shared/catchAsync";
import pick from "../../../shared/pick";
import {AcademicFacultyService} from "./academicFaculty.service";
import {AcademicFacultyFilterableFields, AcademicFacultySortingFields} from "./academicFaculty.constant";



const insertIntoDb = catchAsync (async (req:Request, res:Response)=>{
    const result = await AcademicFacultyService.insertIntoDb(req.body)

    sendResponse<AcademicFaculty>(res,{
        statusCode:httpStatus.OK,
        success:true,
        message:"Academic Faculty Created Successfully!",
        data:result

    })
})

const getAllFromDb = catchAsync(async (req:Request, res:Response)=>{

    const filters = pick(req.query, AcademicFacultyFilterableFields)
    const options = pick(req.query, AcademicFacultySortingFields)
    const result = await AcademicFacultyService.getAllFaculty(filters,options)

    sendResponse(res,{
        statusCode:httpStatus.OK,
        success:true,
        message:"Academic Faculty data fetched!",
        meta:result.meta,
        data:result.data
    })
})

const getDataById = catchAsync(async (req:Request, res:Response)=>{
    const result = await AcademicFacultyService.getDataById(req.params.id)
    sendResponse(res,{
        statusCode:httpStatus.OK,
        success:true,
        message:"Academic Faculty data fetched!",

        data:result
    })
})

export const AcademicFacultyController ={
    insertIntoDb,
    getAllFromDb,
    getDataById
}