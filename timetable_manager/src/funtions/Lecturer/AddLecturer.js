import React from 'react';
import Sidebar from '../../components/Sidebar'
import { FormInput, FormSelect, MultiFormSelect, FormInputReadOnly } from '../../components/Form';
import moment from 'moment';
// import { omit } from 'lodash';
// import { FilePond, registerPlugin } from 'react-filepond';

import LEC_CONTROLLER from '../../controllers/Lecturer.Controller'
import CONFIG from '../../controllers/Config.controller'
//import ROOM_CONTROLLER from '../controllers/Room.Controller';
import B_CONTROLLER from '../../controllers/Building.Controller';
import { withRouter } from "react-router-dom";

// import 'filepond/dist/filepond.min.css';


class AddLecturer extends React.Component {

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
            department:'',
            bList:[],


            errors: {
                name: false,
                employeeID: false,
                faculty: false,
                center: false,
                building: false,
                level: false,
                rank: false,
                department:false

            }
        };
    }

    formValueChange =  (e) => {
        this.setState({ [e.target.name]: e.target.value });
        this.is_filled(e.target.name, e.target.value);
        if(e.target.name == 'employeeID'){
            this.setRank(this.state.level , e.target.value)
        }

      
    }
 async   componentDidMount () {

    const buildings = await B_CONTROLLER.getAllBuildings();
    console.log(buildings);
    this.setState({
        bList: buildings,
        building :  buildings.length > 0  ? buildings[0].name : ''
    })
   }
    formValueChangeLevel = (e) => {
       
        this.setState({ level: e.target.value});
        this.is_filled(e.target.name, e.target.value);
        this.setRank(e.target.value , this.state.employeeID)

    }
   
    clear =() => {
        this.setState({
            name: '',
            employeeID: '',
            faculty: '',
            center: '',
            building: '',
            level: '',
            rank: '',

            department:''
        })
    }

    onFormSubmit = async (e) => {
        e.preventDefault();
        if(this.validate()){

       var  data = {
            name:this.state.name ,
            empId:this.state.employeeID ,
            faculty:this.state.faculty ,
            center:this.state.center ,
            building:this.state.building ,
            level:this.state.level ,
            rank:this.state.rank ,
            department:this.state.department ,
            image:"image" ,
        }

        
       
        const result = await LEC_CONTROLLER.addLecturer(data)
       
        if(result == 201){
            this.clear()
            CONFIG.setToast("Added Successfully")
            this.props.history.push("/lecturer/overview")
        }else if (result == 403){
            CONFIG.setErrorToast("Lecturer Already Exsist")
        }
        else{
            CONFIG.setErrorToast("Something went wrong")
        }
    }

    }

    setRank = (rank , emp ) => {
        if(rank != ''){
        this.setState({
            rank : `${rank}.${emp != '' ? emp : '00'}`  })
        }
    }

    render() {
        const { errors } = this.state;
        return (
            <div className="app" >
                <Sidebar activemenu={'LECTURER'} submenu={'ADD_LECTURER'} />
                <main>
                    <div className="container-fluid" >
                        <div className="row" >
                            {/* <div className="col-12 shadow-sm rounded bg-white mt-1" > */}
                                <h6 className="text-header py-3 mb-0 font-weight-bold line-hight-1">Add Lecturer<br></br>
        <span className="text-muted small">You can add new lecturer</span></h6>
                            {/* </div> */}
                            <div className="col-12 shadow-sm rounded bg-white mt-3 pb-1" >
                                <form onSubmit={(e) => this.onFormSubmit(e)}>
                                    <div className="row mt-1 pb-3" >
                                        {/* <div className="col-md-6 row "> */}
                                            {/* <div className="col-md-12 mt-2 mb-1"> */}
                                            {/* <p className="m-0 p-0">Profile Image</p> */}
                                                {/* <FilePond
                    allowMultiple={false}
                    imageResizeTargetWidth={150}
                    imageCropAspectRatio="1:1"
                    acceptedFileTypes={["image/*"]}

                    onpreparefile={(file, output) =>
                        this.handleImage(output[1].file)
                    }
                    onupdatefiles={fileItems => {
                        // Set currently active file objects to this.state
                        this.setState({
                            profilePictureArr: fileItems.map(
                                fileItem => fileItem.file
                            )
                        });
                    }}
                ></FilePond> */}
                                                {/* <hr className="mt-0 pt-0" />
                                                <center>
                                                    <img style={{ height: '150px' }} className="img-fluid rounded-circle mt-2" src="https://png.pngtree.com/png-vector/20190710/ourmid/pngtree-user-vector-avatar-png-image_1541962.jpg" />
                                                </center> */}
                                            {/* </div> */}
                                            {/* <div className="col-md-12 mt-2 mb-1" > */}

                                              
                                            {/* </div> */}

                                        {/* </div> */}
                                        {/* <div className="col-md-6 row"> */}
                                            {/* <div className="col-md-12 mt-2 mb-1"> */}
                                                {/* <p className="m-0 p-0">Lecturer Details</p> */}
                                                {/* <hr className="mt-0 pt-0" /> */}
                                            {/* </div> */}
                                            
                                            <div className="col-md-12 mt-2 mb-1" >
                                            <FormInput
                                                    label={'Name '}
                                                    placeholder={'Enter Name'}
                                                    error={errors.name}
                                                    value={this.state.name}
                                                    name="name"
                                                    onChange={this.formValueChange}
                                                    error_meesage={'*Name required'}
                                                />
                                                <FormInput
                                                    label={'Employee ID '}
                                                    placeholder={'Enter Employee ID'}
                                                    error={errors.employeeID}
                                                    value={this.state.employeeID}
                                                    type={'number'}
                                                    name="employeeID"
                                                    onChange={this.formValueChange}
                                                    error_meesage={'*Employee ID required with 6 digit'}
                                                />
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

                                            <FormSelect 
                                            label={'Building'}
                                            options={this.state.bList.map(i => {
                                                return {
                                                    label: i.name,
                                                    value: i.name,
                                                }
                                            })}
                                            error={ errors.building}
                                            selected={this.state.building}
                                            onChange={this.formValueChange}
                                            name="building"
                                            error_meesage={'*Building is required'}
                                        />


                                                {/* <FormInput
                                                    label={'Building '}
                                                    placeholder={'Enter Building'}
                                                    error={errors.building}
                                                    value={this.state.building}
                                                    name="building"
                                                    onChange={this.formValueChange}
                                                    error_meesage={'*Building required'}
                                                /> */}
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
                                                <FormInputReadOnly
                                                    label={'Rank '}
                                                 
                                                    value={this.state.rank}
                                                    name="rank"
                                                    onChange={this.formValueChange}
                                                 
                                                    
                                                />
                                            </div>
                                            <div className="col-md-12 mt-1 mb-1" >
                                                <br/>
                                                <button type="submit" className="btn btn-dark btn-sm">Add Lecturer</button>
                                            </div>
                                        {/* </div> */}
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
            rank,department } = this.state;
        let count = 0;
        let errors = {}

        if (name == '') {
            errors.name = true
            count++
        } else {
            errors.name = false
        }

        if (employeeID.length == 0 || employeeID.length < 6) {
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
        // if (building.length == 0) {
        //     errors.building = true
        //     count++
        // } else {
        //     errors.building = false
        // }

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
...[ 1, 2, 3, 4, 5, 6, 7].map(i => {
    return {
        label: i ,
        value: i
    }
})];



export default withRouter(AddLecturer);
