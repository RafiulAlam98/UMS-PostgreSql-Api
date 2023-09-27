import {SemesterRegistration, SemesterRegistrationStatus} from "@prisma/client";
import prisma from "../../../shared/prisma";
import ApiError from "../../../errors/ApiError";
import httpStatus from "http-status";

const insertIntoDb = async (data:SemesterRegistration):Promise<SemesterRegistration> =>{
    const isAnySemRegUpcomingOrOngoing = await prisma.semesterRegistration.findFirst({
        where:{
            OR:[
                {
                    status:SemesterRegistrationStatus.UPCOMING
                },
                {
                    status:SemesterRegistrationStatus.ONGOING
                }
            ]
        }
    })

    if(isAnySemRegUpcomingOrOngoing){
        throw  new ApiError(httpStatus.BAD_REQUEST,
            "Registration is Ongoing or upcoming")
    }

    const result = await prisma.semesterRegistration.create({
        data
    })
    return result
}



const updateOneDb = async (
    id:string,
    payload:Partial<SemesterRegistration>):Promise<SemesterRegistration> => {

    const isExists = await prisma.semesterRegistration.findUnique({
        where:{
            id
        }
    })

    if(!isExists){
        throw new ApiError(httpStatus.BAD_REQUEST, "Data Not Found")
    }

    if(isExists.status &&
        isExists.status === SemesterRegistrationStatus.UPCOMING &&
        payload.status !== SemesterRegistrationStatus.ONGOING){
        throw new ApiError(httpStatus.BAD_REQUEST, "Can Only Update Upcoming to Ongoing")
    }

    if(isExists.status &&
        isExists.status === SemesterRegistrationStatus.ONGOING &&
        payload.status !== SemesterRegistrationStatus.ENDED){
        throw new ApiError(httpStatus.BAD_REQUEST, "Can Only Update Ongoing to Ended")
    }

    const result = await prisma.semesterRegistration.update({
        where:{
            id,
        },data:payload,
        include:{
            academicSemester:true
        }
    })
    return result
}

export const SemesterRegistrationService = {
    insertIntoDb,
    updateOneDb
}