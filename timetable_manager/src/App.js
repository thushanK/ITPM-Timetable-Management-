import React, { useEffect, useState } from 'react';
import {GetLocations, AddLocation} from './controllers/locationManage.controller'

function App() {

  const [locations, setLocations] = useState();

  const[name, setName] = useState();
  const[type, setType] = useState();
  const[capacity, setCapacity] = useState();
  const[building, setBuilding] = useState();

  useEffect( () => {
    GetLocations().then(data => {
      setLocations(data.data)
      console.log("Data from server: ", data);
    }).catch(err => {
      console.log("Error: ", err);
    })
  })

  const onClickAdd = () => {

    const newLocation = {
      name: "name",
      type: "type",
      capacity: 12,
      building: "building"
    }

    AddLocation(newLocation).then(data => {
      alert("Success")
    }).catch(err => {
      alert(err)
    })
  }

  return (
      <>
        <h2>{JSON.stringify(locations)}</h2>

        <button onClick={() => onClickAdd()}>Add</button>
      </>
  );
}


export default App;
