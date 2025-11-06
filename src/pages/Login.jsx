import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import "../styles/Login.css";

export default function Login(){
    const [login, setLogin] = useState('');
    const [password, setPassword] = useState('');
    const {loginUser} = useAuth();
    const navigate = useNavigate();
    const[error, setError]=useState('');
    const handleSubmit = (e) => {
        e.preventDefault();
        if (loginUser(login, password)) {
            navigate('/dashboard');
        }else {
            setError('Identifiants incorrects');
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
                        type="text"
                        value={login}
                        onChange={(e) => setLogin(e.target.value)}
                        required
                    />
                </div>

                <div>
                    <label>Mot de passe :</label>
                <input
                    type="password"
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