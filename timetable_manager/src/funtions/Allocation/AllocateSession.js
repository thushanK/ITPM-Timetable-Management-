import React from 'react';
import Sidebar from '../../components/Sidebar'
import {FormInput , FormSelect , MultiFormSelect} from '../../components/Form'
import Session_CONTROLLER from '../../controllers/Session.Controller';
import Config from '../../controllers/Config.controller';
import moment from 'moment';
import allocatSess_CONTROLLER from '../../controllers/allocateSession.controller';

import {addNotAvailableLec, getAllLecs} from '../../controllers/allocateSession.controller';



class AllocateSession extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            parallelList : [],
            lectList:[],
            Session: '',
            date: '1',
            start_time : '00:00:00' ,
            end_time : '00:00:00' ,
            snv: [],
            errors : { 
                days_count : false , 
                group_name : false ,
                days : false ,
                time : false 
            }
        };
    }

    async componentDidMount() {
        
        this.load_data();
    
    }

    load_data = async () => {
        
        getAllLecs().then( results => {
            this.setState({lectList: results.result
            });
            console.log("data ", results.result );
        }
        ).catch( err=> {
            console.log(err);
        })
    }

    formValueChange = (e) => {
        this.setState({[e.target.name] : e.target.value  });
        console.log("form value changed: ", e.target);
        
    }


    onFormSubmit = async (e) => {
        e.preventDefault();
        console.log("Session ID : ", this.state.Session);
        console.log("Day: ", this.state.date);
      
        console.log("state lecs: ", this.state.lectList);
        const lecID = this.state.lectList.find(i => i._id == this.state.Session )

        console.log(lecID)
        const snv =  [...lecID.snv , 
            {  day : this.state.date , 
               s_time : moment(this.state.start_time , 'HH;mm').format('HH:mm:ss') ,
               e_time : moment(this.state.end_time , 'HH;mm').format('HH:mm:ss') ,
            }];

        let passData = {
            id: lecID._id,
            snv: snv
        }

        addNotAvailableLec(passData).then( result => {
            if(result.status == 200 ){
                Config.setToast('Added Successfully!');
                this.load_data()
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
         let result = false;
        if(e.target.name == 'start'){
            result = !this.startimebefore(e.target.value , this.state.end_time)
        }else{
            result = !this.startimebefore( this.state.start , e.target.value)
        }
        this.setState({[e.target.name] : e.target.value , errors : {...this.state.errors , time : result  } });
    }

    render(){
        const {errors} = this.state;
    return (
        <div className="app" >
        <Sidebar activemenu={'ALLOCATE'}   submenu={'ALLOCATE_SESSION'} />
        <main>
            <div className="container-fluid" >
            <div className="row" >
                <div className="col-12 shadow-sm rounded bg-white mt-1" >
                    <h6 className="text-header py-3 mb-0 font-weight-bold line-hight-1">Allocate Session<br></br>
                    <span className="text-muted small">Allocate Session</span></h6>
                </div>
                <div className="col-12 shadow-sm rounded bg-white mt-3 pb-1" >
                <form onSubmit={(e) => this.onFormSubmit(e)}>
                <div className="row mt-1 pb-3" >
                    <div className="col-md-6 mt-2 mb-1" >
                            <FormSelect 
                                label={'Select Session'}
                                options={this.renderSessions()}
                                error={false}
                                selected={this.state.Session}
                                onChange={this.formValueChange}
                                name="Session"
                                error_meesage={'*Session required'}
                            />
                    </div>
                    <div className="col-md-6 mt-2 mb-1" >
                    <FormSelect 
                                label={'Select the Date'}
                                options={this.renderDays()}
                                error={errors.date}
                                value={this.state.date}
                                onChange={this.formValueChange}
                                name="date"
                                error_meesage={'*Date required'}
                            />
                    </div>
                   
                    <div className="col-md-6 mt-1 mb-1" >
                    <FormInput 
                                label={'Select the Start Time'}
                                placeholder={'Enter start time'}
                                error={false}
                                name="start_time"
                                onChange={this.timeChange}
                                value={this.state.start_time}
                                error_meesage={'*Start time required'}
                                type={'time'}
                            />
                    </div>
                    <div className="col-md-6 mt-1 mb-1" >
                    <FormInput 
                                label={'Select the End Time'}
                                placeholder={'Enter End time'}
                                error={errors.time}
                                name="end_time"
                                onChange={this.timeChange}
                                value={this.state.end_time}
                                error_meesage={'*End time should be less than start time'}
                                type={'time'}
                            />
                    </div>
                  
                    <div className="col-md-12 mt-1 mb-1" >
                            <button type="submit" className="btn-outline-info mt-2 btn btn-sm px-2 ">Add Allocate Session</button>
                    </div>
                </div>
                </form>
                </div>

                <div className="col-12 shadow-sm rounded bg-white mt-3" >
                <table class="table borderless customtable">
                    <thead>
                        <tr>
                        <th className="font-08 text-dark2 ">Session</th>
                        <th className="font-08 text-dark2 ">Date</th>
                        <th className="font-08 text-dark2 ">Starting Time</th>
                        <th className="font-08 text-dark2 ">Ending Time</th>
                        <th className="font-08 text-dark2 ">Action</th>
                        </tr>
                    </thead>
                    <tbody>
                    { this.renderAlocateLectures().map( (i) => this.renderTable(i))}
                   
                        
                    </tbody>
                </table>
            </div>
            </div>
            </div>
        </main>
    </div>
    );}

    renderTable = (item ) => {
        console.log("render table" , item);
        return (
            <tr>
                {}
                <td>{item.lectuName} - {item.subID} - {item.groupid}- ({item.tag})</td>
                <td>{this.renderWeekday(item.day)}</td>
                <td>{moment(item.s_time , 'HH:mm:ss').format('LT')}</td>
                <td>{moment(item.e_time , 'HH:mm:ss').format('LT')}</td>
                <td>
                    {}
                {}
                    <span  onClick={() => this.deleteTagItem(item)} className="badge badge-info rounded-0 bg-white text-danger border border-secondary click font-weight-bold ml-2">Delete</span>
                    {}
                </td>
            </tr>
        )
      }

          
deleteTagItem = props => {

    const filter = this.state.lectList.find(i => i._id == props.lecturer);
    console.log("Puka: ", props);
    const snv =   filter.snv.filter( item => {
                    if(item.day == props.day && item.e_time == props.e_time && item.s_time == props.s_time){
                        return false;
                    }else{
                    return true;
                    }
                })
 
    console.log("Submit room ID: ", snv );
   
 
     const newAva = {    id : filter._id ,
                         snv : snv ,
                       }
  
     addNotAvailableLec(newAva).then( result => {
         if(result.status == 200 ){
             Config.setToast('Deleted Successfully!');
             this.load_data()
         }else{
             Config.setErrorToast('Error Occured!');
         }
     })
     .catch( error => {
         console.log(error);
         Config.setErrorToast('Error Occured!');
     })
 }

    rendersnv = () => {
        const rooms =  this.state.lectList.data.filter( item => item._id == this.state.Session );
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

    renderSessions = () => {
        return [ 
        ...this.state.lectList.map( item => {
            return {
                label : `${item.lecturer.name} - ${item.subject.name} - ${item.group.subgroup_ID} (${item.tag.name})`,
                value : item._id 
            }
        })]
    }

    // {label : 'Select a Session', value : ''} ,
    renderWeekday = (id) => {
        const days = ['Monday' , 'Tuesday' , 'Wednesday' , 'Thursday' , 'Friday' , 'Saturday' , 'Sunday'];
        return days[id-1]
    }

    renderDays = () => {    
        return [{ label : 'Monday', value: '1' }, { label : 'Tuesday', value: '2' }, 
            { label : 'Wednesday', value: '3' }, { label : 'Thursday', value: '4' }, { label : 'Friday', value: '5' }, 
            { label : 'Saturday', value: '6' }, { label : 'Sunday', value: '7' }]
    }

    renderAlocateLectures = () => {
        const { lectList} = this.state;
        
        return lectList.reduce( (acc, currrent) => {
                if(currrent.snv.length > 0 ){
                    console.log("gaaaa", currrent);
                    return [...acc, ...currrent.snv.map( i => { 
                        return {
                            ...i, lecturer : currrent._id,
                            groupid : currrent.group.subgroup_ID,
                            subID : currrent.subject.name,
                            lectuName : currrent.lecturer.name,
                            tag : currrent.tag.name,
                        }
                    }) ]
                }else{
                    return acc
                }
                
        },[])
    }
    

    validate = () => {
        let { Session, date , end_time ,start_time } = this.state;
        let count = 0;
        let errors = {}

        if( Session == 'NONE'){
            errors.Session = true
            count++
        }else{
            errors.Session = false 
        }

        if( date == 'NONE'){
            errors.date = true
            count++
        }else{
            errors.date = false 
        }

        if( !this.startimebefore(start_time , end_time ) ){
            errors.time = true
            count++
        }else{
            errors.time = false 
        }
       
        this.setState({errors})
        return count == 0;
    }

    is_filled = (name , value ) => {
       let result = ( value.length == 0 ||  value == 'NONE')
       this.setState({ errors : {...this.state.errors , [name] : result  } })
    }

    startimebefore = (start_time , end_time ) => {
        var startTime = moment(start_time , 'HH:mm:ss');
        var endTime = moment(end_time, 'HH:mm:ss');
        return startTime.isBefore(endTime) 
    }


}



const WD_DAYS = [{ label : 'Select the Date' ,value : "NONE" } , 
...['Monday','Tuesday','wednesday','Thursday','Friday' , 'Saturday' , 'Sunday'].map( i => {
    return{
        label : i,
         value : i 
    }
})];

export default AllocateSession;
