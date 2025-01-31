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
            setError('Ошибка, используйте только разрешенные символы.');
            return;
        }

        if (!nameRegex.test(lastName)) {
            setError('Ошибка, используйте только разрешенные символы.');
            return;
        }

        if (!emailRegex.test(email)) {
            setError('Ошибка, используйте только разрешенные символы.');
            return;
        }

        if (!phoneRegex.test(phone)) {
            setError('Ошибка, используйте только разрешенные символы.');
            return;
        }

        if (password.length < 6) {
            setError('Ошибка, используйте только разрешенные символы.');
            return;
        }

        if (password !== repeatPassword) {
            setError('Ошибка, используйте только разрешенные символы.');
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
            navigate('/login'); // Redirect to login page after successful registration
        } catch (err) {
            console.error(err.response?.data || err.message);
            setError('Регистрация не удалась, попробуйте еще раз..');
        }
    };

    return (
        <div className="card">
            <h2>Создать учетную запись</h2>
            <form onSubmit={handleSubmit}>
                <div className="form-outline">
                    <label htmlFor="first_name">Имя</label>
                    <input
                        type="text"
                        id="first_name"
                        placeholder="Имя"
                        value={firstName}
                        onChange={(e) => setFirstName(e.target.value)}
                    />
                </div>
                <div className="form-outline">
                    <label htmlFor="last_name">Фамилия</label>
                    <input
                        type="text"
                        id="last_name"
                        placeholder="Фамилия"
                        value={lastName}
                        onChange={(e) => setLastName(e.target.value)}
                    />
                </div>
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
                    <label htmlFor="phone">Телефон</label>
                    <input
                        type="text"
                        id="phone"
                        placeholder="Телефон"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
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
                <div className="form-outline">
                    <label htmlFor="repeat_password">Повторите пароль</label>
                    <input
                        type="password"
                        id="repeat_password"
                        placeholder="Повторите пароль"
                        value={repeatPassword}
                        onChange={(e) => setRepeatPassword(e.target.value)}
                    />
                </div>
                {error && <p style={{ color: 'red' }}>{error}</p>}
                <button type="submit" className="btn">
                    Зарегистрировать
                </button>
                <p className="text-center">
                    Уже есть учетная запись? <a className="linkhref" href="/login">Войти</a>
                </p>
            </form>
        </div>
    );
}

export default Register;
