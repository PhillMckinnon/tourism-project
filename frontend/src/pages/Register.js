import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function Register() {
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('');
    const [password, setPassword] = useState('');
    const [repeatPassword, setRepeatPassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    const phoneRegex = /^\+?[1-9]\d{1,14}$/;
    const nameRegex = /^[a-zA-Zа-яА-ЯёЁ]+([ -][a-zA-Zа-яА-ЯёЁ]+)*$/u;

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!nameRegex.test(firstName)) {
            setError('Error, use appropriate symbols only!.');
            return;
        }

        if (!nameRegex.test(lastName)) {
            setError('Error, use appropriate symbols only!.');
            return;
        }

        if (!emailRegex.test(email)) {
            setError('Error, use appropriate symbols only!.');
            return;
        }

        if (!phoneRegex.test(phone)) {
            setError('Error, use appropriate symbols only!.');
            return;
        }

        if (password.length < 6) {
            setError('Error, use appropriate symbols only!.');
            return;
        }

        if (password !== repeatPassword) {
            setError('Error, use appropriate symbols only!.');
            return;
        }

        setError('');
        try {
            await axios.post('http://192.168.66.59:5000/api/auth/register', {
                firstName,
                lastName,
                email,
                phone,
                password,
            });
            navigate('/login'); 
        } catch (err) {
            console.error(err.response?.data || err.message);
            setError('Failed to register, try again later..');
        }
    };

    return (
        <div className="card">
            <h2>Register</h2>
            <form onSubmit={handleSubmit}>
                <div className="form-outline">
                    <label htmlFor="first_name">First name</label>
                    <input
                        type="text"
                        id="first_name"
                        placeholder="First name"
                        value={firstName}
                        onChange={(e) => setFirstName(e.target.value)}
                    />
                </div>
                <div className="form-outline">
                    <label htmlFor="last_name">Last name</label>
                    <input
                        type="text"
                        id="last_name"
                        placeholder="Last name"
                        value={lastName}
                        onChange={(e) => setLastName(e.target.value)}
                    />
                </div>
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
                    <label htmlFor="phone">Phone number</label>
                    <input
                        type="text"
                        id="phone"
                        placeholder="Phone number"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
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
                <div className="form-outline">
                    <label htmlFor="repeat_password">Repeat password</label>
                    <input
                        type="password"
                        id="repeat_password"
                        placeholder="Repeat password"
                        value={repeatPassword}
                        onChange={(e) => setRepeatPassword(e.target.value)}
                    />
                </div>
                {error && <p style={{ color: 'red' }}>{error}</p>}
                <button type="submit" className="btn">
                    Register
                </button>
                <p className="text-center">
                    Already registered? <a className="linkhref" href="/login">Log in</a>
                </p>
            </form>
        </div>
    );
}

export default Register;
