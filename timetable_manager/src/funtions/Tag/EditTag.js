import React from 'react';
import Sidebar from '../../components/Sidebar';
import {Link} from 'react-router-dom';
import {FormInput , FormSelect , MultiFormSelect} from '../../components/Form'
import TAGS from '../../controllers/TagsController';
import CONFIG from '../../controllers/Config.controller';

class EditTags extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            name : '',
            errors : { 
                name : false , 
            }
        };
    }

    async componentDidMount() {
        console.log("Tag ID: ", this.props.match.params.id);
        const result = await TAGS.getOne(this.props.match.params.id);
     
        this.setState({
            name: result.data.name,
            id: result.data.id,
        })
    }


    formValueChange = (e) => {
        this.setState({[e.target.name] : e.target.value  });
        this.is_filled( e.target.name , e.target.value );
    }

    onFormSubmit = async (e) => {
        e.preventDefault();
        this.validate();
    
        var data = {
    
            name: this.state.name,

        }

        const result = await TAGS.updateTgas(data)

        console.log(result);
 
        if(result == 200){
            CONFIG.setToast("Successfully Added");
            this.props.history.push("/tag/add")
  
        }
    }


  render(){
    const {errors} = this.state;


  return (
    <div className="app" >
    <Sidebar activemenu={'STUDENT'}   submenu={'ADD_TAGS'} />
    <main>
        <div className="container-fluid" >
        <div className="row" >
            <div className="col-12 shadow-sm rounded bg-white mt-1" >
            <div class="row">
                <div class="col-8">
                    <h6 className="text-header py-3 mb-0 font-weight-bold line-hight-1">Generate Sub Group ID<br></br>
                    <span className="text-muted small">you can generate sub group ID in here</span></h6>
                </div>
                <div class="col-4">
                    <center>
                    <span  className="badge badge-info px-5 py-1 mt-4 bg-white border border-info text-info click ">Generate</span>
                    </center>
                </div>
            </div>
               
            </div>
            <div className="col-12 shadow-sm rounded bg-white mt-3" >
                <form onSubmit={(e) => this.onFormSubmit(e)}>
                    <div className="row mt-1 pb-3" >
                    <div className="col-md-6 mt-1 mb-1" >
                            <FormInput 
                                label={'Add Tags'}
                                placeholder={'Edit your Tags'}
                                error={errors.name}
                                value={this.state.name}
                                onChange={this.formValueChange}
                                name="name"
                                
                                error_meesage={'*Group Number required'}
                            />
                    </div>
                        <div className="col-md-12 mt-1 mb-1" >
                            <button type="submit" className="btn-outline-info mt-2 btn btn-sm px-2 ">Update</button>
                    </div>
                    </div>
                </form>
            </div>
          
        </div>
        </div>
    </main>
  </div>
  );}

  validate = () => {
    let {name} = this.state;
    let count = 0;
    let errors = {}

    if( name === 'NONE'){
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


export default EditTags;
