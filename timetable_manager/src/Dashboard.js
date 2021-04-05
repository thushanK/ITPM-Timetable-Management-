import React, { useState, useEffect } from 'react';
import Sidebar from './components/Sidebar'


class Dashboard extends React.Component {

    render(){  
        return (
            <div className="app" >
                 <Sidebar activemenu={'DASHBOARD'} />
            </div>

    );}   
}

export default Dashboard;