import {barData, barColors, UpdateData} from "./Visualize";

var colors;
var delay;

async function Search(searchType, value, searchDelay)
{
    colors = barColors;
    delay = searchDelay;
    colors[await ((searchType === 'Linear') ? LinearSearch(value) : BinarySearch(value))] = 'green';
    UpdateData(colors);
}

async function LinearSearch(value)
{
    // Sequentially search array for desired element
    for (let i = 0; i < barData.length; i++)
    {
        colors[i] = 'red';
        if (i > 0) 
        {
            colors[i - 1] = 'green';
        }
        UpdateData(colors);          
        await new Promise(resolve => setTimeout(resolve, delay));

        if ((barData[i]).toString() === value.toString()) 
        {
            alert('Element found.');
            return i;
        }
    }

    alert('Element not found.');
    return barData.length - 1;
}

async function BinarySearch(value)
{
    // Check if array is sorted before searching for desired element
    for (let i = 1; i < barData.length; i++) 
    {
        if (parseFloat(barData[i]) < parseFloat(barData[i - 1])) 
        {
            alert('Cannot search in unsorted data.');
            return;
        }
    }
  
    // Incrementally narrow search domain by comparing desired element with
    // minimum and maximum elements in domain
    let lowIndex = 0;
    let highIndex = barData.length - 1;
    let middleIndex;
  
    while (highIndex >= lowIndex) 
    {
        middleIndex = lowIndex + Math.floor((highIndex - lowIndex) / 2);

        colors[middleIndex] = 'red';
        UpdateData(colors);
        await new Promise(resolve => setTimeout(resolve, delay));

        if (parseFloat(barData[middleIndex]) === parseFloat(value)) 
        {
            alert('Element found.');
            return middleIndex;
        }
        if (parseFloat(barData[middleIndex]) > parseFloat(value)) 
        {
            highIndex = middleIndex - 1;
        } 
        else 
        {
            lowIndex = middleIndex + 1;
        }

        colors[middleIndex] = 'green';
    }

    alert('Element not found.');
    return middleIndex;
}

export default Search;