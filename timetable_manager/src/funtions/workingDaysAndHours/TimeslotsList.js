import React from 'react';
import Sidebar from '../../components/Sidebar'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTable } from '@fortawesome/free-solid-svg-icons';
import {Link} from 'react-router-dom'
import {getWorkingDays } from '../../controllers/WorkingDaysController'
import {getTimeslots } from '../../controllers/TimeslotsController'
import moment from 'moment'

class TimeslotsList extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            loading : false,
            groups : [],
            active : null,
            timeslots : [],
            times_loading : true,
        };
    }

    componentDidMount(){
        getWorkingDays()
        .then( result => {
            var index = 0;
            console.log(this.props.match.params.id);
            if( this.props.match.params.id == '0' ){
                index = 0;
            }else{
                index = result.findIndex( item => item._id == this.props.match.params.id);
                console.log('called');
            }
        
            this.setState({
                loading : false , 
                groups : result,
                active : result.length > 0 ? result[index] : null 
            });
        })
        .catch( err => {
            console.log(err);
            this.setState({loading : false});
        })

        getTimeslots()
        .then( result => {
            this.setState({
                times_loading : false , 
                timeslots : result,
            });
        })
        .catch( err => {
            console.log(err);
            this.setState({times_loading : false});
        })
    }

    Loading = () => (
        <div className="col-12 shadow-sm rounded bg-white mt-2 py-2" >
            <div className="d-flex justify-content-center mt-1" >
                <div className="spinner-border spinner-border-sm" role="status">
                </div><h6 className="px-2 font-08">Loading Records..</h6>
            </div>
        </div>
        );

    NoResult = () => (
    <div className="col-12 shadow-sm rounded bg-white mt-2 py-2" >
        <div className="d-flex justify-content-center mt-1" >
            <h6 className="px-2 font-08">Sorry , No Result Found !</h6>
        </div>
    </div>
    );

    changeGroup = (e) => {
        var value = e.target.value;
        this.setState({
            active : this.state.groups.find( item => item._id == value )
        });
    }


    render(){
        const {loading , groups ,  active} = this.state;
    return (
        <div className="app" >
        <Sidebar activemenu={'WORKING_DAYS'}   submenu={'TIMESLOTS'} />
        <main>
            <div className="container-fluid" >
            <div className="row" >
                <div className="col-12 shadow-sm rounded bg-white mt-1" >
                    <h6 className="text-header py-3 mb-0 font-weight-bold line-hight-1">Working Days Group {active != null && ` - ${active.name}`}<br></br>
                    <span className="text-muted small">Details about list</span>
                    </h6>
                </div>

                { loading && <this.Loading/> } 
                                
                { !loading && groups.length == 0 && <this.NoResult/> } 

                { !loading && groups.length > 0 && active != null && <>
                <div className="col-4  mt-2 pl-0" >
                    <div className="shadow-sm rounded bg-white pb-3 px-3 d-flex h-100">
                        <h6 className="text-header pt-3 mb-0 font-weight-bold line-hight-1">#No Days <br></br>
                        <span className="text-muted small">Per week</span>
                        </h6>
                <h3 className="text-info font-weight-bold ml-auto my-auto" >0{ active.daycount}</h3>
                    </div>
                </div>

                <div className="col-8  mt-2 px-0" >
                    <div className="shadow-sm rounded bg-white pb-3 px-3 d-flex">
                        <h6 className="text-header pt-3 mb-0 font-weight-bold line-hight-1">Working Days<br></br>
                        <span className="text-muted small">Per week</span>
                        </h6>
                        <div className="ml-auto my-auto" >
                        { active.dayslist.map( (item,i) => (
                            <span key={i}
                                className="badge rounded-0 bg-white text-dark border border-dark click px-3 mx-1">
                                    {item}
                            </span>
                        ))  
                            }
                        </div>
                    </div>
                </div>

                <div className="col-12 shadow-sm rounded bg-white mt-2 " >
                    <div className="d-flex mt-2" >
                        <h6 className="text-header pt-2 mb-0 font-weight-bold line-hight-1 mr-2" style={{fontSize : '80%'}}>
                            <FontAwesomeIcon icon={faTable} className="mr-1"/>Select Group
                        </h6>
                        <select 
                            onChange={this.changeGroup}
                            className="form-control form-control-sm w-25">
                           {
                               groups.map( (item,i) => (
                               <option 
                                    selected={item._id == active._id }
                                    value={item._id} 
                                    key={item._id}>
                                        {item.name}
                                </option>
                               ))
                           }
                        </select>
                    </div>
                    <table class="table borderless customtable mt-2">
                        <thead>
                            <tr>
                            <th className="font-08 text-dark2 ">Timeslot</th>
                            <th className="font-08 text-dark2 ">Start Time</th>
                            <th className="font-08 text-dark2 ">End Time</th>
                            <th className="font-08 text-dark2 ">Duration</th>
                            <th className="font-08 text-dark2 ">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            { !this.state.loading && !this.state.times_loading && <this.LoadData />}                      
                        </tbody>
                    </table>
                </div>

                <div className="col-6 mt-2  pl-0" >
                    <div className="shadow-sm rounded bg-white  pb-3 px-3" >
                        <h6 className="text-header pt-3 mb-0 font-weight-bold line-hight-1">Add Timeslots<br></br>
                        <span className="text-muted small">Add new timeslots</span></h6>
                        <Link to={`/workingdays/timeslot/add/${active._id}`} >
                        <span  className="badge badge-info px-2 py-1 mt-1 bg-white border border-info text-info click ">Add Timeslots</span>
                        </Link>
                    </div>
                </div> 

                <div className="col-6 mt-2  px-0" >
                    <div className="shadow-sm rounded bg-white  pb-3 px-3" >
                        <h6 className="text-header pt-3 mb-0 font-weight-bold line-hight-1">Edit Working Days Group<br></br>
                        <span className="text-muted small">You can edit {active.name} group</span></h6>
                        <Link to={`/workingdays/timeslot/edit/${active._id}`} >
                        <span  className="badge badge-info px-2 py-1 mt-1 bg-white border border-info text-info click ">Edit</span>
                        </Link>
                    </div>
                </div> 
                </>
                }
            </div>
            </div>
        </main>
    </div>
    );}

    
    LoadData = () => {
        const {timeslots , active} = this.state;
        var slots = timeslots.filter(item => item.group_id == active._id)
        
        if(slots == 0 ){
            return (
                <tr>
                    <td className="text-center" colSpan={6}>
                    <div className="d-flex justify-content-center mt-1" >
                        <h6 className="px-2 font-08">Sorry , No Result Found !</h6>
                    </div>
                    </td>
                </tr>
            )
        }
        return slots.sort((a, b) => moment(a.start_time , 'HH:mm:ss').valueOf() 
        - moment(b.start_time , 'HH:mm:ss').valueOf() ).map( (row,i) => (
            <tr key={i}>
                <td className="text-dark">SLOT {("0" + (i+1) ).slice(-2)}</td>
                <td>{moment(row.start_time, 'HH:mm:ss').format('hh:mm A')}</td>
                <td>{moment(row.end_time, 'HH:mm:ss').format('hh:mm A')}</td>
                <td>{row.type == '1' ? '01 Hour' : '30 Minutes'}</td>
                <td>
                    <Link to={`/workingdays/timeslots/edit/${row._id}`} >
                    <span className="badge badge-info rounded-0 bg-white text-info border border-info click font-weight-bold mx-2">Edit</span>
                    </Link>
                    <Link to={`/workingdays/timeslots/delete/${row._id}`} >
                    <span className="badge badge-info rounded-0 bg-white text-danger border border-danger click font-weight-bold ">Delete</span>
                    </Link>
                </td>  
            </tr>
            ));
    
    }
}

export default TimeslotsList;
