import {ICreateOfferdCourse} from "./offeredCourse.interface";
import {OfferedCourse} from "@prisma/client";
import {asyncForEach} from "../../../shared/utils";
import prisma from "../../../shared/prisma";

const insertIntoDb = async (data:ICreateOfferdCourse):Promise<OfferedCourse[]> =>{
    const {academicDepartmentId, semesterRegistrationId, courseIds} = data

    const result:any = []

    await asyncForEach(courseIds, async (courseId:string)=>{
        const insertOfferedCourse = await prisma.offeredCourse.create({
            data:{
                academicDepartmentId,
                semesterRegistrationId,
                courseId
            }

        })
    result.push(insertOfferedCourse)
    })
    return result

}

export const OfferedCourseService ={
    insertIntoDb
}