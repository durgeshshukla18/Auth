// // Required imports

// import React, { useState } from 'react';
// import { useNavigate } from 'react-router-dom';
// import { TextField, Button, Container, Typography, Box } from '@mui/material';
// import { 
//     getAuth, 
//     createUserWithEmailAndPassword, 
//     GoogleAuthProvider,
//     signInWithPopup,
//  } from "firebase/auth";
// import { app } from "../firebase";

// const auth = getAuth(app);
// // Google Provider instance
// const googleProvider = new GoogleAuthProvider();

// // Signup Page instance
// const SignupPage = () => {
//     const [email , setEmail] = useState("");
//     const [password, setPassword] = useState("");

//     const createUser = () => {
//     createUserWithEmailAndPassword(auth, email, password).then(value => alert("User Created Successfully")).catch((error) => alert(error.message));
// };

// // For Google Signup
// const signupWithGoogle = () => {
//     signInWithPopup(auth, googleProvider);
// };

// // Return after execution of the function

//     return (
//         <div className='signup-page'>
//         <label>Email</label>
//         <input onChange={(e) => setEmail(e.target.value)}
//         value={email}
//         type='email' 
//         required placeholder="Enter your Email here" 
//         />
//         <label>Password</label>
//         <input onChange={ (e) => setPassword(e.target.value)} 
//         value={password}
//         type='password' required placeholder="Enter your password here" />
//         <br />
//         <button onClick={signupWithGoogle}>Sign in with Google</button>
//         <button onClick={createUser}>Sign Up</button>
//         </div>
//     );
//     };

import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { TextField, Button, Container, Typography, Box, Alert } from '@mui/material';
import { getAuth, createUserWithEmailAndPassword, GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { app } from "../firebase";
import { toast } from 'react-toastify';
import GoogleIcon from '@mui/icons-material/Google';

const auth = getAuth(app);
const googleProvider = new GoogleAuthProvider();

const SignupPage = () => {
  const navigate = useNavigate();
  const [error, setError] = useState('');
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    name: ''
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        formData.email,
        formData.password
      );
      localStorage.setItem('userName', formData.name);
      toast.success('Registration successful!');
      navigate('/dashboard');
    } catch (error) {
      setError(error.message);
      toast.error('Registration failed!');
    }
  };

  const signupWithGoogle = async () => {
    try {
      await signInWithPopup(auth, googleProvider);
      toast.success('Google sign-in successful!');
      navigate('/dashboard');
    } catch (error) {
      setError(error.message);
      toast.error('Google sign-in failed!');
    }
  };

  return (
    <Container maxWidth="sm">
      <Box sx={{ mt: 8, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        <Typography component="h1" variant="h5">
          Sign Up
        </Typography>
        {error && <Alert severity="error">{error}</Alert>}
        <Box component="form" onSubmit={handleSubmit} sx={{ mt: 3 }}>
          <TextField
            margin="normal"
            required
            fullWidth
            label="Name"
            name="name"
            value={formData.name}
            onChange={(e) => setFormData({...formData, name: e.target.value})}
          />
          <TextField
            margin="normal"
            required
            fullWidth
            label="Email Address"
            name="email"
            type="email"
            value={formData.email}
            onChange={(e) => setFormData({...formData, email: e.target.value})}
          />
          <TextField
            margin="normal"
            required
            fullWidth
            name="password"
            label="Password"
            type="password"
            value={formData.password}
            onChange={(e) => setFormData({...formData, password: e.target.value})}
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
          >
            Sign Up
          </Button>
          <Button
            fullWidth
            variant="outlined"
            startIcon={<GoogleIcon />}
            onClick={signupWithGoogle}
            sx={{ mb: 2 }}
          >
          </Button>
          <Button
            fullWidth
            variant="text"
            onClick={() => navigate('/signin')}
          >
            Already have an account? Sign In
          </Button>
        </Box>
      </Box>
    </Container>
  );
};

export default SignupPage;