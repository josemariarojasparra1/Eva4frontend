const CLASE_SALUD = {
  Sano: "estado-sano",
  "En tratamiento": "estado-tratamiento",
  Vacunado: "estado-vacunado",
};

const CLASE_ADOPCION = {
  Disponible: "estado-disponible",
  Reservado: "estado-reservado",
  Adoptado: "estado-adoptado",
};

export default function PerroTabla({ perros, onEditar, onEliminar }) {
  if (perros.length === 0) {
    return (
      <div className="alert alert-tabla-vacia text-center">
        Los perros registrados no coinciden con lo que se busca.
      </div>
    );
  }

  return (
    <div className="table-responsive tabla-perros-wrap">
      <table className="table table-primary table-striped table-hover align-middle tabla-perros">
        <thead>
          <tr>
            <th>Nombre</th>
            <th>Raza</th>
            <th>Edad</th>
            <th>Peso (kg)</th>
            <th>Estado de salud</th>
            <th>Estado de adopción</th>
            <th className="text-end">Acciones</th>
          </tr>
        </thead>

        <tbody>
          {perros.map((perro) => (
            <tr key={perro.id}>
              <td className="celda-nombre">{perro.nombre}</td>

              <td>{perro.raza}</td>

              <td>{perro.edad} años</td>

              <td>{perro.peso} kg</td>

              <td>
                <span className={"badge " + (CLASE_SALUD[perro.salud] || "")}>
                  {perro.salud}
                </span>
              </td>

              <td>
                <span className={"badge " + (CLASE_ADOPCION[perro.adopcion] || "")}>
                  {perro.adopcion}
                </span>
              </td>

              <td className="text-end">
                <div className="btn-group btn-group-sm">
                  <button
                    type="button"
                    className="btn btn-outline-secondary"
                    onClick={() => onEditar(perro)}
                  >
                    Editar
                  </button>

                  <button
                    type="button"
                    className="btn btn-outline-danger"
                    onClick={() => onEliminar(perro)}
                  >
                    Eliminar
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
