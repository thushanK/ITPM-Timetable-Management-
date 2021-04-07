import React from 'react';
import Sidebar from '../../components/Sidebar'
import {FormInput , FormSelect , MultiFormSelect} from '../../components/Form'

import { Link } from 'react-router-dom';

import B_CONTROLLER from '../../controllers/Building.Controller';
import CONFIG from '../../controllers/Config.controller';

class EditBuilding extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            name: '',
            noOfFloors: '',
            accessTime: '',
            id: '',
            errors : { 
                name : false , 
                noOfFloors : false ,
                accessTime : false ,
            }
        };
    }

    async componentDidMount() {
        console.log("Building ID: ", this.props.match.params.id);
        
        const result = await B_CONTROLLER.getOne(this.props.match.params.id);

        console.log("Building results: ", result.data);

        this.setState({
            name: result.data.name,
            noOfFloors: result.data.noOfFloors,
            accessTime: result.data.accessTime,
            id: result.data._id
        })
    }

    formValueChange = (e) => {
        this.setState({[e.target.name] : e.target.value  });
    }

    onFormSubmit = async (e) => {
        e.preventDefault();
        this.validate();

        var data = {
            id: this.state.id,
            name: this.state.name,
            noOfFloors: this.state.noOfFloors,
            accessTime: this.state.accessTime,
        }

        const result = await B_CONTROLLER.editBuilding(data)

        console.log(result);

        if(result == 200){
            CONFIG.showAlert("Successfully Updated");
            document.getElementById("cancelBtn").click();
        }
    }

    render(){
        const {errors} = this.state;
    return (
        <div className="app" >
        <Sidebar activemenu={'BUILDINGS'} submenu={'BUILDINGS_LIST'} />
        <main>
            <div className="container-fluid" >
            <div className="row" >
                <div className="col-12 shadow-sm rounded bg-white mt-1" >
                    <h6 className="text-header py-3 mb-0 font-weight-bold line-hight-1">Edit Building<br></br>
                    <span className="text-muted small">Editing building details</span></h6>
                </div>
                <div className="col-12 shadow-sm rounded bg-white mt-3 pb-1" >
                <form onSubmit={(e) => this.onFormSubmit(e)}>
                <div className="row mt-1 pb-3" >
                    <div className="col-md-6 mt-1 mb-1" >
                            <FormInput 
                                label={'Name'}
                                placeholder={'Enter building name'}
                                error={ errors.name}
                                name="name"
                                value={this.state.name}
                                onChange={this.formValueChange}
                                error_meesage={'*Name is required'}
                            />
                    </div>
                    <div className="col-md-6 mt-1 mb-1" >
                            <FormInput 
                                label={'No Floors'}
                                placeholder={'Enter number of floors'}
                                error={ errors.noOfFloors}
                                name="noOfFloors"
                                value={this.state.noOfFloors}
                                onChange={this.formValueChange}
                                error_meesage={'*Number of floors is required'}
                            />
                    </div>
                    <div className="col-md-6 mt-1 mb-1" >
                        <FormSelect 
                                label={'Access Time'}
                                options={AT_OPTIONS}
                                error={ errors.accessTime}
                                selected={this.state.accessTime}
                                onChange={this.formValueChange}
                                name="accessTime"
                                error_meesage={'*Access Time is required'}
                            />
                    </div>
                    <div className="col-md-12 mt-1 mb-1" >
                            <button type="submit" className="btn-outline-primary mt-2 btn btn-sm px-2 mr-4">Update</button>
                            <Link to="/building/manage/"><button id="cancelBtn" className="btn-outline-secondary mt-2 btn btn-sm px-2 ">Cancel</button></Link>
                    </div>
                </div>
                </form>
                </div>
            </div>
            </div>
        </main>
    </div>
    );}

    validate = () => {
        let { name, noOfFloors, accessTime} = this.state;
        let count = 0;
        let errors = {}

        if( name == ''){
            errors.name = true
            count++
        }else{
            errors.name = false 
        }

        if( noOfFloors == ''){
            errors.noOfFloors = true
            count++
        }else{
            errors.noOfFloors = false 
        }

        if( accessTime == 'NONE'){
            errors.accessTime = true
            count++
        }else{
            errors.accessTime = false 
        }
       
        this.setState({errors})
        return count == 0;
    }

    clear = ()=>{
        this.setState({
            name: '',
            noOfFloors: '',
            accessTime: '',
            id: '',
        })
    }
}

const AT_OPTIONS = [{ label : 'Select Access Time' ,value : "NONE" } , 
...['Day & Night Time', 'Day Time'].map( i => {
    return{
        label :  i  ,
         value : i 
    }
})];

export default EditBuilding;
