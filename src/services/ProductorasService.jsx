import { axiosConfig } from "../configurations/axiosConfig";

const obtenerProductoras = (estado = true) => {
  return axiosConfig.get('v3/productoras?estado=' +estado, {
    headers: {
      "Content-Type": "application/json",
    }
  });
};

const crearProductora = (data = {}) => {
  return axiosConfig.post("v3/productoras", data, {
    headers: {
      "Content-Type": "application/json",
    },
  });
};

const editarProductora = (id, data = {}) => {
  return axiosConfig.put('v3/productoras/' + id, data, {
    headers: {
      "Content-Type": "application/json",
    }
  });
};

const eliminarProductora = (id) => {
  return axiosConfig.delete('v3/productoras/' + id, {
    headers: {
      "Content-Type": "application/json",
    },
  });
};

export { obtenerProductoras, crearProductora, editarProductora, eliminarProductora };