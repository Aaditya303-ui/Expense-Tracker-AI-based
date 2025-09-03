// import React, { useState } from "react";
// import "../Styling/auth.css";

// const Login = ({ onLoginSuccess }) => {
//   const [formData, setFormData] = useState({
//     username: "",
//     password: "",
//   });

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setFormData((prev) => ({ ...prev, [name]: value }));
//   };

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     console.log("Logged in:", formData);
//     onLoginSuccess(formData.username); // Call parent handler
//   };

//   return (
//     <>
//       <h2>Login</h2>
//       <form onSubmit={handleSubmit}>
//         <input
//           type="text"
//           name="username"
//           placeholder="Username"
//           required
//           onChange={handleChange}
//         />
//         <input
//           type="password"
//           name="password"
//           placeholder="Password"
//           required
//           onChange={handleChange}
//         />
//         <button type="submit">Login</button>
//       </form>
//     </>
//   );
// };

// export default Login;

import React, { useState } from 'react';
import axios from 'axios';

function LoginForm({ onLoginSuccess }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState(''); // For invalid credentials

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMessage(''); // Clear old errors

    try {
      const response = await axios.post("http://localhost:5000/api/auth/login", {
        email,
        password
      });

      if (response.data.success) {
        localStorage.setItem("token", response.data.token);

        // ✅ Pass full user object including role
        onLoginSuccess({
          username: response.data.user.name,
          role: response.data.user.role, // "admin" or "user"
        });
      } else {
        setErrorMessage(response.data.message || "Invalid email or password");
      }

      console.log(response.data);
    } catch (error) {
      if (error.response && error.response.data && error.response.data.message) {
        setErrorMessage(error.response.data.message);
      } else {
        setErrorMessage("Something went wrong. Please try again.");
      }
      console.error(error);
    }
  };

  return (
    <div>
      <h2>Login</h2>

      {/* Show error if exists */}
      {errorMessage && <p style={{ color: 'red' }}>{errorMessage}</p>}

      <form onSubmit={handleSubmit}>
        <input
          type="email"
          name="email"
          placeholder="Email"
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input
          type="password"
          name="password"
          placeholder="Password"
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <button type="submit">Login</button>
      </form>
    </div>
  );
}

export default LoginForm;
