import React, { useState, useEffect } from 'react';
import { Area, ResponsiveContainer, XAxis, YAxis, CartesianGrid, Tooltip, Legend, AreaChart  } from 'recharts';
import styles from './Chart.module.css';
import { fetchDailyData } from '../../api';

const Chart = ({data: {confirmed, recovered, deaths }, country}) => {

const [ dailyData, setDailyData ] = useState({});

useEffect(() => {
    const fetchAPI = async () => {
        const initialDailyData = await fetchDailyData();

        setDailyData(initialDailyData);
    }
    
fetchAPI();
}, []);

const yFormatter = (num) =>  {
    return Math.abs(num) > 999 ? Math.sign(num)*((Math.abs(num)/1000).toFixed(1)) + 'k' : Math.sign(num)*Math.abs(num)
}

const formatDate = (value) => {
    const months = {
      "01": "Jan",
      "02": "Feb",
      "03": "Mar",
      "04": "Apr",
      "05": "May",
      "06": "Jun",
      "07": "Jul",
      "08": "Aug",
      "09": "Sep",
      "10": "Oct",
      "11": "Nov",
      "12": "Dec",
    }
    const day = value.slice(8)
    const month = months[value.slice(5, 7)]
  
    return `${month} ${day}`
}

const lineChart = (
    dailyData[0] ? 
    (
    <ResponsiveContainer width='99%' minHeight={ 280 }>
        <AreaChart
            data={dailyData}
            margin={{
                top: 5,
                right: 20,
                left: 20,
                bottom: 5,
            }}
        >
            <defs>
                <linearGradient id="confirmed" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#ff9478" stopOpacity={0.8}/>
                    <stop offset="95%" stopColor="#ff9478" stopOpacity={0}/>
                </linearGradient>
                <linearGradient id="deaths" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#f64747" stopOpacity={0.8}/>
                    <stop offset="95%" stopColor="#f64747" stopOpacity={0}/>
                </linearGradient>
            </defs>
            <CartesianGrid horizontal={false} vertical={false} />
            <XAxis
                dataKey="date"
                tickLine={false}
                stroke="#5d5d5d"
                tickFormatter={formatDate}
            />
            <YAxis
                tickLine={false}
                stroke="#5d5d5d"
                tickFormatter={yFormatter}
            />
            <Tooltip
                contentStyle={{ background: "#fefefe" }}
                formatter={(value, name, props) => {
                return [
                    value.toLocaleString(),
                    name.charAt(0).toUpperCase() + name.slice(1),
                ]
                }}
                labelFormatter={formatDate}
            />
            <Legend
                iconType="circle"
                formatter={(value) => {
                    return value.charAt(0).toUpperCase() + value.slice(1)
                }}
                verticalAlign="top"
                align='right'
                height={36}
            />
            <Area
                type="monotone"
                dataKey="confirmed"
                stroke="#ff9478"
                fillOpacity={0.5}
                fill="#ff9478"
            />

            <Area
                type="monotone"
                dataKey="deaths"
                stroke="#f64747"
                fillOpacity={0.5}
                fill="#f64747"
            />
        </AreaChart>
    </ResponsiveContainer>
    ) : null
);

return(
    <div className={styles.root}>
        <div className={styles.container}>
            {lineChart}
        </div>
    </div>
)
}

export default Chart;