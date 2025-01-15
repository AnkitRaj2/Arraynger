import {useNavigate} from "react-router-dom";

import styles from '../styles/home.module.css';

// Store initial and current data separately
var data, originalData;

function ValidateData()
{
    // Check if input data is empty
    if ((document.getElementById('data')).value === '')
    {
        alert('Data cannot be empty.');
        return false;
    }
    
    // Check if input data contains only numbers
    data = ((document.getElementById('data')).value).split(' ');
    for (let value of data)
    {
        if (isNaN(value))
        {
            alert('Please enter only numbers.');
            return false;
        }
    }

    originalData = [...data];
    return true;
}

const Home = () =>
{
    // Navigate to visualization page
    let navigate = useNavigate();

    return (
        <div className = {styles.container}>
            <h1 style = {{fontSize: '50px', marginBottom: '8vh'}}>Welcome to Arraynger!</h1>
            <h3 style = {{fontSize: '25px'}}>Enter data below to visualize.</h3>
            <textarea className = {styles.textarea} id = 'data'></textarea><br></br>
            <button className = {styles.button} onClick = {() => 
                {
                    if (ValidateData())
                    {
                        navigate('/visualize');
                    }
                }}>
                Visualize
            </button>
        </div>
    );
};

export {originalData, data, Home};