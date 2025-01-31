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

            // Call handleLogin and wait for state update before navigating
            handleLogin(email, isAdmin);

            setTimeout(() => { 
                if (isAdmin) {
                    navigate("/admin", { replace: true });
                } else {
                    navigate("/home", { replace: true });
                }
            }, 100); // Delay to allow state update
        } catch (err) {
            setError('Ошибка: неверный email или пароль.');
        }
    };

    return (
        <div className="card">
            <h2>Вход в учетную запись</h2>
            <form onSubmit={handleSubmit}>
                <div className="form-outline">
                    <label htmlFor="email">Почта</label>
                    <input 
                        type="email" 
                        id="email" 
                        placeholder="Почта" 
                        value={email} 
                        onChange={(e) => setEmail(e.target.value)} 
                    />
                </div>
                <div className="form-outline">
                    <label htmlFor="password">Пароль</label>
                    <input 
                        type="password" 
                        id="password" 
                        placeholder="Пароль" 
                        value={password} 
                        onChange={(e) => setPassword(e.target.value)} 
                    />
                </div>
                <button type="submit" className="btn">Войти</button>
                {error && <p className="error-message">{error}</p>}
            </form>
            <p className="text-center">
                Еще не зарегистрированы?{" "}<a className="linkhref" href="/register">Создать учетную запись</a>
            </p>
        </div>
    );
}

export default Login;
