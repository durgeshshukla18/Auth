import { useState, useEffect } from 'react';
import { Dialog, DialogTitle, DialogContent, DialogActions, TextField, Button, Box } from '@mui/material';
import { collection, addDoc } from "firebase/firestore";
import { db } from "../firebase";
import { toast } from 'react-toastify';
import './SurveyForm.css'; // Import the CSS file

const SurveyForm = ({ open, handleClose }) => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        feedback: ''
    });

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await addDoc(collection(db, "surveys"), formData);
            toast.success('Survey submitted successfully!');
            setFormData({ name: '', email: '', feedback: '' });
            handleClose();
        } catch (error) {
            toast.error('Error submitting survey!');
            console.error("Error adding document: ", error);
        }
    };

    return (
        <Dialog open={open} onClose={handleClose} className="survey-dialog">
            <DialogTitle>Survey Form</DialogTitle>
            <DialogContent>
                <Box component="form" onSubmit={handleSubmit} sx={{ mt: 3 }}>
                    <TextField
                        margin="normal"
                        required
                        fullWidth
                        label="Name"
                        name="name"
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    />
                    <TextField
                        margin="normal"
                        required
                        fullWidth
                        label="Email Address"
                        name="email"
                        type="email"
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    />
                    <TextField
                        margin="normal"
                        required
                        fullWidth
                        label="Feedback"
                        name="feedback"
                        multiline
                        rows={4}
                        value={formData.feedback}
                        onChange={(e) => setFormData({ ...formData, feedback: e.target.value })}
                    />
                    <DialogActions>
                        <Button onClick={handleClose} color="secondary">Cancel</Button>
                        <Button type="submit" color="primary">Submit</Button>
                    </DialogActions>
                </Box>
            </DialogContent>
        </Dialog>
    );
};

const Dashboard = () => {
    const [surveyOpen, setSurveyOpen] = useState(true);

    const handleSurveyClose = () => {
        setSurveyOpen(false);
    };

    useEffect(() => {
        if (surveyOpen) {
            document.body.classList.add('blur-background');
        } else {
            document.body.classList.remove('blur-background');
        }
    }, [surveyOpen]);

    return (
        <div>
            <SurveyForm open={surveyOpen} handleClose={handleSurveyClose} />
            {!surveyOpen && (
                <div>
                    {/* Your dashboard content goes here */}
                    <h1>Welcome to the Dashboard</h1>
                </div>
            )}
        </div>
    );
};

export default Dashboard;