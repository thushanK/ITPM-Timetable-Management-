import React from 'react';
import Sidebar from '../../components/Sidebar'
import {FormInput , FormSelect , MultiFormSelect} from '../../components/Form'
import moment from 'moment';
import { omit } from 'lodash'
import Config from '../../controllers/Config.controller'
import {getTimeslotSingle , deleteTimeslot } from '../../controllers/TimeslotsController'
import { withRouter } from "react-router-dom";

class DeleteTimeslot extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            id : props.match.params.id,
            timeslot : null,
            loading : true,
        };
    }

    componentDidMount(){
        getTimeslotSingle(this.props.match.params.id)
        .then( result => {
          this.setState({
            timeslot : result,
            loading : false,
          })
        })
        .catch( err => {
            console.log(err);
            this.setState({loading : false});
        })
    }

    deleteItem = () => {
        deleteTimeslot(this.state.id)
        .then( result => {
            if(result.status == 200 ){
                Config.setToast('Deleted Successfully!');
                this.props.history.push(`/workingdays/timeslots/${this.state.timeslot.group_id}`)
            }else{
                Config.setErrorToast('Error Occured!');
            }
        })
        .catch( error => {
            console.log(error);
            Config.setErrorToast('Error Occured!');
        })
    }


    render(){
        const {loading , timeslot} = this.state;
    return (
        <div className="app" >
        <Sidebar activemenu={'WORKING_DAYS'}   submenu={'TIMESLOTS'} />
        <main>
            <div className="container-fluid" >
            <div className="row" >
                <div className="col-12 shadow-sm rounded bg-white mt-1" >
                    <h6 className="text-header py-3 mb-0 font-weight-bold line-hight-1">Delete Timeslot<br></br>
    <span className="text-muted small">Delete confirmation</span></h6>
                </div>
                <div className="col-12 shadow-sm rounded bg-white mt-3 pb-1" >
    
                <div className="row mt-1 pb-3" >
                    <div className="col-md-12 mt-2" >
                    <h6 style={{fontSize : '0.9rem'}}
                        className="text-header text-danger mb-0 font-weight-bold line-hight-1">Are you sure you want to delete this timeslot ?<br></br>
                    <span className="text-muted small">This process can't be undone, All the relevant details will be permanently deleted !</span></h6>
                    </div>
                    { !loading && timeslot != null &&  
                    <div className="col-md-12 mt-3" >
                        <table class="table borderless customtable mb-0">
                            <thead>
                                <tr>
                                <th className="font-08 text-dark2 ">Start Time</th>
                                <th className="font-08 text-dark2 ">End Time</th>
                                <th className="font-08 text-dark2 ">Duration</th>
                                <th className="font-08 text-dark2 ">Group</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td>{moment(timeslot.start_time, 'HH:mm:ss').format('hh:mm A')}</td>
                                    <td>{moment(timeslot.end_time, 'HH:mm:ss').format('hh:mm A')}</td>
                                    <td>{timeslot.type == '1' ? '01 Hour' : '30 Minutes'}</td>                       
                                    <td>{timeslot.group_name}</td>                       
                                </tr>
                            </tbody>
                        </table>
                    </div>}
                    <div className="col-md-12 mt-1 mb-1" >
                    <hr className="my-2"></hr>
                    <button type="button" onClick={this.deleteItem} className="btn-danger mt-2 btn btn-sm px-3 py-1"><button class="w3-button w3-aqua">Delete</button> </button>
                            <button type="button" onClick={() => this.props.history.push(`/workingdays/timeslots/${this.state.timeslot.group_id}`)} className="btn-light mt-2 btn btn-sm px-3 py-1 border mx-2">Cancel</button>
                    </div>
                </div>
                </div>
            </div>
            </div>
        </main>
    </div>
    );}

    

}

const WD_OPTIONS = [{ label : 'Select working days count' ,value : "NONE" } , 
...[1,2,3,4,5,6,7].map( i => {
    return{
        label : i + ' Days' ,
         value : i 
    }
})];

const WD_DAYS = [...moment.weekdays().map( i => ({label : i  , value : i }) )];


export default withRouter(DeleteTimeslot);
