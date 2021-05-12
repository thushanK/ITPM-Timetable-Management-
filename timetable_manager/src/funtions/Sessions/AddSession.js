import React from 'react';
import Sidebar from '../../Components/Sidebar'
import { FormInput, FormSelect, MultiFormSelect, FormInputReadOnly } from '../../Components/Form'
import moment from 'moment';
import { omit } from 'lodash'
import { FilePond, registerPlugin } from 'react-filepond';

import { withRouter } from "react-router-dom";

import 'filepond/dist/filepond.min.css';

import SUB_CONTROLLER from '../Controllers/Subject.Controller'
import CONFIG from '../../controllers/Config.Controller'
import SESSION from '../../controllers/Session.Controller'



class AddSessions extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            lecturer : '',
            tag : '',
            subject : '',
            group : '',
            no_of_students : 0 ,
            duration : '',
            allDetails:[],
            errors: {
                lecturer: false,
                tag: false,
                subject: false,
                group: false,
                no_of_students: false,
                duration: false,
            }
        };
    }

    componentDidMount(){
        this.loadData() 
    }

    formValueChange = (e) => {
        this.setState({ [e.target.name]: e.target.value });
        this.is_filled(e.target.name, e.target.value);
    }

    onFormSubmit =async (e) => {
        e.preventDefault();
        
        if(this.validate() ) {

        var data = {
            lecturer: this.state.lecturer,
            tag: this.state.tag,
            subject: this.state.subject,
            group: this.state.group,
            no_of_students: this.state.no_of_students,
            duration: this.state.duration,
        }

        console.log(data);
        const result = await SESSION.add_sessions(data)

        console.log(result);

        if(result == 201){
            CONFIG.setToast("Successfully Added")
            
            // this.props.history.push("/sessions/overview")
        }
        else{
            CONFIG.setErrorToast("Something went wrong")
        }
        }
    }


    loadData = async  () => {
        const results = await SESSION.get_all_details() 
        this.setState({
            allDetails : results
        })  
    }   

    render() {
        const { errors } = this.state;
        return (
            <div className="app" >
                <Sidebar activemenu={'SUBJECT'} submenu={'ADD_SUBJECT'} />
                <main>
                    <div className="container-fluid" >
                        <div className="row" >
                            <div className="col-12 shadow-sm rounded bg-white mt-1" >
                                <h6 className="text-header py-3 mb-0 font-weight-bold line-hight-1">Add Sessions<br></br>
                                    <span className="text-muted small">You can add new sessions</span></h6>
                            </div>
                            <div className="col-12 shadow-sm rounded bg-white mt-3 pb-1" >
                                <form onSubmit={(e) => this.onFormSubmit(e)}>
                                    <div className="row" >
                                        <div className="col-md-8 row ">

                                        <div className="col-md-12 mt-2 mb-1">
                                            <p className="m-0 p-0">Session Deatils</p>
                                            <hr className="mt-0 pt-0" />
                                        </div>
                                            <div className="col-md-12 mt-2 mb-2   " >
                                                <FormSelect
                                                    label={'Lecturer'}
                                                    options={this.setLecturers()}
                                                    error={errors.lecturer}
                                                    selected={this.state.lecturer}
                                                    onChange={this.formValueChange}
                                                    name="lecturer"
                                                    error_meesage={'*Lecturer is required !'}
                                                />
                                            </div>

                                            <div className="col-md-12 mt-2 mb-2 " >
                                                <FormSelect
                                                    label={'Tags'}
                                                    options={this.setTags()}
                                                    error={errors.tag}
                                                    selected={this.state.tag}
                                                    onChange={this.formValueChange}
                                                    name="tag"
                                                    error_meesage={'*Tag is required'}
                                                />
                                            </div>
                                            <div className="col-md-12 mt-2 mb-2 " >
                                                <FormSelect
                                                    label={'Subjects'}
                                                    options={this.setSubjects()}
                                                    error={errors.subject}
                                                    selected={this.state.subject}
                                                    onChange={this.formValueChange}
                                                    name="subject"
                                                    error_meesage={'*Subject is required'}
                                                />
                                            </div>
                                            <div className="col-md-12 mt-2 mb-2 " >
                                                <FormSelect
                                                    label={'Group / Sub-Group'}
                                                    options={this.setGroups()}
                                                    error={errors.group}
                                                    selected={this.state.group}
                                                    onChange={this.formValueChange}
                                                    name="group"
                                                    error_meesage={'*Group is required'}
                                                />
                                            </div>

                                        </div>
                                        <div className="col-md-4 row">
                                            <div className="col-md-12 mt-2 mb-1">
                                                <p className="m-0 p-0">Other Details</p>
                                                <hr className="mt-0 pt-0 mb-4 pb-1" />
                                                <FormInput 
                                                    label={'Number of students '}
                                                    placeholder={'Enter Number of students'}
                                                    error={errors.no_of_students}
                                                    value={this.state.no_of_students}
                                                    name="no_of_students"
                                                    onChange={this.formValueChange}
                                                    error_meesage={'*Number of students required'}
                                                />
                                                
                                                <FormSelect
                                                    label={'Duration for the session'}
                                                    placeholder={'Duration for the session'}
                                                    error={errors.duration}
                                                    options={HOUR}
                                                    value={this.state.duration}
                                                    name="duration"
                                                    onChange={this.formValueChange}
                                                    error_meesage={'*Duration for the session  required'}
                                                />

                                              
                                            </div>
                                            <div className="col-md-12 mt-2 " >
                                            
                                            </div>
                                            
                                           

                                           
                                            
                                        </div>
                                        <div className="col-md-12 mt-1 mb-1" >
                                            <button type="submit" className="btn-outline-success mt-2 btn btn-sm px-2 float-left">Add Sessions</button>
                                        </div>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </main>
            </div>
        );
    }

    validate = () => {
        let {
            lecturer,
            tag ,
            subject ,
            group ,
            no_of_students,
            duration 

        } = this.state;
        let count = 0;
        let errors = {}

        if (lecturer.length == 0) {
            errors.lecturer = true
            count++
        } else {
            errors.lecturer = false
        }

        if (tag.length == 0) {
            errors.tag = true
            count++
        } else {
            errors.tag = false
        }
        if (subject.length == 0) {
            errors.subject = true
            count++
        } else {
            errors.subject = false
        }
        if (group.length == 0) {
            errors.group = true
            count++
        } else {
            errors.group = false
        }

        if (no_of_students <=  0) {
            errors.no_of_students = true
            count++
        } else {
            errors.no_of_students = false
        }

        if (duration.length == 0) {
            errors.duration = true
            count++
        } else {
            errors.duration = false
        }
        this.setState({ errors })
        return count == 0;
    }

    is_filled = (name, value) => {
        let result = (value.length == 0 || value == 'NONE')
        this.setState({ errors: { ...this.state.errors, [name]: result } })
    }

    setLecturers = () => {
        const {allDetails} = this.state;
        let lecturers = allDetails && allDetails.lecturers ? allDetails.lecturers : []
        return [{ label : 'Select Lecturer' ,value : "" } , 
        ...lecturers.map( i => {
            return{
                label :  i.name  ,
                value : i._id 
            }
        })];
    }

    setTags = () => {
        const {allDetails} = this.state;
        let tags = allDetails && allDetails.tags ? allDetails.tags : []
        return [{ label : 'Select Tags' ,value : "" } , 
        ...tags.map( i => {
            return{
                label :  i.name  ,
                value : i._id 
            }
        })];
    }

    setSubjects = () => {
        const {allDetails} = this.state;
        let subjects = allDetails && allDetails.subjects ? allDetails.subjects : []
        return [{ label : 'Select Subject' ,value : "" } , 
        ...subjects.map( i => {
            return{
                label :  `${i.code} - ${i.name}`  ,
                value : i._id 
            }
        })];
    }

    setGroups = () => {
        const {allDetails} = this.state;
        let students = allDetails && allDetails.students ? allDetails.students : []
        return [{ label : 'Select Groups' ,value : "" } , 
        ...students.map( i => {
            return{
                label :  i.subgroup_ID  ,
                value : i._id 
            }
        })];
    }


}

const HOUR = [{ label: 'Select Duration', value: "" },
...[ 1, 2].map(i => {
    return {
        label: `0${i} Hours` ,
        value: i
    }
})];
export default withRouter(AddSessions);
