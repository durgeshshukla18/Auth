// import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
// import { app } from "./firebase";
// import "./App.css";
// import SignupPage from "./pages/Signup";
// import SigninPage from "./pages/Signin";
 

// const auth = getAuth(app);

// function App() {
//   const signupUser = () => {
//     createUserWithEmailAndPassword(
//       auth, 
//       "jivan01@gmail.com",
//       "Jivan@123"
//     ).then((value)=>
//       console.log(value));
//   };


//   return (
//     <div className="App">
//       <SignupPage />  
//       <SigninPage />
//     </div>
//   );
// }

// export default App;
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import SignupPage from "./pages/Signup";
import SigninPage from "./pages/Signin";
import Dashboard from "./pages/Dashboard";

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<SignupPage />} />
          <Route path="/signin" element={<SigninPage />} />
          <Route path="/dashboard" element={<Dashboard />} />
        </Routes>
        <ToastContainer />
      </div>
    </Router>
  );
}

export default App;