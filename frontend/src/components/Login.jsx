import React from 'react'
import { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';


const Login = () => {
    const BackendUrl = import.meta.env.VITE_BACKEND_URL;

    const navigate = useNavigate();

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setloading] = useState(false);
    const[error, setError] = useState(null);

    const handleLogin = async (e) => {
        e.preventDefault();
        setloading(true);
        setError("");


        try {
            const res = await axios.post(`${BackendUrl}/api/auth/login`,{
                email,
                password,
            })

             // ✅ SAVE TOKEN
      localStorage.setItem("token", res.data.token);

            alert("Login successful");

              // ✅ NAVIGATE AFTER LOGIN
      navigate("/profile");


            //clear form 
            setEmail("");
            setPassword('');
        } catch (error) {
            setError(error.res.data.message || "Login Failed");

        }
    }

     // ✅ CHECK LOGIN ON PAGE LOAD
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      navigate("/profile");
    }
  }, [navigate]);




  return (
<>
<div>
    <form onSubmit={handleLogin}>
        <div>
            <label>Email</label>
            <input type="text" value={email} onChange={(e)=> setEmail(e.target.value)} placeholder='Enter your email' /><br />
            <label>Password</label>
            <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} /> <br />
        </div>
        <button type='submit' disabled={loading}> {loading ? "Login..." : "Login"}</button>
         {error && <p style={{ color: "red" }}>{error}</p>}
    </form>
</div>
</>
  )
}

export default Login