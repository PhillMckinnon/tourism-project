import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function Login({ handleLogin }) {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('http://192.168.66.59:5000/api/auth/login', { email, password });
            const isAdmin = response.data.is_admin;


            handleLogin(email, isAdmin);

            setTimeout(() => { 
                if (isAdmin) {
                    navigate("/admin", { replace: true });
                } else {
                    navigate("/home", { replace: true });
                }
            }, 100); 
        } catch (err) {
            setError('Error: wrong email or password.');
        }
    };

    return (
        <div className="card">
            <h2>Log into an existing account</h2>
            <form onSubmit={handleSubmit}>
                <div className="form-outline">
                    <label htmlFor="email">Email</label>
                    <input 
                        type="email" 
                        id="email" 
                        placeholder="Email" 
                        value={email} 
                        onChange={(e) => setEmail(e.target.value)} 
                    />
                </div>
                <div className="form-outline">
                    <label htmlFor="password">Password</label>
                    <input 
                        type="password" 
                        id="password" 
                        placeholder="Password" 
                        value={password} 
                        onChange={(e) => setPassword(e.target.value)} 
                    />
                </div>
                <button type="submit" className="btn">Log in</button>
                {error && <p className="error-message">{error}</p>}
            </form>
            <p className="text-center">
                Are you not yet registered?{" "}<a className="linkhref" href="/register">Register an account</a>
            </p>
        </div>
    );
}

export default Login;
