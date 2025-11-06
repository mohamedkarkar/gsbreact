import React from 'react';
import { useAuth } from '../context/AuthContext';

export default function Dashboard(){
    const {user} = useAuth();
    return(
        <div>
            <h1>Tableau de bord</h1>
            {user ? (<p>Bienvenue {user}</p>) : (<p>Bonjour!</p>)}
        </div>
    ) 
}
