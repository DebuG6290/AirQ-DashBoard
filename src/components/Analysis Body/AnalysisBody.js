import React, { useEffect, useState } from 'react'
import BarChart from './BarChart';
import './AnalysisBody.css'

function AnalysisBody(props) {
    const locationCoords=props.locationCoords;
    const latestAqData=props.latestAqData;
    const parameters=props.parameters;
    const paramData=props.paramData;
    // console.log(paramData);
    const [modifiedParamData, setModifiedParamData] = useState();
    const [highestData, setHighestData] = useState();
    const [lowestData, setLowestData] = useState();
    const [averageData, setAverageData] = useState();

    useEffect(() => {
        let temp=[];
        for(let i=0;i<7;i++){
            let parameter=parameters[i];
            temp.push([[parameter],paramData[i]]);
        }
        setModifiedParamData(temp);
        
        console.log(temp);
    }, [paramData])

    return (
        <div className='analysis-main'>
            <div className='analysis-main-heading'>
                Air Quality Analysis 
            </div>
            <div className='analysis-main-body'>
                {modifiedParamData!==null&&modifiedParamData!==undefined?modifiedParamData.map((eleData)=>{
                    if(eleData!==undefined&&eleData&&eleData[1]&&eleData[1][0]){
                        return (<BarChart eleData={eleData}/>)     
                    }
                }):null}
            </div>
        </div>
    )
}

export default AnalysisBody
