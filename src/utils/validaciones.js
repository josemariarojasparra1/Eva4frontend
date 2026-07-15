export const ESTADOS_SALUD = ["Sano","En tratamiento","Vacunado"];
export const ESTADOS_ADOPCION = ["Disponible","Reservado","Adoptado"];

// Valida los datos de un perro según las reglas de negocio:
// - Es necesario llenar todos los campos para el registro.
// - La edad debe ser mayor que 0.
// - El peso debe ser mayor que 0.

export function validarPerro(datos) {
  const errores = {};

  if (!datos.nombre.trim()) {
    errores.nombre = "Por favor ingrese el nombre del perro.";
  }

  if (!datos.raza.trim()) {
    errores.raza = "Por favor Ingrese la raza del perro.";
  }

  if (!datos.edad) {
    errores.edad = "Por favor ingrese la edad del perro.";
  } else if (Number(datos.edad) <= 0) {
    errores.edad = "La edad debe ser mayor que 0.";
  }

  if (!datos.peso) {
    errores.peso = "Por favor ingrese el peso del perro.";
  } else if (Number(datos.peso) <= 0) {
    errores.peso = "El peso debe ser mayor que 0.";
  }

  if (!datos.salud) {
    errores.salud = "Seleccione el estado de salud del perro.";
  }

   if (!datos.adopcion) {
    errores.adopcion = "Seleccion el estado de adopción del perro.";
  }

  return errores;
}
