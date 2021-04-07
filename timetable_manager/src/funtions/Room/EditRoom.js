import React from 'react';
import Sidebar from '../../components/Sidebar'
import {FormInput , FormSelect , MultiFormSelect} from '../../components/Form'
import moment from 'moment';
import { omit } from 'lodash';
import { Link } from 'react-router-dom';

import B_CONTROLLER from '../../controllers/Building.Controller';
import ROOM_CONTROLLER from '../../controllers/Room.Controller';
import CONFIG from '../../controllers/Config.controller';

class EditRoom extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            id: '',
            name: '',
            type: '',
            capacity: '',
            building: '',
            bList: [],
            errors : { 
                name : false , 
                type : false ,
                capacity : false ,
                building: false ,
            }
        };
    }

    async componentDidMount() {
        const buildings = await B_CONTROLLER.getAllBuildings();
        console.log(buildings);
        this.setState({
            bList: buildings
        })

        const result = await ROOM_CONTROLLER.getOne(this.props.match.params.id);

        this.setState({
            name: result.data.name,
            type: result.data.type,
            capacity: result.data.capacity,
            building: result.data.building,
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
            capacity: this.state.capacity,
            type: this.state.type,
            building: this.state.building,
        }

        const result = await ROOM_CONTROLLER.editRoom(data);

        if(result == 200){
            CONFIG.showAlert("Successfully Updated");
            document.getElementById("cancelBtn").click();
        }

    }

    render(){
        const {errors} = this.state;
    return (
        <div className="app" >
        <Sidebar activemenu={'ROOMS'} submenu={'ROOMS_LIST'} />
        <main>
            <div className="container-fluid" >
            <div className="row" >
                <div className="col-12 shadow-sm rounded bg-white mt-1" >
                    <h6 className="text-header py-3 mb-0 font-weight-bold line-hight-1">Add Room<br></br>
                    <span className="text-muted small">Add a new Room to the system</span></h6>
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
                                label={'Capacity'}
                                placeholder={'Enter the capacity'}
                                error={ errors.capacity}
                                name="capacity"
                                value={this.state.capacity}
                                onChange={this.formValueChange}
                                error_meesage={'*capacity is required'}
                            />
                    </div>
                    <div className="col-md-6 mt-1 mb-1" >
                        <FormSelect 
                                label={'Type'}
                                options={T_OPTIONS}
                                error={ errors.type}
                                selected={this.state.type}
                                onChange={this.formValueChange}
                                name="type"
                                error_meesage={'*Type is required'}
                            />
                    </div>
                    <div className="col-md-6 mt-1 mb-1" >
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
                    </div>
                    <div className="col-md-12 mt-1 mb-1" >
                            <button type="submit" className="btn-outline-primary mt-2 btn btn-sm px-2 mr-4">Save</button>
                            <Link to="/room/manage"><button id="cancelBtn" className="btn-outline-secondary mt-2 btn btn-sm px-2 ">Cancel</button></Link>
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
        
        let { name, type, capacity, building} = this.state;
        let count = 0;
        let errors = {}

        if( name == ''){
            errors.name = true
            count++
        }else{
            errors.name = false 
        }

        if( type == 'NONE'){
            errors.type = true
            count++
        }else{
            errors.type = false 
        }

        if( capacity == ''){
            errors.capacity = true
            count++
        }else{
            errors.capacity = false 
        }

        if( building == 'NONE'){
            errors.building = true
            count++
        }else{
            errors.building = false 
        }
       
        this.setState({errors})
        return count == 0;
    }

    clear = ()=>{
        this.setState({
            name: '',
            type: '',
            capacity: '',
            building: '',
        })
    }
}

const T_OPTIONS = [{ label : 'Select Type' ,value : "NONE" } , 
...['Lecture Hall', 'Laboratory'].map( i => {
    return{
        label :  i  ,
         value : i 
    }
})];

const B_OPTIONS = [{ label : 'Select Building' ,value : "NONE" } , 
...['Computing Faculty', 'New Building'].map( i => {
    return{
        label :  i  ,
         value : i 
    }
})];

export default EditRoom;
