import React from 'react';
import Sidebar from '../../components/Sidebar';
import {FormInput , FormSelect , MultiFormSelect} from '../../components/Form'
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faWindowClose } from '@fortawesome/free-solid-svg-icons'
import Config from '../../controllers/Config.controller'
import moment from 'moment'
import {getAllSessions , getAllRooms, addNotAvailable} from '../../controllers/Suitable.Controller'

class RoomsNotAvailable extends React.Component {

  constructor(props){
      super(props);
      this.state = {
          rooms: [],
          room: '',
          snv : [] ,
          day: '1',
          sTime: '00:00:00',
          eTime: '00:00:00',
          errors: {
            sTime: false,
            eTime: false,
          }
      }
  }
  
  componentDidMount() {
    this.loadData(true);
  }

  loadData = (first) => {
    getAllRooms()
    .then( results => {
        console.log("Result: ", results);
        this.setState({rooms : results})
    })
    .catch( err => {
       console.log(err);
    })
  }

  onFormSubmit = (e) => {
    e.preventDefault();


    const snv =  [...this.rendersnv() , 
        {  day : this.state.day , 
           s_time : moment(this.state.sTime , 'HH;mm').format('HH:mm:ss') ,
           e_time : moment(this.state.eTime , 'HH;mm').format('HH:mm:ss') ,
        }];
    
    console.log("Room Name: ", this.state.room);
    console.log("State rooms: ", this.state.rooms);
    

    if(this.validate()){
        const active_room_id = this.state.rooms.find( i => i.name == this.state.room)
    
        console.log("Submit room ID: ", active_room_id._id);

        const newAva = {    id : active_room_id._id,
                        snv : snv ,
                      }

        addNotAvailable(newAva).then( result => {
            if(result.status == 200 ){
                Config.setToast('Added Successfully!');
                this.loadData(false);
            }else{
                Config.setErrorToast('Something Wrong Happend!');
            }
        })
        .catch( error => {
            console.log(error);
            Config.setErrorToast('Something Wrong Happend!');
        })
    } 
  }


    formValueChange = (e) => {
        this.setState({ [e.target.name]: e.target.value });
    }

