import Dashboard from '../Dashboard';

import AddBuilding from '../funtions/Building/AddBuilding';
import ManageBuilding from '../funtions/Building/ManageBuilding';
import AddRoom from '../funtions/Room/AddRoom';
import ManageRoom from '../funtions/Room/ManageRoom';
import LecturerStatistics from '../funtions/Statistics/LecturerStatistics';
import StudentStatistics from '../funtions/Statistics/StudentStatistics';
import SubjectStatistics from '../funtions/Statistics/SubjectStatistics';



let routes = [

  {
    path: "/",
    name: "Dashboard",
    component: Dashboard,
    exact: true,
  },
  {
    path: "/building/add",
    name: "ADD_BUILDING",
    component: AddBuilding,
    exact: true,
  },
  {
    path: "/building/manage",
    name: "MANAGE_BUILDING",
    component: ManageBuilding,
    exact: true,
  },
  {
    path: "/room/add",
    name: "ADD_ROOM",
    component: AddRoom,
    exact: true,
  },
  {
    path: "/room/manage",
    name: "MANAGE_ROOM",
    component: ManageRoom,
    exact: true,
  },
  {
    path: "/statistics/student",
    name: "STUDENT_STATISTICS",
    component: StudentStatistics,
    exact: true,
  },
  {
    path: "/statistics/lecturer",
    name: "LECTURER_STATISTICS",
    component: LecturerStatistics,
    exact: true,
  },
  {
    path: "/statistics/subject",
    name: "SUBJECT_STATISTICS",
    component: SubjectStatistics,
    exact: true,
  },

];

export default routes;
