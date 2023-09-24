

export type ICourseCreateData = {
    title:string,
    code:string,
    credits:string,
    preRequisiteCourses:{
        courseId:string
    }[]
}