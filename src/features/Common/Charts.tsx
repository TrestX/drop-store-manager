import React from 'react';
import { Chart } from 'primereact/chart';

const LineCharts = () => {
    const basicData = {
        labels: ['', '', '', '', '', '', ''],
        datasets: [
            {
                data: [65, 59, 80, 81, 56, 55, 40],
                fill: true,
                borderColor: '#0094ff',
                backgroundColor: '#7ac2f9',
                tension: .4
            }
        ]
    };

    const getLightTheme = () => {
        let basicOptions = {
            maintainAspectRatio: false,
            aspectRatio: .6,
            elements: {
                point:{
                    radius: 0
                }
            },
            plugins: {
                legend: {
                    display:false,
                    labels: {
                        color: '#495057'
                    }
                },
                tooltips: {
                    display:false,
                    enabled: false,
                },
            },
            tooltips: {
                display:false,
                enabled: false,
            },
            scales: {
                x: {
                    display:false,
                },
                y: {
                    display:false,
                }
            }
        };

        return {
            basicOptions
        }
    }

    const { basicOptions } = getLightTheme();

    return (
                <Chart type="line" style={{width:"120px",height:"60px",border:"none",float:"right",display:"block"}} data={basicData} options={basicOptions} />
    )
}

export default LineCharts;