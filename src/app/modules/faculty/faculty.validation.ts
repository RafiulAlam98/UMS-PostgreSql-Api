import {z} from "zod"

const create = z.object({
    body:z.object({
        facultyId:z.string({
            required_error:"Faculty Id is required"
        }),
        firstName:z.string({
            required_error:"First Name is required"
        }),
        lastName:z.string({
            required_error:"Last Name is required"
        }),
        middleName:z.string({
            required_error:"Middle Name is required"
        }),
        profileImage:z.string({
            required_error:"Profile Image is required"
        }),
        email:z.string({
            required_error:"Email Image is required"
        }),
        contactNo:z.string({
            required_error:"Contact No is required"
        }),
        gender:z.string({
            required_error:"Gender is required"
        }),
        bloodGroup:z.string({
            required_error:"Blood Group is required"
        }),
        designation:z.string({
            required_error:"Designation is required"
        }),
        academicDepartmentId: z.string({
            required_error: 'Academic department is required'
        }),
        academicFacultyId: z.string({
            required_error: 'Academic faculty is required'
        })
    })
})

export const FacultyValidation ={
    create
}