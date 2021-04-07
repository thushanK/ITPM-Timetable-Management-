import React from 'react';
import Sidebar from '../../components/Sidebar'
import {FormInput , FormSelect , MultiFormSelect} from '../../components/Form'
import TAGS from '../../controllers/TagsController';
import CONFIG from '../../controllers/Config.controller';
import {Link} from 'react-router-dom';


class AddTags extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            tagsList: [],
            name: '',
            errors : { 
                tags : false , 
            }
        };
    }

    async componentDidMount() {
       this.load_data();
    }

    load_data = async () => {
        const res = await TAGS.getAllTags();
        console.log(res)
        this.setState({
            tagsList: res.data
        });
    }

    formValueChange = (e) => {
        this.setState({[e.target.name] : e.target.value  });
        this.is_filled( e.target.name , e.target.value );
    }

    clear = ()=>{
        this.setState({
            name: '',
            noOfFloors: '',
            accessTime: '',
        })
    }

    onFormSubmit = async (e) => {
        e.preventDefault();
        this.validate()
        var ret = this.validate();
        console.log(ret);
        if (ret == false){
            console.log("Before");
            return "";
        }

        console.log("After");
        var data = {
            name: this.state.name,
        
        }

        const result = await TAGS.addTag(data)

        console.log(result);
        // this.props.history.push("/tags/AddTags")


        if(result == 201){
            CONFIG.setToast("Successfully Added")
            this.clear();
            this.load_data();
        }
    }

    render(){
        const {errors} = this.state;
        const {tagsList} = this.state;
    return (
        <div className="app" >
        <Sidebar activemenu={'TAGS'}   submenu={'ADD_TAGS'} />
        <main>
            <div className="container-fluid" >
            <div className="row" >
                <div className="col-12 shadow-sm rounded bg-white mt-1" >
                    <h6 className="text-header py-3 mb-0 font-weight-bold line-hight-1">Add Tags<br></br>
                    <span className="text-muted small">You can add tags to Student timetable slot</span></h6>
                </div>
                <div className="col-12 shadow-sm rounded bg-white mt-3 pb-1" >
                <form onSubmit={(e) => this.onFormSubmit(e)}>
                <div className="row mt-1 pb-3" >
                   
                   
                    <div className="col-md-6 mt-1 mb-1" >
                            <FormInput 
                                label={'Add Tags'}
                                placeholder={'Enter Tags you want to add'}
                                error={errors.name}
                                value={this.state.name}
                                onChange={this.formValueChange}
                                name="name"
                                
                                error_meesage={'*Group Number required'}
                            />
                    </div>
                    <div className="col-md-12 mt-1 mb-1" >
                            <button type="submit" className="btn-outline-info mt-2 btn btn-sm px-2 ">Add Tags</button>
                    </div>
                </div>
                </form>
                </div>
                <div className="col-12 shadow-sm rounded bg-white mt-3" >
                <table class="table borderless customtable">
                    <thead>
                        <tr>
                        <th className="font-08 text-dark2 ">ID</th>
                        <th className="font-08 text-dark2 ">Name</th>
                        <th className="font-08 text-dark2 ">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                    {tagsList && tagsList.map( (name, index ) => this.renderTable(name,index))}
                        
                    </tbody>
                </table>
            </div>
            </div>
            </div>
        </main>
    </div>
    );}

    renderTable = (item , i ) => {
        return (
                            <tr key={item._id}>
                                <td>{("0" + ( i + 1) ).slice(-2)}</td>
                                <td>{item.name}</td>
            
                                <td>
                                    <Link to={"/tags/EditTags/"  + item._id}><span className="badge badge-info rounded-0 bg-white text-success border border-secondary click font-weight-bold ">Edit</span></Link>
                                <Link to={"/student/DeleteTag/" + item._id}><span className="badge badge-info rounded-0 bg-white text-danger border border-secondary click font-weight-bold ml-2">Delete</span></Link>
                                </td>
                            </tr>
        )
       
      }
    

    validate = () => {
        let { name } = this.state;
        let count = 0;
        let errors = {}

        if( name.length === 0 ){
            errors.name = true
            count++
        }else{
            errors.name = false 
        }

        this.setState({errors})
        return count == 0;
    }

    is_filled = (name , value ) => {
       let result = ( value.length == 0 ||  value == 'NONE')
       this.setState({ errors : {...this.state.errors , [name] : result  } })
    }

}

export default AddTags;





