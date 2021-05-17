import React from 'react';
import Sidebar from '../../components/Sidebar'
import {FormInput , FormSelect , MultiFormSelect} from '../../components/Form'
import moment from 'moment';
import Config from '../../controllers/Config.controller'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faExclamationTriangle } from '@fortawesome/free-solid-svg-icons';
import { getTimeslotSingle , updateTimeslot } from '../../controllers/TimeslotsController'

class EditTimeslot extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            id : props.match.params.id,
            type : '1',
            group_id : 0,
            group : '',
            start : '00:00:00' ,
            end : '00:00:00',
            start_time : '00:00:00',
            end_time : '23:30:00',
            conflict : false,
            loading : true
        };
    }

    componentDidMount(){
        getTimeslotSingle(this.props.match.params.id)
        .then( result => {
            this.setState({
                loading : false,
                type : result.type,
                group_id : result.group_id,
                group : result.group_name,
                start : result.start_time ,
                end : result.end_time,
            })
        })
        .catch(err => {
            console.log(err);
            this.setState({ loading : false });
        })


    }

    formValueChange = (e) => {
        this.setState({[e.target.name] : e.target.value  });
        if(e.target.name == 'type' ){
            this.changeTime( 'start' , this.state.start );
        }
    }

    onFormSubmit = (e) => {
        e.preventDefault();
        updateTimeslot({
            id : this.state.id,
            group_id : this.state.group_id,
            group_name: this.state.group,
            type : this.state.type,
            start_time: this.state.start,
            end_time: this.state.end,
        })
        .then( result => {
            if(result.status == 200 ){
                Config.setToast('Updated Successfully!');
            }else{
                Config.setErrorToast('Error Occured!');
            }
        })
        .catch( error => {
            console.log(error);
            Config.setErrorToast('Error Occured!');
        })
        
    }

    timeChange = (e) => {
        this.changeTime(e.target.name , e.target.value);
    }

    render(){
        const timeslots = this.generateSlots();
        const {loading} = this.state;

    return (
        <div className="app" >
        <Sidebar activemenu={'WORKING_DAYS'}   submenu={'TIMESLOTS'} />
        <main>
            <div className="container-fluid" >
            <div className="row" >
                <div className="col-12 shadow-sm rounded bg-white mt-1" >
                    <h6 className="text-header py-3 mb-0 font-weight-bold line-hight-1">Edit Timeslot<br></br>
                    <span className="text-muted small">You can edit timeslots by filling below form</span></h6>
                </div>
                { loading && <this.Loading/> } 

                { !loading && 
                <div className="col-12 shadow-sm rounded bg-white mt-3 pb-1" >
                <form onSubmit={(e) => this.onFormSubmit(e)}>
                <div className="row mt-1 pb-3" >
                    <div className="col-md-6 mt-2 mb-1" >
                        <FormSelect 
                            label={'Timeslot Type'}
                            options={TYPE_OPTIONS}
                            selected={this.state.type}
                            onChange={this.formValueChange}
                            name="type"
                        />
                    </div>
                    <div className="col-md-6 mt-2 mb-1" >
                        <FormInput 
                            label={'Workdays Group'}
                            value={this.state.group}
                            readOnly={true}
                            name="group"
                    />
                    </div>
                    <div className="col-md-6 mt-1 mb-1" >
                            <FormSelect 
                                label={'Timeslot Start Time'}
                                name="start"
                                options={timeslots.filter( (e,i,a) => i < a.length - 1 )}
                                onChange={this.timeChange}
                                value={this.state.start}
                            />
                    </div>
                    <div className="col-md-6 mt-1 mb-1" >
                            <FormSelect 
                                label={'Timeslot End Time'}
                                name="end"
                                options={timeslots.filter( (e,i) => i != 0 )}
                                onChange={this.timeChange}
                                value={this.state.end}
                            />
                    </div>
                    <div className="col-md-12 mb-1" >
                    <hr className="mt-2 mb-1"></hr>
                            <button type="submit" className="btn-outline-info mt-2 btn btn-sm px-2 "><button class="w3-button w3-aqua">Edit</button> </button>
                    </div>
                </div>
                </form>
                </div>}

                {  this.state.conflict && 
                 <div className="col-12 shadow-sm rounded bg-white mt-2 pt-2 pb-3" >
                    <h6 className="text-header text-warning pt-2 pb-2 mb-0 font-weight-bold line-hight-1">
                        <FontAwesomeIcon icon={faExclamationTriangle}  className="mr-2"/>Same data! Try Again
                    </h6>
                    <h6 className="text-header mb-0  line-hight-1">
                    <span className="text-muted small font-weight-bold">Selected Timeslot already in the system.<br/> Please select different timeslot.</span></h6>
                </div>
                }
            </div>
            </div>
        </main>
    </div>
    );}

    Loading = () => (
        <div className="col-12 shadow-sm rounded py-2 bg-white mt-2" >
            <div className="d-flex justify-content-center mt-1" >
                <div className="spinner-border spinner-border-sm" role="status">
                </div><h6 className="px-2 font-08">Loading..</h6>
            </div>
        </div>
          
    );


    is_filled = (name , value ) => {
       let result = ( value.length == 0 ||  value == 'NONE')
       this.setState({ errors : {...this.state.errors , [name] : result  } })
    } 

    changeTime = (name, value ) => {
       let type = this.state.type == '1' ? 60 : 30;
       let start = '';
       let end = '';

       if(name == 'start'){
            start = value;
            end = moment( value , 'HH:mm:ss').add( type , 'minutes').format('HH:mm:ss') 
       }else{
           end = value;
           start = moment(value , 'HH:mm:ss').subtract( type , 'minutes').format('HH:mm:ss') 
       }

       this.setState({start : start , end : end})
    }

    generateSlots = () => {
        const type =  this.state.type == '1' ? 60 : 30;
        var timeStops = [];
        var startTime = moment(this.state.start_time , 'HH:mm:ss')
        var endTime = moment(this.state.end_time , 'HH:mm:ss')

        while(startTime <= endTime){
            let time = new moment(startTime);
            timeStops.push({ label : time.format('HH:mm a') , value : time.format('HH:mm:ss') });
            startTime.add(30, 'minutes');
        }

        return timeStops;
    }



}

const TYPE_OPTIONS = [{label : '01 Hour' , value : '1'} , {label : '30 Minutes' , value : '30'}];


export default EditTimeslot;
