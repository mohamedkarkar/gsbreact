import React, { useState, useEffect } from "react";
import "../styles/FraisTable.css";
import axios from "axios";
import { useAuth } from "../context/AuthContext";
import {API_URL} from "../services/authServices"
import { useNavigate } from "react-router-dom";

export default function FraisTable () {
  const [fraisList, setFraisList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterNonNull, setFilterNonNull] = useState(true);
  const [montantmax, setMontantmax] = useState("");
  const navigate = useNavigate();

  const {user, token} = useAuth();
  useEffect(() => {
   const fetchFrais = async () => {
    try{
      const response = await
    axios.get(`${API_URL}frais/liste/${user.id_visiteur}`,{
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    setFraisList(response.data);

    setLoading(false);

    } catch (error) {
      console.error('Erreur lors de la récupération des frais:', error);

      setLoading(false);
    }
   };
   fetchFrais();
  }, []);

  if (loading) return <div><b> Chargement des frais...</b></div>;

  const filteredFrais = fraisList
  .filter((f) => !filterNonNull || f.montantvalide !== null)
  .filter((frais) =>
    frais.anneemois.includes(searchTerm) ||
    frais.id_visiteur.toString().includes(searchTerm)
)
   .filter((frais) => {
    if (montantmax === "") return true;
    const min = Number(montantmax); 
    if (Number.isNaN(min)) return true;
    return frais.montantvalide !== null && frais.montantvalide >=min;
   }) ;

   const handleDelete = async (id) => {
    if (!window.confirm('Êtes-vous sûr de vouloir supprimer ce frais ?')) return;

    try {
      await axios.delete(`${API_URL}frais/suppr`, {data: { id_frais: id},
      headers: { Authorization: `Bearer ${token}`}, 
    });
    setFraisList(fraisList.filter((frais) => frais.id_frais !== id));
    } catch (error) {
      console.error(`Erreur lors de la suppression:`, error);
    }
   };

  return (
  <div className="frais-table-container">
      <h2>Liste des Frais</h2>

    <div className="filter-container">
        <label>
            <input
                type="checkbox"
                checked={filterNonNull}
                onChange={(e) => setFilterNonNull(e.target.checked)}
            />
            Afficher seulement les frais avec un montant validé
        </label>
    </div>
    <div className="search-container">
        <input 
            type="text"
            placeholder="Rechercher par année-mois, ID visiteur ou montant..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            />
    </div>
    <div className="search-container">
        <input
            type="number"
            value={montantmax}
            onChange={(e) => setMontantmax(e.target.value)}
            placeholder="Montant validé maximum..."
        />
    </div>
        

    
      <table className="frais-table">
        <thead>
          <tr>
            <th>ID</th>
            <th>ID État</th>
            <th>Année-Mois</th>
            <th>ID Visiteur</th>
            <th>Nombre de justificatifs</th>
            <th>Date de modification</th>
            <th>Montant saisi</th>
            <th>Montant validé</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {filteredFrais.map((frais) => (
            <tr key={frais.id_frais}>
              <td>{frais.id_frais}</td>
              <td>{frais.id_etat}</td>
              <td>{frais.anneemois}</td>
              <td>{frais.id_visiteur}</td>
              <td>{frais.nbjustificatifs}</td>
              <td>{frais.datemodification}</td>
              <td>{frais.montantsaisi ?? ""}</td>
              <td>{frais.montantvalide ?? ""}</td>
              <td>
                <button onClick={() => navigate(`/frais/modifier/${frais.id_frais}`)}
                className="edit-button">
                  Modifier
                </button>
              </td>
              <td>
                <button onClick={()=> handleDelete(frais.id_frais)}
                className="delete-button"
                >
                  Supprimer
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};