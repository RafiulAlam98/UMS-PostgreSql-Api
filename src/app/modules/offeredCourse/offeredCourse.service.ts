import {ICreateOfferdCourse} from "./offeredCourse.interface";
import {OfferedCourse} from "@prisma/client";
import {asyncForEach} from "../../../shared/utils";
import prisma from "../../../shared/prisma";

const insertIntoDb = async (data:ICreateOfferdCourse):Promise<OfferedCourse[]> =>{
    const {academicDepartmentId, semesterRegistrationId, courseIds} = data

    let result:any = []
    
        await asyncForEach(courseIds, async (courseId:string)=>{

            const alreadyExists =
                await prisma.offeredCourse.findFirst({
                where:{
                    academicDepartmentId,
                    semesterRegistrationId,
                    courseId
                }
            })

            if(!alreadyExists){
                const insertOfferedCourse =
                    await prisma.offeredCourse.create({
                    data:{
                        academicDepartmentId,
                        semesterRegistrationId,
                        courseId
                    },
                    include:{
                        academicDepartment:true,
                        semesterRegistration:true,
                        course:true
                    }

                })
                result.push(insertOfferedCourse)
            }

        })


    return result

}

export const OfferedCourseService ={
    insertIntoDb
}