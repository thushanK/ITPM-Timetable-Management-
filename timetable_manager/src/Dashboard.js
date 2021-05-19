import React, { useState, useEffect } from 'react';
import Sidebar from './components/Sidebar'
import StudentStat from './funtions/Statistics/Components/Com.StudentStat';
import SubjectStat from './funtions/Statistics/Components/Com.SubjectsStat';
import LecStat from './funtions/Statistics/Components/Com.LecturerStat';

import STATS_CONTROLLER from './controllers/Stats.Controller';


class Dashboard extends React.Component {

    constructor(props) {
      super(props);
      this.state = {
        lecData : {
          labels: ["Professors", "Assistant Professors", "Senior Lecturers(HG)", "Senior Lecturers", "Lecturers", "Assistant Lecturers", "Instructors"],
              datasets: [
                {
                  label: "Number",
                  data: [4, 6, 2, 1, 2, 3, 1],
                  fill: true,
                  backgroundColor: ["#032F5D", "#044182", "#0654A7", "#1F6EC0", "#518ECE", "#83AEDC", "#B4CEEA"]
                  ,borderColor: "rgba(130,130,130,0.0)"
                },
              ]
        }
      ,
        SubData : {
          labels: ["First Year", "Second Year", "Third Year", "Fourth Year"],
              datasets: [
                {
                  label: "Subjects",
                  data: [11, 23, 21, 11],
                  fill: true,
                  backgroundColor: "rgba(125,51,181,0.5)",
                  borderColor: "rgba(125,51,181,0.5)"
                },]
        }
      ,
        StuData : {
          labels: ["First Year", "Second Year", "Third Year", "Fourth Year"],
          datasets: [
            {
              label: "Student groups",
              data: [3, 3, 3, 3],
              fill: true,
              backgroundColor: "rgba(125,51,181,0.5)",
              borderColor: "rgba(125,51,181,0.5)"
            },
          ]
        },
        numLec: 0,
        numSub: 0,
        numStu: 0,
      }
    }
  
    async componentDidMount(){
       const lecs = await STATS_CONTROLLER.getLecStats();
       console.log(lecs)
       const subs = await STATS_CONTROLLER.getSubStats();
       console.log(subs);
       const stus = await STATS_CONTROLLER.getStudentStats();
       console.log(stus);
  
       this.setState({
        lecData : {
          labels: ["Professors", "Assistant Professors", "Senior Lecturers(HG)", "Senior Lecturers", "Lecturers", "Assistant Lecturers", "Instructors"],
              datasets: [
                {
                  label: "Number",
                  data: [lecs.type1, lecs.type2, lecs.type3, lecs.type4, lecs.type5, lecs.type6, lecs.type7],
                  fill: true,
                  backgroundColor: ["#032F5D", "#044182", "#0654A7", "#1F6EC0", "#518ECE", "#83AEDC", "#B4CEEA"]
                  ,borderColor: "rgba(125,51,181,0.5)"
                },
              ]
        }
      ,
        SubData : {
          labels: ["First Year", "Second Year", "Third Year", "Fourth Year"],
              datasets: [
                {
                  label: "Subjects",
                  data: [parseInt(subs.year1), parseInt(subs.year2), parseInt(subs.year3), parseInt(subs.year4)],
                  fill: true,
                  backgroundColor: "rgba(125,51,181,0.5)",
                  borderColor: "rgba(125,51,181,0.5)"
                },]
        }
      ,
        StuData : {
          labels: ["First Year", "Second Year", "Third Year", "Fourth Year"],
          datasets: [
            {
              label: "Student groups",
              data: [parseInt(stus.year1), parseInt(stus.year2), parseInt(stus.year3), parseInt(stus.year4)],
              fill: true,
              backgroundColor: "rgba(125,51,181,0.5)",
              borderColor: "rgba(125,51,181,0.5)"
            },
          ]
        },
        numLec: lecs.lecs,
        numStu: stus.count,
        numSub: subs.subs,
       });
    }
  
  render(){  return (
      <div className="app" >
      <Sidebar activemenu={'DASHBOARD'} />
      <main>
          <div className="container-fluid" >
            <div className="row" >
                <div className="col-12 shadow-sm rounded bg-white" >
                  <h6 className="text-header py-3 mb-0 font-weight-bold line-hight-1">Admin Dashboard<br></br>
                  <span className="text-muted small">Summery</span></h6>
                </div>
            </div>
            <div className="row">
              <div className="col-sm-6 px-0" >
                <StudentStat data={this.state.StuData} count={this.state.numStu}></StudentStat>
              </div>
              <div className="col-sm-6 pr-0" >
                <LecStat data={this.state.lecData} count={this.state.numLec}></LecStat>
              </div>
              <div className="col-sm-6 px-0" >
                <SubjectStat data={this.state.SubData} count={this.state.numSub}></SubjectStat>
              </div>
            </div>
          </div>
          
      </main>
    </div>
    );
  
  }
  }
  
  export default Dashboard;
  