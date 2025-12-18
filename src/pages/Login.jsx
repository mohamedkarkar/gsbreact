import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import "../styles/Login.css";

export default function Login(){
    const [login, setLogin] = useState('');
    const [password, setPassword] = useState('');
    const {loginUser} = useAuth();
    const navigate = useNavigate();
    const[error] = useState('');
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await loginUser(login, password);
            navigate('/dashboard')
        } catch (error) {
            console.error('Erreur de connexion : ', error);
            alert('Echec de la connexion');
        }
    };

    return (
        <div className="login-page">
            <div className="login-container">
                <h1>Connexion</h1>
            <form onSubmit={handleSubmit} className="login-form" >
                <div>
                    <label>Login :</label>
                    <input
                        name="login"
                        value={login}
                        onChange={(e) => setLogin(e.target.value)}
                        required
                    />
                </div>

                <div>
                    <label>Mot de passe :</label>
                <input
                    type="password"
                    name="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                />
                </div>

                <button type="submit">Se connecter</button>

                {error && <p style={{color:'red' }}>{error}</p>}
            </form>
        </div>
        </div>
    );
}