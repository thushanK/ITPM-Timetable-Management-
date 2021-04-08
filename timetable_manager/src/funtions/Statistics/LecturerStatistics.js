import React from 'react';
import Sidebar from '../../components/Sidebar';
import { Link } from 'react-router-dom';

import {Pie} from "react-chartjs-2";
import STATS_CONTROLLER from '../../controllers/Stats.Controller';

class LecturerStatistic extends React.Component {

  constructor(props){
      super(props);
      this.state = {
        data: {
            labels: ["Professors", "Assistant Professors", "Senior Lecturers(HG)", "Senior Lecturers", "Lecturers", "Assistant Lecturers", "Instructors"],
            datasets: [
              {
                label: "Number",
                data: [4, 6, 2, 1, 2, 3, 1],
                fill: true,
                backgroundColor: ["#032F5D", "#044182", "#0654A7", "#1F6EC0", "#518ECE", "#83AEDC", "#B4CEEA"],
                borderColor: "#999999",
                
              },
            ]
          },
          count: 0,
      }
  }
  
  async componentDidMount() {
    console.log("Did mount");
    const stats = await STATS_CONTROLLER.getLecStats();
    this.setState({
      // data: [stats.type1, stats.type2, stats.type3, stats.type4, stats.type5, stats.type6, stats.type7],
      data: {
        labels: ["Professors", "Assistant Professors", "Senior Lecturers(HG)", "Senior Lecturers", "Lecturers", "Assistant Lecturers", "Instructors"],
        datasets: [
          {
            label: "Number",
            data: [stats.type1, stats.type2, stats.type3, stats.type4, stats.type5, stats.type6, stats.type7],
            fill: true,
            backgroundColor: ["#032F5D", "#044182", "#0654A7", "#1F6EC0", "#518ECE", "#83AEDC", "#B4CEEA"],
            borderColor: "#999999",
            
          },
        ]
      },
      count: stats.lecs,
    })
    console.log(stats);
  }

  render(){
  return (
    <div className="app" >
    <Sidebar activemenu={'STATISTICS'} submenu={'LEC_STAT'} />
    <main>
        <div className="container-fluid" >
        <div className="row" >
            <div className="col-12 shadow-sm rounded bg-white mt-1" >
                <h6 className="text-header py-3 mb-0 font-weight-bold line-hight-1">Overview of Lecturers<br></br>
                <span className="text-muted small">An overview of all the STATISTICS related to Lecturers</span></h6>
            </div>
        </div>
        <div className="row">
                <div className="col-sm shadow-sm rounded bg-white mt-3">
                    {/* <h4 className="text-primary mt-3">#No Acadamic Staff <b className="text-dark"> {(this.state.data.datasets[0].data.reduce((total, num) => {return total + num}))} </b></h4> */}
                    <h4 className="text-primary mt-3">#No Acadamic Staff <b className="text-dark"> {this.state.count} </b></h4>
                    <h6 className="mb-2"><span className="text-muted small">Number of all Lecturers</span></h6>
                </div>
            </div>

            <div className="row">
            <div className="col-12 shadow-sm rounded bg-white mt-3" >
            <h6 className="text-header py-3 mb-0 font-weight-bold line-hight-1">Lecturers by their rank</h6>
                <Pie data={this.state.data}></Pie>
            </div>
        </div>
        </div>
        
    </main>
  </div>
  );}

}

export default LecturerStatistic;
