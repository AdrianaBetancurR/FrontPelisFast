import { axiosConfig } from "../configurations/axiosConfig";


const obtenerMedias = () => {
  return axiosConfig.get("v5/medias", {
    headers: {
      "Content-Type": "application/json",
    },
  });
};

  const crearMedia = (data = {}) => {
    return axiosConfig.post("v5/medias", data, {
      headers: {
        "Content-Type": "application/json",
      },
    });
  };

const editarMedia = (id, data = {}) => {
  return axiosConfig.put(`v5/medias/${id}`, data, {
    headers: {
      "Content-Type": "application/json",
    },
  });
};

const eliminarMedia = (id) => {
  return axiosConfig.delete(`v5/medias/${id}`, {
    headers: {
      "Content-Type": "application/json",
    },
  });
};

export { obtenerMedias, crearMedia, editarMedia, eliminarMedia };