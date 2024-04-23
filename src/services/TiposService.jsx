import { axiosConfig } from "../configurations/axiosConfig"


const obtenerTipos = () => {
  return axiosConfig.get('v4/tipos', {
      headers: {
          'Content-Type': 'application/json',
      }
  });

};

const crearTipo = (data = {}) => {
    return axiosConfig.post('v4/tipos', data, {
        headers: {
          'Content-Type' : 'application/json'
        }
      })
}

const editarTipo = (id, data = {}) => {
    return axiosConfig.put('v4/tipos/'+id, data, {
        headers: {
          'Content-Type' : 'application/json'
        }
      })
}

const eliminarTipo = id => {
    return axiosConfig.delete('v4/tipos/'+id, {}, {
        headers: {
          'Content-Type' : 'application/json'
        }
      })
}

export {
    obtenerTipos,
    crearTipo,
    editarTipo,
    eliminarTipo,
}