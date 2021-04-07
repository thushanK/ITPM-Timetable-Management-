import React from 'react';
import Sidebar from '../../components/Sidebar';
import {Link} from 'react-router-dom';
import STD_CONTROLLER from '../../controllers/Student.Controller';
import CONFIG from '../../controllers/Config.controller';


class DeleteStudentGrp extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            academicYear: 'None',
            semester : 'None',
            group_mo: '',
            subgroup_mo: 'None',
            program:'None',
            id:'',
        };
    }

    async componentDidMount() {
        console.log("Building ID: ", this.props.match.params.id);
        
        const result = await STD_CONTROLLER.getOne(this.props.match.params.id);

        console.log("Building results: ", result.data);

        this.setState({
            academicYear: result.data.academicYear,
            program: result.data.program,
            group_mo: result.data.group_mo ,
            subgroup_mo: result.data.subgroup_mo ,
            id: result.data.id,
        })

    }

    render(){

    return (
        <div className="app" >
        <Sidebar activemenu={'STUDENT'}   submenu={'STUDENT_TB_LIST'} />
        <main>
            <div className="container-fluid" >
            <div className="row" >
                <div className="col-12 shadow-sm rounded bg-white mt-1" >
                    <h6 className="text-header py-3 mb-0 font-weight-bold line-hight-1">Delete Student Slot<br></br>
                    <span className="text-muted small">Studentslots delete confirmation</span></h6>
                </div>
                <div className="col-12 shadow-sm rounded bg-white mt-3 pb-1" >
    
                <div className="row mt-1 pb-3" >
                    <div className="col-md-12 mt-2" >
                    <h6 style={{fontSize : '0.9rem'}}
                        className="text-header text-danger mb-0 font-weight-bold line-hight-1">Are you sure you want to delete this Studentslots ?<br></br>
                    <span className="text-muted small">This process can't be undone, All the relevant details will be permanently deleted !</span></h6>
                    </div>
                    <div className="col-md-12 mt-3" >
                        <table class="table borderless customtable mb-0">
                            <thead>
                                <tr>
                                {/* <th className="font-08 text-dark2 ">TimetableID</th> */}
                                <th className="font-08 text-dark2 ">Academic Year</th>
                                <th className="font-08 text-dark2 ">Program</th>
                                <th className="font-08 text-dark2 ">group_mo</th>
                                </tr>
                            </thead>
                            <tbody>
                            <tr>
                                    {/* <td>{this.state._id}</td> */}
                                    <td>{this.state.academicYear}</td>
                                    <td>{this.state.program}</td>
                                    <td>{this.state.group_mo + "." + this.state.subgroup_mo}</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                    <div className="col-md-12 mt-1 mb-1" >
                    <hr className="my-2"></hr>
                    {/* <Link to="/student/student_tb_list" > */}
                            <button type="submit" className="btn-danger mt-2 btn btn-sm px-3 py-1" onClick={this.onDelete}>Delete</button>
                            {/* </Link> */}
                            <Link to="/student/manage" >
                            <button type="submit" id="cancelBtn" className="btn-light mt-2 btn btn-sm px-3 py-1 border mx-2">Cancel</button>
                            </Link>
                    </div>
                </div>
                </div>
            </div>
            </div>
        </main>
    </div>
    );}

    onDelete = async () => {
        const data = {
            id: this.props.match.params.id
       
        }
        const result = await STD_CONTROLLER.deleteStudent(data);
        console.log(result);

        if (result == 200)
        CONFIG.setToast("Successfully Deleted")
             else if (result == 402)
        CONFIG.showAlert2("First you have to delete sessions related to the subject")


        document.getElementById("cancelBtn").click()
       
    }
    

}


export default DeleteStudentGrp;
