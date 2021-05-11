import React from 'react';
import Sidebar from '../../components/Sidebar';
import { Link } from 'react-router-dom';

import {Bar} from "react-chartjs-2";
import STATS_CONTROLLER from '../../controllers/Stats.Controller';

class SubStat extends React.Component {

  constructor(props){
      super(props);
      this.state = {
        data: {
            labels: ["First Year", "Second Year", "Third Year", "Fourth Year"],
            datasets: [
              {
                label: "Subjects",
                data: [11, 23, 21, 11],
                fill: true,
                backgroundColor: "rgba(125,51,181,0.5)",
                borderColor: "rgba(75,192,192,1)",
              },
            ],
            
          },
          count: 0,
      }
  }
  
  async componentDidMount() {
    console.log("Did mount");
    const stats = await STATS_CONTROLLER.getSubStats();
    this.setState({
      data: {
        labels: ["First Year", "Second Year", "Third Year", "Fourth Year"],
        datasets: [
          {
            label: "Subjects",
            data: [parseInt(stats.year1), parseInt(stats.year2), parseInt(stats.year3), parseInt(stats.year4)],
            fill: true,
            backgroundColor: "rgba(125,51,181,0.5)",
            borderColor: "rgba(75,192,192,1)",
          },
        ],
        
      },
      count: stats.subs,
    })
    console.log(stats);
  }

  render(){
  return (
    <div className="app" >
    <Sidebar activemenu={'STATISTICS'} submenu={'SUB_STAT'} />
    <main>
        <div className="container-fluid" >
        <div className="row" >
            <div className="col-12 shadow-sm rounded bg-white mt-1" >
                <h6 className="text-header py-3 mb-0 font-weight-bold line-hight-1">Overview of Subjects<br></br>
                <span className="text-muted small">An overview of all the STATISTICS related to Subjects</span></h6>
            </div>
        </div>
        <div className="row">
                <div className="col-sm shadow-sm rounded bg-white mt-3">
                    <h4 className="text-primary mt-3">#No Subjects <b className="text-dark"> {this.state.count} </b></h4>
                    <h6 className="mb-2"><span className="text-muted small">Number of all Subjects</span></h6>
                </div>
            </div>
            <div className="row">
            <div className="col-12 shadow-sm rounded bg-white mt-3" >
            <h6 className="text-header py-3 mb-0 font-weight-bold line-hight-1">Subjects by years</h6>
                <Bar data={this.state.data}></Bar>
            </div>
        </div>
        </div>
        
    </main>
  </div>
  );}

}

export default SubStat;
