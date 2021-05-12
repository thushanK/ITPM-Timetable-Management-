import React from 'react';
import Sidebar from '../../components/Sidebar'
import {FormInput , FormSelect , MultiFormSelect} from '../../components/Form'
import STD_CONTROLLER from '../../controllers/Student.Controller';
import CONFIG from '../../controllers/Config.controller';
import moment from 'moment';


class AllocateSubGroup extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            parallelList : [],
            days_count: 'NONE',
            date: 'NONE',
            start : '00:00:00' ,
            end : '00:00:00' ,
            days : [],
            errors : { 
                days_count : false , 
                group_name : false ,
                days : false ,
                time : false 
            }
        };
    }

    async componentDidMount() {
        const res = await STD_CONTROLLER.getAllStudent();
       secutive 
        this.setState({ parallelList :  res.data });
        console.log(this.state.parallelList);
    }

    formValueChange = (e) => {
        this.setState({[e.target.name] : e.target.value  });
    }

    timeChange = (e) => {
        let result = false;
        if(e.target.name == 'start'){
            result = !this.startimebefore(e.target.value , this.state.end)
        }else{
            result = !this.startimebefore( this.state.start , e.target.value)
        }
        this.setState({[e.target.name] : e.target.value , errors : {...this.state.errors , time : result  } });
    }

    handleMultiselect = (newValue) => {
        this.setState({ tags: newValue == null ? [] : newValue  });
        console.log(newValue);
    };

    onFormSubmit = async (e) => {
        e.preventDefault();
        var ret = this.validate();
        console.log(ret);

       
    }

    render(){
        const {errors} = this.state;
    return (
        <div className="app" >
        <Sidebar activemenu={'ALLOCATE'}   submenu={'ALLOCATE_SUBGROUP'} />
        <main>
            <div className="container-fluid" >
            <div className="row" >
                <div className="col-12 shadow-sm rounded bg-white mt-1" >
                    <h6 className="text-header py-3 mb-0 font-weight-bold line-hight-1">Allocate Subgroup<br></br>
                    <span className="text-muted small">You can allocate Subgroup</span></h6>
                </div>
                <div className="col-12 shadow-sm rounded bg-white mt-3 pb-1" >
                <form onSubmit={(e) => this.onFormSubmit(e)}>
                <div className="row mt-1 pb-3" >
                    <div className="col-md-6 mt-2 mb-1" >
                    <FormSelect 
                                label={'Select a Subgroup'}
                                options={this.renderSessions()}
                                error={false}
                                selected={this.state.lecture}
                                onChange={this.formValueChange}
                                name="lecture"
                                error_meesage={'*Session required'}
                            />
                    </div>
                    <div className="col-md-6 mt-2 mb-1" >
                    <FormSelect 
                                label={'Select the Date'}
                                options={WD_DAYS}
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
                                name="start"
                                onChange={this.timeChange}
                                value={this.state.start}
                                error_meesage={'*Start time required'}
                                type={'time'}
                            />
                    </div>
                    <div className="col-md-6 mt-1 mb-1" >
                            <FormInput 
                                label={'Select the End Time'}
                                placeholder={'Enter End time'}
                                error={errors.time}
                                name="end"
                                onChange={this.timeChange}
                                value={this.state.end}
                                error_meesage={'*End time should be less than start time'}
                                type={'time'}
                            />
                    </div>
                    <div className="col-md-12 mt-1 mb-1" >
                            <button type="submit" className="btn-outline-info mt-2 btn btn-sm px-2 ">Add Allocate Subgroup</button>
                    </div>
                </div>
                </form>
                </div>
            </div>
            </div>
        </main>
    </div>
    );}

    renderSessions = () => {
        return [{label : 'Select a subgroup', value : ''} , 
        ...this.state.parallelList.map( item => {
            return {
                label : `${item.subgroup_mo}`,
                value : item._id 
            }
        })]
    }

    validate = () => {
        let { days_count, group_name , days , start ,end } = this.state;
        let count = 0;
        let errors = {}

        if( days_count == 'NONE'){
            errors.days_count = true
            count++
        }else{
            errors.days_count = false 
        }

        if( group_name.length == 0 ){
            errors.group_name = true
            count++
        }else{
            errors.group_name = false 
        }
       
        if( days.length == 0 ){
            errors.days = true
            count++
        }else{
            errors.days = false 
        }

        if( !this.startimebefore(start , end ) ){
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
export default AllocateSubGroup;
