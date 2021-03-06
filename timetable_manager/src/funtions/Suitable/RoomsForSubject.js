import React from 'react';
import Sidebar from '../../components/Sidebar';
import {FormInput , FormSelect , MultiFormSelect} from '../../components/Form'
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faWindowClose } from '@fortawesome/free-solid-svg-icons'
import Config from '../../controllers/Config.controller'
import {getAllSubjects , getAllRooms, addRoomsToSubject} from '../../controllers/Suitable.Controller'

class RoomsForSubject extends React.Component {

    constructor(props){
        super(props);
        this.state = {
          groups: [],
          dropdown : '',
          selected_lec : {} ,
          rooms: [],
          selected_rooms : [],
          loading : true,
          errors : { 
              groups : false , 
              rooms : false ,
          }
        }
    }
    
    componentDidMount() {
      this.loadData(true)
    }
  
    loadData = (first) => {
      getAllSubjects()
      .then( results => {
         if(first){
             console.log(results.data)
          this.setState({
             groups : results.data ,
             selected_lec : results.data.length > 0 ? results.data[0].name : {} , 
             selected_rooms : results.data.length > 0 ? results.data[0].rooms : [],
             loading : false
         })
      }else{
          this.setState({
              groups : results.data ,
              loading : false
          })
      }
      })
      .catch( err => {
         console.log(err);
         this.setState({loading : false })
      })
  
      getAllRooms()
      .then( results => {
          console.log(results);
         this.setState({rooms : results})
      })
      .catch( err => {
         console.log(err);
      })
    }
  
    onFormSubmit = (e) => {
      e.preventDefault();
      
      console.log("object id: ", this.state.selected_lec);
      let groups = this.state.groups.find( item => item.name == this.state.selected_lec )
      console.log("from array: ", groups._id);

      const data = {
          id: groups._id,
          rooms: this.state.selected_rooms
      }
  
      console.log("Passing object: ", data);
  
      addRoomsToSubject(data).then( result => {
          if(result.status == 200 ){
              Config.setToast('Rooms for the Subject Added Successfully!');
              this.loadData(false);
          }else{
              Config.setErrorToast('Something Wrong Happend!');
          }
      })
      .catch( error => {
          console.log(error);
          Config.setErrorToast('Something Wrong Happend!');
      })
  }
  
  
      formValueChange = (e) => {
          this.setState({loading : true})
          let groups = this.state.groups.find( item => item.name == e.target.value )
          console.log("Find groups: ", this.state.groups);
          this.setState({
              selected_lec : e.target.value ,
              selected_rooms : groups.rooms,
              loading : false 
          });
      }
  
      dropdownOnChange = (e) => {
          const {selected_rooms} = this.state;
          if( selected_rooms.indexOf(e.target.value) == -1 && e.target.value != '')
              this.setState({ selected_rooms : [...selected_rooms , e.target.value] , dropdown : ''})
      }
  
    render(){
      const {errors , selected_rooms , loading , groups} = this.state;
    return (
      <div className="app" >
          <Sidebar activemenu={'ADD_SUITABLE'} submenu={'ROOM_FOR_SUBJECT'} />
          <main>
              <div className="container-fluid" >
                  <div className="row" >
                      <div className="col-12 shadow-sm rounded bg-white mt-1" >
                          <h6 className="text-header py-3 mb-0 font-weight-bold line-hight-1">Rooms for a Subject<br></br>
                          <span className="text-muted small">User can add a suitable room or rooms for a Subject
                          </span></h6>
                          {/* Rooms for a Subject form */}
                          <form onSubmit={(e) => this.onFormSubmit(e)}>
                          <div className="row mt-1 pb-3" >
                              <div className="col-md-6 mt-2 mb-1" >
                                  <FormSelect label={'Subject'} options={this.renderGroups()} error={ errors.groups} selected={this.state.selected_lec} onChange={this.formValueChange} name="groups" error_meesage={'*lecturer is required'} />
                              </div>
                              <div className="col-md-6 mt-2 mb-1" >
                                  <FormSelect label={"Rooms"} error={errors.rooms} options={this.renderRooms()} name="rooms" value={this.state.dropdown} onChange={this.dropdownOnChange} error_meesage="*rooms are required"/>
                              </div>
                              <div className="col-md-12 mt-1 mb-1" >
                                  <div className="d-flex-custom border border-secondary2 rounded-sm mt-2 p-2" >
                                      { selected_rooms.map( item => (
                                          <div className="bg-card border border-secondary2 py-1 px-3 rounded m-1" >
                                          {item}<FontAwesomeIcon 
                                          onClick={() => this.deleteTagItem(item)}
                                          className="mx-2 text-dark pointer" icon={faWindowClose}></FontAwesomeIcon>
                                          </div>
                                      )) }
                                      { !loading && selected_rooms.length == 0 && <NotFound/>}
                                      { loading && <LoadingItem/> }
                                  </div>
                              </div>
                              <div className="col-md-12 mt-1 mb-1" >
                                  <button type="submit" className="btn-outline-info mt-2 btn btn-sm px-2 ">Submit</button>
                              </div>
                          </div>
                      </form>
                      {/* Rooms for a Subject table */}
                      <table class="table borderless customtable mt-2">
                          <thead>
                              <tr>
                              <th className="font-08 text-dark2 ">ID</th>
                              <th className="font-08 text-dark2 ">Subject</th>
                              <th className="font-08 text-dark2 ">Selected Rooms</th>
                              </tr>
                          </thead>
                          <tbody>
                              { !loading && groups.map( (item,i) =>  (
                                  <tr>
                                      <td>{("0" + (i+1)).slice(-2)}</td>
                                      <td>{item.name}</td>
                                      <td className="w-75"> <div className="d-flex-custom m-0 p-0" >
                                          { item.rooms && item.rooms.length > 0 && item.rooms.map( room_name => (
                                                  <div className="bg-card border border-secondary3 py-0 px-3 rounded m-1" >
                                                  {room_name} </div>
                                              ))
                                          }
                                          { item.rooms && item.rooms.length == 0 && 
                                                  <div className="bg-card border border-secondary3 py-0 px-3 rounded m-1" >
                                                  No Rooms Found !</div>
                                          }
                                          </div>
                                      </td>
                                  </tr>
                              ))}                      
                          </tbody>
                      </table>
                      </div>
                  </div>
              </div>
          </main>
      </div>
    );
  }
  
   renderGroups = () => {
       console.log("these are groups ", this.state.name);
       return this.state.groups.map( i => {
           return {
               label : i.name ,
               value : i.name
           }
       })
   }
  
  renderRooms = () => {
      return [{ label : 'Select Rooms' , value : ''} , ...this.state.rooms.map( i => {
          return {
              label : i.name ,
              value : i.name
          }
      })]
  }
  
  deleteTagItem = props => {
     this.setState({ selected_rooms : this.state.selected_rooms.filter( item => item != props )})
  }
  
  renderSelectedRooms = () => {
      return this.state.selected_rooms.map( i => {
          return {
              label : i ,
              value : i
          }
      })
  }
  
  }
  
  const NotFound = () => (
      <div className="bg-card border border-secondary2 py-1 px-3 rounded m-1" >
      No Selected Rooms Found !
      </div>
  )
  
  const LoadingItem = () => (
      <div className="bg-card border border-secondary2 py-1 px-3 rounded m-1 w-100" >
               Loading .. 
      </div>
  )

export default RoomsForSubject;