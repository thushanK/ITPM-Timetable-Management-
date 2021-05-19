import React from 'react';
import Sidebar from '../../components/Sidebar'
import {FormInput , FormSelect , MultiFormSelect} from '../../components/Form'
import STD_CONTROLLER from '../../controllers/Student.Controller';
import Config from '../../controllers/Config.controller';
import moment from 'moment';
import {addNotAvailableGroup, getAllGroup} from '../../controllers/allocateGroup.controller';

class AllocateGroup extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            parallelList : [],
            lectList:[],
            snv : [] ,
            Group: 'NONE',
            date: '1',
            start_time : '00:00:00' ,
            end_time : '00:00:00' ,
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

    load_data =async () => {
       
        getAllGroup().then( results => {
            this.setState({lectList: results.data});
             console.log("yeeee",results);
        }
        ).catch( err=> {
            console.log(err);
        })
    }

    clear = ()=>{
        this.setState({
            Group: 'NONE',
            date: 'NONE',
            start_time: '00:00:00',
            end_time: '00:00:00',
        })
    }

    formValueChange = (e) => {
          
          if(e.target.name == "Group"){
            this.setState({Group : e.target.value});
        }
        else{
            this.setState({date: e.target.value});
        }
    }

    timeChange = (e) => {
        let result = false;
       
        this.setState({[e.target.name] : e.target.value , errors : {...this.state.errors , time : result  } });
    }


    handleMultiselect = (newValue) => {
        this.setState({ tags: newValue == null ? [] : newValue  });
        console.log(newValue);
    };

    onFormSubmit = async (e) => {
        e.preventDefault();
        const lecID = this.state.lectList.find(i => i.subgroup_ID == this.state.Group )

        console.log("state lecs: ",lecID._id);
        const snv =  [...lecID.snv , 
            {  day : this.state.date , 
               s_time : moment(this.state.start_time , 'HH;mm').format('HH:mm:ss') ,
               e_time : moment(this.state.end_time , 'HH;mm').format('HH:mm:ss') ,
            }];

        let passData = {
            id: lecID._id,
            snv: snv
        }

        addNotAvailableGroup(passData).then( result => {
            if(result.status == 200 ){
                Config.setToast('Added Successfully!');
                this.load_data();
             
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
        const {errors, lectList} = this.state;
    return (
        <div className="app" >
        <Sidebar activemenu={'ALLOCATIONS'}   submenu={'ALLOCATE_GROUP'} />
        <main>
            <div className="container-fluid" >
            <div className="row" >
                <div className="col-12 shadow-sm rounded bg-white mt-1" >
                    <h6 className="text-header py-3 mb-0 font-weight-bold line-hight-1">Allocate Group<br></br>
                    <span className="text-muted small">Allocate Group</span></h6>
                
                <div className="col-12 shadow-sm rounded bg-white mt-3 pb-1" >
                <form onSubmit={(e) => this.onFormSubmit(e)}>
                <div className="row mt-1 pb-3" >
                    <div className="col-md-6 mt-2 mb-1" >
                    <FormSelect 
                                label={'Select a Group'}
                                options={this.renderSessions()}
                                error={errors.Group}
                                selected={this.state.Group}
                                onChange={this.formValueChange}
                                name="Group"
                                error_meesage={'*Group required'}
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
                    <button type="submit" className="btn-outline-info mt-2 btn btn-sm px-2 ">Add Allocate Group </button>                    </div>
                </div>
                </form>
                </div>
                <div className="col-12 shadow-sm rounded bg-white mt-3" >
                <table class="table borderless customtable">
                    <thead>
                        <tr>
                        <th className="font-08 text-dark2 ">Group</th>
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
            </div>
        </main>
    </div>
    );}

    rendersnv = () => {
        const rooms =  this.state.lectList.filter( item => item.subgroup_ID == this.state.Group );
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

    renderTable = (item ) => {
        return (
            <tr>
                {}
                <td>{item.groupId}</td>
                <td>{this.renderWeekday(item.day)}</td>
                <td>{moment(item.s_time , 'HH:mm:ss').format('LT')}</td>
                <td>{moment(item.e_time , 'HH:mm:ss').format('LT')}</td>
                <td>
                    {}
                {}
                    <span  onClick={() => this.deleteTagItem(item)} className="badge badge-info rounded-0 bg-white text-danger border border-secondary click font-weight-bold ml-2">Delete </span>
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
  
 
     const newAva = {    id : filter._id,
                         snv : snv ,
                       }
 
    addNotAvailableGroup(newAva).then( result => {
         if(result.status == 200 ){
             Config.setToast('Deleted Successfully!');
             this.load_data();
         }else{
             Config.setErrorToast('Error Occured!');
         }
     })
     .catch( error => {
         console.log(error);
         Config.setErrorToast('Error Occured!');
     })
 }
 


    renderSessions = () => {
        return [ 
        ...this.state.lectList.map( item => {
            return {
                label : `${item.subgroup_ID}`,
                value : item.subgroup_ID 
            }
        })]
    }

    
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
                    return [...acc, ...currrent.snv.map( i => { 
                        return {
                            ...i, lecturer : currrent._id,
                            groupId : currrent.subgroup_ID,
                           
                        }
                    }) ]
                }else{
                    return acc
                }
                
        },[])
    }

    validate = () => {
        let { Group, date , start_time ,end_time } = this.state;
        let count = 0;
        let errors = {}

        if( Group == 'NONE'){
            errors.Group = true
            count++
        }else{
            errors.Group = false 
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

    startimebefore = (start , end ) => {
        var startTime = moment(start , 'HH:mm:ss');
        var endTime = moment(end, 'HH:mm:ss');
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


export default AllocateGroup;
