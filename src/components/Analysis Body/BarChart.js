import React, { useEffect, useState } from 'react'
import { Bar } from 'react-chartjs-2';
import './BarChart.css'
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend,
  } from 'chart.js';
  ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend
  );


function BarChart(props) {
    // let parameter=props.eleData[0];
    // let paramData=props.eleData[1];
    let eleData=props.eleData;
    // const [modParamData, setModParamData] = useState();    
    const [labels, setLabels] = useState([]);
    const [chartData, setChartData] = useState([]);
    const [highestData, setHighestData] = useState();
    const [lowestData, setLowestData] = useState();
    const [averageData, setAverageData] = useState();
    useEffect(() => {
        console.log(props.eleData);
        let tlabels=[];
        let ttchartData=[];
        let thigh=0;
        let tlow=1000000000;
        let taverage=0;
        if(props.eleData&&props.eleData[1]){
            for(let obj of props.eleData[1]){
                tlabels.push(obj.date.local);
                ttchartData.push(obj.value);
                if(obj.value>thigh){
                    thigh=obj.value;
                }
                if(obj.value<tlow){
                    tlow=obj.value;
                }
                taverage+=obj.value;
            }
            taverage=taverage/props.eleData[1].length;
            taverage=taverage.toFixed(2);
            for(let labels in tlabels){
                let dt='';
                let tm='';
                let flag=1;
                for(let letter of tlabels[labels]){
                    if(flag&&letter!=='T'){
                        dt+=letter;
                    }
                    else if(letter==='T'){
                        flag=0;
                        continue;
                    }
                    if(!flag&&letter!=='+'){
                        tm+=letter;
                    }
                    else if(!flag){
                        break;
                    }
                }
                tlabels[labels]=dt+','+tm;
            }
            console.log(tlabels,ttchartData,thigh,tlow,taverage);
            setAverageData(taverage);
            setHighestData(thigh);
            setLowestData(tlow);
            setChartData(ttchartData);
            setLabels(tlabels);
        }
        

    }, [props.eleData]);

     const options = {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: {
            position: 'top',
          },
          title: {
            display: true,
            text: `Concentration of ${props.eleData&&props.eleData[0]&&props.eleData[0][0]?props.eleData[0][0].toUpperCase():''} over the past days`,
          },
        },
      };
      const data = {
        labels:labels,
        datasets: [
          {
            label: eleData[0][0],
            data: chartData,
            backgroundColor: 'rgba(255, 99, 132, 0.5)',
          },
        ],
      };
    return (
        <section className='analysis-section' id={eleData[0][0]}>
                        <div className='analysis-section-heading'>
                            <h2>{eleData[0][0].toUpperCase()}</h2>
                        </div>
                        <div className='analysis-section-body'>
                            <div className='simple-datadisplay'>
                                <div className='average datadisplay'>
                                    <div className='average data-heading'>
                                        Average value over the past day(s): 
                                    </div>
                                    <div className='average data-body'>
                                        {averageData}
                                    </div>
                                </div>
                                <div className='highest datadisplay'>
                                        <div className='highest data-heading'>
                                            Highest value over the past day(s): 
                                        </div>
                                        <div className='highest data-body'>
                                            {highestData}
                                        </div>
                                </div>
                                <div className='lowest datadisplay'>
                                        <div className='lowest data-heading'>
                                            Lowest value over the past day(s): 
                                        </div>
                                        <div className='lowest data-body'>
                                            {lowestData}
                                        </div>
                                </div>
                            </div>
                            <div className='charts-analysis-main'>
                                <div className='bar-chart-main'>
                                    <Bar
                                        options={options}
                                        data={data}
                                    />
                                </div>
                            </div>
                        </div>
                    </section>
    )
}

export default BarChart
