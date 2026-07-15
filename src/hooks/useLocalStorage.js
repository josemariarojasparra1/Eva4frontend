import { useState, useEffect } from "react";

/**
 * Hook que mantiene un estado sincronizado con LocalStorage.
 * Recupera automáticamente la información al recargar la aplicación
 * y la guarda cada vez que cambia.
 */
export function useLocalStorage(clave, valorInicial) {
  const [valor, setValor] = useState(() => {
    try {
      const guardado = window.localStorage.getItem(clave);
      return guardado ? JSON.parse(guardado) : valorInicial;
    } catch (error) {
      console.error("Error al leer LocalStorage:", error);
      return valorInicial;
    }
  });

  useEffect(() => {
    try {
      window.localStorage.setItem(clave, JSON.stringify(valor));
    } catch (error) {
      console.error("Error al guardar en LocalStorage:", error);
    }
  }, [clave, valor]);

  return [valor, setValor];
}
