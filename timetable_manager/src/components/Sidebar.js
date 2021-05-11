import React from 'react';
import { ProSidebar, Menu, MenuItem, SubMenu , SidebarHeader , SidebarContent , SidebarFooter } from 'react-pro-sidebar';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTable , faPlusSquare , faAddressBook, faAtom, faTachometerAlt, faGlobe, faHome, faChalkboard, faAd, faChartBar, faCheckSquare, faRecycle } from '@fortawesome/free-solid-svg-icons'
import {Link} from 'react-router-dom'

const Sidebar = ({activemenu, submenu}) => {
  return (
    <ProSidebar  breakPoint={'md'}> 
     <SidebarContent>
    <Menu iconShape="round">

      <MenuItem 
        active={activemenu === 'DASHBOARD'} 
        icon={<FontAwesomeIcon icon={faTachometerAlt} />}>
          Dashboard<Link to="/dashboard" />
      </MenuItem>

      {/* Student member 1 */}
      <SubMenu  defaultOpen={activemenu === 'STUDENT'} title="Student" icon={<FontAwesomeIcon icon={faTable} />}>
        <MenuItem 
            active={submenu === 'ADD_STUDENT'} >Add Student<Link to="/student/add" />
        </MenuItem>
        <MenuItem active={submenu === 'MANAGE_STUDENT'}>
          Manage Student<Link to="/student/manage" />
        </MenuItem>
      </SubMenu>

      {/* Tag member 1 */}
      <SubMenu  defaultOpen={activemenu === 'TAG'} title="Tag" icon={<FontAwesomeIcon icon={faAd} />}>
        <MenuItem 
            active={submenu === 'ADD_TAG'} >Add Tag<Link to="/tag/add" />
        </MenuItem>
        {/* <MenuItem active={submenu === 'MANAGE_TAG'}>
          <Link to="/tag/manage" />
        </MenuItem> */}
      </SubMenu>


      {/* Lecturer member 2 */}
      <SubMenu  defaultOpen={activemenu === 'LECTURER'} title="Lecturer" icon={<FontAwesomeIcon icon={faAd} />}>
        <MenuItem 
            active={submenu === 'ADD_LECTURER'} >Add Lecture<Link to="/lecturer/add" />
        </MenuItem>
        <MenuItem active={submenu === 'MANAGE_LECTURER'}>
          Manage Lecturer<Link to="/lecturer/manage" />
        </MenuItem>
      </SubMenu>

      {/* Subject member 02 */}
      <SubMenu  defaultOpen={activemenu === 'SUBJECT'} title="Subject" icon={<FontAwesomeIcon icon={faAd} />}>
        <MenuItem 
            active={submenu === 'ADD_SUBJECT'} >Add Subject<Link to="/subject/add" />
        </MenuItem>
        <MenuItem active={submenu === 'MANAGE_SUBJECT'}>
          Manage Subject<Link to="/subject/manage" />
        </MenuItem>
      </SubMenu>

      {/* Working day member 03 */}
      <SubMenu  defaultOpen={activemenu === 'WORKING_DAY'} title="Working day" icon={<FontAwesomeIcon icon={faAd} />}>
        <MenuItem 
            active={submenu === 'ADD_WORKING_DAY'} >Add Working day<Link to="/workingday/add" />
        </MenuItem>
        <MenuItem active={submenu === 'MANAGE_WORKING_DAY'}>
          Manage Working day<Link to="/workingday/manage" />
        </MenuItem>
        <MenuItem active={submenu === 'MANAGE_TIMESLOT'}>
          Manage Timeslot<Link to="/timeslot/manage" />
        </MenuItem>
      </SubMenu>


      {/* Building member 04 */}
      <SubMenu  defaultOpen={activemenu === 'LOCATION'} title="Location" icon={<FontAwesomeIcon icon={faAd} />}>
      <SubMenu  defaultOpen={activemenu === 'BUILDING'} title="Building" icon={<FontAwesomeIcon icon={faAd} />}>
        <MenuItem 
            active={submenu === 'ADD_BUILDING'} >Add Building<Link to="/building/add" />
        </MenuItem>
        <MenuItem active={submenu === 'MANAGE_BUILDING'}>
          Manage Building<Link to="/building/manage" />
        </MenuItem>
      </SubMenu>
      <SubMenu  defaultOpen={activemenu === 'ROOM'} title="Room" icon={<FontAwesomeIcon icon={faAd} />}>
        <MenuItem 
            active={submenu === 'ADD_ROOM'} >Add Room<Link to="/room/add" />
        </MenuItem>
        <MenuItem active={submenu === 'MANAGE_ROOM'}>
          Manage Room<Link to="/room/manage" />
        </MenuItem>
        <MenuItem active={submenu === 'NOT_AVAILABLE_ROOM'}>
        Not Available times<Link to="/room/notAvailable" />
        </MenuItem>
      </SubMenu>
      </SubMenu>
      {/* Room member 04 */}


      {/* Statistics member 04 */}
      <SubMenu  defaultOpen={activemenu === 'STATISTICS'} title="Statistics" icon={<FontAwesomeIcon icon={faAd} />}>
        <MenuItem 
            active={submenu === 'STUDENT_STATISTICS'} >Student<Link to="/statistics/student" />
        </MenuItem>
        <MenuItem active={submenu === 'LECTURER_STATISTICS'}>
          Lecturer<Link to="/statistics/lecturer" />
        </MenuItem>
        <MenuItem active={submenu === 'SUBJECT_STATISTICS'}>
          Subject<Link to="/statistics/subject" />
        </MenuItem>
      </SubMenu>

      <SubMenu  defaultOpen={activemenu === 'ALLOCATIONS'} title="Allocations" icon={<FontAwesomeIcon icon={faAd} />}>
        <MenuItem 
            active={submenu === 'ALLOCATE_GROUP'} >Allocate Group<Link to="/allocation/group" />
        </MenuItem>
        <MenuItem active={submenu === 'ALLOCATE_LECTURER'}>
          Allocate Lecture<Link to="/allocation/lecturer" />
        </MenuItem>
        <MenuItem active={submenu === 'ALLOCATE_SESSION'}>
          Allocate Session<Link to="/allocation/session" />
        </MenuItem>
      </SubMenu>


      <SubMenu  defaultOpen={activemenu === 'SESSIONS'} title="Sessions" icon={<FontAwesomeIcon icon={faAd} />}>
        <MenuItem 
            active={submenu === 'ADD_SESSIONS'} >Add Sessions<Link to="/sessions/add" />
        </MenuItem>
        <MenuItem active={submenu === 'MANAGE_SESSIONS'}>
          Manage Sessions<Link to="/sessions/manage" />
        </MenuItem>
        {/* consecutive */}
        <SubMenu  defaultOpen={activemenu === 'CONSECUTIVE_SESSIONS'} title="Consecutive Sessions" icon={<FontAwesomeIcon icon={faAd} />}>
        <MenuItem 
            active={submenu === 'ADD_CONSECUTIVE'} >Add Consecutive<Link to="/consecutive/add" />
        </MenuItem>
        <MenuItem active={submenu === 'MANAGE_CONSECUTIVE'}>
          Manage Consecutive<Link to="/consecutive/manage" />
        </MenuItem>
        </SubMenu>
        {/* Parallel */}
        <SubMenu  defaultOpen={activemenu === 'PARALLEL_SESSIONS'} title="Parallel Sessions" icon={<FontAwesomeIcon icon={faAd} />}>
        <MenuItem 
            active={submenu === 'ADD_PARALLEL'} >Add Parallel<Link to="/parallel/add" />
        </MenuItem>
        <MenuItem active={submenu === 'MANAGE_PARALLEL'}>
          Manage Parallel<Link to="/parallel/manage" />
        </MenuItem>
        </SubMenu>
        {/* Not Overlap Sessions */}
        <SubMenu  defaultOpen={activemenu === 'NOT_OVERLAP_SESSIONS'} title="Not Overlap" icon={<FontAwesomeIcon icon={faAd} />}>
        <MenuItem 
            active={submenu === 'ADD_NOT_OVERLAP'} >Add Not Overlap<Link to="/notOverlap/add" />
        </MenuItem>
        <MenuItem active={submenu === 'MANAGE_NOT_OVERLAP'}>
          Manage Not Overlap<Link to="/notOverlap/manage" />
        </MenuItem>
        </SubMenu>
      
      </SubMenu>

    </Menu>
    </SidebarContent>
  </ProSidebar>
  );
}

export default Sidebar;
