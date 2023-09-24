import {catchAsync} from "../../../shared/catchAsync";
import {Request, Response} from "express";
import {BuildingService} from "./building.service";
import sendResponse from "../../../shared/sendResponse";
import httpStatus from "http-status";
import pick from "../../../shared/pick";

import {BuildingSearchableFields} from "./building.constant";

const insertIntoDb = catchAsync(async (req:Request, res:Response)=>{

    const result = await BuildingService.insertIntoDb(req.body)

    sendResponse(res,{
        statusCode:httpStatus.OK,
        success:true,
        message:"Building Created Successfully!",
        data:result

    })
})

const getAllFromDb = catchAsync(async (req:Request, res:Response)=>{
    const filters = pick(req.query, BuildingSearchableFields)
    const options = pick(req.query, ['limit', 'page', 'sortOrder','sortBy'])
    const result = await BuildingService.getAllFromDb(filters,options)
    sendResponse(res,{
        statusCode:httpStatus.OK,
        success:true,
        message:"Building retrieved Successfully!",
        meta:result.meta,
        data:result.data

    })
})


export const BuildingController ={
    insertIntoDb,
    getAllFromDb
}