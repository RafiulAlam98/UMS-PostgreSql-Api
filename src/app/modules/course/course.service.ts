import ApiError from "../../../errors/ApiError";
import httpStatus from "http-status";
import { IPrerequisiteCourseRequest} from "./course.interface";
import prisma from "../../../shared/prisma";
import {Course, CourseFaculty} from "@prisma/client";
import {asyncForEach} from "../../../shared/utils";




const insertIntoDb = async (
    payload:any):Promise<any> =>{
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


const updateOneDb = async (
    id:string,
    payload:Partial<any>):Promise<Course | null > =>{
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

const assignFaculties = async (
    id:string,
    payload:string[]
):Promise<CourseFaculty[]>=>{
    await prisma.courseFaculty.createMany({
        data: payload.map((facultyId)=>({
            courseId:id,
            facultyId
        }))
    })

    const assignFaculties = await prisma.courseFaculty.findMany({
        where:{
            courseId:id
        },
        include:{
            faculty:true
        }
    })
    return assignFaculties
}


const removeFaculties = async (
    id:string,
    payload:string[]
):Promise<CourseFaculty[] | null> =>{
    await prisma.courseFaculty.deleteMany({
        where:{
            courseId:id,
            facultyId: {
                in:payload
            }
        }
    })
    const assignFaculties = await prisma.courseFaculty.findMany({
        where:{
            courseId:id
        },
        include:{
            faculty:true
        }
    })
    return assignFaculties
}


export const CourseService = {
    insertIntoDb,
    updateOneDb,
    assignFaculties,
    removeFaculties
}