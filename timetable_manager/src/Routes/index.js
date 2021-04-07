import Dashboard from '../Dashboard';

import AddBuilding from '../funtions/Building/AddBuilding';
import ManageBuilding from '../funtions/Building/ManageBuilding';
import DeleteBuilding from '../funtions/Building/DeleteBuilding';
import EditBuilding from '../funtions/Building/EditBuilding';
import AddRoom from '../funtions/Room/AddRoom';
import ManageRoom from '../funtions/Room/ManageRoom';
import DeleteRoom from '../funtions/Room/DeleteRoom';

import LecturerStatistics from '../funtions/Statistics/LecturerStatistics';
import StudentStatistics from '../funtions/Statistics/StudentStatistics';
import SubjectStatistics from '../funtions/Statistics/SubjectStatistics';

import AddStudent from '../funtions/Student/AddStudent';
import ManageStudent from '../funtions/Student/ManageStudent';
import AddTags from '../funtions/Tag/AddTags';
import ManageTags from '../funtions/Tag/ManageTags';

import Addworkingdays from '../funtions/working days and hours/Addworkingdays';
import Managetimeslot from '../funtions/working days and hours/Managetimeslot';
import Manageworkingdays from '../funtions/working days and hours/Manageworkingdays';


import AddSubject from '../funtions/Subjects/AddSubject';
import ManageSubject from '../funtions/Subjects/ManageSubject';
import AddLecturer from '../funtions/Lecturer/AddLecturer';
import ManageLecturer from '../funtions/Lecturer/ManageLecturer';



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
        path: "/building/manage/",
        name: "MANAGE_BUILDING",
        component: ManageBuilding,
        exact: true,
    },
    {
        path: "/locations/buildings/edit/:id",
        name: "EDIT_BUILDING",
        component: EditBuilding,
        exact: true,
    },
    {
        path: "/locations/buildings/delete/:id",
        name: "DELETE_BUILDING",
        component: DeleteBuilding,
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
        path: "/locations/rooms/delete/:id",
        name: "Delete Rooms",
        component: DeleteRoom,
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

    {
        path: "/student/add",
        name: "ADD_STUDENT",
        component: AddStudent,
        exact: true,
    },

    {
        path: "/student/manage",
        name: "MANAGE_STUDENT",
        component: ManageStudent,
        exact: true,
    },

    {
        path: "/tag/add",
        name: "ADD_TAG",
        component: AddTags,
        exact: true,
    },

    {
        path: "/tag/manage",
        name: "MANAGE_TAG",
        component: ManageTags,
        exact: true,
    },

    {
        path: "/workingday/add",
        name: "ADD_WORKING_DAY",
        component: Addworkingdays,
        exact: true,
    },

    {
        path: "/workingday/manage",
        name: "MANAGE_WORKING_DAY",
        component: Manageworkingdays,
        exact: true,
    },

    {
        path: "/timeslot/manage",
        name: "MANAGE_TIMESLOT",
        component: Managetimeslot,
        exact: true,
    },


    {
        path: "/subject/add",
        name: "ADD_SUBJECT",
        component: AddSubject,
        exact: true,
    },

    {
        path: "/subject/manage",
        name: "MANAGE_SUBJECT",
        component: ManageSubject,
        exact: true,
    },

    {
        path: "/lecturer/add",
        name: "ADD_LECTURER",
        component: AddLecturer,
        exact: true,
    },

    {
        path: "/lecturer/manage",
        name: "MANAGE_LECTURER",
        component: ManageLecturer,
        exact: true,
    },
];

export default routes;