import ApiError from "../../../errors/ApiError";
import httpStatus from "http-status";
import {ICourseCreateData, IPrerequisiteCourseRequest} from "./course.interface";
import prisma from "../../../shared/prisma";
import {Course} from "@prisma/client";
import {asyncForEach} from "../../../shared/utils";




const insertIntoDb = async (payload:any):Promise<any> =>{
    const {preRequisiteCourses,...courseData} = payload

    const newCourse = await prisma.$transaction(async (transactionClient)=>{
        const result = await transactionClient.course.create({
            data:courseData
        })

        if(!result){
            throw  new ApiError(httpStatus.BAD_REQUEST,"Unable To Create Course")
        }

        if (preRequisiteCourses && preRequisiteCourses.length > 0){
            for (let index =0; index< preRequisiteCourses.length ;index++){
                const createPreRequisite = await transactionClient.courseToPrerequisite.create({
                    data:{
                        courseId:result.id,
                        preRequisiteId:preRequisiteCourses[index].courseId
                    }
                })
                console.log(createPreRequisite)
            }
        }
        return result
    })

if(newCourse){
    const responseData = await  prisma.course.findUnique({
        where:{
            id:newCourse.id
        },
        include:{
            preRequisite:{
                include:{
                    preRequisite: true
                },
            },
            preRequisiteFor:{
                include: {
                    course:true
                }
            }
        }
    })
    return responseData
}

    throw  new ApiError(httpStatus.BAD_REQUEST,"Unable To Create Course")

}


const updateOneDb = async (id:string, payload:Partial<any>):Promise<Course | null > =>{
    const {preRequisiteCourses,...courseData} = payload

    await prisma.$transaction(async (transactionClient )=>{
        const result = await transactionClient.course.update({
            where:{
                id
            },
            data:courseData
        })
        if (!result){
            throw new ApiError(httpStatus.BAD_REQUEST, "Unable to update request")
        }
        if(preRequisiteCourses && preRequisiteCourses.length > 0){
            const deletePrerequisite = preRequisiteCourses.filter(
                (coursePrerequisite:any)=> coursePrerequisite.courseId && coursePrerequisite.isDeleted === true
            )
            const newPrerequisite = preRequisiteCourses.filter(
                (coursePrerequisite:any) => coursePrerequisite.courseId && !coursePrerequisite.isDeleted === true
            )
            await asyncForEach(preRequisiteCourses,
                async (preRequisiteCourse:IPrerequisiteCourseRequest)=>{
                    await transactionClient.courseToPrerequisite.deleteMany({
                        where:{
                            AND:[
                                {
                                    courseId:id
                                },
                                {
                                    preRequisiteId:preRequisiteCourse.courseId
                                }
                            ]
                        }
                    })
                })



            for(let  index=0; index < newPrerequisite.length; index++){
                await transactionClient.courseToPrerequisite.create({
                    data:{
                        courseId:id,
                        preRequisiteId:newPrerequisite[index].courseId
                    }
                })
            }
        }

        return result
    })

    const responseData = await  prisma.course.findUnique({
        where:{
            id:id
        },
        include:{
            preRequisite:{
                include:{
                    preRequisite: true
                },
            },
            preRequisiteFor:{
                include: {
                    course:true
                }
            }
        }
    })
    return responseData

}

export const CourseService = {
    insertIntoDb,
    updateOneDb
}