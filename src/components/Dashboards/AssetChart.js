import React from 'react';
import {Bar} from 'react-chartjs-2';
import {BarElement, CategoryScale, Chart as ChartJS, Legend, LinearScale, Title, Tooltip,} from 'chart.js';

ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend
);

const AssetChart = ({inUseCount, inStockCount, deprecatedCount, allAssetCount}) => {
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
                text: 'Urządzenia',
            },
        },
        scales: {
            x: {
                suggestedMin: 0,
                max: allAssetCount,
            },
            y: {
                grid: {
                    display: false
                }
            }
        }
    }

    const labels = [
        {
            name: 'Ilość urządzeń w magazynie',
            value: inStockCount
        },
        {
            name: 'Ilość urządzeń w użyciu',
            value: inUseCount
        },
        {
            name: 'Ilość urządzeń z przedawnioną amortyzacją',
            value: deprecatedCount
        }
    ];

    const data = {
        labels: labels.map(label => label.name),
        datasets: [
            {
                data: labels.map(label => label.value),
                borderColor: 'grey',
                backgroundColor: [
                    "#FFCC00",
                    "#D40511",
                    "rgba(36,27,27,0.81)"
                ],
            }
        ],
    };

    return (
        <div style={{marginBottom: "auto", marginTop: "auto"}}>
            <Bar options={options} data={data} width={500} height={300} type="bar"/>
        </div>
    );
};

export default AssetChart;