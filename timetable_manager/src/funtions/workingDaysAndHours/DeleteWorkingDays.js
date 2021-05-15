import React from 'react';
import Sidebar from '../../components/Sidebar'
import {FormInput , FormSelect , MultiFormSelect} from '../../components/Form'
import moment from 'moment';
import Config from '../../controllers/Config.controller'
import {getWorkingDaysSingle , deleteGroup } from '../../controllers/WorkingDaysController'
import { withRouter } from "react-router-dom";

class DeleteWorkingDays extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            id : props.match.params.id,
            days_count: '',
            group_name: '',
            start : '00:00:00' ,
            end : '00:00:00' ,
            days : [],
            loading : true,
        };
    }

    componentDidMount(){
        console.log(this.props.match.params.id)
        getWorkingDaysSingle(this.props.match.params.id)
        .then( result => {
         console.log(result.dayslist)
          this.setState({
            days_count : result.daycount,
            group_name: result.name,
            start : result.start_time,
            end : result.end_time,
            days : result.dayslist,
            loading : false,
          })
        })
        .catch( err => {
            console.log(err);
            this.setState({loading : false});
        })
    }

    deleteItem = () => {
        deleteGroup(this.state.id)
        .then( result => {
            if(result.status == 200 ){
                Config.setToast(' Successfully Deleted !');
                this.props.history.push("/workingday/manage")
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

    return (
        <div className="app" >
        <Sidebar activemenu={'WORKING_DAYS'}   submenu={'DAYS_LIST'} />
        <main>
            <div className="container-fluid" >
            <div className="row" >
                <div className="col-12 shadow-sm rounded bg-white mt-1" >
                    <h6 className="text-header py-3 mb-0 font-weight-bold line-hight-1">Delete Working Days Group<br></br>
                    <span className="text-muted small">Delete confirmation</span></h6>
                </div>
                <div className="col-12 shadow-sm rounded bg-white mt-3 pb-1" >
    
                <div className="row mt-1 pb-3" >
                    <div className="col-md-12 mt-2" >
                    <h6 style={{fontSize : '0.9rem'}}
                        className="text-header text-danger mb-0 font-weight-bold line-hight-1">Delete this working days list ?<br></br>
                    <span className="text-muted small">This process can't be undone, All the relevant details will be permanently deleted !</span></h6>
                    <hr className="my-2"></hr>
                    </div>
                    <div className="col-md-6 mt-1 mb-1" >
                            <FormInput 
                                label={'Working Days Count'}
                                value={'0' + this.state.days_count + ' Days'}
                                name="days_count"
                                error={false}
                                readOnly={true}
                            />
                    </div>
                    <div className="col-md-6 mt-1 mb-1" >
                            <FormInput 
                                label={'Working Days Group Name'}
                                value={this.state.group_name}
                                name="group_name"
                                error={false}
                                readOnly={true}/>
                    </div>
                    <div className="col-md-12 mt-1 mb-1" >
                            {!this.state.loading && this.state.days && this.state.days.length > 0 &&
                            <MultiFormSelect 
                                label={'Working Days'}
                                error={false}
                                defaultValue={this.state.days.map(i => ({label : i  , value : i }) )}
                                isDisabled={ true }
                                placeholder={'Select working days'}
                                options={WD_DAYS}/>}
                    </div>
                    <div className="col-md-6 mt-1 mb-1" >
                            <FormInput 
                                label={'Working Day Start Time'}
                                error={false}
                                name="start"
                                value={this.state.start}
                                readOnly={true}
                                type={'time'}/>
                    </div>
                    <div className="col-md-6 mt-1 mb-1" >
                            <FormInput 
                                label={'Working Day End Time'}
                                error={false}
                                name="end"
                                value={this.state.end}
                                readOnly={true}
                                type={'time'}/>
                    </div>
                    <div className="col-md-12 mt-1 mb-1" >
                    <hr className="my-2"></hr>
                            <button type="button" onClick={this.deleteItem} className="btn-danger mt-2 btn btn-sm px-3 py-1">Delete</button>
                            <button type="button" onClick={() => this.props.history.push("/workingdays/list")} className="btn-light mt-2 btn btn-sm px-3 py-1 border mx-2">Cancel</button>
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


export default withRouter(DeleteWorkingDays);
