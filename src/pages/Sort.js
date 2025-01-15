import {barData, barColors, UpdateData} from "./Visualize";

var data;
var colors;
var delay;

async function Sort(sortType, sortDelay) 
{
    data = barData;
    colors = barColors;
    delay = sortDelay;

    switch (sortType)
    {
        case 'Insertion':
        {
            await InsertionSort();
            break;
        }
        case 'Selection':
        {
            await SelectionSort();
            break;
        }
        case 'Quick':
        {
            await QuickSort(0, data.length - 1);
            break;
        }
        case 'Merge':
        {
            await MergeSort();
            break;
        }
        case 'Bubble':
        {
            await BubbleSort();
            break;
        }
        case 'Jungle':
        {
            await JungleSort();
            break;
        }
    }

    UpdateData(colors, data);
    await new Promise(resolve => setTimeout(resolve, delay));
    alert('Sort completed.');
}

async function InsertionSort()
{
    // Sort incrementally larger groups of elements
    for (let i = 0; i < data.length; i++)
    {
        let j = i + 1;
        colors[j] = 'red';

        // Swap adjacent elements backwards until sorted pair is found
        while (j > 0 && parseFloat(data[j]) < parseFloat(data[j - 1]))
        {
            [data[j], data[j - 1]] = [data[j - 1], data[j]];

            colors[j - 1] = 'red';
            UpdateData(colors);
            await new Promise(resolve => setTimeout(resolve, delay));
            colors[--j] = 'green';
        }

        colors[i + 1] = 'green';
    }
}

async function SelectionSort()
{
    // Store smallest element found in each iteration
    let min;

    // Find smallest element for each index
    for (let i = 0; i < data.length; i++)
    {
        min = i;
        colors[i] = 'red';

        for (let j = i + 1; j < data.length; j++)
        {
            colors[j] = 'red';
            
            if (parseFloat(data[j]) < parseFloat(data[min]))
            {
                min = j;
            }

            UpdateData(colors);
            await new Promise(resolve => setTimeout(resolve, delay));
            colors[j] = 'green';
        }

        // Swap current element with smallest of remaining elements
        if (min !== i)
        {
            [data[i], data[min]] = [data[min], data[i]];
        }

        colors[i] = 'green';
    }
}

async function BubbleSort()
{
    // Move each element to sorted position
    for (let i = 0; i < data.length; i++)
    {
        // Check if any swaps are performed in current iteration
        let flag = false;

        for (let j = 1; j < data.length; j++)
        {
            colors[j - 1] = 'red';
            colors[j] = 'red';
            UpdateData(colors);
            await new Promise(resolve => setTimeout(resolve, delay));

            // Swap adjacent elements if out of order
            if (parseFloat(data[j]) < parseFloat(data[j - 1]))
            {
                flag = true;

                [data[j - 1], data[j]] = [data[j], data[j - 1]];
                UpdateData(colors);
                await new Promise(resolve => setTimeout(resolve, delay));    
            }

            colors[j - 1] = 'green';
            colors[j] = 'green';
        }

        // End sort if no swaps are performed for optimization
        if (!flag)
        {
            return;
        }
    }
}

async function QuickSort(low, high)
{
    // Sort current partition until sorted position of pivot is found
    if (low < high) 
    {        
        // Select last element as pivot
        colors[high] = 'red';
        UpdateData(colors);
        await new Promise(resolve => setTimeout(resolve, delay));
        colors[high] = 'green';

        let pivot = data[high];
        
        // Store sorted position of pivot
        let i = low - 1;
        
        // Sort elements smaller than pivot
        for (let j = low; j < high; j++) 
        {
            colors[j] = 'red';
            UpdateData(colors);
            await new Promise(resolve => setTimeout(resolve, delay));
            colors[j] = 'green';

            if (parseFloat(data[j]) < parseFloat(pivot)) 
            {
                if (j !== ++i)
                {
                    colors[i] = 'red';
                    colors[j] = 'red';
                    UpdateData(colors);
                    await new Promise(resolve => setTimeout(resolve, delay));

                    [data[i], data[j]] = [data[j], data[i]];
                    UpdateData(colors);
                    await new Promise(resolve => setTimeout(resolve, delay));

                    colors[i] = 'green';
                    colors[j] = 'green';
                }
            }
        }
        
        // Move pivot to correct position
        if (high !== i + 1)
        {
            colors[i + 1] = 'red';
            colors[high] = 'red';
            UpdateData(colors);
            await new Promise(resolve => setTimeout(resolve, delay));

            [data[i + 1], data[high]] = [data[high], data[i + 1]];
            UpdateData(colors);
            await new Promise(resolve => setTimeout(resolve, delay));

            colors[i + 1] = 'green';
            colors[high] = 'green';
        }

        // Partition array and sort left and right halves
        await QuickSort(low, i++);
        await QuickSort(++i, high);
    }
}

