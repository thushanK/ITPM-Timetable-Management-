import React from 'react';
import Sidebar from '../../../components/Sidebar'
//import {FormInput , FormSelect , MultiFormSelect} from '../Components/Form'
import moment from 'moment';
import { omit } from 'lodash';
import {Link} from 'react-router-dom';
import consessionpa from '../../../controllers/Consecutive.controller';
import CONFIG from '../../../controllers/Config.controller';

class consecutiveSessions extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            parallelList : [],
        };
    }

    async componentDidMount() {
        this.loadData();
       
    }

    loadData = async () => {
        const res = await consessionpa.getAllConSessions();
        console.log(res.data);
        if(res.status == 200 ){
            this.setState({
                parallelList: res.data
            });
        }
    }

    render(){
        const {parallelList} = this.state;

        return (
          <div className="app" >
          <Sidebar activemenu={'STUDENT'}   submenu={'CONSECUTIVE_SESSION'} />
          <main>
              <div className="container-fluid" >
              <div className="row" >
                  <div className="col-12 shadow-sm rounded bg-white mt-1" >
                  <div class="row">
                      <div class="col-8">
                          <h6 className="text-header py-3 mb-0 font-weight-bold line-hight-1">Consecutive Sessions<br></br>
                          <span className="text-muted small">Dashboard</span></h6>
                      </div>
                      <div class="col-4">
                          <center>
                          <Link to="/student/addconsecutiveSessions" >
                          <span  className="badge badge-info px-5 py-1 mt-4 bg-white border border-info text-info click ">Add Consecutive Sessions</span>
                          </Link>
                          </center>
                      </div>
                  </div>
                     
                  </div>
                  <div className="col-12 shadow-sm rounded bg-white mt-3" >
                      <table class="table borderless customtable">
                          <thead>
                              <tr>
                              <th className="font-08 text-dark2 ">Session 01</th>
                              <th className="font-08 text-dark2 ">Session 02</th>
                              <th className="font-08 text-dark2 ">Actions</th>
                              </tr>
                          </thead>
                          <tbody>
                          {parallelList && parallelList.map((i) => this.renderTable(i))}
                            
                          </tbody>
                      </table>
                  </div>
              </div>
              </div>
          </main>
        </div>
        );}

        renderTable = (item) => {
            return (
                    <tr>
                        <td>
                            <ul className="list-group">
                                <li className="py-0 border-0 list-group-item">{item.session_01.lecturer}</li>
                                <li className="py-0 border-0 list-group-item">{item.session_01.tag}</li>
                                <li className="py-0 border-0 list-group-item">{item.session_01.subject}</li>
                                <li className="py-0 border-0 list-group-item">{item.session_01.group}</li>
                            </ul>
                        </td>
                        <td>
                        <ul className="list-group">
                                <li className="py-0 border-0 list-group-item">{item.session_02.lecturer}</li>
                                <li className="py-0 border-0 list-group-item">{item.session_02.tag}</li>
                                <li className="py-0 border-0 list-group-item">{item.session_02.subject}</li>
                                <li className="py-0 border-0 list-group-item">{item.session_02.group}</li>
                            </ul>
                        </td>
                        <td>
                        <span onClick={() => this.deleteItem(item)} className="badge badge-info rounded-0 bg-white text-danger border border-secondary click font-weight-bold ml-2">Delete</span>
                        </td>
                    </tr>
            )
          }
    deleteItem = item => {
        const id = item._id;
        CONFIG.setDeleteConfirmAlert('Delete' , 'Are you sure you want to delete this Consecutive session ? ' , 
        () => this.deleted(item._id),
        () => console.log('cancel'))
    }
    
    deleted = async (id) => {
        const res = await consessionpa.deleteGenerate(id);
        if(res.status == 200){
            CONFIG.setToast("Consecutive Session Deleted Successfully");
            this.loadData();
        }else{
            CONFIG.setToast(res.message);
        }
    }




}


export default consecutiveSessions;