    dropdownOnChange = (e) => {
        if(e.target.value != ''){
            this.setState({ room : e.target.value })
        }
        console.log("dropdown changed");


    }

  
  render(){
    const {rooms , snv, errors} = this.state;
  return (
    <div className="app" >
        <Sidebar activemenu={'Rooms'} submenu={'NOT_Available'} />
        <main>
            <div className="container-fluid" >
                <div className="row" >
                    <div className="col-12 shadow-sm rounded bg-white mt-1" >
                        <h6 className="text-header py-3 mb-0 font-weight-bold line-hight-1">Not Available times for Rooms<br></br>
                        <span className="text-muted small">User can add times where room is not available
                        </span></h6>
                    </div>

                    <div className="col-12 shadow-sm rounded bg-white mt-3 pb-1" >
                        <form onSubmit={(e) => this.onFormSubmit(e)}>
                            <div className="row mt-1 pb-3" >
                                <div className="col-md-6 mt-2 mb-1" >
                                    <FormSelect
                                        label={'Room'}
                                        options={this.renderRooms()}
                                        name="room"
                                        value={this.state.room}
                                        onChange={this.dropdownOnChange}
                                        error={errors.room}
                                        error_meesage={'*Please select a room'}
                                    />
                                </div>
                                <div className="col-md-6 mt-2 mb-1" >
                                    <FormSelect
                                            label={'Day'}
                                            options={this.renderDays()}
                                            name="day"
                                            value={this.state.day}
                                            onChange={this.formValueChange}
                                        />
                                </div>
                                <div className="col-md-6 mt-2 mb-1" >
                                    <FormInput
                                        label={'Start Time'}
                                        type={'time'}
                                        name={'sTime'}
                                        onChange={this.formValueChange}
                                        value={this.state.sTime}
                                        error={ errors.sTime}
                                        error_meesage={'*Start Time Required'}
                                    />
                                </div>
                                <div className="col-md-6 mt-2 mb-1" >
                                    <FormInput
                                        label={'End Time'}
                                        type={'time'}
                                        name={'eTime'}
                                        onChange={this.formValueChange}
                                        value={this.state.eTime}
                                        error={ errors.eTime}
                                        error_meesage={'*End Time Required'}
                                    />
                                </div>
                                <div className="col-md-12 mt-1 mb-1" >
                                    <button type="submit" className="btn-outline-info mt-2 btn btn-sm px-2 ">Submit</button>
                                </div>
                            </div>
                        </form>    
                    </div>
                    { this.state.room.length > 0 && 
                    <div className="col-12 shadow-sm rounded bg-white mt-3" >
                        <h6 className="text-header pt-3 pb-2 mb-0 font-weight-bold line-hight-1">{this.state.room}
                        <span className="text-muted small"> Not Available Times
                        </span></h6>

                        <div className="d-flex-custom border border-secondary2 rounded-sm p-2 mb-3" >
                            { this.rendersnv().map( item => (
                                <div className="bg-card border border-secondary2 py-1 px-3 rounded m-1" >
                                {`${this.renderWeekday(item.day)}  ${moment(item.s_time, 'HH:mm:ss').format('LT')} - ${moment(item.e_time,'HH:mm:ss').format('LT')}`}<FontAwesomeIcon 
                                onClick={() => this.deleteTagItem(item)}
                                className="mx-2 text-dark pointer" icon={faWindowClose}></FontAwesomeIcon>
                                </div>
                            )) }
                            { this.rendersnv().length == 0 && <NotFound/>}
                        </div>
                    </div>
                    }
                </div>
            </div>
        </main>
    </div>
  );
}


renderRooms = () => {
    
    return [{ label : 'Select Rooms' , value : ''} , ...this.state.rooms.map( i => {
        return {
            label : i.name,
            value : i.name,
        }
    })]
}

rendersnv = () => {
    const rooms =  this.state.rooms.filter( item => item.name == this.state.room );
    if(rooms.length > 0){
        return rooms[0].snv
    }else{
        return [];
    }
}

renderDays = () => {    
    return [{ label : 'Monday', value: '1' }, { label : 'Tuesday', value: '2' }, 
        { label : 'Wednesday', value: '3' }, { label : 'Thursday', value: '4' }, { label : 'Friday', value: '5' }, 
        { label : 'Saturday', value: '6' }, { label : 'Sunday', value: '7' }]
}

renderWeekday = (id) => {
    const days = ['Monday' , 'Tuesday' , 'Wednesday' , 'Thursday' , 'Friday' , 'Saturday' , 'Sunday'];
    return days[id-1]
}

deleteTagItem = props => {
   const filter = this.rendersnv().filter( item => {
       if(item.day == props.day && item.e_time == props.e_time && item.s_time == props.s_time){
           return false;
       }else{
        return true;
       }
   })

   const active_room_id = this.state.rooms.find( i => i.name == this.state.room)
   console.log("Submit room ID: ", active_room_id._id);

    const newAva = {    id : active_room_id._id,
                        snv : filter ,
                      }

    addNotAvailable(newAva).then( result => {
        if(result.status == 200 ){
            Config.setToast('Deleted Successfully!');
            this.loadData(false);
        }else{
            Config.setErrorToast('Something Wrong Happend!');
        }
    })
    .catch( error => {
        console.log(error);
        Config.setErrorToast('Something Wrong Happend!');
    })
}

renderSelectedRooms = () => {

}

validate = () => {
    let { day, room, eTime, sTime } = this.state;
    let count = 0;
    let errors = {}

    if( day.length == 0){
        errors.day = true
        count++
    }else{
        errors.day = false 
    }

    if( room.length == 0 ){
        errors.room = true
        count++
    }else{
        errors.room = false 
    }

    if( !this.startimebefore(sTime , eTime ) ){
        errors.sTime = true
        errors.eTime = true
        count++
    }else{
        errors.sTime = false 
        errors.eTime = false 
    }
   
    this.setState({errors})
    return count == 0;
}


startimebefore = (start , end ) => {
    var startTime = moment(start , 'HH:mm:ss');
    var endTime = moment(end, 'HH:mm:ss');
    return startTime.isBefore(endTime) 
}


}


const NotFound = () => (
    <div className="bg-card border border-secondary2 py-1 px-3 rounded m-1" >
    No Records Found !
    </div>
)


export default RoomsNotAvailable;
