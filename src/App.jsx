import { useState, useEffect, useMemo } from "react";
import { useLocalStorage } from "./hooks/useLocalStorage";
import PerroForm from "./components/PerroForm";
import Busqueda from "./components/Busqueda";
import PerroTabla from "./components/PerroTabla";
import Paginacion from "./components/Paginacion";
const REGISTROS_POR_PAGINA = 5;

const PERROS_INICIALES = [{id: crypto.randomUUID(), nombre: "Thor",raza: "Golden Retriever", edad: 5,peso: 38,salud: "Sano", adopcion: "Disponible"},
  {id: crypto.randomUUID(), nombre: "Max", raza: "Rottweiler", edad: 4, peso: 32, salud: "Vacunado", adopcion: "Reservado"},
  {id: crypto.randomUUID(), nombre: "Rocky", raza: "Gran Danés", edad: 3, peso: 65, salud: "En tratamiento", adopcion: "Disponible"},
  {id: crypto.randomUUID(), nombre: "Bruno", raza: "Pastor Alemán", edad: 6, peso: 38, salud: "Sano", adopcion: "Adoptado"},
  {id: crypto.randomUUID(), nombre: "Zeus", raza: "Dogo Argentino", edad: 2, peso: 41, salud: "Vacunado",adopcion: "Disponible"},
  {id: crypto.randomUUID(), nombre: "Rex", raza: "Labrador", edad: 4, peso: 34, salud: "Sano", adopcion: "Disponible"}
];

export default function App() {
  const [perros, setPerros] = useLocalStorage("adopcion:perros",PERROS_INICIALES);
  const [perroEditar, setPerroEditar] = useState(null);
 const [perroEliminar, setPerroEliminar] = useState(null);
  const [filtros, setFiltros] = useState({nombre: "",raza: "",});
  const [paginaActual, setPaginaActual] = useState(1);
  const [aviso, setAviso] = useState(null);

  const perrosFiltrados = useMemo(() => {
    const nombreBuscado = filtros.nombre.trim().toLowerCase();
    const razaBuscada = filtros.raza.trim().toLowerCase();

    return perros.filter((perro) => {
      const coincideNombre = perro.nombre
        .toLowerCase()
        .includes(nombreBuscado);

      const coincideRaza = perro.raza
        .toLowerCase()
        .includes(razaBuscada);

      return coincideNombre && coincideRaza;
    });
  }, [perros, filtros]);

  const totalPaginas = Math.max(
    1,
    Math.ceil(perrosFiltrados.length / REGISTROS_POR_PAGINA)
  );

  useEffect(() => {
    if (paginaActual > totalPaginas) {
      setPaginaActual(totalPaginas);
    }
  }, [totalPaginas, paginaActual]);

  const perrosPagina = useMemo(() => {
    const inicio = (paginaActual - 1) * REGISTROS_POR_PAGINA;
    return perrosFiltrados.slice(inicio, inicio + REGISTROS_POR_PAGINA);
  }, [perrosFiltrados, paginaActual]);

  useEffect(() => {
    if (!aviso) return;

    const temporizador = setTimeout(() => setAviso(null), 3000);

    return () => clearTimeout(temporizador);
  }, [aviso]);

  function manejarGuardar(perro) {
    const editando = perros.some((p) => p.id === perro.id);

    if (editando) {
      setPerros((prev) =>
        prev.map((p) => (p.id === perro.id ? perro : p))
      );

      setAviso({
        tipo: "success",
        texto: "Perro actualizado correctamente.",
      });

      setPerroEditar(null);
    } else {
      setPerros((prev) => [perro, ...prev]);

      setAviso({
        tipo: "success",
        texto: "Perro registrado correctamente.",
      });

      setPaginaActual(1);
    }
  }

  function confirmarEliminar() {
    setPerros((prev) =>
      prev.filter((p) => p.id !== perroEliminar.id)
    );

    setAviso({
      tipo: "success",
      texto: `"${perroEliminar.nombre}" fue eliminado.`,
    });

    setPerroEliminar(null);
  }

  return (
    <div className="app-shell">
      <header className="app-header">
        <div className="container">
          <h1>Gestión de Adopción de Perros</h1>

          <p className="subtitulo">
            Administra los datos de los perros disponibles para adopción.
          </p>
        </div>
      </header>

      <main className="container app-main">
        {aviso && (
          <div
            className={`alert alert-${aviso.tipo} aviso-flotante`}
            role="alert"
          >
            {aviso.texto}
          </div>
        )}

        <PerroForm
          perros={perros}
          perroEditar={perroEditar}
          onGuardar={manejarGuardar}
          onCancelar={() => setPerroEditar(null)}
        />

        <section className="mt-4">
          <div className="d-flex justify-content-between align-items-baseline flex-wrap gap-2 mb-3">
            <h2 className="h5 seccion-titulo">
              Perros registrados:{" "}
              <span className="contador-perros">
                {perrosFiltrados.length}
              </span>
            </h2>
          </div>

          <Busqueda
            filtros={filtros}
            onCambiarFiltros={(f) => {
              setFiltros(f);
              setPaginaActual(1);
            }}
          />

          <div className="mt-3">
            <PerroTabla
              perros={perrosPagina}
              onEditar={(perro) => {
                setPerroEditar(perro);
                window.scrollTo({
                  top: 0,
                  behavior: "smooth",
                });
              }}
              onEliminar={(perro) => setPerroEliminar(perro)}
            />
          </div>

          <div className="mt-3">
            <Paginacion
              paginaActual={paginaActual}
              totalPaginas={totalPaginas}
              onCambiarPagina={setPaginaActual}
            />
          </div>
        </section>
      </main>

      {perroEliminar && (
        <div className="modal-backdrop-custom">
          <div className="modal-confirmar card">
            <div className="card-body">
              <h3 className="h6">Eliminar perro</h3>

              <p>
                ¿Estas seguro de eliminar{" "}
                <strong>{perroEliminar.nombre}</strong> del registro?
              </p>

              <div className="d-flex justify-content-end gap-2">
                <button
                  className="btn btn-outline-secondary"
                  onClick={() => setPerroEliminar(null)}
                >
                  Cancelar
                </button>

                <button
                  className="btn btn-danger"
                  onClick={confirmarEliminar}
                >
                  Eliminar
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
