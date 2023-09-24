import express from 'express';
import {AcademicSemesterRoutes} from "../modules/academicSemester/academicSemester.routes";
import {AcademicFacultyRoutes} from "../modules/academicFaculty/academicFaculty.routes";
import {AcademicDepartmentRoutes} from "../modules/acdemicDepartment/acdemicDepartment.routes";
import {FacultyRoutes} from "../modules/faculty/faculty.routes";
import {StudentRoutes} from "../modules/student/student.routes";

const router = express.Router();

const moduleRoutes = [
  // ... routes
  {
    path: "/academic-semester",
    route: AcademicSemesterRoutes.router
  },
  {
    path: "/academic-faculty",
    route: AcademicFacultyRoutes.router
  },
  {
    path: "/academic-department",
    route: AcademicDepartmentRoutes.router
  },
  {
    path: "/faculty",
    route: FacultyRoutes.router
  },
  {
    path: "/student",
    route: StudentRoutes.router
  },
];

moduleRoutes.forEach(route => router.use(route.path, route.route));
export default router;
