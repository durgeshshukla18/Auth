import { useEffect, useState } from 'react';
import { Container, Typography, Box, Paper, Button, Grid } from '@mui/material';
import { collection, getDocs } from "firebase/firestore";
import { db } from "../firebase";
import SurveyForm from './SurveyForm';

const Dashboard = () => {
    const [userName, setUserName] = useState('');
    const [userInfo, setUserInfo] = useState({ orders: [], delivery: [], profile: {}, feedback: [] });
    const [open, setOpen] = useState(false);

    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    useEffect(() => {
        const name = localStorage.getItem('userName');
        setUserName(name || 'Guest');

        // Fetch user info from local storage
        const fetchedUserInfo = {
            orders: ['Order 1', 'Order 2'],
            delivery: ['Delivery 1', 'Delivery 2'],
            profile: {
                email: 'user@example.com',
                phone: '123-456-7890',
                address: '123 Main St, Anytown, USA'
            }
        };

        // Fetch feedback from Firestore
        const fetchFeedback = async () => {
            const feedbackCollection = collection(db, "surveys");
            const feedbackSnapshot = await getDocs(feedbackCollection);
            const feedbackList = feedbackSnapshot.docs
            .map(doc => doc.data())
            .filter(feedback => feedback.userName === name); // Filter feedback for the current user
            fetchedUserInfo.feedback = feedbackList;
            setUserInfo(fetchedUserInfo);
        };

        fetchFeedback();
    }, []);

    return (
        <Container>
            <Box sx={{ mt: 8 }}>
                <Typography variant="h4">
                    Welcome, {userName}!
                </Typography>
            </Box>
            <Box sx={{ mt: 4 }}>
                <Grid container spacing={2}>
                    <Grid item xs={12} md={4}>
                        <Paper sx={{ p: 2 }}>
                            <Typography variant="h6">Profile</Typography>
                            <Typography>Email: {userInfo.profile.email}</Typography>
                            <Typography>Phone: {userInfo.profile.phone}</Typography>
                            <Typography>Address: {userInfo.profile.address}</Typography>
                        </Paper>
                    </Grid>
                    <Grid item xs={12} md={4}>
                        <Paper sx={{ p: 2 }}>
                            <Typography variant="h6">Orders</Typography>
                            <ul>
                                {userInfo.orders.map((order, index) => (
                                    <li key={index}>{order}</li>
                                ))}
                            </ul>
                        </Paper>
                    </Grid>
                    <Grid item xs={12} md={4}>
                        <Paper sx={{ p: 2 }}>
                            <Typography variant="h6">Delivery</Typography>
                            <ul>
                                {userInfo.delivery.map((delivery, index) => (
                                    <li key={index}>{delivery}</li>
                                ))}
                            </ul>
                        </Paper>
                    </Grid>
                    <Grid item xs={12}>
                        <Paper sx={{ p: 2 }}>
                            <Typography variant="h6">Feedback</Typography>
                            <ul>
                                {userInfo.feedback.map((feedback, index) => (
                                    <li key={index}>{feedback.feedback}</li>
                                ))}
                            </ul>
                        </Paper>
                    </Grid>
                </Grid>
                <Button variant="contained" color="primary" onClick={handleOpen} sx={{ mt: 2 }}>
                    Open Survey Form
                </Button>
                <SurveyForm open={open} handleClose={handleClose} />
            </Box>
        </Container>
    );
};

export default Dashboard;