import { axiosConfig } from "../configurations/axiosConfig";

const obtenerDirectores = (estado) => {
  return axiosConfig.get("v2/directores?estado=" + estado, {
    headers: {
      "Content-Type": "application/json",
    },
  });
};

const crearDirector = (data = {}) => {
  return axiosConfig.post("v2/directores", data, {
    headers: {
      "Content-Type": "application/json",
    },
  });
};

const editarDirector = (id, data = {}) => {
  return axiosConfig.put('v2/directores/'+id, data, {
    headers: {
      "Content-Type": "application/json",
    },
  });
};

const eliminarDirector = (id)  => {
  return axiosConfig.delete('v2/directores/'+id,{}, {
    headers: {
      "Content-Type": "application/json",
    },
  });
};

export { obtenerDirectores, crearDirector, editarDirector, eliminarDirector };