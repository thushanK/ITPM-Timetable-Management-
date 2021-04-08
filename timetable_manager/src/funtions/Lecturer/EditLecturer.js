import React from 'react';
import Sidebar from '../../components/Sidebar'
import { FormInput, FormSelect, MultiFormSelect, FormInputReadOnly } from '../../components/Form'
import moment from 'moment';
import { omit } from 'lodash'
// import { FilePond, registerPlugin } from 'react-filepond';
import { withRouter} from 'react-router-dom'

import LEC_CONTROLLER from '../../controllers/Lecturer.Controller'
import CONFIG from '../../controllers/Config.controller'


// import 'filepond/dist/filepond.min.css';


class EditLecturer extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            name: '',
            employeeID: '',
            faculty: '',
            center: '',
            building: '',
            level: '',
            rank: '',
            department: '',


            errors: {
                name: false,
                employeeID: false,
                faculty: false,
                center: false,
                building: false,
                level: false,
                rank: false,
                department: false

            }
        };
    }

    formValueChange = (e) => {
        this.setState({ [e.target.name]: e.target.value });
        this.is_filled(e.target.name, e.target.value);
        if(e.target.name == 'employeeID'){
            this.setRank(this.state.level , e.target.value)
        }


    }

    formValueChangeLevel = (e) => {
        // this.setRank({
        //     rank: ''
        // })
        this.setState({ level: e.target.value });
        this.is_filled(e.target.name, e.target.value);
        this.setRank(e.target.value , this.state.employeeID)
        console.log(this.state.rank);
    }

    clear = () => {
        this.setState({
            name: '',
            employeeID: '',
            faculty: '',
            center: '',
            building: '',
            level: '',
            rank: '',

            department: ''
        })
    }

    onFormSubmit = async (e) => {
        e.preventDefault();
        
        if(this.validate() ) {
        var data = {
            name: this.state.name,
            empId: this.state.employeeID,
            faculty: this.state.faculty,
            center: this.state.center,
            building: this.state.building,
            level: this.state.level,
            rank: this.state.rank,
            department: this.state.department,
            image: "image",
        }

        this.clear()
        const result = await LEC_CONTROLLER.edit_lecturer(data)
        if(result == 200){
            CONFIG.setToast("Successfully Updated")
            this.clear()
            this.props.history.push("/lecturer/manage")
        }
    }

    }



    setRank = (rank , emp ) => {
        if(rank != ''){
        this.setState({
            rank : `${rank}.${emp != '' ? emp : '00'}`  })
        }
    }




    componentDidMount = () => {

        this.loadData()
    }

    loadData = async (id) => {
        const result = await LEC_CONTROLLER.get_specific(this.props.match.params.id);
        console.log(result.data);

        var resultItem = result.data[0]

        this.setState({
            name: resultItem.name,
            employeeID: resultItem.empId,
            faculty: resultItem.faculty,
            center: resultItem.center,
            building: resultItem.building,
            level: resultItem.level,
            rank: resultItem.rank,
            cdate: moment(resultItem.createdAt).format('L'),
            udate: moment(resultItem.updatedAt).format('L'),
            department: resultItem.department,
        })



    }

    render() {
        const { errors } = this.state;
        return (
            <div className="app" >
                <Sidebar activemenu={'LECTURER'} submenu={'ADD_LECTURER'} />
                <main>
                    <div className="container-fluid" >
                        <div className="row" >
                            <div className="col-12 shadow-sm rounded bg-white mt-1" >
                                <h6 className="text-header py-3 mb-0 font-weight-bold line-hight-1">Edit Lecturer<br></br>
                                    <span className="text-muted small">You can edit exsisting lecturer</span></h6>
                            </div>
                            <div className="col-12 shadow-sm rounded bg-white mt-3 pb-1" >
                                <form onSubmit={(e) => this.onFormSubmit(e)}>
                                    <div className="row mt-1 pb-3" >
                                        <div className="col-md-6 row ">
                                            <div className="col-md-12 mt-2 mb-1">
                                                <p className="m-0 p-0">Profile Image</p>
                                                <hr className="mt-0 pt-0" />
                                                <center>
                                                    <img style={{ height: '150px' }} className="img-fluid rounded-circle mt-2" src="https://png.pngtree.com/png-vector/20190710/ourmid/pngtree-user-vector-avatar-png-image_1541962.jpg" />
                                                </center>
                                            </div>
                                            <div className="col-md-12 mt-2 mb-1" >

                                                <FormInput
                                                    label={'Name'}
                                                    placeholder={'Enter Name'}
                                                    error={errors.name}
                                                    value={this.state.name}
                                                    name="name"
                                                    onChange={this.formValueChange}
                                                    error_meesage={'*Name required'}
                                                />
                                                <FormInputReadOnly
                                                    label={'Employee ID '}
                                                    placeholder={'Enter Employee ID'}
                                                    error={errors.employeeID}
                                                    value={this.state.employeeID}
                                                    type={'number'}
                                                    name="employeeID"
                                                    onChange={this.formValueChange}
                                                    error_meesage={'*Employee ID required'}
                                                />
                                            </div>

                                        </div>
                                        <div className="col-md-6 row">
                                            <div className="col-md-12 mt-2 mb-1">
                                                <p className="m-0 p-0">Lecturer Details</p>
                                                <hr className="mt-0 pt-0" />
                                            </div>
                                            <div className="col-md-12 mt-2 mb-1" >
                                                <FormInput
                                                    label={'Faculty '}
                                                    placeholder={'Enter Faculty'}
                                                    error={errors.faculty}
                                                    value={this.state.faculty}
                                                    name="faculty"
                                                    onChange={this.formValueChange}
                                                    error_meesage={'*Faculty required'}
                                                />
                                            </div>
                                            <div className="col-md-12 mt-2 mb-1" >
                                                <FormInput
                                                    label={'Department '}
                                                    placeholder={'Enter Department'}
                                                    error={errors.department}
                                                    value={this.state.department}
                                                    name="department"
                                                    onChange={this.formValueChange}
                                                    error_meesage={'*Department required'}
                                                />
                                            </div>
                                            <div className="col-md-12 mt-2 mb-1" >
                                                <FormInput
                                                    label={'Center '}
                                                    placeholder={'Enter Center'}
                                                    error={errors.center}
                                                    value={this.state.center}
                                                    name="center"
                                                    onChange={this.formValueChange}
                                                    error_meesage={'*Center required'}
                                                />
                                            </div>

                                            <div className="col-md-12 mt-1 mb-1" >
                                                <FormInput
                                                    label={'Building '}
                                                    placeholder={'Enter Building'}
                                                    error={errors.building}
                                                    value={this.state.building}
                                                    name="building"
                                                    onChange={this.formValueChange}
                                                    error_meesage={'*Building required'}
                                                />
                                            </div>
                                            <div className="col-md-12 mt-1 mb-1" >
                                                <FormSelect
                                                    label={'Level'}
                                                    options={WD_OPTIONS}
                                                    error={errors.level}
                                                    selected={this.state.level}
                                                    onChange={this.formValueChangeLevel}
                                                    name="level"
                                                    error_meesage={'*Level required'}
                                                />
                                            </div>
                                            <div className="col-md-12 mt-1 mb-1" >
                                                <FormInput
                                                    label={'Rank '}

                                                    value={this.state.rank}
                                                    name="rank"
                                                    onChange={this.formValueChange}


                                                />
                                            </div>
                                            <div className="col-md-12 mt-1 mb-1" >
                                                <button type="submit" className="btn-outline-success mt-2 btn btn-sm px-2 float-right">Save Edit</button>
                                            </div>
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
        let { name,
            employeeID,
            faculty,
            center,
            building,
            level,
            rank, department } = this.state;
        let count = 0;
        let errors = {}

        if (name == 'NONE') {
            errors.name = true
            count++
        } else {
            errors.name = false
        }

        if (employeeID.length == 0) {
            errors.employeeID = true
            count++
        } else {
            errors.employeeID = false
        }
        if (department.length == 0) {
            errors.department = true
            count++
        } else {
            errors.department = false
        }

        if (faculty.length == 0) {
            errors.faculty = true
            count++
        } else {
            errors.faculty = false
        }
        if (center.length == 0) {
            errors.center = true
            count++
        } else {
            errors.center = false
        }
        if (building.length == 0) {
            errors.building = true
            count++
        } else {
            errors.building = false
        }

        if (level.length == 0) {
            errors.level = true
            count++
        } else {
            errors.level = false
        }
        if (rank.length == 0) {
            errors.rank = true
            count++
        } else {
            errors.rank = false
        }


        this.setState({ errors })
        return count == 0;
    }


    is_filled = (name, value) => {
        let result = (value.length == 0 || value == 'NONE')
        this.setState({ errors: { ...this.state.errors, [name]: result } })
    }



}

const WD_OPTIONS = [{ label: 'Select Level', value: "NONE" },
...[0, 1, 2, 3, 4, 5, 6, 7].map(i => {
    return {
        label: i,
        value: i
    }
})];



export default withRouter(EditLecturer);
