import React from 'react';
import { reduce } from 'lodash';
import {Pie} from "react-chartjs-2";

function LecStat(props){
    console.log("Dashboard: ", props.data);
    // const data = {
    //     labels: ["Professors", "Assistant Professors", "Senior Lecturers(HG)", "Senior Lecturers", "Lecturers", "Assistant Lecturers", "Instructors"],
    //         datasets: [
    //           {
    //             label: "Number",
    //             data: [4, 6, 2, 1, 2, 3, 1],
    //             fill: true,
    //             backgroundColor: ["rgba(18,112,31,0.5)", "rgba(18,112,93,0.5)", "rgba(18,62,112,0.5)", "rgba(76,18,112,0.5)", "rgba(112,18,70,0.5)", "rgba(112,59,18,0.5)", "rgba(3,90,252,0.5)"],
    //             borderColor: "rgba(130,130,130,0.8)"
    //           },
    //         ]
    //   }
    const data = props.data;
    return(
            <div className="shadow-sm rounded bg-white mt-2  px-2 pt-2 pb-3" >
            <h6 className="text-header pt-2 mb-0 font-weight-bold line-hight-1 ml-2">Total Lecturers by Rank
    <br></br><span className="text-muted small">{props.count} Total Lecturers</span>
            </h6>
            <Pie  data={data} width={100} height={50} options={
                {
                        legend: {
                            position: 'right'
                        }
                
                }
            }></Pie>
            </div>
    );
}

export default LecStat;
// module.exports = StudentStat;