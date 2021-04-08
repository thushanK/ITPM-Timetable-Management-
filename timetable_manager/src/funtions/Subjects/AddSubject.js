import React from 'react';
import Sidebar from '../../components/Sidebar'
import { FormInput, FormSelect, MultiFormSelect, FormInputReadOnly } from '../../components/Form';
import moment from 'moment';
import { omit } from 'lodash'
// import { FilePond, registerPlugin } from 'react-filepond';


// import 'filepond/dist/filepond.min.css';

import SUB_CONTROLLER from '../../controllers/Subject.controller'
import CONFIG from '../../controllers/Config.controller'



class AddSubject extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            year: '',
            semester: '',
            name: '',
            code: '',
            lec_hour: '',
            tute_hour: '',
            lab_hour: '',
            evalu_hour: '',


            errors: {
                year: false,
                semester: false,
                name: false,
                code: false,
                lec_hour: false,
                tute_hour: false,
                lab_hour: false,
                evalu_hour: false,

            }
        };
    }
    clear = ()=>{
        this.setState({
            year: '',
            semester: '',
            name: '',
            code: '',
            lec_hour: '',
            tute_hour: '',
            lab_hour: '',
            evalu_hour: '',

        })
    }
    formValueChange = (e) => {
        this.setState({ [e.target.name]: e.target.value });
        this.is_filled(e.target.name, e.target.value);
    }
    onFormSubmit =async (e) => {
        e.preventDefault();
        if(this.validate() ) {
        var data = {
            year:this.state.year ,
            semester:this.state.semester ,
            name:this.state.name ,
            code:this.state.code ,
            lec_hour:this.state.lec_hour ,
            tute_hour:this.state.tute_hour ,
            lab_hour:this.state.lab_hour ,
            evalu_hour:this.state.evalu_hour ,
        }
        const result = await SUB_CONTROLLER.addSubject(data)
        console.log(result);
        if(result == 201){
            CONFIG.setToast("Successfully Added")
            this.props.history.push("/subject/manage")
            this.clear()
        }
        }
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
                                <h6 className="text-header py-3 mb-0 font-weight-bold line-hight-1">Add Subject<br></br>
                                    <span className="text-muted small">You can add new subject</span></h6>
                            </div>
                            <div className="col-12 shadow-sm rounded bg-white mt-3 pb-1" >
                                <form onSubmit={(e) => this.onFormSubmit(e)}>
                                    <div className="row" >
                                        <div className="col-md-6 row ">

                                        <div className="col-md-12 mt-2 mb-1">
                                            <p className="m-0 p-0">Subject Deatils</p>
                                            <hr className="mt-0 pt-0" />
                                        </div>
                                            <div className="col-md-12 mt-2 mb-2   " >
                                                <FormSelect
                                                    label={'Offered year'}
                                                    options={YEAR}
                                                    error={errors.year}
                                                    selected={this.state.year}
                                                    onChange={this.formValueChange}
                                                    name="year"
                                                    error_meesage={'*Offered year required'}
                                                />
                                            </div>
                                            <div className="col-md-12 mt-2 mb-2 " >
                                                <FormSelect
                                                    label={'Offered semester'}
                                                    options={SEMESTER}
                                                    error={errors.semester}
                                                    selected={this.state.semester}
                                                    onChange={this.formValueChange}
                                                    name="semester"
                                                    error_meesage={'*Offered semester required'}
                                                />
                                            </div>
                                            <div className="col-md-12 mt-2 mb-2 " >
                                                <FormInput
                                                    label={'Subject name '}
                                                    placeholder={'Enter Subject name'}
                                                    error={errors.name}
                                                    value={this.state.name}
                                                    name="name"
                                                    onChange={this.formValueChange}
                                                    error_meesage={'*Subject name required'}
                                                />
                                            </div>
                                            <div className="col-md-12 mt-2 mb-2 " >
                                                <FormInput
                                                    label={'Subject code '}
                                                    placeholder={'Enter Subject code'}
                                                    error={errors.code}
                                                    value={this.state.code}
                                                    name="code"
                                                    onChange={this.formValueChange}
                                                    error_meesage={'*Subject code required'}
                                                />
                                            </div>

                                        </div>
                                        <div className="col-md-6 row">
                                            <div className="col-md-12 mt-2 mb-1">
                                                <p className="m-0 p-0">Subject Hours</p>
                                                <hr className="mt-0 pt-0" />
                                            </div>
                                            <div className="col-md-12 mt-2 mb-2 " >
                                                <FormSelect
                                                    label={'Number of lecture hours'}
                                                    options={LEC_HOUR}
                                                    error={errors.lec_hour}
                                                    selected={this.state.lec_hour}
                                                    onChange={this.formValueChange}
                                                    name="lec_hour"
                                                    error_meesage={'*Number of lecture hours required'}
                                                />
                                            </div>
                                            <div className="col-md-12 mt-2 mb-2 " >
                                                <FormSelect
                                                    label={'Number of tutorial hours'}
                                                    options={TUTE_HOUR}
                                                    error={errors.tute_hour}
                                                    selected={this.state.tute_hour}
                                                    onChange={this.formValueChange}
                                                    name="tute_hour"
                                                    error_meesage={'*Number of tutorial hours required'}
                                                />
                                            </div>

                                            <div className="col-md-12 mt-2 mb-2  " >
                                                <FormSelect
                                                    label={'Number of lab hours'}
                                                    options={LAB_HOUR}
                                                    error={errors.lab_hour}
                                                    selected={this.state.lab_hour}
                                                    onChange={this.formValueChange}
                                                    name="lab_hour"
                                                    error_meesage={'*Number of lab hours required'}
                                                />
                                            </div>
                                            <div className="col-md-12 mt-2 mb-2  " >
                                                <FormSelect
                                                    label={'Number of evaluation hours '}
                                                    options={EVALUATION_HOUR}
                                                    error={errors.evalu_hour}
                                                    selected={this.state.evalu_hour}
                                                    onChange={this.formValueChange}
                                                    name="evalu_hour"
                                                    error_meesage={'*Number of evaluation hours  required'}
                                                />
                                            </div>
                                        </div>
                                        <div className="col-md-12 mt-1 mb-1" >
                                            <button type="submit" className="btn-outline-success mt-2 btn btn-sm px-2 float-left">Add Subject</button>
        
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
            year,
            semester,
            name,
            code,
            lec_hour,
            tute_hour,
            lab_hour,
            evalu_hour,

        } = this.state;
        let count = 0;
        let errors = {}

        if (year.length == 0) {
            errors.year = true
            count++
        } else {
            errors.year = false
        }

        if (semester.length == 0) {
            errors.semester = true
            count++
        } else {
            errors.semester = false
        }
        if (name.length == 0) {
            errors.name = true
            count++
        } else {
            errors.name = false
        }
        if (code.length == 0) {
            errors.code = true
            count++
        } else {
            errors.code = false
        }

        if (lec_hour.length == 0) {
            errors.lec_hour = true
            count++
        } else {
            errors.lec_hour = false
        }

        if (tute_hour.length == 0) {
            errors.tute_hour = true
            count++
        } else {
            errors.tute_hour = false
        }
        if (lab_hour.length == 0) {
            errors.lab_hour = true
            count++
        } else {
            errors.lab_hour = false
        }

        if (evalu_hour.length == 0) {
            errors.evalu_hour = true
            count++
        } else {
            errors.evalu_hour = false
        }


        this.setState({ errors })
        return count == 0;
    }

    is_filled = (name, value) => {
        let result = (value.length == 0 || value == 'NONE')
        this.setState({ errors: { ...this.state.errors, [name]: result } })
    }



}

const YEAR = [{ label: 'Select Year', value: "NONE" },
...[1, 2, 3, 4].map(i => {
    return {
        label: i,
        value: i
    }
})];
const SEMESTER = [{ label: 'Select Semester', value: "NONE" },
...[1, 2,].map(i => {
    return {
        label: i,
        value: i
    }
})];
const LEC_HOUR = [{ label: 'Number of lecture hours', value: "NONE" },
...[0, 1, 2].map(i => {
    return {
        label: i ,
        value: i
    }
})];
const TUTE_HOUR = [{ label: 'Number of tutorial hours', value: "NONE" },
...[0, 1, 2].map(i => {
    return {
        label: i,
        value: i
    }
})];
const LAB_HOUR = [{ label: 'Number of lab hours', value: "NONE" },
...[0, 1, 2].map(i => {
    return {
        label: i,
        value: i
    }
})];
const EVALUATION_HOUR = [{ label: 'Number of evaluation hours', value: "NONE" },
...[0, 1, 2].map(i => {
    return {
        label: i,
        value: i
    }
})];



export default AddSubject;
