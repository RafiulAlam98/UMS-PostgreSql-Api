import {catchAsync} from "../../../shared/catchAsync";
import {Request,Response} from "express";
import {RoomService} from "./room.service";
import sendResponse from "../../../shared/sendResponse";
import httpStatus from "http-status";


const insertIntoDb = catchAsync(async (req:Request, res:Response)=> {
    const result = await RoomService.insertIntoDb(req.body)
    sendResponse(res,{
        statusCode:httpStatus.OK,
        success:true,
        message:"Room Created Successfully",
        data:result
    })
})
export const RoomController ={
    insertIntoDb
}