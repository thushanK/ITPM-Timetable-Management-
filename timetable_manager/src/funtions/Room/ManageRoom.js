import React from 'react';
import Sidebar from '../../components/Sidebar'
import { Link } from 'react-router-dom';

import ROOM_CONTROLLER from '../../controllers/Room.Controller';

class ManageRoom extends React.Component {

    constructor(props){
        super(props);
        this.state = {
            roomsList: [],
        }
    }

    async componentDidMount() {
        const res = await ROOM_CONTROLLER.getAllRooms();
      
        this.setState({
            roomsList: res
        });
    }

  render(){
      const {roomsList} = this.state;
  return (
    <div className="app" >
    <Sidebar activemenu={'LOCATION'} submenu={'MANAGE_ROOM'} />
    <main>
        <div className="container-fluid" >
        <div className="row" >
            <div className="col-12 shadow-sm rounded bg-white mt-1" >
                <h6 className="text-header py-3 mb-0 font-weight-bold line-hight-1">Rooms<br></br>
                <span className="text-muted small">View All Rooms</span></h6>

                <table class="table borderless customtable">
                    <thead>
                        <tr>
                        <th className="font-08 text-dark2 ">Room ID</th>
                        <th className="font-08 text-dark2 ">Name</th>
                        <th className="font-08 text-dark2 ">Capacity</th>
                        <th className="font-08 text-dark2 ">Type</th>
                        <th className="font-08 text-dark2 ">Building</th>
                        <th className="font-08 text-dark2 ">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {roomsList && roomsList.map((value, i) => this.renderTable(value, i))}
                    </tbody>
                </table>

            </div>
        </div>
        </div>
    </main>
  </div>
  );}

  renderTable = (room, index) => {
    console.log(room);
    return(
      <tr key={room._id}>
          <td>{`R${("00" + (index + 1)).slice(-3)}`}</td>
          <td>{room.name}</td>
          <td>{room.capacity}</td>
          <td>{room.type}</td>
          <td>{room.building}</td>
          <td><Link to={"/locations/rooms/edit/" + room._id}><span className="badge badge-info rounded-0 bg-white text-success border border-secondary click font-weight-bold ">Edit</span></Link>
          <Link to={"/locations/rooms/delete/" + room._id}><span className="badge badge-info rounded-0 bg-white text-danger border border-secondary click font-weight-bold ml-2">Delete</span></Link>
          </td>
      </tr>
    )
} 
}

export default ManageRoom;
