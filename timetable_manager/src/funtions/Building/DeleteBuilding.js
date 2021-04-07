import React from 'react';
import Sidebar from '../../components/Sidebar'
// import {FormInput , FormSelect , MultiFormSelect} from '../../components/Form'
// import moment from 'moment';
// import { omit } from 'lodash'
import { Link, Router } from 'react-router-dom';

import B_CONTROLLER from '../../controllers/Building.Controller';
import CONFIG from '../../controllers/Config.controller';

class DeleteBuilding extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            name: '',
            noOfFloors: '',
            accessTime: '',
            id: '',
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
            id: result.data._id,
        })
    }

    render(){

    return (
        <div className="app" >
        <Sidebar activemenu={'BUILDINGS'} submenu={'BUILDINGS_LIST'} />
        <main>
            <div className="container-fluid" >
            <div className="row" >
                <div className="col-12 shadow-sm rounded bg-white mt-1" >
                    <h6 className="text-header py-3 mb-0 font-weight-bold line-hight-1">Delete Building<br></br>
                    <span className="text-muted small">Building delete confirmation</span></h6>
                </div>
                <div className="col-12 shadow-sm rounded bg-white mt-3 pb-1" >
    
                <div className="row mt-1 pb-3" >
                    <div className="col-md-12 mt-2" >
                    <h6 style={{fontSize : '0.9rem'}}
                        className="text-header text-danger mb-0 font-weight-bold line-hight-1">Are you sure you want to delete this Building ?<br></br>
                    <span className="text-muted small">This process can't be undone, All the relevant details will be permanently deleted !</span></h6>
                    </div>
                    <div className="col-md-12 mt-3" >
                        <table class="table borderless customtable mb-0">
                            <thead>
                            <tr>
                                <th className="font-08 text-dark2 ">Name</th>
                                <th className="font-08 text-dark2 ">No of Floors</th>
                                <th className="font-08 text-dark2 ">Access Time</th>
                            </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td>{this.state.name}</td>
                                    <td>{this.state.noOfFloors}</td>
                                    <td>{this.state.accessTime}</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                    <div className="col-md-12 mt-1 mb-1" >
                    <hr className="my-2"></hr>
                            <button className="btn-danger mt-2 btn btn-sm px-3 py-1" onClick={this.onDelete}>Delete</button>
                            <Link to="/locations/buildings/list"><button type="submit" id="cancelBtn" className="btn-light mt-2 btn btn-sm px-3 py-1 border mx-2">Cancel</button></Link>
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
            id: this.state.id,
            name: this.state.name,
        }
        const result = await B_CONTROLLER.deleteBuilding(data);
        if(result == 200){
            CONFIG.showAlert("Successfully Deleted");
            document.getElementById("cancelBtn").click();
        }
        console.log(result);
    }

}

export default DeleteBuilding;
