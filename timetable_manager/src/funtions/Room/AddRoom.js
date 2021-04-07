import React from 'react';
import Sidebar from '../../components/Sidebar'
import {FormInput , FormSelect , MultiFormSelect} from '../../components/Form'
import moment from 'moment';
import { omit } from 'lodash'

import ROOM_CONTROLLER from '../../controllers/Room.Controller';
import B_CONTROLLER from '../../controllers/Building.Controller';
import CONFIG from '../../controllers/Config.controller';

class AddBuilding extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
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
            bList: buildings,
            building :  buildings.length > 0  ? buildings[0].name : ''
        })
    }

    formValueChange = (e) => {
        this.setState({[e.target.name] : e.target.value  });
    }

    clear = ()=>{
        this.setState({
            name: '',
            type: '',
            capacity: '',
            building: '',
        })
    }

    onFormSubmit = async (e) => {
        e.preventDefault();
        var ret = this.validate();

        if (ret == false){
            return;
        }

        var data = {
            name: this.state.name,
            type: this.state.type,
            capacity: this.state.capacity,
            building: this.state.building,
        }

        const result = await ROOM_CONTROLLER.addRoom(data)

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
        <Sidebar activemenu={'ROOMS'} submenu={'ADD_ROOM'} />
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
                                label={'Building (Add a building first)'}
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
        
        let { name, type, capacity, building} = this.state;
        let count = 0;
        let errors = {}

        if( name == ''){
            errors.name = true
            count++
        }else{
            errors.name = false 
        }

        if( type == ''){
            errors.type = true
            count++
        }else{
            errors.type = false 
        }
        if( building == ''){
            errors.building = true
            count++
        }else{
            errors.building = false 
        }

        if( capacity == ''){
            errors.capacity = true
            count++
        }else{
            errors.capacity = false 
        }
        this.setState({errors})
        return count == 0;
    }

    getBuildings = () => {
        return [{ label : 'Select Building' ,value : "" } , 
        ...this.state.bList.map( i => {
            return{
                label :  i  ,
                value : i 
            }
        })];
    }
}

const T_OPTIONS = [{ label : 'Select Type' ,value : "" } , 
...['Lecture Hall', 'Laboratory'].map( i => {
    return{
        label :  i  ,
         value : i 
    }
})];

export default AddBuilding;
