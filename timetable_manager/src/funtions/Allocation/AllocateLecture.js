import React from 'react';
import Sidebar from '../../components/Sidebar'
import {FormInput , FormSelect , MultiFormSelect} from '../../components/Form'
import Lect_CONTROLLER from '../../controllers/Lecturer.Controller';
import {addNotAvailableLec, getAllLecs} from '../../controllers/allocateLec.controller';
import Config from '../../controllers/Config.controller';
import moment from 'moment';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faWindowClose } from '@fortawesome/free-solid-svg-icons'


class AllocateLec extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            parallelList : [],
            lectList:[],
            lecture: 'NONE',
            date: '1',
            start_time : '00:00:00' ,
            end_time : '00:00:00' ,
            snv: [],
            errors : { 
                days_count : false , 
                group_name : false ,
                days : false ,
                start_time : false ,
                end_time : false ,
            }
        };
    }

    async componentDidMount() {
       
        this.load_data();

      
        
    }

    load_data = async () => {
       
        getAllLecs().then( results => {
            this.setState({lectList: results.data});
            console.log("enawoooooo",results.data);
        }
        ).catch( err=> {
            console.log(err);
        })
    }

    loadData = (first) => {
        if(!first) this.renderTable()
    }

    clear = ()=>{
        this.setState({
            lecture: 'NONE',
            date: 'NONE',
            start_time: '00:00:00',
            end_time: '00:00:00',
        })
    }

    formValueChange = (e) => {
        console.log("form value changed: ", e.target);
        this.setState({[e.target.name] : e.target.value  });
        
    }


    onFormSubmit = async (e) => {
        e.preventDefault();

        console.log("Lec name: ", this.state.lecture);
        console.log("Day: ", this.state.date);
        
        console.log("state lecs: ", this.state.lectList);

       
        const lecID = this.state.lectList.find(i => i.name == this.state.lecture )

        
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

    render(){
        const {errors} = this.state;
        const {lectList} = this.state;
        
       
    return (
        <div className="app" >
        <Sidebar activemenu={'ALLOCATE'}   submenu={'ALLOCATE_LECTURE'} />
        <main>
            <div className="container-fluid" >
            <div className="row" >
                <div className="col-12 shadow-sm rounded bg-white mt-1" >
                    <h6 className="text-header py-3 mb-0 font-weight-bold line-hight-1">Lecture Allocate <br></br>
                    <span className="text-muted small">You can allocate lectures </span></h6>
                </div>
                <div className="col-12 shadow-sm rounded bg-white mt-3 pb-1" >
                <form onSubmit={(e) => this.onFormSubmit(e)}>
                <div className="row mt-1 pb-3" >
                    <div className="col-md-6 mt-2 mb-1" >
                            <FormSelect 
                                label={'Select Lecture'}
                                options={this.renderSessions()}
                                error={errors.lecture}
                                selected={this.state.lecture}
                                onChange={this.formValueChange}
                                name="lecture"
                                error_meesage={'*Lecture required'}
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
                                error={errors.time}
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
                            <button type="submit" className="btn-outline-info mt-2 btn btn-sm px-2 ">Add Allocate Lecture</button>
                    </div>
                </div>
                </form>
                </div>
                {}
                <div className="col-12 shadow-sm rounded bg-white mt-3" >
                <table class="table borderless customtable">
                    <thead>
                        <tr>
                        <th className="font-08 text-dark2 ">Lecture</th>
                        <th className="font-08 text-dark2 ">Day</th>
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
        return (
            <tr>
                {}
                <td>{item.lecturer}</td>
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

    const filter = this.state.lectList.find(i => i.name ==  props.lecturer )
                    
    const snv =   filter.snv.filter( item => {
                    if(item.day == props.day && item.e_time == props.e_time && item.s_time == props.s_time){
                        return false;
                    }else{
                    return true;
                    }
                })
 
    console.log("Submit room ID: ", snv );
    console.log("Submit room ID: ", props.lecturer );
 
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
        const rooms =  this.state.lectList.filter( item => item.name == this.state.lecture );
        if(rooms.length > 0){
            return rooms[0].snv
        }else{
            return [];
        }
    }

    renderWeekday = (id) => {
        const days = ['Monday' , 'Tuesday' , 'Wednesday' , 'Thursday' , 'Friday' , 'Saturday' , 'Sunday'];
        return days[id-1]
    }

    renderSessions = () => {
        return [ 
        ...this.state.lectList.map( item => {
            return {
                label : `${item.name}`,
                value : item.name 
            }
        })]
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
                    return [...acc, ...currrent.snv.map( i => { 
                        return {
                            ...i, lecturer : currrent.name
                        }
                    }) ]
                }else{
                    return acc
                }
                
        },[])
    }
    

    validate = () => {
        let { lecture, date , start_time ,end_time } = this.state;
        let count = 0;
        let errors = {}

        if( lecture === 'NONE'){
            errors.lecture = true
            count++
        }else{
            errors.lecture = false 
        }

        if( date === 'NONE'){
            errors.date = true
            count++
        }else{
            errors.date = false 
        }
    

        if( !this.startimebefore(start_time , end_time ) ){
            errors.start_time = true
            errors.end_time = true
            count++
        }else{
            errors.start_time = false 
            errors.end_time = true
        }
       
        this.setState({errors})
        return count == 0;
    }

    is_filled = (name , value ) => {
       let result = ( value.length == 0 ||  value == 'NONE')
       this.setState({ errors : {...this.state.errors , [name] : result  } })
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

export default AllocateLec;
