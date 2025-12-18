import React from 'react';
import { useAuth } from '../context/AuthContext';
import FraisForm from '../components/FraisForm';

export default function FraisAdd() {
    const { user } = useAuth();

    return (
        <div>
            <h1>Ajouter un Frais</h1>

            {user ? (
                <p>Visiteur : {user.nom_visiteur}</p>
            ) : (
                <p>Utilisateur non connecté</p>
            )}

            <FraisForm />
        </div>
    );
}
