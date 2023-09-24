import {AcademicFaculty, Prisma} from "@prisma/client";
import {IGenericResponse} from "../../../interfaces/common";
import {paginationHelpers} from "../../../helpers/paginationHelper";
import {IPaginationOptions} from "../../../interfaces/pagination";
import prisma from "../../../shared/prisma";
import {IAcademicFacultyFilterRequest} from "./academicFaculty.interface";
import {AcademicFacultySearchableFields} from "./academicFaculty.constant";




const insertIntoDb = async (academicFacultyData:AcademicFaculty):Promise<AcademicFaculty>=>{
    const result = await prisma.academicFaculty.create({
        data:academicFacultyData
    })
    return  result
}

const getAllFaculty = async (filters:IAcademicFacultyFilterRequest,options:IPaginationOptions):Promise<IGenericResponse<AcademicFaculty[]>>  =>{

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
            OR:AcademicFacultySearchableFields.map(field =>({
                [field]:{
                    contains:searchTerm,
                    mode: 'insensitive'
                }
            }))
        })
    }

    const whereConditions: Prisma.AcademicFacultyWhereInput = andConditions.length > 0 ? {AND:andConditions}:{}

    const result = await prisma.academicFaculty.findMany({
        where:whereConditions,
        skip,
        take:limit,
        orderBy:options.sortBy && options.sortOrder ? {
            [options.sortBy]:options.sortOrder
        } : {
            createdAt:'desc'
        }
    })

    const total = await prisma.academicFaculty.count()
    return {
        meta:{
            total,
            page,
            limit
        },
        data:result
    }
}


const getDataById = async  (id:string):Promise<AcademicFaculty | null>=>{
    const result = await prisma.academicFaculty.findUnique({
        where:{
            id
        }
    })
    return result
}


export const AcademicFacultyService ={
    insertIntoDb,
    getAllFaculty,
    getDataById
}