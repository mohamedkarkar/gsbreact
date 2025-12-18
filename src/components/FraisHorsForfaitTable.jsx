export default function FraisHorsForfaitTable({
  idFrais,
  fraisHorsForfaitList,
  total,
  handleDelete,
  onEdit,
}) {
  return (
    <div className="frais-hors-forfait-table">
      <table>
        <thead>
          <tr>
            <th>Date</th>
            <th>Montant</th>
            <th>Libellé</th>
            <th>Actions</th>
          </tr>
        </thead>

        <tbody>
          {fraisHorsForfaitList.length === 0 ? (
            <tr>
              <td colSpan="4" style={{ textAlign: "center" }}>
                Aucun frais hors forfait
              </td>
            </tr>
          ) : (
            fraisHorsForfaitList.map((fraisHF) => (
              <tr key={fraisHF.id_fraishorsforfait}>
                <td>{fraisHF.date_fraishorsforfait}</td>
                <td>
                  {Number(fraisHF.montant_fraishorsforfait).toFixed(2)} €
                </td>
                <td>{fraisHF.lib_fraishorsforfait}</td>
                <td>
                  <button
                    className="edit-button"
                    onClick={() => onEdit(fraisHF.id_fraishorsforfait)}
                  >
                    Modifier
                  </button>

                  <button
                    className="delete-button"
                    onClick={() =>
                      handleDelete(fraisHF.id_fraishorsforfait)
                    }
                  >
                    Supprimer
                  </button>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>

      <p>
        <strong>Total : {total.toFixed(2)} €</strong>
      </p>
    </div>
  );
}

