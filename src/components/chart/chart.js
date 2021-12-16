import React, { useEffect, useState } from 'react';

import Chart from 'chart.js';

export default function ChartComponent(props) {

    console.log(props.labels.length * 100);

    let ctx = document.getElementById('myChart'),
        myChart,
        finalUrlString = window.location.href.substring(window.location.href.lastIndexOf('/') + 1);

    useEffect(() => {
        
        // Chart colour rules
        let dataset1BackgroundColor,
            dataset1BorderColor,
            dataset2BackgroundColor,
            dataset2BorderColor;

        switch(props.theme) {
            case 'red-blue':
                dataset1BackgroundColor = '#f12745'
                dataset1BorderColor = '#a80b22'
                dataset2BackgroundColor = '#3375e6'
                dataset2BorderColor = '#14479f'
        }

        const data = {
            labels: props.labels,
            datasets: [
                {
                    label: props.dataset1Label,
                    backgroundColor: dataset1BackgroundColor,
                    borderColor: dataset1BorderColor,
                    borderWidth: props.borderWidth ? props.borderWidth : 1,
                    data: props.dataset1Values
                },
                {
                    label: props.dataset2Label,
                    backgroundColor: dataset2BackgroundColor,
                    borderColor: dataset2BorderColor,
                    borderWidth: props.borderWidth ? props.borderWidth : 1,
                    data: props.dataset2Values
                }
            ]
        };
        
        const config = {
            type: props.type,
            data: data,
            options: {
                scales: {
                    xAxes: [
                        {
                            ticks: {
                                reverse: props.xReverse,
                                min: parseInt(props.xMin),
                                max: parseInt(props.xMax),
                                stepSize: parseInt(props.xStep)
                            },
                            stacked: true
                        }
                    ],
                    yAxes: [
                        {
                            stacked: true
                        }
                    ]
                },
                showTooltips: false
                }
            }

        const myChart = new Chart(document.getElementById('myChart'), config);
        
        // Destroy chart instance so chart isn't duplicated
        return () => myChart.destroy();

    },[finalUrlString]);

    const Heading = 'h' + `${props.headingLevel}` || 1;

    return (
        <>
            <Heading>{props.title}</Heading>
            <canvas id="myChart" width="500" height={props.labels.length * 30}></canvas>
        </>
    )
} 