import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const API_URL = "http://gsb.julliand.etu.lmdsio.com/api/";

export default function FraisHorsForfaitForm({ idFrais, fraisHF = null }) {
  const navigate = useNavigate();

  const [date, setDate] = useState("");
  const [libelle, setLibelle] = useState("");
  const [montant, setMontant] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (fraisHF) {
      setDate(fraisHF.date_fraishorsforfait);
      setLibelle(fraisHF.lib_fraishorsforfait);
      setMontant(fraisHF.montant_fraishorsforfait);
    }
  }, [fraisHF]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const token = localStorage.getItem("token");

      if (fraisHF) {
    
        await axios.post(
          `${API_URL}fraisHF/modif`,
          {
            id_fraishf: fraisHF.id_fraishorsforfait,
            date: date,
            libelle: libelle,
            montant: montant,
          },
          { headers: { Authorization: `Bearer ${token}` } }
        );
      } else {
      
        await axios.post(
          `${API_URL}fraisHF/ajout`,
          {
            id_frais: idFrais,
            date: date,
            libelle: libelle,
            montant: montant,
          },
          { headers: { Authorization: `Bearer ${token}` } }
        );
      }

      navigate(`/frais/${idFrais}/hors-forfait`);
    } catch (error) {
      console.error("Erreur enregistrement HF :", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <label>Date</label>
      <input type="date" value={date} onChange={(e) => setDate(e.target.value)} />

      <label>Libellé</label>
      <input value={libelle} onChange={(e) => setLibelle(e.target.value)} />

      <label>Montant</label>
      <input
        type="number"
        step="0.01"
        value={montant}
        onChange={(e) => setMontant(e.target.value)}
      />

      <button type="submit" disabled={loading}>
        {loading ? "Enregistrement..." : fraisHF ? "Modifier" : "Ajouter"}
      </button>
    </form>
  );
}