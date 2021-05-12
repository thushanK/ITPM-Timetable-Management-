import React from 'react';
import Sidebar from '../../../components/Sidebar'
//import {FormInput , FormSelect , MultiFormSelect} from '../Components/Form'
import moment from 'moment';
import { omit } from 'lodash';
import {Link} from 'react-router-dom';
import consessionpa from '../../../controllers/parallel.controller';
import PARALLEL_CONTROLLER from '../../../controllers/parallel.controller';




class DeleteParallel extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            // id:'',
            // ConSession: '',
        };
    }

    // async componentDidMount() {
    //     console.log("Generate ID: ", this.props.match.params.id);
        
    //     const result = await PARALLEL_CONTROLLER.getOne(this.props.match.params.id);

    //     console.log("Building results: ", result.data);
    // }

    render(){

    return (
        <div className="app" >
        <Sidebar activemenu={'STUDENT'}   submenu={'PARALLEL_SESSION'} />
        <main>
            <div className="container-fluid" >
            <div className="row" >
                <div className="col-12 shadow-sm rounded bg-white mt-1" >
                    <h6 className="text-header py-3 mb-0 font-weight-bold line-hight-1">Delete Parallel Session<br></br>
                    <span className="text-muted small">Parallel Session delete confirmation</span></h6>
                </div>
                <div className="col-12 shadow-sm rounded bg-white mt-3 pb-1" >
    
                <div className="row mt-1 pb-3" >
                    <div className="col-md-12 mt-2" >
                    <h6 style={{fontSize : '0.9rem'}}
                        className="text-header text-danger mb-0 font-weight-bold line-hight-1">Are you sure you want to delete this Parallel Session ?<br></br>
                    <span className="text-muted small">This process can't be undone, All the relevant details will be permanently deleted !</span></h6>
                    </div>
                    <div className="col-md-12 mt-3" >
                     
                    </div>
                    <div className="col-md-12 mt-1 mb-1" >
                    <hr className="my-2"></hr>
                            <button type="submit" className="btn-danger mt-2 btn btn-sm px-3 py-1" onClick={this.onDelete}>Delete</button>
                            <Link to="/student/ParellalSession" >
                            <button type="submit" id="cancelBtn" className="btn-light mt-2 btn btn-sm px-3 py-1 border mx-2">Cancel</button>
                            </Link>
                    </div>
                </div>
                </div>
            </div>
            </div>
        </main>
    </div>
    );}

    // onDelete = async () => {
    //     const data = {
    //         id: this.props.match.params.id
    //     }
    //     const result = await PARALLEL_CONTROLLER.deleteGenerate(data);
    //     document.getElementById("cancelBtn").click()
    //     console.log("frontend delete "+data);
       
    // }
    

}


export default DeleteParallel;
