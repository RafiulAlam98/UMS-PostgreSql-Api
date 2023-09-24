import {Course, PrismaClient} from "@prisma/client";


const prisma = new PrismaClient()

const insertIntoDb = async (payload:Course):Promise<Course> =>{
    const result = await prisma.course.create({
        data:payload
    })
    console.log(result)
    return result
}

export const CourseService = {
    insertIntoDb
}