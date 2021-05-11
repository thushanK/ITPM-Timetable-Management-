import Dashboard from '../Dashboard';

import AddBuilding from '../funtions/Building/AddBuilding';
import ManageBuilding from '../funtions/Building/ManageBuilding';
import DeleteBuilding from '../funtions/Building/DeleteBuilding';
import EditBuilding from '../funtions/Building/EditBuilding';
import AddRoom from '../funtions/Room/AddRoom';
import ManageRoom from '../funtions/Room/ManageRoom';
import DeleteRoom from '../funtions/Room/DeleteRoom';
import NotAvailable from '../funtions/Room/NotAvailable';

import LecturerStatistics from '../funtions/Statistics/LecturerStatistics';
import StudentStatistics from '../funtions/Statistics/StudentStatistics';
import SubjectStatistics from '../funtions/Statistics/SubjectStatistics';

import AddStudent from '../funtions/Student/AddStudent';
import ManageStudent from '../funtions/Student/ManageStudent';
import AddTags from '../funtions/Tag/AddTags';
import ManageTags from '../funtions/Tag/ManageTags';
import editStudentGrp from '../funtions/Student/EditStudentGrp';
import DeleteStGrp from '../funtions/Student/DeleteStudentGrp'

import EditTag from '../funtions/Tag/EditTag';
import DeleteTag from '../funtions/Tag/DeleteTag';


import Addworkingdays from '../funtions/workingDaysAndHours/AddWorkingDays';
import EditWorkingDays from '../funtions/workingDaysAndHours/EditWorkingDays';
import Manageworkingdays from '../funtions/workingDaysAndHours/ManageWorkingDays';
import DeleteWork from '../funtions/workingDaysAndHours/DeleteWorkingDays';


import AddSubject from '../funtions/Subjects/AddSubject';
import ManageSubject from '../funtions/Subjects/ManageSubject';
import EditSubject from '../funtions/Subjects/EditSubject';
import ViewSubject from '../funtions/Subjects/ViewSubject';
import AddLecturer from '../funtions/Lecturer/AddLecturer';
import ManageLecturer from '../funtions/Lecturer/ManageLecturer';
import EditLecturer from '../funtions/Lecturer/EditLecturer';
import LecturerView from '../funtions/Lecturer/ViewLecturer';

import AllocateGroup from '../funtions/Allocation/AllocateGroup';
import AllocateLecture from '../funtions/Allocation/AllocateLecture';
import AllocateSession from '../funtions/Allocation/AllocateGroup';



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
        path: "/room/notAvailable",
        name: "NOT_AVAILABLE_ROOM",
        component: NotAvailable,
        exact: true,
    },

   

    {
        path: "/allocation/group",
        name: "ALLOCATE_GROUP",
        component: AllocateGroup,
        exact: true,
    },
    {
        path: "/allocation/lecturer",
        name: "ALLOCATE_LECTURER",
        component: AllocateLecture,
        exact: true,
    },
    {
        path: "/allocation/session",
        name: "ALLOCATE_SESSION",
        component: AllocateSession,
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
        path: "/workingday/edit/:id",
        name: "ADD_WORKING_DAY",
        component: EditWorkingDays,
        exact: true,
      },



    {
        path: "/workingday/manage",
        name: "MANAGE_WORKING_DAY",
        component: Manageworkingdays,
        exact: true,
    },


    {
        path: "/workingday/delete/:id",
        name: "MANAGE_WORKING_DAY",
        component: DeleteWork,
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
        path: "/subject/edit/:id",
        name: "Subject Edit",
        component: EditSubject,
        exact : true,
    },

    {
        path: "/subject/:id",
        name: "Subject Overview",
        component: ViewSubject,
        exact : true,
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
    {
        path: "/lecturer/edit/:id",
        name: "Lecturer Edit",
        component: EditLecturer,
        exact: true,
    },


    {
        path: "/lecturer/:id",
        name: "Lecturer View",
        component: LecturerView,
        exact : true,
    },

    {
        path: "/student/editTimeTable/:id",
        name: "editTimeTable",
        component: editStudentGrp,
        exact: true,
    },

    {
        path: "/student/delete_student_slot/:id",
        name: "Delete Student Slot",
        component: DeleteStGrp,
        exact: true,
    },

    {
        path: "/tags/EditTags/:id",
        name: "EditTags",
        component: EditTag,
        exact: true,
    },

    {
        path: "/student/DeleteTag/:id",
        name: "DeleteTag",
        component: DeleteTag,
        exact: true,
    },

];

export default routes;