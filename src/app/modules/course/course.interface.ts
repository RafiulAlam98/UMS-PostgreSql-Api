

export type ICourseCreateData = {
    title:string,
    code:string,
    credits:string,
    preRequisiteCourses:IPrerequisiteCourseRequest[]
}

export type IPrerequisiteCourseRequest = {
    courseId:string,
    isDeleted?:null
}