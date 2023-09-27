import {Weekdays} from "@prisma/client";
import ApiError from "../errors/ApiError";
import httpStatus from "http-status";

export const asyncForEach = async (array:any[], callBack:any)=>{
    if(!Array.isArray(array)){
        throw new Error("Expected an array")
    }
    for(let index = 0; index < array.length; index++){
        await callBack(array[index], index,array)
    }
}

export const hasTimeConflict = (existingSlot:{
    startTime:string,
    endTime:string,
    dayOfWeek:Weekdays
    }[], newSlot:{
    startTime:string,
    endTime:string,
    dayOfWeek:Weekdays
}) =>{
    for(const slot of existingSlot){
        const existingStart = new Date(`1970-01-01T${slot.startTime}`)
        const existingEnd = new Date(`1970-01-01T${slot.endTime}`)
        const newStart = new Date(`1970-01-01T${newSlot.startTime}`)
        const newEnd = new Date(`1970-01-01T${newSlot.endTime}`)

        if(newStart < existingEnd && newEnd > existingStart){
            return true
        }
    }
    return false
}