import React from 'react';
import { reduce } from 'lodash';
import {Bar} from "react-chartjs-2";

function StudentStat(props){
  const data = props.data;
    // const data = {
    //     labels: ["First Year", "Second Year", "Third Year", "Fourth Year"],
    //     datasets: [
    //       {
    //         label: "Student groups",
    //         data: [3, 3, 3, 3],
    //         fill: true,
    //         backgroundColor: "rgba(3,90,252,0.5)",
    //         borderColor: "rgba(75,192,192,1)"
    //       },
    //     ]
    //   }
    return(
            <div className="shadow-sm rounded bg-white mt-2  p-2" >
            <h6 className="text-header pt-2 mb-0 font-weight-bold line-hight-1 ml-2">Student Groups by Years
            <br></br><span className="text-muted small">{props.count} Total Groups</span>
            </h6>
                <Bar data={data}
                width={100}
                height={50}
                options={{  scales: {
                  xAxes: [{
                      gridLines: {
                        drawOnChartArea: false
                      }
                  }],
                  yAxes: [{
                      gridLines: {
                        drawOnChartArea: false
                      }   
                  }]
              } }}
                >
                </Bar>
            </div>
    );
}

export default StudentStat;
// module.exports = StudentStat;