import React from 'react';
import Sidebar from '../../components/Sidebar'
import { FormInput, FormSelect, MultiFormSelect, FormInputReadOnly } from '../../components/Form'
import moment from 'moment';
import { omit } from 'lodash'
// import { FilePond, registerPlugin } from 'react-filepond';
import { withRouter } from 'react-router-dom'


// import 'filepond/dist/filepond.min.css';

import LEC_CONTROLLER from '../../controllers/Lecturer.Controller'
import CONFIG from '../../controllers/Config.controller'

class ViewLecturer extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            name: '',
            employeeID: '',
            faculty: '',
            center: '',
            building: '',
            level: '',
            rank: '',
            cdate: '',
            udate: '',
            department: '',

        };
    }

    componentWillMount = async () => {

        await this.loadData()
    }

    loadData = async () => {
        const result = await LEC_CONTROLLER.get_specific(this.props.match.params.id);
        console.log("Log Data >>>>>>>>>>>>>>>>>>>>>>>>>>");
        console.log(result.data);

        var resultItem = result.data[0]

        await this.setState({
            name: resultItem.name,
            employeeID: resultItem.empId,
            faculty: resultItem.faculty,
            center: resultItem.center,
            building: resultItem.building,
            level: resultItem.level,
            rank: resultItem.rank,
            cdate: moment(resultItem.createdAt).format('L'),
            udate: moment(resultItem.updatedAt).format('L'),
            department: resultItem.department,
        })



    }
    render() {
        const { errors } = this.state;
        return (
            <div className="app" >
                <Sidebar activemenu={'LECTURER'} submenu={'VIEW_LECTURER'} />
                <main>
                    <div className="container-fluid" >
                        <div className="row" >
                            <div className="col-12 shadow-sm rounded bg-white mt-1" >
                                <h6 className="text-header py-3 mb-0 font-weight-bold line-hight-1">View Lecturer<br></br>
                                    {/* <span className="text-muted small">You can add new lecturer</span> */}
                                </h6>
                            </div>
                            <div className="col-12 shadow-sm rounded bg-white mt-3 pb-1" >
                                <form>
                                    <div className="row mt-1 pb-3" >
                                        <div className="col-md-6 row ">
                                            <div className="col-md-12 mt-2 mb-1">
                                                <p className="m-0 p-0">Profile Image</p>
                                                <hr className="mt-0 pt-0" />
                                                <center>
                                                    <img style={{ height: '150px' }} className="img-fluid rounded-circle mt-2" src="https://png.pngtree.com/png-vector/20190710/ourmid/pngtree-user-vector-avatar-png-image_1541962.jpg" />
                                                </center>
                                            </div>
                                            <div className="col-md-12 mt-2 mb-1" >

                                                <FormInputReadOnly
                                                    label={'Name '}

                                                    value={this.state.name}

                                                />
                                                <FormInputReadOnly
                                                    label={'Employee ID '}
                                                    placeholder={'Enter Employee ID'}

                                                    value={this.state.employeeID}

                                                />
                                            </div>
                                            <div className="col-md-12 mt-1 mb-1" >
                                                <FormInputReadOnly
                                                    label={'Created At '}
                                                    value={this.state.cdate}
                                                />
                                            </div>
                                            <div className="col-md-12 mt-1 mb-1" >
                                                <FormInputReadOnly
                                                    label={'Updated At '}
                                                    value={this.state.udate}
                                                />
                                            </div>

                                        </div>
                                        <div className="col-md-6 row">
                                            <div className="col-md-12 mt-2 mb-1">
                                                <p className="m-0 p-0">Lecturer Details</p>
                                                <hr className="mt-0 pt-0" />
                                            </div>
                                            <div className="col-md-12 mt-2 mb-1" >
                                                <FormInputReadOnly
                                                    label={'Faculty '}

                                                    value={this.state.faculty}

                                                />
                                            </div>
                                            <div className="col-md-12 mt-2 mb-1" >
                                                <FormInputReadOnly
                                                    label={'Department '}

                                                    value={this.state.department}

                                                />
                                            </div>
                                            <div className="col-md-12 mt-2 mb-1" >
                                                <FormInputReadOnly
                                                    label={'Center '}
                                                    value={this.state.center}
                                                />
                                            </div>

                                            <div className="col-md-12 mt-1 mb-1" >
                                                <FormInputReadOnly
                                                    label={'Building '}
                                                    value={this.state.building}
                                                />
                                            </div>
                                            <div className="col-md-12 mt-1 mb-1" >
                                                <FormInputReadOnly
                                                    label={'Level'}
                                                    value={this.state.level}
                                                />
                                            </div>
                                            <div className="col-md-12 mt-1 mb-1" >
                                                <FormInputReadOnly
                                                    label={'Rank '}
                                                    value={this.state.rank}
                                                />
                                            </div>

                                        </div>
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



export default withRouter(ViewLecturer);
