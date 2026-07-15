import { useState, useEffect } from "react";
import {
  ESTADOS_SALUD,
  ESTADOS_ADOPCION,
  validarPerro,
} from "../utils/validaciones";

const VACIO = {
  nombre: "",
  raza: "",
  edad: "",
  peso: "",
  salud: "",
  adopcion: "",
};

export default function PerroForm({
  perros,
  perroEditar,
  onGuardar,
  onCancelar,
}) {
  const [datos, setDatos] = useState(VACIO);
  const [errores, setErrores] = useState({});
  const [enviado, setEnviado] = useState(false);

  const editando = Boolean(perroEditar);

  useEffect(() => {
    if (perroEditar) {
      setDatos({
        nombre: perroEditar.nombre,
        raza: perroEditar.raza,
        edad: perroEditar.edad,
        peso: perroEditar.peso,
        salud: perroEditar.salud,
        adopcion: perroEditar.adopcion,
      });
    } else {
      setDatos(VACIO);
    }

    setErrores({});
    setEnviado(false);
  }, [perroEditar]);

  function manejarCambio(campo, valor) {
    setDatos((prev) => ({
      ...prev,
      [campo]: valor,
    }));
  }

  function manejarEnvio(e) {
    e.preventDefault();
    setEnviado(true);

    const erroresValidacion = validarPerro(datos);
    setErrores(erroresValidacion);

    if (Object.keys(erroresValidacion).length > 0) return;

    onGuardar({
      id: editando ? perroEditar.id : crypto.randomUUID(),
      nombre: datos.nombre.trim(),
      raza: datos.raza.trim(),
      edad: Number(datos.edad),
      peso: Number(datos.peso),
      salud: datos.salud,
      adopcion: datos.adopcion,
    });

    if (!editando) {
      setDatos(VACIO);
      setEnviado(false);
    }
  }

  const claseCampo = (campo) =>
    `form-control${enviado && errores[campo] ? " is-invalid" : ""}`;

  const claseSelect = (campo) =>
    `form-select${enviado && errores[campo] ? " is-invalid" : ""}`;

  return (
    <form className="pieza-form card" onSubmit={manejarEnvio} noValidate>
      <div className="card-body">

        <h2 className="h5 form-titulo">
          {editando ? "Editar perro" : "Registrar nuevo perro"}
        </h2>

        <div className="row g-3">

          <div className="col-12 col-md-6">
            <label className="form-label" htmlFor="nombre">
              Nombre del perro
            </label>

            <input
              id="nombre"
              type="text"
              className={claseCampo("nombre")}
              placeholder="Ej: Thor"
              value={datos.nombre}
              onChange={(e) => manejarCambio("nombre", e.target.value)}
            />

            {enviado && errores.nombre && (
              <div className="invalid-feedback">
                {errores.nombre}
              </div>
            )}
          </div>


          <div className="col-12 col-md-6">
            <label className="form-label" htmlFor="raza">
              Raza
            </label>

            <input
              id="raza"
              type="text"
              className={claseCampo("raza")}
              placeholder="Ej: Golden Retriever"
              value={datos.raza}
              onChange={(e) => manejarCambio("raza", e.target.value)}
            />

            {enviado && errores.raza && (
              <div className="invalid-feedback">
                {errores.raza}
              </div>
            )}
          </div>


          <div className="col-6 col-md-3">
            <label className="form-label" htmlFor="edad">
              Edad
            </label>

            <input
              id="edad"
              type="number"
              className={claseCampo("edad")}
              placeholder="Ej: 4"
              value={datos.edad}
              onChange={(e) => manejarCambio("edad", e.target.value)}
            />

            {enviado && errores.edad && (
              <div className="invalid-feedback">
                {errores.edad}
              </div>
            )}
          </div>


          <div className="col-6 col-md-3">
            <label className="form-label" htmlFor="peso">
              Peso (kg)
            </label>

            <input
              id="peso"
              type="number"
              step="0.01"
              className={claseCampo("peso")}
              placeholder="Ej: 35"
              value={datos.peso}
              onChange={(e) => manejarCambio("peso", e.target.value)}
            />

            {enviado && errores.peso && (
              <div className="invalid-feedback">
                {errores.peso}
              </div>
            )}
          </div>


          <div className="col-12 col-md-6">
            <label className="form-label" htmlFor="salud">
              Estado de salud
            </label>

            <select
              id="salud"
              className={claseSelect("salud")}
              value={datos.salud}
              onChange={(e) => manejarCambio("salud", e.target.value)}
            >
              <option value="">
                Selecciona un estado
              </option>

              {ESTADOS_SALUD.map((salud) => (
                <option key={salud} value={salud}>
                  {salud}
                </option>
              ))}
            </select>

            {enviado && errores.salud && (
              <div className="invalid-feedback">
                {errores.salud}
              </div>
            )}
          </div>


          <div className="col-12 col-md-6">
            <label className="form-label" htmlFor="adopcion">
              Estado de adopción
            </label>

            <select
              id="adopcion"
              className={claseSelect("adopcion")}
              value={datos.adopcion}
              onChange={(e) => manejarCambio("adopcion", e.target.value)}
            >
              <option value="">
                Selecciona un estado
              </option>

              {ESTADOS_ADOPCION.map((estado) => (
                <option key={estado} value={estado}>
                  {estado}
                </option>
              ))}
            </select>

            {enviado && errores.adopcion && (
              <div className="invalid-feedback">
                {errores.adopcion}
              </div>
            )}
          </div>

        </div>


        <div className="d-flex gap-2 mt-4 form-acciones">

          <button
            type="submit"
            className="btn btn-primary"
          >
            {editando ? "Guardar cambios" : "Registrar perro"}
          </button>


          {editando && (
            <button
              type="button"
              className="btn btn-outline-secondary"
              onClick={onCancelar}
            >
              Cancelar cambios en el registro
            </button>
          )}

        </div>

      </div>
    </form>
  );
}