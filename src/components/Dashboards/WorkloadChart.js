import React from 'react';
import {Bar} from "react-chartjs-2";

const WorkloadChart = ({workloadData}) => {
    const generateRandomColor = () => {
        return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
    }

    const options = {
        indexAxis: 'y',
        elements: {
            bar: {
                borderWidth: 2,
            },
        },
        responsive: true,
        plugins: {
            legend: {
                display: false
            },
            title: {
                display: true,
                text: 'Ilość zamówień',
            },
        },
        scales: {
            y: {
                grid: {
                    display: false
                }
            }
        }
    }

    const labels = workloadData
        .sort((a, b) => b.assignedOrders - a.assignedOrders)
        .map(workload => {
            return {
                name: workload.username,
                value: workload.assignedOrders,
                color: generateRandomColor()
            }
        })

    const data = {
        labels: labels.map(label => label.name),
        datasets: [
            {
                data: labels.map(label => label.value),
                borderColor: 'grey',
                backgroundColor: labels.map(label => label.color)
            }
        ],
    };

    return (
        <div>
            <Bar options={options} data={data} width={500} height={500} type="bar"/>
        </div>
    );
};

export default WorkloadChart;