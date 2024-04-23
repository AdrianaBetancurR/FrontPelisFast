import { axiosConfig } from "../configurations/axiosConfig";

const obtenerGeneros = (estado=true) => {
  return axiosConfig.get('v1/generos?estado=' + estado, {
    headers: {
      "Content-Type": "application/json",
    }
  })
}

const crearGenero = (data = {}) => {
  return axiosConfig.post("v1/generos", data, {
    headers: {
      "Content-Type": "application/json",
    },
  });
};


const editarGenero = (id,data = {}) => {
  return axiosConfig.put('v1/generos/'+id, data, {
    headers: {
      "Content-Type": "application/json",
    }
  })
}


const eliminarGenero = id => {
  return axiosConfig.delete('v1/generos/'+id,{}, {
    headers: {
      "Content-Type": "application/json",
    },
  });
};
export { obtenerGeneros, crearGenero,editarGenero,eliminarGenero };
