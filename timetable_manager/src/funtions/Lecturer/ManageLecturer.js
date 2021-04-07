import React from 'react';
import Sidebar from '../../components/Sidebar'
import { FormInput, FormSelect, MultiFormSelect } from '../../components/Form'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTrash, faUserCircle, faEdit } from '@fortawesome/free-solid-svg-icons'
import { Link } from 'react-router-dom'
import LEC_CONTROLLER from '../../controllers/Lecturer.Controller'
import CONFIG from '../../controllers/Config.controller'
import { confirmAlert } from "react-confirm-alert";

class ManageLecturer extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            search_word: '',
            search_type: '',
            lecturers: [],
            filter: '',

            errors: {
                search_word: false,
                search_type: false,


            }
        };

    }
    componentDidMount = () => {
        this.loadData(this.state.search_word)

    }
    formValueChange = (e) => {
        this.setState({ [e.target.name]: e.target.value });

    }

    onFormSubmit = async (e) => {


        e.preventDefault();
        var count = this.validate()

        if (count == true) {

            var filter = {
                word: this.state.search_word,
                filed: this.state.filter
            }

            const result = await LEC_CONTROLLER.get_filter(filter)
            console.log(result.data);

            this.setState({
                lecturers: result.data
            })
        }


    }


    loadData = async () => {
        const result = await LEC_CONTROLLER.get_all()

        console.log(result.data);

        this.setState({
            lecturers: result.data
        })
    }



    onChnageFilter = async (e) => {
        await this.setState({
            filter: e.target.value
        })

        console.log(this.state.filter);
    }




    del_lec = async (data) => {
        const result = await LEC_CONTROLLER.delete_lecturer(data)
        console.log(result);
        if (result == 200)
            CONFIG.setToast("Successfully Deleted")
        else if (result == 402)
            // CONFIG.showAlert2("First you have to delete sessions related to the lecturer")
        await this.loadData()
    }

    delete_lecturefunc = async (id) => {
        var data = {
            empId: id
        }
        confirmAlert({
            title: "Alert",
            message: "Are you sure ? ",
            buttons: [
                {
                    label: 'Yes',
                    onClick: () => this.del_lec(data)

                },
                {
                    label: 'No',
                    
                }
            ]
        });
        await this.loadData()

    }

    render() {
        const { errors } = this.state;
        return (
            <div className="app" >
                <Sidebar activemenu={'LECTURER'} submenu={'OVERVIEW_LECTURER'} />
                <main>
                    <div className="container-fluid" >
                        <div className="row" >
                            <div className="col-12 shadow-sm rounded bg-white mt-1" >
                                <div className="row">
                                    <div className="col-md-12"><h6 className="text-header py-3 mb-0 font-weight-bold line-hight-1">Lecturers Managment <br></br>
                                        <span className="text-muted small">Overview</span>
                                    </h6></div>
                                    {/* <div className="col-md-4"> */}
                                        {/* <Link to="/lecturer/add">  <button type="submit" className="btn-outline-success  btn btn-sm px-2 float-right mt-3 mb-2">Add Lecturer</button></Link> */}
                                    {/* </div> */}
                                </div>
                            </div>
                            <form onSubmit={(e) => this.onFormSubmit(e)}>
                                <div className="col-12 shadow-sm rounded bg-white mt-4 row" style={{ display: 'flex', alignContent: 'center' }} >

                                    <div className="col-md-8  px-2  mt-1 mb-2">
                                        <FormInput
                                            label={'Search'}
                                            placeholder={'Type Anything...'}
                                            error={errors.search_word}
                                            value={this.state.search_word}
                                            name="search_word"
                                            onChange={this.formValueChange}
                                            error_meesage={'*Please provide valid search'}
                                        />
                                    </div>
                                    <div className="col-md-4">
                                        <button type="submit" className="btn-outline-info  btn btn-sm  mb-2 " style={{ marginTop: '29px' }}>Search</button>
                                        <button type="button" className="btn-outline-warning  btn btn-sm  mb-2  mx-2" onClick={() => this.loadData()} style={{ marginTop: '29px' }}>Reset</button>

                                    </div>

                                    <div className="col-md-12">
                                        <div className="form-check form-check-inline mt-1 mb-1 pt-1 pb-1">
                                            <input className="form-check-input" type="radio" name="inlineRadioOptions" onChange={(e) => this.onChnageFilter(e)} id="inlineRadio1" value="name" />
                                            <label className="form-label mt-1" for="inlineRadio1">Name</label>
                                        </div>
                                        <div className="form-check form-check-inline mt-1 mb-1 pt-1 pb-1">
                                            <input className="form-check-input" type="radio" name="inlineRadioOptions" onChange={(e) => this.onChnageFilter(e)} id="inlineRadio2" value="employeeId" />
                                            <label className="form-label mt-1" for="inlineRadio2">Employee ID</label>
                                        </div>
                                        <div className="form-check form-check-inline mt-1 mb-1 pt-1 pb-1">
                                            <input className="form-check-input" type="radio" name="inlineRadioOptions" onChange={(e) => this.onChnageFilter(e)} id="inlineRadio3" value="faculty" />
                                            <label className="form-label mt-1" for="inlineRadio3">Faculty</label>
                                        </div>
                                        <div className="form-check form-check-inline mt-1 mb-1 pt-1 pb-1">
                                            <input className="form-check-input" type="radio" name="inlineRadioOptions" onChange={(e) => this.onChnageFilter(e)} id="inlineRadio4" value="department" />
                                            <label className="form-label mt-1" for="inlineRadio4">Department</label>
                                        </div>
                                        <div className="form-check form-check-inline mt-1 mb-1 pt-1 pb-1">
                                            <input className="form-check-input" type="radio" name="inlineRadioOptions" onChange={(e) => this.onChnageFilter(e)} id="inlineRadio5" value="center" />
                                            <label className="form-label mt-1" for="inlineRadio5">Center</label>
                                        </div>
                                        <div className="form-check form-check-inline mt-1 mb-1 pt-1 pb-1">
                                            <input className="form-check-input" type="radio" name="inlineRadioOptions" onChange={(e) => this.onChnageFilter(e)} id="inlineRadio6" value="building" />
                                            <label className="form-label mt-1" for="inlineRadio6">Building</label>
                                        </div>
                                        <div className="form-check form-check-inline mt-1 mb-1 pt-1 pb-1">
                                            <input className="form-check-input" type="radio" name="inlineRadioOptions" onChange={(e) => this.onChnageFilter(e)} id="inlineRadio7" value="level" />
                                            <label className="form-label mt-1" for="inlineRadio7">Level</label>
                                        </div>
                                    </div>

                                </div>
                            </form>
                            <div className="col-12 shadow-sm rounded bg-white mt-3" >

                                <table className="table borderless customtable">
                                    <thead>
                                        <tr>
                                            <th className="font-08 text-dark2 ">ID</th>
                                            <th className="font-08 text-dark2 ">Name</th>
                                            <th className="font-08 text-dark2 ">Center </th>
                                            <th className="font-08 text-dark2 ">Faculty </th>
                                            <th className="font-08 text-dark2 ">Action</th>

                                        </tr>
                                    </thead>
                                    <tbody>
                                        {this.state.lecturers && this.state.lecturers.map(data => {
                                            return (<tr>

                                                <td>{data.empId}</td>
                                                <td>{data.name}</td>
                                                <td>{data.center}</td>
                                                <td>{data.faculty}</td>
                                                <td><FontAwesomeIcon onClick={() => this.delete_lecturefunc(data.empId)} icon={faTrash} style={{ color: 'red' }} className="mx-2" /><Link to={`/lecturer/edit/${data.empId}`}> <FontAwesomeIcon icon={faEdit} style={{ color: 'green' }} className="mx-2" /> </Link> <Link to={`/lecturer/${data.empId}`}><FontAwesomeIcon style={{ color: 'blue' }} className="mx-2" icon={faUserCircle} /></Link></td>
                                            </tr>)
                                        })}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </main>
            </div>
        );
    }

    validate = () => {
        let { filter,
            search_word,
        } = this.state;
        let count = 0;
        let errors = {}
        if (search_word.length == 0) {
            errors.search_word = true
            count++
        } else {
            errors.search_word = false
        }
        if (filter.length == 0) {
            errors.search_word = true
            count++
        } else {
            errors.search_word = false
        }


        this.setState({ errors })
        return count == 0;
    }

}



export default ManageLecturer;
