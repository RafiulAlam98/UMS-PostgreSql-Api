import {Building, Prisma} from "@prisma/client";
import prisma from "../../../shared/prisma";
import {IBuildingFilterRequest} from "./building.ineterface";
import {IPaginationOptions} from "../../../interfaces/pagination";
import {paginationHelpers} from "../../../helpers/paginationHelper";
import {BuildingSearchableFields} from "./building.constant";
import {IGenericResponse} from "../../../interfaces/common";

const insertIntoDb = async (data:Building):Promise<Building>=>{
    console.log(data)
    const result = await  prisma.building.create({
        data
    })
    return result
}

const getAllFromDb = async (filters:IBuildingFilterRequest,
                            options:IPaginationOptions)
                            :Promise<IGenericResponse<Building[]>> =>{
    const {page,limit, skip} =
        paginationHelpers.calculatePagination(options)
    const {searchTerm} = filters
    const andConditions = []

    if(searchTerm){
        andConditions.push({
            OR:BuildingSearchableFields.map(field =>({
                [field]:{
                    contains:searchTerm,
                    mode: 'insensitive'
                }
            }))
        })
    }
    const whereConditions: Prisma.BuildingWhereInput =
        andConditions.length > 0 ? {AND:andConditions}:{}
    const result = await prisma.building.findMany({
        skip,
        take:limit,
        where:whereConditions,
        orderBy:options.sortBy && options.sortOrder ? {
            [options.sortBy]:options.sortOrder
        } : {
            createdAt:'desc'
        }
    })
    const total = await prisma.building.count()
    return {
        meta:{
            total,
            page,
            limit
        },
        data:result
    }
}

export const BuildingService ={
    insertIntoDb,
    getAllFromDb
}