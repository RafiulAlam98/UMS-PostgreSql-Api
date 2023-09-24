import { PrismaClient} from "@prisma/client";
import ApiError from "../../../errors/ApiError";
import httpStatus from "http-status";
import {ICourseCreateData} from "./course.interface";


const prisma = new PrismaClient()

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

export const CourseService = {
    insertIntoDb
}