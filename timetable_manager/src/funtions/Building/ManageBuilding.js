import React from 'react';
import Sidebar from '../../components/Sidebar'
import { Link } from 'react-router-dom';
import B_CONTROLLER from '../../controllers/Building.Controller';

class ManageBuilding extends React.Component {

  constructor(props){
      super(props);
      this.state = {
          buildingsList: [],
      }
  }
  
  async componentDidMount() {
      const res = await B_CONTROLLER.getAllBuildings();
      this.setState({
          buildingsList: res
      });
  }

  render(){
      const {buildingsList} = this.state;
  return (
    <div className="app" >
    <Sidebar activemenu={'BUILDINGS'} submenu={'BUILDINGS_LIST'} />
    <main>
        <div className="container-fluid" >
        <div className="row" >
            <div className="col-12 shadow-sm rounded bg-white mt-1" >
                <h6 className="text-header py-3 mb-0 font-weight-bold line-hight-1">Manage Buildings<br></br>
                <span className="text-muted small">Manage building details</span></h6>
                <table class="table borderless customtable">
                    <thead>
                        <tr>
                        <th className="font-08 text-dark2 ">Building ID</th>
                        <th className="font-08 text-dark2 ">Name</th>
                        <th className="font-08 text-dark2 ">No of Floors</th>
                        <th className="font-08 text-dark2 ">Access Time</th>
                        <th className="font-08 text-dark2 ">Actions</th>
                        </tr>
                    </thead>
                    <tbody>{buildingsList && buildingsList.map((value , i) => this.renderTable(value , i))}</tbody>
                </table>
            </div>
        </div>
        </div>
    </main>
  </div>
  );}

  renderTable = (building , index) => {
      console.log(building);
    return (
                        <tr key={building._id}>
                            <td>{`B${("00" + (index + 1)).slice(-3)}`}</td>
                            <td>{building.name}</td>
                            <td>{building.noOfFloors}</td>
                            <td>{building.accessTime}</td>
                            <td><Link to={"/locations/buildings/edit/" + building._id}><span className="badge badge-info rounded-0 bg-white text-success border border-secondary click font-weight-bold ">Edit</span></Link>
                            <Link to={"/locations/buildings/delete/" + building._id}><span className="badge badge-info rounded-0 bg-white text-danger border border-secondary click font-weight-bold btn-danger ml-2">Delete</span></Link>
                            </td>
                        </tr>
    )
  }
}

export default ManageBuilding;
