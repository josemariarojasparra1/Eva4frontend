export default function Busqueda({ filtros, onCambiarFiltros }) {
  return (
    <div className="busqueda card">
      <div className="card-body">
        <div className="row g-3 align-items-end">
          <div className="col-12 col-md-5">
            <label className="form-label" htmlFor="buscarNombre">
              Buscar por nombre del perro
            </label>

            <input
              id="buscarNombre"
              type="text"
              className="form-control"
              placeholder="Ej: Thor"
              value={filtros.nombre}
              onChange={(e) =>
                onCambiarFiltros({
                  ...filtros,
                  nombre: e.target.value,
                })
              }
            />
          </div>

          <div className="col-12 col-md-5">
            <label className="form-label" htmlFor="buscarRaza">
              Buscar por raza del perro
            </label>

            <input
              id="buscarRaza"
              type="text"
              className="form-control"
              placeholder="Ej: Pastor Alemán"
              value={filtros.raza}
              onChange={(e) =>
                onCambiarFiltros({
                  ...filtros,
                  raza: e.target.value,
                })
              }
            />
          </div>

          <div className="col-12 col-md-2 d-grid">
            <button
              type="button"
              className="btn btn-outline-secondary"
              onClick={() =>
                onCambiarFiltros({
                  nombre: "",
                  raza: "",
                })
              }
            >
              Limpiar
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
