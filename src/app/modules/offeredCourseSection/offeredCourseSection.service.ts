import {OfferedCourseSection} from "@prisma/client";
import prisma from "../../../shared/prisma";
import ApiError from "../../../errors/ApiError";
import httpStatus from "http-status";

const insertIntoDb = async (data:OfferedCourseSection):Promise<OfferedCourseSection> =>{
    const isExistOfferedCourse = await prisma.offeredCourse.findFirst({
        where:{
            id:data.offeredCourseId
        }
    })

    if(!isExistOfferedCourse){
        throw new ApiError(httpStatus.BAD_REQUEST, "Offered Course does not exists")
    }

    const result = await prisma.offeredCourseSection.create({
        data
    })
    return result
}

export const OfferedCourseSectionService ={
    insertIntoDb
}