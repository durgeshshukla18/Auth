// import React, { useState } from 'react';
// import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
// import { app } from "../firebase";

// const auth = getAuth(app);

// // Signin Page instance
// const SigninPage = () => {

// const [email , setEmail] = useState("");
// const [password, setPassword] = useState("");

// const signinUser = () => {
//     signInWithEmailAndPassword(auth, email, password).then(value => alert("User Signed In Successfully")).catch((error) => alert(error.message));
// };

// // Return after execution of the function
//     return (
//         <div className='signin-page'>
//         <h1>Signin Page</h1>
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
//         <button onClick={signinUser}>Sign Up</button>
//         </div>
//         );
//     };
    
//     export default SigninPage;

import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { TextField, Button, Container, Typography, Box } from '@mui/material';
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase";

const SigninPage = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await signInWithEmailAndPassword(auth, formData.email, formData.password);
      navigate('/dashboard');
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <Container maxWidth="sm">
      <Box sx={{ mt: 8, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        <Typography component="h1" variant="h5">
          Sign In
        </Typography>
        <Box component="form" onSubmit={handleSubmit} sx={{ mt: 3 }}>
          <TextField
            margin="normal"
            required
            fullWidth
            label="Email Address"
            name="email"
            onChange={(e) => setFormData({...formData, email: e.target.value})}
          />
          <TextField
            margin="normal"
            required
            fullWidth
            name="password"
            label="Password"
            type="password"
            onChange={(e) => setFormData({...formData, password: e.target.value})}
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
          >
            Sign In
          </Button>
        </Box>
      </Box>
    </Container>
  );
};

export default SigninPage;