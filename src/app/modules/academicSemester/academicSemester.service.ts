import {AcademicSemester, Prisma} from "@prisma/client";
import {IGenericResponse} from "../../../interfaces/common";
import {paginationHelpers} from "../../../helpers/paginationHelper";
import {IPaginationOptions} from "../../../interfaces/pagination";
import {IAcademicSemesterFilterRequest} from "./academicSemester.interface";
import {AcademicSemesterSearchableFields} from "./academicSemester.constant";
import prisma from "../../../shared/prisma";



const insertIntoDb = async (academicSemesterData:AcademicSemester):Promise<AcademicSemester>=>{
    const result = await prisma.academicSemester.create({
        data:academicSemesterData
    })
    return  result
}

const getAllSemester = async (filters:IAcademicSemesterFilterRequest,options:IPaginationOptions):Promise<IGenericResponse<AcademicSemester[]>>  =>{

    const {page,limit, skip} = paginationHelpers.calculatePagination(options)
    const {searchTerm, ...filterData} = filters

    console.log(options)

    const andConditions = []

    if(Object.keys(filterData).length > 0) {
        andConditions.push({
            AND:Object.keys(filterData).map(key=>({
                [key]:{
                    equals:(filterData as any)[key]
                }
            }))
        })
    }

    if(searchTerm){
        andConditions.push({
            OR:AcademicSemesterSearchableFields.map(field =>({
                [field]:{
                    contains:searchTerm,
                    mode: 'insensitive'
                }
            }))
        })
    }

    const whereConditions: Prisma.AcademicSemesterWhereInput = andConditions.length > 0 ? {AND:andConditions}:{}

    const result = await prisma.academicSemester.findMany({
       where:whereConditions,
        skip,
        take:limit,
        orderBy:options.sortBy && options.sortOrder ? {
            [options.sortBy]:options.sortOrder
        } : {
           createdAt:'desc'
        }
    })

    const total = await prisma.academicSemester.count()
    return {
        meta:{
            total,
            page,
            limit
        },
        data:result
    }
}

export const AcademicSemesterService ={
    insertIntoDb,
    getAllSemester
}