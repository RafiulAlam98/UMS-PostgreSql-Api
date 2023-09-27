import prisma from "../../../shared/prisma";

import {hasTimeConflict} from "../../../shared/utils";
import ApiError from "../../../errors/ApiError";
import httpStatus from "http-status";
import {OfferedCourseClassSchedule} from "@prisma/client";

export const checkRoomAvailable = async(data:OfferedCourseClassSchedule) =>{
    const alreadyBookedRoomOnDay = await prisma.offeredCourseClassSchedule.findMany({
        where:{
            dayOfWeek:data.dayOfWeek,
            room:{
                id:data.roomId
            }
        }
    })


    const existingSlot = alreadyBookedRoomOnDay.map((schedule)=>({
        startTime:schedule.startTime,
        endTime:schedule.endTime,
        dayOfWeek:schedule.dayOfWeek
    }))

    const newSlot = {
        startTime:data.startTime,
        endTime:data.endTime,
        dayOfWeek:data.dayOfWeek
    }

    if(hasTimeConflict(existingSlot,newSlot)){
        throw new ApiError(httpStatus.CONFLICT, "Room is Already Booked")
    }
}

export const OfferedCourseClassScheduleUtils={
    checkRoomAvailable
}