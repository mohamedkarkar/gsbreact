import { useParams } from "react-router-dom";
import FraisHorsForfaitForm from "./FraisHorsForfaitForm";

export default function FraisHorsForfaitAdd() {
  const { id } = useParams(); 

  return (
    <div>
      <h2>Ajouter un frais hors forfait</h2>
      <FraisHorsForfaitForm idFrais={id} />
    </div>
  );
}