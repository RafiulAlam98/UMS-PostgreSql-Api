import {z} from "zod";
import {SemesterRegistrationStatus} from "@prisma/client";

const update = z.object({
    body:z.object({
        startDate:z.string().optional(),
        endDate:z.string().optional(),
        maxCredit:z.string().optional(),
        minCredit:z.string().optional(),
        status:z.enum([...Object.values(SemesterRegistrationStatus)] as [string, ...string[]],{}).optional()
    })
})

export const SemesterRegistrationValidation ={
    update
}