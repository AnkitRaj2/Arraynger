import {useState} from 'react';
import {Chart as ChartJS, CategoryScale, LinearScale,
        BarElement, Title, Tooltip, Legend} from 'chart.js';
import {Bar} from 'react-chartjs-2';

import {originalData, data} from './Home';
import Search from './Search';
import Sort from './Sort'
import styles from '../styles/visualize.module.css';

var visualizeMode = 'Search';

ChartJS.register(CategoryScale, LinearScale, BarElement,
    Title, Tooltip, Legend);

// Bar chart display settings
const options = 
{
    responsive: true,
    scales:
    {
        x: 
        {
            grid: {display: false},
            ticks:
            {
                color: 'black',
                font:
                {
                    size: 18,
                    family: 'monospace'
                }
            }
        },
        y: {display: false}
    },
    plugins: {legend: {display: false}}
};

// Store bar chart data
var barData;
var barColors;
var dataDisplayer;

// Perform visualization corresponding to parameter
function Operate(parameter)
{
    if (visualizeMode === 'Search')
    {
        Search((document.getElementById('searchDropdown')).value, parameter,
            1050 - (document.getElementById('speedSlider')).value * 50);
    }
    else
    {
        Sort(parameter, 1050 - (document.getElementById('speedSlider')).value * 50);
    }
}

// Update bar chart data
function UpdateData(newColors, newData = barData)
{
    for (let i = 0; i < barData.length; i++)
    {
        barData[i] = newData[i];
    }
    barColors = newColors;

    DisplayData();
}

// Display data as bar chart
function DisplayData()
{
    dataDisplayer(
    {
        labels: barData,
        datasets: 
        [{
            data: barData,
            backgroundColor: barColors
        }]
    });
}

const Visualize = () => 
{
    // Toggle between visualization modes
    const [isToggled, setIsToggled] = useState(false);
    const toggleHandler = () => 
    {
        setIsToggled(!isToggled);

        if (visualizeMode === 'Sort')
        {
            visualizeMode = 'Search';
            ((document.getElementById('sort')).style).color = 'red';
            ((document.getElementById('search')).style).color = 'darkgreen';
            ((document.getElementById('searchInput')).style).display = 'flex';
        }
        else
        {
            visualizeMode = 'Sort';
            ((document.getElementById('search')).style).color = 'red';
            ((document.getElementById('sort')).style).color = 'darkgreen';
            ((document.getElementById('searchInput')).style).display = 'none';
        }

        (document.getElementById('b1')).innerHTML = visualizeMode;
    };

    // Set bar chart data
    barData = data;
    barColors = (Array(data.length)).fill('green');
    const [chartData, setChartData] = useState(
    {
        labels: barData,
        datasets: 
        [{
            data: barData,
            backgroundColor: barColors
        }]
    });
    dataDisplayer = setChartData;

    return (
        <div className = {styles.container}>
            <div className = {styles.menu}>
                <button className = {styles.button} style = {{marginRight: '1vw'}}
                    onClick = {() => UpdateData(barColors, originalData)}>Reset</button>
                <button className = {styles.button} style = {{marginRight: '1vw'}}
                    onClick = {() =>
                    {
                        // Shuffle data using Fisher-Yates algorithm
                        let temp;
                        for (let i = barData.length - 1; i > 0; i--)
                        {
                            temp = Math.floor(Math.random() * (i + 1));
                            [barData[i], barData[temp]] = [barData[temp], barData[i]];
                        }

                        UpdateData(barColors);
                    }}>
                    Shuffle
                </button>
                <p style = {{marginRight: '0.5vw'}}>Speed: 1</p>
                <input type = 'range' min = {1} max = {10} defaultValue = {1} 
                    id= 'speedSlider' className = {styles.rangeSlider} />
                <p style = {{marginLeft: '0.5vw'}}>10</p>
            </div>            
            <div className = {styles.toggle}>
                <h2 id = 'search' style = {{color: 'darkgreen'}}>Search:</h2>
                <select className = {styles.searchDropdown} id = 'searchDropdown'>
                    <option>Linear</option>
                    <option>Binary</option>
                </select>
                <label className = {styles.switch}>
                    <input type = 'checkbox'
                        checked = {isToggled}
                        onChange = {toggleHandler} />
                    <span className = {styles.slider} />
                </label>
                <h2 style = {{marginLeft: '1vw', color: 'red'}} id = 'sort'>Sort:</h2>
                <select className = {styles.sortDropdown} id = 'sortDropdown'>
                    <option>Insertion</option>
                    <option>Selection</option>
                    <option>Bubble</option>
                    <option>Quick</option>
                    <option>Merge</option>
                    <option>Jungle</option>
                </select>
            </div>
            <div className = {styles.visualize}>
                <button className = {styles.button} id = 'b1'
                    onClick = {() => 
                    {
                        if (visualizeMode === 'Search')
                        {
                            // Validate search element before searching
                            if ((document.getElementById('searchBox')).value === '')
                            {
                                alert('Please enter the number to be searched.');
                            }
                            else if (isNaN((document.getElementById('searchBox')).value))
                            {
                                alert('Please enter only a number.')
                            }
                            else
                            {
                                Operate((document.getElementById('searchBox')).value);
                            }
                        }
                        else
                        {
                            Operate((document.getElementById('sortDropdown')).value)
                        }
                    }}>
                    {visualizeMode}
                </button>
                <div className = {styles.searchInput} id = 'searchInput'>
                    <p style = {{margin: '0.5vw'}}>for</p>
                    <textarea className = {styles.searchText} id = 'searchBox' />
                </div>
            </div>
            <div>
                <Bar width = {data.length * 50} height = {400} style = {{marginTop: '10vh'}} 
                    options = {options} data = {chartData} />
            </div>            
        </div>
    );
};

export {Visualize, UpdateData, DisplayData, barData, barColors};