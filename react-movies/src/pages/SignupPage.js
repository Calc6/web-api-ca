import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const SignupPage = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();
    console.log("Form Submitted"); 
    console.log("Username:", username); 
    console.log("Password:", password);
    try {
      const response = await fetch('/api/users/signup', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password }),
      });
      const data = await response.json();
      console.log("Response from server:", data);
      if (response.ok) {
        alert("Signup successful");
      } else {
        alert("Signup failed: " + data.message);
      }
    } catch (err) {
      console.error("Error:", err);
      alert("An error occurred during signup");
    }
  };
  

  return (
    <form onSubmit={handleSubmit}>
      <h2>Signup</h2>
      <div>
      <label htmlFor="username">Username</label>
      <input
        type="text"
        id="username"
        name="username"
        placeholder="Username"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        required
      />
      </div>
      <div>
      <label htmlFor="password">Password</label>
      <input
        type="password"
        id="password"
        name="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        required
      />
        </div>
      <button type="submit">Signup</button>
    </form>
  );
};

export default SignupPage;
