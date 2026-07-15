export default function Paginacion({ paginaActual, totalPaginas, onCambiarPagina }) {
  if (totalPaginas <= 1) return null;

  const paginas = Array.from({ length: totalPaginas }, (_, i) => i + 1);

  return (
    <nav aria-label="Paginación de perros">
      <ul className="pagination justify-content-center paginacion-numis">
        <li className={`page-item${paginaActual === 1 ? " disabled" : ""}`}>
          <button
            className="page-link"
            onClick={() => onCambiarPagina(paginaActual - 1)}
            disabled={paginaActual === 1}
          >
            Anterior
          </button>
        </li>

        {paginas.map((num) => (
          <li
            key={num}
            className={`page-item${num === paginaActual ? " active" : ""}`}
          >
            <button className="page-link" onClick={() => onCambiarPagina(num)}>
              {num}
            </button>
          </li>
        ))}

        <li
          className={`page-item${
            paginaActual === totalPaginas ? " disabled" : ""
          }`}
        >
          <button
            className="page-link"
            onClick={() => onCambiarPagina(paginaActual + 1)}
            disabled={paginaActual === totalPaginas}
          >
            Siguiente
          </button>
        </li>
      </ul>
    </nav>
  );
}