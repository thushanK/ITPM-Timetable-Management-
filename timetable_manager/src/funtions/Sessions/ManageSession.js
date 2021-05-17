import React from 'react';
import Sidebar from '../../components/Sidebar'
import { FormInput, FormSelect, MultiFormSelect } from '../../components/Form'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTrash, faUserCircle, faEdit, faEye } from '@fortawesome/free-solid-svg-icons'
import { Link } from 'react-router-dom'
import SUB_CONTROLLER from '../../controllers/Subject.Controller'
import SESSION_CONTROLLER from '../../controllers/Session.Controller'
import CONFIG from '../../controllers/Config.controller'
import { confirmAlert } from "react-confirm-alert";
import { Modal, Button } from 'react-bootstrap';
// import '././keys.css'
class SessionsOverview extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            search_word: '',
            search_type: '',
            sessions: null,
            sessions_paginations: null,
            sessions_filterd: null,
            filter: '',
            model_show: false,
            single_session: {
                group: '',
                duration: '',
                subject: '',
                lecturer: '',
                no_of_student: '',
                tags: '',
                subject_name: ''
            },
            errors: {
                search_word: false,
                search_type: false,
            },
            page: 0,
            page_number: 0,
            page_next: false,
            page_back: false,
        };
    }
    handleClose = () => {
        this.setState({
            model_show: false
        })
    };
    handleShow = (i) => {
        this.setState({
            model_show: true
        })
        this.one_session_view(i)
    }
    formValueChange = (e) => {
        this.setState({ [e.target.name]: e.target.value });
    }
    onFormSubmit = async (e) => {
        e.preventDefault();
        var data = {
            f_word: this.state.search_word,
            f_type: this.state.filter,

        }
        console.log(data);
        const result = await SESSION_CONTROLLER.get_filterd_seesion(data)
        console.log(result);
        await this.setState({
            sessions: result
        })
        await console.log(this.state.sessions_filterd);
    }
    componentWillMount = async () => {
        await this.loadData()

    }
    loadData = async () => {
        const result = await SESSION_CONTROLLER.get_all_seesion()
        console.log(result);
        await this.setState({
            sessions: result
        })
        await console.log(this.state.sessions);
    }
    onChnageFilter = async (e) => {
        await this.setState({
            filter: e.target.value
        })
        console.log(this.state.filter);
    }
    del_sub = async (data) => {
        const result = await SUB_CONTROLLER.delete_subject(data)

        await this.loadData()
    }

    delete_subject = async (sub_code) => {
        var data = {
            code: sub_code
        }

        confirmAlert({
            title: "Alert",
            message: "Are you sure ? ",
            buttons: [
                {
                    label: 'Yes',
                    onClick: () => this.del_sub(data)

                },
                {
                    label: 'No',
                    
                }
            ]
        });



        await this.loadData()

    }

    delete_session_function = async (data) => {
        const result = await SESSION_CONTROLLER.delete_session(data)
        if (result == 200)
            CONFIG.setToast("Successfully Deleted")
        else if (result == 402)
            CONFIG.showAlert2("First you should  delete  Parallel /  Conservatives and Not Overlap reference to this")
        await this.loadData()
    }

    delete_lecturefunc = async (id) => {

        confirmAlert({
            title: "Alert",
            message: "Are you sure ? ",
            buttons: [
                {
                    label: 'Yes',
                    onClick: () => this.delete_session_function(id)

                },
                {
                    label: 'No',
                }
            ]
        });
        await this.loadData()

    }



    render() {

        const { errors, } = this.state;
        return (
            <div className="app" >
                <Sidebar activemenu={'SESSIONS'} submenu={'MANAGE_SESSIONS'} />
                <main>
                    <div className="container-fluid" >
                        <div className="row" >
                            <div className="col-12 shadow-sm rounded bg-white mt-1" >
                                <div className="row">
                                    <div className="col-md-8"><h6 className="text-header py-3 mb-0 font-weight-bold line-hight-1">Sessions Managment <br></br>
                                        <span className="text-muted small">Overview</span>
                                    </h6></div>
                                    <div className="col-md-4">
                                        <Link to="/sessions/add"> <button type="submit" className="btn-outline-success  btn btn-sm px-2 float-right mt-3 mb-2">Add Sessions</button></Link>
                                    </div>
                                </div>
                            </div>
                            <form onSubmit={(e) => this.onFormSubmit(e)}>
                                <div className="col-12 shadow-sm rounded bg-white mt-3 " style={{ display: 'flex', alignContent: 'center' }} >
                                    <div className="row">
                                        <div className="col-md-8  px-2  mt-1 mb-2">  <FormInput
                                            label={'Search'}
                                            placeholder={'Type Anything...'}
                                            error={errors.search_word}
                                            value={this.state.search_word}
                                            name="search_word"
                                            onChange={this.formValueChange}
                                            error_meesage={'*Please provide valid search'}
                                        />
                                        </div>
                                        <div className="col-md-4">
                                            <button type="submit" style={{ marginTop: '30px' }} className="btn-outline-info  btn btn-sm ">Search</button>
                                            <button type="button" style={{ marginTop: '30px' }} className="btn-outline-warning  btn btn-sm  ml-3" onClick={() => this.loadData()}>Reset</button>
                                        </div>
                                        <div className="col-md-12">
                                            <div class="form-check form-check-inline mr-4 ml-0 pl-0  pt-1 pb-2" >
                                                <input class="form-check-input" type="radio" name="inlineRadioOptions" onChange={(e) => this.onChnageFilter(e)} id="inlineRadio1" value="lecturer" />
                                                <label class="form-label mt-1" for="inlineRadio1">Lecturer</label>
                                            </div>
                                            <div class="form-check form-check-inline mr-4 ml-0 pl-0  pt-1 pb-2">
                                                <input class="form-check-input" type="radio" name="inlineRadioOptions" onChange={(e) => this.onChnageFilter(e)} id="inlineRadio2" value="subject" />
                                                <label class="form-label mt-1" for="inlineRadio2">Subject</label>
                                            </div>
                                            <div class="form-check form-check-inline mr-4 ml-0 pl-0  pt-1 pb-2">
                                                <input class="form-check-input" type="radio" name="inlineRadioOptions" onChange={(e) => this.onChnageFilter(e)} id="inlineRadio3" value="groupId" />
                                                <label class="form-label mt-1" for="inlineRadio3">Group ID</label>
                                            </div>
                                            <div class="form-check form-check-inline mr-4 ml-0 pl-0  pt-1 pb-2">
                                                <input class="form-check-input" type="radio" name="inlineRadioOptions" onChange={(e) => this.onChnageFilter(e)} id="inlineRadio4" value="duration" />
                                                <label class="form-label mt-1" for="inlineRadio4">Duration</label>
                                            </div>
                                            <div class="form-check form-check-inline mr-4 ml-0 pl-0  pt-1 pb-2">
                                                <input class="form-check-input" type="radio" name="inlineRadioOptions" onChange={(e) => this.onChnageFilter(e)} id="inlineRadio4" value="nOofStudents" />
                                                <label class="form-label mt-1" for="inlineRadio4">No of Students</label>
                                            </div>
                                            <div class="form-check form-check-inline mr-4 ml-0 pl-0  pt-1 pb-2">
                                                <input class="form-check-input" type="radio" name="inlineRadioOptions" onChange={(e) => this.onChnageFilter(e)} id="inlineRadio4" value="tag" />
                                                <label class="form-label mt-1" for="inlineRadio4">Tag</label>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </form>
                            <div className="col-12 shadow-sm rounded bg-white mt-3" >
                                <table class="table borderless customtable">
                                    <thead>
                                        <tr>
                                            <th className="font-08 text-dark2 ">Group Id</th>
                                            <th className="font-08 text-dark2 ">Duration</th>
                                            <th className="font-08 text-dark2 ">Subject </th>
                                            <th className="font-08 text-dark2 ">Lecturer </th>
                                            <th className="font-08 text-dark2 ">No_Students </th>
                                            <th className="font-08 text-dark2 ">Tag </th>
                                            <th className="font-08 text-dark2 ">Action</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {this.state.sessions && this.state.sessions.map(data => {
                                            return (<tr>

                                                <td>{data.group.subgroup_ID}</td>
                                                <td>{data.duration}</td>
                                                <td>{data.subject.name}</td>
                                                <td>{data.lecturer.name}</td>
                                                <td>{data.no_of_students}</td>
                                                <td>{data.tag.name}</td>
                                                <td>
                                                    {/* <span onClick={() => this.delete_subject(data.code)} className="badge badge-info rounded-0 bg-white text-danger border border-secondary border-danger click font-weight-bold ">Delete</span> */}
                                                    <span onClick={() => this.delete_lecturefunc(data._id)} className="badge badge-info rounded-0 bg-white text-danger border border-danger border-info click font-weight-bold ml-2">Delete</span>
                                                    {/* <span onClick={() => this.handleShow(data._id)} className="badge badge-info rounded-0 bg-white text-info border border-info border-info click font-weight-bold ml-2">View</span> */}
                                                </td>
                                            </tr>)
                                        })}
                                    </tbody>
                                </table>
                                {/* <ul className="pagination pagination-responsive" style={{float:'right'}}>
                                    <li style={{display: this.state.page_back == false ? 'block' : 'none'}} onClick={()=>this.prev_btn()} className="mx-2"><a>&laquo; <span className="hidden-sm hidden-md hidden-lg ">Previous</span></a></li>
                                    <li style={{display: this.state.page_next == true ? 'block' : 'none'}} onClick={()=>this.next_btn()} className="mx-2"><a><span className="hidden-sm hidden-md hidden-lg ">Next</span> &raquo;</a></li>
                                </ul> */}
                            </div>
                        </div>
                        {/* <Modal show={this.state.model_show} onHide={this.handleClose}>
                            <Modal.Header closeButton>
                                <Modal.Title>Session Details</Modal.Title>
                            </Modal.Header>
                            <Modal.Body>
                                Lecturer :  {this.state.single_session.lecturer} <br />
                                Subject : {this.state.single_session.subject_name} ({this.state.single_session.subject}) <br />
                                Tag  : {this.state.single_session.tags} <br />
                                Group  : {this.state.single_session.group} <br />
                                No Of Student and Duration  :{this.state.single_session.no_of_student}({this.state.single_session.duration}) <br />
                            </Modal.Body>
                            <Modal.Footer>
                                <Button variant="secondary" onClick={this.handleClose}> Close    </Button>
                            </Modal.Footer>
                        </Modal> */}
                    </div>
                </main>
            </div>
        );
    }
    validate = () => {
        let { filter,
            search_word,
        } = this.state;
        let count = 0;
        let errors = {}
        if (search_word.length == 0) {
            errors.search_word = true
            count++
        } else {
            errors.search_word = false
        }

        if (filter.length == 0) {
            errors.filter = true
            count++
        } else {
            errors.filter = false
        }
        this.setState({ errors })
        return count == 0;
    }

}
export default SessionsOverview;