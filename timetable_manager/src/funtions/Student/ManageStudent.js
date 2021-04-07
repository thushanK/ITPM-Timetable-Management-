import React from 'react';
import Sidebar from '../../components/Sidebar';
import {Link} from 'react-router-dom'
import STD_CONTROLLER from '../../controllers/Student.Controller';

class ManageStudent extends React.Component {

    constructor(props){
        super(props);
        this.state = {
            studentList: [],
        }
    }
    
    async componentDidMount() {
        const res = await STD_CONTROLLER.getAllStudent();
        
        this.setState({
            studentList: res.data
        });
    }

  render(){
    const {studentList} = this.state;

  return (
    <div className="app" >
    <Sidebar activemenu={'STUDENT'}   submenu={'STUDENT_TB_LIST'} />
    <main>
        <div className="container-fluid" >
        <div className="row" >
            <div className="col-12 shadow-sm rounded bg-white mt-1" >
                <h6 className="text-header py-3 mb-0 font-weight-bold line-hight-1">Student Group<br></br>
                <span className="text-muted small">Dashboard</span></h6>
            </div>
            <div className="col-12 shadow-sm rounded bg-white mt-3" >
            <div class="row">
                <div class="col-8">
                    <h6 className="text-header py-3 mb-0 font-weight-bold line-hight-1">Add new Academic year, Group, Subgroup, Program<br></br>
                    <span className="text-muted small">you can add Student group slot</span></h6>
                </div>
                <div class="col-4">
                    <center>
                    <Link to="/student/add_timetable" >
                    <span  className="badge badge-info px-5 py-1 mt-4 bg-white border border-info text-info click ">Add Student Slot</span>
                    </Link>
                    </center>
                </div>
            </div>
               
            </div>
            <div className="col-12 shadow-sm rounded bg-white mt-3" >
                <table class="table borderless customtable">
                    <thead>
                        <tr>
                        <th className="font-08 text-dark2 ">GroupID</th>
                        <th className="font-08 text-dark2 ">Academic Year</th>
                        <th className="font-08 text-dark2 ">Program</th>
                        <th className="font-08 text-dark2 ">Group</th>
                        <th className="font-08 text-dark2 ">SubGroupID</th>
                        <th className="font-08 text-dark2 ">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                    {studentList && studentList.map((name, index) => this.renderTable(name, index))}
                        {/* <tr>
                            <td>WE001</td>
                            <td>Y3S2</td>
                            <td>SE</td>
                            <td>8.2</td>
                            <td>Labs, Lecture, Tutorial</td>
                            <td>
                            <Link to="/student/editTimeTable" >
                                <span className="badge badge-info rounded-0 bg-white text-success border border-info click font-weight-bold ">Edit</span>
                                </Link>
                                <Link to="/student/delete_student_slot" >
                                    <span className="badge badge-info rounded-0 bg-white text-danger border border-danger click font-weight-bold ">Delete</span>
                                </Link>
                            </td>
                        </tr> */}
                    </tbody>
                </table>
            </div>
        </div>
        </div>
    </main>
  </div>
  );}

  renderTable = (item, i) => {
  return (
                      <tr key={item._id}>
                          <td>S{("0" + ( i + 1) ).slice(-2)}</td>
                          <td>{item.academicYear}.{item.semester}</td>
                          <td>{item.program}</td>
                          <td>{item.group_mo}.{item.subgroup_mo}</td>
                          <td>{item.subgroup_ID}</td>
                          <td>
                              <Link to={"/student/editTimeTable/"  + item._id}><span className="badge badge-info rounded-0 bg-white text-success border border-secondary click font-weight-bold ">Edit</span></Link>
                          <Link to={"/student/delete_student_slot/" + item._id}><span className="badge badge-info rounded-0 bg-white text-danger border border-secondary click font-weight-bold ml-2">Delete</span></Link>
                          </td>
                      </tr>
  )
}

}

export default ManageStudent;
