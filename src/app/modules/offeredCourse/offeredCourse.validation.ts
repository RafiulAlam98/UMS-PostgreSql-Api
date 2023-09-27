import {z} from "zod";

const create = z.object({
    body:z.object({
        academicDepartmentId:z.string({
            required_error:"Academic Department Id is required"
        }),
        semesterRegistration:z.string({
            required_error:"Semester Registration Id is required"
        }),
        courseIds:z.array(z.string({
            required_error:"Course Id is Required"
        }),
            {
                required_error:"Course Ids Are Required"
            })
    })
})

export const OfferedCourseValidation ={
    create
}