import React from 'react';
import Sidebar from '../../components/Sidebar'
import { FormInput, FormSelect, MultiFormSelect } from '../../components/Form'
import moment from 'moment';
import Config from '../../controllers/Config.controller'
import { insertGroup } from '../../controllers/WorkingDaysController'
import { withRouter } from "react-router-dom";

class AddWorkingDays extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            days_count: 'NONE',
            group_name: '',
            start: '00:00:00',
            end: '00:00:00',
            days: [],
            errors: {
                days_count: false,
                group_name: false,
                days: false,
                time: false
            }
        };
    }

    formValueChange = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        });
        this.is_filled(e.target.name, e.target.value);
    }

    timeChange = (e) => {
        let result = false;
        if (e.target.name == 'start') {
            result = !this.startimebefore(e.target.value, this.state.end)
        } else {
            result = !this.startimebefore(this.state.start, e.target.value)
        }
        this.setState({
            [e.target.name]: e.target.value,
            errors: {...this.state.errors, time: result }
        });
    }

    handleMultiselect = (newValue) => {
        this.setState({
            days: newValue == null ? [] : newValue,
            errors: {...this.state.errors, days: !(newValue && newValue.length > 0), days_count: !(newValue && newValue.length > 0) },
            days_count: newValue && newValue.length > 0 ? newValue.length.toString() : 'NONE'
        });
    };

    onFormSubmit = (e) => {
        e.preventDefault();
        if (this.validate()) {
            insertGroup({
                    name: this.state.group_name,
                    daycount: parseInt(this.state.days_count),
                    dayslist: JSON.stringify(this.state.days.map(d => d.value)),
                    start_time: this.state.start,
                    end_time: this.state.end,
                })
                .then(result => {
                    if (result.status == 200) {
                        Config.setToast('Working Days Group Added Successfully!');
                        this.props.history.push("/workingday/manage")
                    } else {
                        Config.setErrorToast('Something Wrong Happend!');
                    }
                })
                .catch(error => {
                    console.log(error);
                    Config.setErrorToast('Something Wrong Happend!');
                })
        }
    }

    render() {
        const { errors } = this.state;
        return ( < div className = "app" >
            <Sidebar activemenu = { 'WORKING_DAYS' }
            submenu = { 'ADD_WORKING_DAYS' }/>  < main >
            <div className = "container-fluid" >
            <div className = "row" >
            <div className = "col-12 shadow-sm rounded bg-white mt-1" >
            <h6 className = "text-header py-3 mb-0 font-weight-bold line-hight-1" > Add New Working Days < br >
            </br> <span className = "text-muted small" > You can add new working days groups </span > </h6 > 
            </div> <div className = "col-12 shadow-sm rounded bg-white mt-3 pb-1" > 
            <form onSubmit = { (e) => this.onFormSubmit(e)} >
                 <div className = "row mt-1 pb-3" >
                <div className = "col-md-6 mt-2 mb-1" >
                     <FormSelect label = { 'Working Days Count' }
                        options = { WD_OPTIONS }
                        error = { errors.days_count }
                        selected = { this.state.days_count }
                        onChange = { this.formValueChange }
                        name = "days_count"
                        error_meesage = { '*Days count required' }/> </div > < div className = "col-md-6 mt-2 mb-1" >
                     <FormInput label = { 'Working Days Group Name' }
                        placeholder = { 'Enter group name' }
                        error = { errors.group_name }
                        value = { this.state.group_name }
                        name = "group_name"
                        onChange = { this.formValueChange }
                        error_meesage = { '*Group name required' }/> </div > 
                        < div className = "col-md-12 mt-1 mb-1" >

                     <MultiFormSelect label = { 'Working Days' }
                        error = { errors.days }
                        onChange = { this.handleMultiselect }
                        placeholder = { 'Select working days' }
                        options = { WD_DAYS }
                        error_meesage = { '*Wokring days required' }/> </div >
                        <div className = "col-md-6 mt-1 mb-1" >

                    <FormInput label = { 'Working Day Start Time' }
                        placeholder = { 'Enter start time' }
                        error = { false }
                        name = "start"
                        onChange = { this.timeChange }
                        value = { this.state.start }
                        error_meesage = { '*Start time required' }
                        type = { 'time' }/> </div > 
                        < div className = "col-md-6 mt-1 mb-1" >

                    <FormInput label = { 'Working Day End Time' }
                        placeholder = { 'Enter End time' }
                        error = { errors.time }
                        name = "end"
                        onChange = { this.timeChange }
                        value = { this.state.end }
                        error_meesage = { 'End time have to be less than start time' }
                        type = { 'time' }/> </div > 
                        < div className = "col-md-12 mt-1 mb-1" >

     <button type = "submit"
     className = "btn-outline-info mt-2 btn btn-sm px-2 " > Submit </button> </div >
            </div>
             </form > 
             </div> 
              </div > 
               </div> 
               </main > 
               </div>
        );
    }

    validate = () => {
        let { days_count, group_name, days, start, end } = this.state;
        let count = 0;
        let errors = {}

        if (days_count == 'NONE') {
            errors.days_count = true
            count++
        } else {
            errors.days_count = false
        }

        if (group_name.length == 0) {
            errors.group_name = true
            count++
        } else {
            errors.group_name = false
        }

        if (days.length == 0) {
            errors.days = true
            count++
        } else {
            errors.days = false
        }

        if (!this.startimebefore(start, end)) {
            errors.time = true
            count++
        } else {
            errors.time = false
        }

        this.setState({ errors })
        return count == 0;
    }

    is_filled = (name, value) => {
        let result = (value.length == 0 || value == 'NONE')
        this.setState({ errors: {...this.state.errors, [name]: result } })
    }

    startimebefore = (start, end) => {
        var startTime = moment(start, 'HH:mm:ss');
        var endTime = moment(end, 'HH:mm:ss');
        return startTime.isBefore(endTime)
    }


}

const WD_OPTIONS = [{ label: 'Select working days count', value: "NONE" },
    ...[1, 2, 3, 4, 5, 6, 7].map(i => {
        return {
            label: i + ' Days',
            value: i
        }
    })
];

const WD_DAYS = [...moment.weekdays().map(i => ({ label: i, value: i }))];


export default withRouter(AddWorkingDays);