import { useState, useEffect } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import FraisHorsForfaitTable from "../components/FraisHorsForfaitTable";
import "../styles/FraisHorsForfait.css";

export default function FraisHorsForfait() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { token } = useAuth();

  const [fraisHorsForfaitList, setFraisHorsForfaitList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [total, setTotal] = useState(0);

  useEffect(() => {
    const fetchFraisHorsForfaitList = async () => {
      try {
        const response = await axios.get(
          `http://gsb.julliand.etu.lmdsio.com/api/fraisHF/liste/${id}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        setFraisHorsForfaitList(response.data);

        let somme = 0;
        response.data.forEach((fraisHorsForfait) => {
          somme += parseFloat(fraisHorsForfait.montant_fraishorsforfait);
        });
        setTotal(somme);

        setLoading(false);
      } catch (error) {
        console.error(
          "Erreur lors de la récupération des frais hors forfait :",
          error
        );
        setLoading(false);
      }
    };

    fetchFraisHorsForfaitList();
  }, [id, token]);

  if (loading) return <div><b>Chargement des frais hors forfait…</b></div>;

  return (
    <div className="frais-hors-forfait-container">
      <h2>Frais hors forfait</h2>

      <FraisHorsForfaitTable
        idFrais={id}
        fraisHorsForfaitList={fraisHorsForfaitList}
        total={total}
        onBack={() => navigate(`/frais/modifier/${id}`)}
      />
    </div>
  );
}