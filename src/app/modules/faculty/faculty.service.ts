import prisma from "../../../shared/prisma";
import {  Facuclty, Prisma,  } from "@prisma/client";
import {IFacultyFilterRequest} from "./faculty.interface";
import {IGenericResponse} from "../../../interfaces/common";
import {paginationHelpers} from "../../../helpers/paginationHelper";
import {IPaginationOptions} from "../../../interfaces/pagination";
import {facultySearchableFields} from "./faculty.constant";

const insertIntoDB = async (data: Facuclty): Promise<Facuclty> => {
    const result = await prisma.facuclty.create({
        data,
        include: {
            academicFaculty: true,
            academicDepartment: true
        }
    });
    return result;
};

const getAllFromDB = async (
    filters: IFacultyFilterRequest,
    options: IPaginationOptions
): Promise<IGenericResponse<Facuclty[]>> => {
    const { limit, page, skip } = paginationHelpers.calculatePagination(options);
    const { searchTerm, ...filterData } = filters;

    const andConditions = [];

    if (searchTerm) {
        andConditions.push({
            OR: facultySearchableFields.map((field) => ({
                [field]: {
                    contains: searchTerm,
                    mode: 'insensitive'
                }
            }))
        });
    }

    // if (Object.keys(filterData).length > 0) {
    //     andConditions.push({
    //         AND: Object.keys(filterData).map((key) => {
    //             if (facultyRelationalFields.includes(key)) {
    //                 return {
    //                     [facultyRelationalFieldsMapper[key]]: {
    //                         id: (filterData as any)[key]
    //                     }
    //                 };
    //             } else {
    //                 return {
    //                     [key]: {
    //                         equals: (filterData as any)[key]
    //                     }
    //                 };
    //             }
    //         })
    //     });
    // }

    const whereConditions: Prisma.FacucltyWhereInput =
        andConditions.length > 0 ? { AND: andConditions } : {};

    const result = await prisma.facuclty.findMany({
        include: {
            academicFaculty: true,
            academicDepartment: true
        },
        where: whereConditions,
        skip,
        take: limit,
        orderBy:
            options.sortBy && options.sortOrder
                ? { [options.sortBy]: options.sortOrder }
                : {
                    createdAt: 'desc'
                }
    });
    const total = await prisma.facuclty.count({
        where: whereConditions
    });

    return {
        meta: {
            total,
            page,
            limit
        },
        data: result
    };
};

const getByIdFromDB = async (id: string): Promise<Facuclty | null> => {
    const result = await prisma.facuclty.findUnique({
        where: {
            id
        },
        include: {
            academicFaculty: true,
            academicDepartment: true
        }
    });
    return result;
};

export const FacultyService ={
    insertIntoDB,
    getAllFromDB,
    getByIdFromDB
}