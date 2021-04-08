import React from 'react';
import Sidebar from '../../components/Sidebar'
import { FormInput, FormSelect, MultiFormSelect } from '../../components/Form'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTrash, faUserCircle, faEdit } from '@fortawesome/free-solid-svg-icons'
import { Link } from 'react-router-dom'

import SUB_CONTROLLER from '../../controllers/Subject.Controller'
import CONFIG from '../../controllers/Config.controller'
import { confirmAlert } from "react-confirm-alert";

class ManageSubject extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            search_word: '',
            search_type: '',
            subjects: [],
            filter: '',

            errors: {
                search_word: false,
                search_type: false,


            }
        };
    }
    formValueChange = (e) => {
        this.setState({ [e.target.name]: e.target.value });
    }


    onFormSubmit = async (e) => {
        e.preventDefault();
        var count = this.validate()

        if (count == true) {
            console.log("dsddsds");
            var filter = {
                word: this.state.search_word,
                filed: this.state.filter
            }

            const result = await SUB_CONTROLLER.get_filter(filter)
            console.log(result.data);

            this.setState({
                subjects: result.data
            })
        }


    }

    componentWillMount = () => {
        this.loadData()

    }

    loadData = async () => {

        const result = await SUB_CONTROLLER.get_all()

        console.log(result.data);

        this.setState({
            subjects: result.data
        })
    }


    onChnageFilter = async (e) => {
        await this.setState({
            filter: e.target.value
        })

        console.log(this.state.filter);
    }

    del_sub = async (data) =>{
        const result =   await SUB_CONTROLLER.delete_subject(data)
        console.log(result);
        if (result == 200)
        CONFIG.setToast("Successfully Deleted")
             else if (result == 401)
        CONFIG.showAlert2("First you have to delete sessions related to the subject")
          await this.loadData()
        }


    delete_subject = async (sub_code) => {
        var data = {
            code: sub_code
        }

        confirmAlert({
            title: "Alert",
            message: "Are you sure ? ",
            buttons: [
                {
                    label: 'Yes',
                    onClick: () => this.del_sub(data)

                },
                {
                    label: 'No',
                    //   onClick: () => cancel()
                }
            ]
        });



        await this.loadData()

    }

    render() {
        const { errors } = this.state;
        return (
            <div className="app" >
                <Sidebar activemenu={'SUBJECT'} submenu={'OVERVIEW_SUBJECT'} />
                <main>
                    <div className="container-fluid" >
                        <div className="row" >
                            <div className="col-12 shadow-sm rounded bg-white mt-1" >
                                <div className="row">
                                    <div className="col-md-8"><h6 className="text-header py-3 mb-0 font-weight-bold line-hight-1">Subjects Managment <br></br>
                                        <span className="text-muted small">Overview</span>
                                    </h6></div>
                                    <div className="col-md-4">
                                        <Link to="/subject/add"> <button type="submit" className="btn-outline-success  btn btn-sm px-2 float-right mt-3 mb-2">Add Subject</button></Link>
                                    </div>
                                </div>
                            </div>
                                <form onSubmit={(e) => this.onFormSubmit(e)}>
                            <div className="col-12 shadow-sm rounded bg-white mt-3 " style={{ display: 'flex', alignContent: 'center' }} >

                                    <div className="row">

                                        <div className="col-md-8  px-2  mt-1 mb-2">  <FormInput
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
                                            <button type="submit" style={{ marginTop: '30px' }} className="btn-outline-info  btn btn-sm ">Search</button>
                                            <button type="button" style={{marginTop:'30px'}} className="btn-outline-warning  btn btn-sm  ml-3" onClick={()=> this.loadData()}>Reset</button>

                                        </div>
                                        <div className="col-md-12">
                                            <div class="form-check form-check-inline mr-4 ml-0 pl-0  pt-1 pb-2" >
                                                <input class="form-check-input" type="radio" name="inlineRadioOptions" onChange={(e) => this.onChnageFilter(e)} id="inlineRadio1" value="year" />
                                                <label class="form-label mt-1" for="inlineRadio1">Year</label>
                                            </div>
                                            <div class="form-check form-check-inline mr-4 ml-0 pl-0  pt-1 pb-2">
                                                <input class="form-check-input" type="radio" name="inlineRadioOptions" onChange={(e) => this.onChnageFilter(e)} id="inlineRadio2" value="semester" />
                                                <label class="form-label mt-1" for="inlineRadio2">Semester</label>
                                            </div>
                                            <div class="form-check form-check-inline mr-4 ml-0 pl-0  pt-1 pb-2">
                                                <input class="form-check-input" type="radio" name="inlineRadioOptions" onChange={(e) => this.onChnageFilter(e)} id="inlineRadio3" value="name" />
                                                <label class="form-label mt-1" for="inlineRadio3">Name</label>
                                            </div>
                                            <div class="form-check form-check-inline mr-4 ml-0 pl-0  pt-1 pb-2">
                                                <input class="form-check-input" type="radio" name="inlineRadioOptions" onChange={(e) => this.onChnageFilter(e)} id="inlineRadio4" value="code" />
                                                <label class="form-label mt-1" for="inlineRadio4">Code</label>
                                            </div>

                                        </div>

                                    </div>



                            </div>
                                </form>
                            <div className="col-12 shadow-sm rounded bg-white mt-3" >

                                <table class="table borderless customtable">
                                    <thead>
                                        <tr>
                                            <th className="font-08 text-dark2 ">Year</th>
                                            <th className="font-08 text-dark2 ">Name</th>
                                            <th className="font-08 text-dark2 ">Code </th>
                                            <th className="font-08 text-dark2 ">Semester </th>
                                            <th className="font-08 text-dark2 ">Action</th>

                                        </tr>
                                    </thead>
                                    <tbody>
                                        {this.state.subjects && this.state.subjects.map(data => {
                                            return (<tr>

                                                <td>{data.year}</td>
                                                <td>{data.name}</td>
                                                <td>{data.code}</td>
                                                <td>{data.semester}</td>
                                                <td><FontAwesomeIcon onClick={() => this.delete_subject(data.code)} icon={faTrash} style={{ color: 'red' }} className="mx-2" /><Link to={`/subject/edit/${data.code}`}> <FontAwesomeIcon icon={faEdit} style={{ color: 'green' }} className="mx-2" /> </Link> <Link to={`/subject/${data.code}`}><FontAwesomeIcon style={{ color: 'blue' }} className="mx-2" icon={faUserCircle} /></Link></td>
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
            errors.filter = true
            count++
        } else {
            errors.filter = false
        }
        this.setState({ errors })
        return count == 0;
    }

}



export default ManageSubject;
