import {z} from "zod";

const assignOrRemoveFaculty = z.object({
    body:z.object({
        faculties:z.array(z.string(),{
            required_error:"Courses Are Required"
        })
    })
})

export const CourseValidation = {
    assignOrRemoveFaculty
}