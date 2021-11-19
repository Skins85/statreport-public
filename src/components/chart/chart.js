import React, { useEffect, useState } from 'react';

import Chart from 'chart.js';

export default function ChartComponent(props) {

    console.log(props);

    let ctx = document.getElementById('myChart'),
        myChart,
        finalUrlString = window.location.href.substring(window.location.href.lastIndexOf('/') + 1);

    useEffect(() => {
        
        // Chart colour rules
        let backgroundColor,
            borderColor;
        switch(props.theme) {
            case 'red':
                backgroundColor = '#f12745'
                borderColor = '#a80b22'
            }

        const data = {
            labels: props.labels,
            datasets: [{
                label: 'Goals',
                backgroundColor: backgroundColor,
                borderColor: borderColor,
                borderWidth: props.borderWidth ? props.borderWidth : 1,
                data: props.data,
            }]
        };
        
        const config = {
            type: props.type,
            data: data,
            options: {
                scales: {
                    xAxes: [{
                        ticks: {
                            reverse: props.xReverse,
                            min: parseInt(props.xMin),
                            max: parseInt(props.xMax),
                            stepSize: parseInt(props.xStep)
                        }
                    }]
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
            <canvas id="myChart" width="500" height="400"></canvas>
        </>
    )
}