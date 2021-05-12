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
// import ManageTags from '../funtions/Tag/ManageTags';
import editStudentGrp from '../funtions/Student/EditStudentGrp';
import DeleteStGrp from '../funtions/Student/DeleteStudentGrp'

import EditTag from '../funtions/Tag/EditTag';
import DeleteTag from '../funtions/Tag/DeleteTag';


import Addworkingdays from '../funtions/workingDaysAndHours/AddWorkingDays';
import EditWorkingDays from '../funtions/workingDaysAndHours/EditWorkingDays';
import Manageworkingdays from '../funtions/workingDaysAndHours/ManageWorkingDays';
import DeleteWork from '../funtions/workingDaysAndHours/DeleteWorkingDays';
import TimeslotsList from '../funtions/workingDaysAndHours/TimeslotsList';
import EditTimeslot from '../funtions/workingDaysAndHours/EditTimeslot';
import DeleteTimeslot from '../funtions/workingDaysAndHours/DeleteTimeslot';
import AddTimeslot from '../funtions/workingDaysAndHours/AddTimeslot';


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
import AllocateSession from '../funtions/Allocation/AllocateSession';
import AllocateSubGroup from '../funtions/Allocation/AllocateSubGroup';

import AddSession from '../funtions/Sessions/AddSession';
import ManageSession from '../funtions/Sessions/ManageSession';
import AddConsecutiveSession from '../funtions/Sessions/ConsecutiveSession/AddConsecutiveSession';
import ManageConsecutiveSession from '../funtions/Sessions/ConsecutiveSession/ManageConsecutiveSession';
import AddNotOverlapSession from '../funtions/Sessions/NotOverlapSession/AddNotOverlapSession';
import ManageNotOverlapSession from '../funtions/Sessions/NotOverlapSession/ManageNotOverlapSession';
import AddParallelSession from '../funtions/Sessions/ParallelSession/AddParallelSession';
import ManageParallelSession from '../funtions/Sessions/ParallelSession/ManageParallelSession';
import DeleteConSessions from '../funtions/Sessions/ConsecutiveSession/DeleteConSessions';

import ConsecutiveSession from '../funtions/Suitable/ConsecutiveSession';
import RoomsForLecturer from '../funtions/Suitable/RoomsForLecturer';
import RoomsForSession from '../funtions/Suitable/RoomsForSession';
import RoomsForSubGroup from '../funtions/Suitable/RoomsForSubGroup';
import RoomsForSubject from '../funtions/Suitable/RoomsForSubject';
import RoomsForTag from '../funtions/Suitable/RoomsForTag';



let routes = [

    {
        path: "/",
        name: "Dashboard",
        component: Dashboard,
        exact: true,
    },


    {
        path: "/suitable/consecutive",
        name: "CONSECUTIVE",
        component: ConsecutiveSession,
        exact: true,
    },
    {
        path: "/suitable/rooms4lecturer",
        name: "ROOMS_FOR_LECTURER",
        component: RoomsForLecturer,
        exact: true,
    },
    {
        path: "/suitable/rooms4session",
        name: "ROOM_FOR_SESSION",
        component: RoomsForSession,
        exact: true,
    },
    {
        path: "/suitable/rooms4subgroup",
        name: "ROOM_FOR_SUB_GROUP",
        component: RoomsForSubGroup,
        exact: true,
    },
    {
        path: "/suitable/rooms4subject",
        name: "ROOM_FOR_SUBJECT",
        component: RoomsForSubject,
        exact: true,
    },
    {
        path: "/suitable/rooms4tag",
        name: "ROOM_FOR_TAG",
        component: RoomsForTag,
        exact: true,
    },




    {
        path: "/sessions/add",
        name: "ADD_SESSIONS",
        component: AddSession,
        exact: true,
    },
    {
        path: "/sessions/manage",
        name: "MANAGE_SESSIONS",
        component: ManageSession,
        exact: true,
    },
    {
        path: "/consecutive/add",
        name: "ADD_CONSECUTIVE",
        component: AddConsecutiveSession,
        exact: true,
    },
    {
        path: "/consecutive/manage",
        name: "MANAGE_CONSECUTIVE",
        component: ManageConsecutiveSession,
        exact: true,
    },
    {
        path: "/parallel/add",
        name: "ADD_PARALLEL",
        component: AddNotOverlapSession,
        exact: true,
    },
    {
        path: "/parallel/manage",
        name: "MANAGE_PARALLEL",
        component: ManageNotOverlapSession,
        exact: true,
    },
    {
        path: "/notOverlap/add",
        name: "ADD_NOT_OVERLAP",
        component: AddParallelSession,
        exact: true,
    },
    {
        path: "/notOverlap/manage",
        name: "MANAGE_NOT_OVERLAP",
        component: ManageParallelSession,
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

    // {
    //     path: "/tag/manage",
    //     name: "MANAGE_TAG",
    //     component: ManageTags,
    //     exact: true,
    // },

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
    //timeslots

    {
        path: "/timeslot/manage/add/:id",
        name: "Add Timeslot",
        component: AddTimeslot,
        exact: true,
      },
      {
        path: "/workingdays/timeslot/edit/:id",
        name: "Add Timeslot",
        component: EditTimeslot,
        exact: true,
      },
      {
        path: "/workingdays/timeslot/delete/:id",
        name: "Delete Timeslot",
        component: DeleteTimeslot,
        exact: true,
      },
      {
        path: "/workingdays/timeslot/:id",
        name: "TimeSlot",
        component: TimeslotsList,
        exact: true,
      },

      //allocate
  {
    path: "/allocate/AllocateLecture",
    name: "AllocateLecture",
    component: AllocateLecture,
    exact: true,
  },
  {
    path: "/allocate/AllocateSession",
    name: "AllocateSession",
    component: AllocateSession,
    exact: true,
  },
  {
    path: "/allocate/AllocateGroup",
    name: "AllocateGroup",
    component: AllocateGroup,
    exact: true,
  },
  {
    path: "/allocate/AllocateSubGroup",
    name: "AllocateSubGroup",
    component: AllocateSubGroup,
    exact: true,
  },

    {
        path: "/Sessions/ConsecutiveSession/DeleteConSessions/:id",
        name: "Delete consecutive Sessions",
        component: DeleteConSessions,
        exact : true,
      },

];

export default routes;