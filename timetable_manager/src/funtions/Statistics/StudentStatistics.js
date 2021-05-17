import React from 'react';

import Sidebar from '../../components/Sidebar'

import {Bar} from "react-chartjs-2";
import STATS_CONTROLLER from '../../controllers/Stats.Controller';


class StudentStatistics extends React.Component  {

    
    constructor(props){
        super(props);
        this.state = {
            data: {
              labels: ["First Year", "Second Year", "Third Year", "Fourth Year"],
              datasets: [
                {
                  label: "Students",
                  data: [3, 3, 3, 3],
                  fill: true,
                  backgroundColor: "rgba(3,90,252,0.5)",
                  borderColor: "rgba(75,192,192,1)",
                  
                },
              ]
            },
            count: 0,
        }
    }
    
    async componentDidMount() {
      console.log("Did mount");
        const stats = await STATS_CONTROLLER.getStudentStats();
        this.setState({
          data: {
            labels: ["First Year", "Second Year", "Third Year", "Fourth Year"],
            datasets: [
              {
                label: "Students",
                data: [parseInt(stats.year1), parseInt(stats.year2), parseInt(stats.year3), parseInt(stats.year4)],
                fill: true,
                backgroundColor: "rgba(3,90,252,0.5)",
                borderColor: "rgba(75,192,192,1)",
                
              },
            ]
          },
          count: stats.count,
        })
        console.log(stats);
    }
  
    render(){
    return (
      <div className="app" >
      <Sidebar activemenu={'STATISTICS'} submenu={'STUDENT_STATISTICS'} />
      <main>
          <div className="container-fluid" >
          <div className="row" >
              <div className="col-12 shadow-sm rounded bg-white mt-1" >
                  <h6 className="text-header py-3 mb-0 font-weight-bold line-hight-1">Overview of Students<br></br>
                  <span className="text-muted small">An overview of all the STATISTICS related to students</span></h6>
              </div>
          </div>
          <div className="row">
              <div className="col-sm shadow-sm rounded bg-white mt-3">
                  <h4 className="text-primary mt-3">#No Student groups <b className="text-dark"> {this.state.count} </b></h4>
                  <h6 className="mb-2"><span className="text-muted small">Number of all Student groups</span></h6>
              </div>
          </div>
          <div className="row">
              <div className="col-12 shadow-sm rounded bg-white mt-3" >
              <h6 className="text-header py-3 mb-0 font-weight-bold line-hight-1">Student groups by years</h6>
                  <Bar data={this.state.data}></Bar>
              </div>
          </div>
          </div>
      </main>
    </div>
    );}
  
}




export default StudentStatistics;