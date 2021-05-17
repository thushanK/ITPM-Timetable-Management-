import React from 'react';
import Sidebar from '../../../components/Sidebar'
import {FormInput , FormSelect , MultiFormSelect} from '../../../components/Form'
import moment from 'moment';
import parallel from '../../../controllers/parallel.controller';
import CONFIG from '../../../controllers/Config.controller';
import sessionFrom from '../../../controllers/Session.Controller';
import overlapFun from '../../../controllers/overlap.controller';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faExclamationTriangle } from '@fortawesome/free-solid-svg-icons';

class addNotOverLap extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            parallelList : [],
            session_01 : '',
            session_02 : '',
            error : false , 
            error_message : '',
        };
    }

    async componentDidMount() {

        const res = await sessionFrom.get_all_seesion();
        const parallelList = res.filter( item => ( !item.parallel && !item.consecutive ))
        this.setState({ parallelList });
    }
    formValueChange = (e) => {
        this.setState({[e.target.name] : e.target.value  });
    }


    onFormSubmit = async (e) => {
        e.preventDefault();
        const { session_01 , session_02} = this.state;
        if(this.validate()){
            
            const result = await overlapFun.addOverlap({session_01 , session_02});
            if(result.status == 200 ){
                CONFIG.setToast(result.message);
                this.props.history.push("/student/Overlap")
            }else{
                CONFIG.setErrorToast(result.message);
            }
        }
    }



    render(){
        const {errors } = this.state;

    return (
        <div className="app" >
        <Sidebar activemenu={'NOT_OVERLAP_SESSIONS'}   submenu={'ADD_NOT_OVERLAP'} />
        <main>
            <div className="container-fluid" >
            <div className="row" >
                <div className="col-12 shadow-sm rounded bg-white mt-1" >
                    <h6 className="text-header py-3 mb-0 font-weight-bold line-hight-1">Add 'Not Overlap' Sessions<br></br>
                    <span className="text-muted small">You can add 'Not Overlap' Sessions</span></h6>
                </div>
                <div className="col-12 shadow-sm rounded bg-white mt-3 pb-1" >
                <form onSubmit={(e) => this.onFormSubmit(e)}>
                <div className="row mt-1 pb-3" >
                <div className="col-md-12 mt-1 mb-1" >
                            <FormSelect 
                                label={'Select Session'}
                                options={this.renderSessions()}
                                error={false}
                                selected={this.state.session_01}
                                onChange={this.formValueChange}
                                name="session_01"
                                error_meesage={'*Session required'}
                            />
                    </div>
                    <div className="col-md-12 mt-1 mb-1" >
                            <FormSelect 
                                label={'Select Session'}
                                options={this.renderSessions()}
                                error={false}
                                selected={this.state.session_02}
                                onChange={this.formValueChange}
                                name="session_02"
                                error_meesage={'*Session required'}
                            />
                    </div>
                    <div className="col-md-12 mt-1 mb-1" >
                            <button type="submit" className="btn-outline-info mt-2 btn btn-sm px-2 ">Add Not Overlap Session</button>
                    </div>
                </div>
                </form>
                </div>
                {/* ------------------------------ error message-------------------------- */}
                {  this.state.error && 
                 <div className="col-12 shadow-sm rounded bg-white mt-2 pt-2 pb-3" >
                    <h6 className="text-header text-warning pt-2 pb-2 mb-0 font-weight-bold line-hight-1">
                        <FontAwesomeIcon icon={faExclamationTriangle}  className="mr-2"/>Conflict Found !
                    </h6>
                    <h6 className="text-header mb-0  line-hight-1">
                <span className="text-muted small font-weight-bold">{this.state.error_message}</span></h6>
                </div>
                }  
            </div>
            </div>
        </main>
    </div>
    );}

    renderSessions = () => {
        return [{label : 'Select a Session', value : ''} , 
        ...this.state.parallelList.map( item => {
            return {
                label : `${item.lecturer.name} - ${item.subject.name} - ${item.group.subgroup_ID} (${item.tag.name})`,
                value : item._id
            }
        })]
    }

    validate = () => {
        const { session_01 , session_02  } = this.state
        let error  = 0;
        let error_message = '';

        if( session_01.length == 0 ||  session_02.length == 0){
            this.setState({
                error_message : 'All Sessions Required !',
                error : true
            })
            return false;
        }

        if(session_01 == session_02){
            this.setState({
                error_message : 'Both sessions can not be same !',
                error : true
            })
            return false
        }

        this.setState({
            error_meesage : '',
            error : false
        })
        return true;
    }

}


export default addNotOverLap;
