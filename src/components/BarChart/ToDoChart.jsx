
import React from 'react';
import {BarChart, Bar, XAxis, YAxis, Legend} from 'recharts';

const ToDoChart = ({data}) => {
    return (
        <>
       
        <BarChart width={600} height = {300} data={data} margin={{top: 5, right: 30, left: 20, bottom: 5}}>
            <XAxis dataKey='Name'/>
            <YAxis />
            <Legend/>
            <Bar dataKey='count' fill="#8884d8"/>
        </BarChart>
        </>
    )
}

export default ToDoChart;