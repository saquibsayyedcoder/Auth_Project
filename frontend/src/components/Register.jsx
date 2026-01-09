import React, {useState} from 'react'
import axios from 'axios';

const Register = () => {

    const FrontendURL = import.meta.env.VITE_BACKEND_URL;
     const [name, setName] = useState('');
      const [email, setEmail] = useState('');
      const [password, setPassword] = useState('');
      const [loading, setLoading] = useState(false);
      const [error, setError] = useState(null);

 const handleRegister = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
        const res = await axios.post(`${FrontendURL}/api/auth/register`, {
            name, 
            email,
            password,
        }
    );
        alert("Registration Successful");
        console.log(res.data);

        //clear form
        setName("");
        setEmail("");
        setPassword("");
    } catch (error) {
        setError(error.response.data.message || "Registration Failed");
    }finally{
        setLoading(false);
    }
 };


  return (
   <>
   <form onSubmit={handleRegister}>
  <div>
       <label>Name</label><br />
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        /><br />
  <label>Email</label><br />
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        /><br />
    <label>Password</label><br />
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        /><br />
        
    <button type='submit' disabled={loading}
      >{loading ? "Registering..." : "Register"}</button>
  </div>
   </form>
   </>
  )
}

export default Register