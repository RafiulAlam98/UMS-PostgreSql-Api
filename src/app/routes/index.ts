import express from 'express';
import {AcademicSemesterRoutes} from "../modules/academicSemester/academicSemester.routes";
import {AcademicFacultyRoutes} from "../modules/academicFaculty/academicFaculty.routes";
import {AcademicDepartmentRoutes} from "../modules/acdemicDepartment/acdemicDepartment.routes";
import {FacultyRoutes} from "../modules/faculty/faculty.routes";
import {StudentRoutes} from "../modules/student/student.routes";
import {BuildingRoutes} from "../modules/building/building.routes";
import {RoomRoutes} from "../modules/room/room.routes";
import { CourseRoutes} from "../modules/course/course.routes";
import {SemesterRegistrationRoutes} from "../modules/semesterRegistration/semesterRegistration.route";
import {OfferedCourseRoutes} from "../modules/offeredCourse/offeredCourse.route";
import {OfferedCourseSectionRoutes} from "../modules/offeredCourseSection/offeredCourseSection.route";

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
  {
    path: "/building",
    route: BuildingRoutes.router
  },
  {
    path: "/room",
    route: RoomRoutes.router
  },
  {
    path: "/course",
    route: CourseRoutes.router
  },
  {
    path: "/semesterRegistration",
    route: SemesterRegistrationRoutes.router
  },
  {
    path: "/offered-course",
    route: OfferedCourseRoutes.router
  },
  {
    path: "/offered-course-section",
    route: OfferedCourseSectionRoutes.router
  },
];

moduleRoutes.forEach(route => router.use(route.path, route.route));
export default router;
