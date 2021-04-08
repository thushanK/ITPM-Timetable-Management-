import React from 'react';
import Sidebar from '../../components/Sidebar'
import { FormInput, FormSelect, MultiFormSelect, FormInputReadOnly } from '../../components/Form'
import moment from 'moment';
import { omit } from 'lodash'
// import { FilePond, registerPlugin } from 'react-filepond';

import SUB_CONTROLLER from '../../controllers/Subject.Controller'
import CONFIG from '../../controllers/Config.controller'
// import 'filepond/dist/filepond.min.css';

class SubjectView extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            year: '',
            semester: '',
            name: '',
            code: '',
            lec_hour: '',
            tute_hour: '',
            lab_hour: '',
            evalu_hour: '',
            cdate:'',
            udate:''


        };
    }

    componentWillMount=()=>{
    
        this.loadData()
    }

    loadData = async(id) =>{
        const result = await SUB_CONTROLLER.get_specific(this.props.match.params.id);
        console.log(result.data);

        var resultItem = result.data[0]

        this.setState({
            year:resultItem.year,
            semester:resultItem.semester,
            name:resultItem.name,
            code:resultItem.code,
            lec_hour:resultItem.lechours,
            tute_hour:resultItem.tutehours,
            lab_hour:resultItem.labhours,
            evalu_hour:resultItem.evaluationhour,


            cdate: moment(resultItem.createdAt).format('L'),
            udate:  moment(resultItem.updatedAt).format('L'),
        })



    }



    render() {
        const { errors } = this.state;
        return (
            <div className="app" >
                <Sidebar activemenu={'SUBJECT'} submenu={'ADD_SUBJECT'} />
                <main>
                    <div className="container-fluid" >
                        <div className="row" >
                            <div className="col-12 shadow-sm rounded bg-white mt-1" >
                                <h6 className="text-header py-3 mb-0 font-weight-bold line-hight-1"> Subject<br></br>
                                    {/* <span className="text-muted small">You can add new subject</span> */}
                                </h6>
                            </div>
                            <div className="col-12 shadow-sm rounded bg-white mt-3 pb-1" >
                                <form onSubmit={(e) => this.onFormSubmit(e)}>
                                    <div className="row" >
                                        <div className="col-md-6 row ">

                                            <div className="col-md-12 mt-2 mb-1">
                                                <p className="m-0 p-0">Subject Deatils</p>
                                                <hr className="mt-0 pt-0" />
                                            </div>
                                            <div className="col-md-12 mt-2 mb-2   " >
                                                <FormInputReadOnly
                                                    value={this.state.year}
                                                    label={'Offered year'}

                                                />
                                            </div>
                                            <div className="col-md-12 mt-2 mb-2 " >


                                                <FormInputReadOnly
                                                    value={this.state.semester}
                                                    label={'Offered semester'}

                                                />
                                            </div>
                                            <div className="col-md-12 mt-2 mb-2 " >
                                                <FormInputReadOnly
                                                    label={'Subject name '}

                                                    value={this.state.name}

                                                />
                                            </div>
                                            <div className="col-md-12 mt-2 mb-2 " >
                                                <FormInputReadOnly
                                                    label={'Subject code '}

                                                    value={this.state.code}

                                                />
                                            </div>

                                        </div>
                                        <div className="col-md-6 row">
                                            <div className="col-md-12 mt-2 mb-1">
                                                <p className="m-0 p-0">Subject Hours</p>
                                                <hr className="mt-0 pt-0" />
                                            </div>
                                            <div className="col-md-12 mt-2 mb-2 " >

                                                <FormInputReadOnly
                                                    label={'Subject code '}
                                                    value={this.state.lec_hour}
                                                />
                                            </div>
                                            <div className="col-md-12 mt-2 mb-2 " >
                                          
                                                <FormInputReadOnly
                                                    label={'Number of tutorial hours'}
                                                    value={this.state.tute_hour}
                                                />
                                            </div>

                                            <div className="col-md-12 mt-2 mb-2  " >
                                           
                                                <FormInputReadOnly
                                                    label={'Number of lab hours'}
                                                    value={this.state.lab_hour}
                                                />
                                            </div>
                                            <div className="col-md-12 mt-2 mb-2  " >
                                                <FormInputReadOnly
                                                    label={'Number of evaluation hours '}
                                                    value={this.state.evalu_hour}
                                                />
                                            </div>
                                        </div>
                                        

                                        {/* <div className="col-md-4 mt-3 mb-1" >
                                                <FormInputReadOnly
                                                    label={'Created At '}
                                                    value={this.state.cdate}
                                                />
                                            </div>
                                            <div className="col-md-4 mt-3 mb-1" >
                                                <FormInputReadOnly
                                                    label={'Updated At '}
                                                    value={this.state.udate}
                                                />
                                            </div> */}
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </main>
            </div>
        );
    }

}

export default SubjectView;
