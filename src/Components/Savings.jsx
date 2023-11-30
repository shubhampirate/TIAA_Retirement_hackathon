import React, { useState, useEffect } from 'react'
import { Grid, TextField, Button } from '@mui/material';
import axios from 'axios';
import Swal from 'sweetalert2';
import { DoughnutController, ArcElement } from 'chart.js';
import { BarElement, CategoryScale, Chart as ChartJS, Legend, LinearScale, Title, Tooltip } from "chart.js";
import { Doughnut } from 'react-chartjs-2';
ChartJS.register(DoughnutController, ArcElement);

function Savings() {
    const [expensedata, setExpensedata] = useState([])

    useEffect(() => {
        loadList();
    }, []);

    const loadList = async () => {
        const result = await axios.get(`https://wixstocle.pythonanywhere.com/api/saving/`, {
            headers: { "Authorization": `Token 11c868750d92deda81638c5a9a59177bdc7ae41a` },
        });
        console.log(result.data.data);
        setExpensedata(result.data.data);
    }
    useEffect(() => {
        // Calculate total goal amount and total savings
        let totalGoalAmount = 0;
        let totalSavings = 0;

        expensedata.forEach(entry => {
            totalGoalAmount += parseFloat(entry.goal_amount);
            totalSavings += parseFloat(entry.amount);
        });

        // Update state with the new total values
        setTotalGoalAmount(totalGoalAmount);
        setTotalSavings(totalSavings);
    }, [expensedata]); // Re-run the effect whenever expensedata changes

    // State to store total goal amount and total savings
    const [totalGoalAmount, setTotalGoalAmount] = useState(0);
    const [totalSavings, setTotalSavings] = useState(0);

    const today = new Date();
    const year = today.getFullYear();
    const month = String(today.getMonth() + 1).padStart(2, '0'); // Months are zero-based
    const day = String(today.getDate()).padStart(2, '0');

    const todayDate = `${year}-${month}-${day}`;

    const [userData, setUserData] = React.useState({
        amount: '',
        goal_amount: '',
        description: '',
        date: todayDate,
        user: "tony@gmail.com"
    });

    const handleChangePlan = (field, value) => {
        setUserData((prevData) => ({ ...prevData, [field]: value }));
    };

    const handlePostData = () => {
        console.log(userData);
        fetch(`https://wixstocle.pythonanywhere.com/api/saving/`, {
            method: 'POST',
            headers: {
                "Authorization": `Token 11c868750d92deda81638c5a9a59177bdc7ae41a`,
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(userData),
        })
            .then((response) => response.json())
            .then((data) => {
                // console.log(data);
                if (data.status == true) {
                    Swal.fire({
                        icon: 'success',
                        title: 'Successfully Saved the details',
                        showConfirmButton: false,
                        timer: 3000
                    })
                    setExpensedata([...expensedata, userData]);
                }
                else {
                    Swal.fire({
                        icon: 'error',
                        title: data.message,
                        showConfirmButton: false,
                        timer: 3000
                    })
                }
            });
    };

    const savingsPercentage = (totalSavings / totalGoalAmount) * 100;

    const chartData = {
        labels: ['Savings', 'Goal Amount'],
        datasets: [
            {
                data: [savingsPercentage, 100 - savingsPercentage], // Use percentage values
                backgroundColor: ['#4da6ff', '#85c1f1'], // Blue for savings, light gray for remaining
                hoverBackgroundColor: ['#3385cc', '#e6e6e6'],
            },
        ],
    };

    const chartOptions = {
        maintainAspectRatio: false,
        cutout: '70%',
        plugins: {
            legend: {
                display: true,
                position: 'bottom',
            },
            title: {
                display: true,
                text: 'Savings Progress',
            },
        },
        width: 700,
        height: 700,
    };

    return (
        <Grid container spacing={2}>
            <Grid item xs={12}>
            </Grid>
            <Grid item xs={12} md={6}>
                <div style={{ textAlign: "left", fontSize: "0.78rem" }}>Savings Amount</div>
                <TextField
                    id="amount"
                    name="amount"
                    color='success'
                    value={userData.amount}
                    size='small'
                    onChange={(e) => handleChangePlan('amount', e.target.value)}
                    sx={{ width: "100%" }}
                />
            </Grid>
            <Grid item xs={12} md={6}>
                <div style={{ textAlign: "left", fontSize: "0.78rem" }}>Goal Amount</div>
                <TextField
                    id="goal_amount"
                    name="goal_amount"
                    color='success'
                    size='small'
                    value={userData.goal_amount}
                    onChange={(e) => handleChangePlan('goal_amount', e.target.value)}
                    sx={{ width: "100%" }}
                />
            </Grid>
            <Grid item xs={12} >
                <div style={{ textAlign: "left", fontSize: "0.78rem" }}>Description</div>
                <TextField
                    id="description"
                    name="description"
                    color='success'
                    size='small'
                    value={userData.description}
                    onChange={(e) => handleChangePlan('description', e.target.value)}
                    sx={{ width: "100%" }}
                />
            </Grid>
            <Grid item xs={12}>
                <Button sx={{
                    width: "100%", height: "2.3rem", fontSize: "1.1rem",
                    backgroundColor: "#2196F3", boxShadow: "none", color: "white", marginTop: "0.5rem",
                    textTransform: "capitalize"
                    , "&:hover": {
                        backgroundColor: "#2196F3", boxShadow: "none", color: "white",
                        fontSize: "1.3rem", cursor: "pointer"
                    }
                }}
                    onClick={handlePostData}>
                    Submit
                </Button>
            </Grid>
            <Grid item xs={12}>
                <div style={{ textAlign: "left", fontSize: "1rem", fontWeight: "500" }}>Savings Amount: ₹ {totalSavings}</div>
            </Grid>
            <Grid item xs={12}>
                <div style={{ textAlign: "left", fontSize: "1rem", fontWeight: "500" }}>Goal Amount: ₹ {totalGoalAmount}</div>
            </Grid>
            <Grid item xs={12}>
                <Doughnut data={chartData} options={chartOptions} style={{ height: "15rem" }} />
            </Grid>
        </Grid>
    )
}

export default Savings