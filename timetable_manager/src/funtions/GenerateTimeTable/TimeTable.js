import React, { useState, useEffect } from 'react';
import Sidebar from '../../components/Sidebar';


class TimeTable extends React.Component {

    render(){  
        return (
            <div className="app" >
                 <Sidebar activemenu={'TimeTable'} />
                 {/* <Sidebar activemenu={'SSESSIONS'} /> */}
            </div>
            

    );}   
}

export default TimeTable;