async function MergeSort() 
{
    // Temporary variables for swaps
    let temp, temp2;

    // Incrementally increase subarray size
    for (let size = 1; size < data.length; size += (size * 2 < data.length / 2) ? size : 1)
    {
        // Ignore non-ideal subarray sizes for optimization
        if (data.length % 2 === 0 && data.length % size !== 0)
        {
            continue;
        }

        // Selection sort on subarrays of current size
        for (let i = 0; i < data.length - (data.length % (size * 2)); i += size * 2)
        {
            for (let j = i; j < i + size * 2; j++)
            {
                for (let k = i; k <= j; k++)
                {
                    colors[k] = 'red';
                }
                UpdateData(colors);
                await new Promise(resolve => setTimeout(resolve, delay));

                temp = j;
                for (let k = j + 1; k < i + size * 2; k++)
                {
                    colors[k] = 'red';
                    UpdateData(colors);
                    await new Promise(resolve => setTimeout(resolve, delay));

                    if (parseFloat(data[k]) < parseFloat(data[temp]))
                    {
                        temp = k;
                    }
                }
                if (temp !== j)
                {
                    [data[j], data[temp]] = [data[temp], data[j]]
                }

                for (let k = i; k < i + size * 2; k++)
                {
                    colors[k] = 'green';
                }
            }
        }
    }

    // Adjust for odd array size
    if (data.length % 2 !== 0)
    {
        colors[data.length - 1] = 'red';
        UpdateData(colors);
        await new Promise(resolve => setTimeout(resolve, delay));
        colors[data.length - 1] = 'green';

        // Find sorted position of last element
        for (let i = 0; i < data.length - 1; i++)
        {
            if (parseFloat(data[data.length - 1]) <= parseFloat(data[i]))
            {
                temp = i;
                break;
            }
        }

        // Shift elements right and insert last element
        temp2 = data[data.length - 1];
        for (let i = data.length - 1; i > temp; i--)
        {
            data[i] = data[i - 1];
        }
        data[temp] = temp2;

        colors[temp] = 'red';
        UpdateData(colors);
        await new Promise(resolve => setTimeout(resolve, delay));
        colors[temp] = 'green';
    }
}

async function JungleSort()
{
    // Store if data is sorted
    let sorted = true;
    for (let i = 1; i < data.length; i++) 
    {
        if (parseFloat(data[i]) < parseFloat(data[i - 1])) 
        {
            sorted = false;
            break;
        }
    }

    // Temporary variable for shuffling
    let temp;
    
    // Shuffle elements until data is sorted
    while (!sorted)
    {
        // Shuffle elements using Fisher-Yates algorithm
        for (let i = data.length - 1; i > 0; i--) 
        {
            temp = Math.floor(Math.random() * (i + 1));
            [data[i], data[temp]] = [data[temp], data[i]];
        }

        UpdateData(colors);
        await new Promise(resolve => setTimeout(resolve, delay));        

        // Update if data is sorted
        sorted = true;
        for (let i = 1; i < data.length; i++) 
        {
            if (parseFloat(data[i]) < parseFloat(data[i - 1])) 
            {
                sorted = false;
                break;
            }
        }
    }
}

export default Sort;