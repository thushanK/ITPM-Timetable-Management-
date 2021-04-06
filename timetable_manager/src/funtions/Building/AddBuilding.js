import React from 'react';
import Sidebar from '../../components/Sidebar'
import {FormInput , FormSelect , MultiFormSelect} from '../../components/Form'
// import moment from 'moment';
// import { omit } from 'lodash'

import BUL_CONTROLLER from '../../controllers/Building.Controller';


class AddBuilding extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            name: '',
            noOfFloors: '',
            accessTime: '',
            errors : { 
                name : false , 
                noOfFloors : false ,
                accessTime : false ,
            }
        };
    }

    formValueChange = (e) => {
        this.setState({[e.target.name] : e.target.value  });
    }

    clear = ()=>{
        this.setState({
            name: '',
            noOfFloors: '',
            accessTime: '',
        })
    }

    onFormSubmit = async (e) => {
        e.preventDefault();
        var ret = this.validate();
        console.log(ret);
        if (ret == false){
            console.log("Before");
            return "";
        }

        console.log("After");
        var data = {
            name: this.state.name,
            noOfFloors: this.state.noOfFloors,
            accessTime: this.state.accessTime,
        }

        const result = await BUL_CONTROLLER.addBuilding(data)

        console.log(result);

        if(result == 200){
            CONFIG.showAlert("Successfully Added")
            this.clear();
        }
    }

    render(){
        const {errors} = this.state;
    return (
        <div className="app" >
        <Sidebar activemenu={'BUILDINGS'} submenu={'ADD_BUILDING'} />
        <main>
            
            <div className="container" >
            <div className="row" >
                <div className="col-12 shadow-sm rounded bg-white mt-1" >
                    <h6 className="text-header py-3 mb-0 font-weight-bold line-hight-1">Add Building<br></br>
                    <span className="text-muted small">Add a new building to the system</span></h6>
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
                                label={'#No Floors'}
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
                            <button type="submit" className="btn-outline-primary mt-2 btn btn-sm px-2 mr-4">Save</button>
                            <button type="reset" className="btn-outline-secondary mt-2 btn btn-sm px-2 " onClick={this.clear}>Reset</button>
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

        if( accessTime == ''){
            errors.accessTime = true
            count++
        }else{
            errors.accessTime = false 
        }
       
        this.setState({errors})
        return count == 0;
    }

    ResetForm = () => {
        this.setState(
            {
                name: '',
                noOfFloors: '',
                accessTime: ''
            }
        )
    }
}

const AT_OPTIONS = [{ label : 'Select Access Time' ,value : "" } , 
...['Day & Night Time', 'Day Time'].map( i => {
    return{
        label :  i  ,
         value : i 
    }
})];

export default AddBuilding;
