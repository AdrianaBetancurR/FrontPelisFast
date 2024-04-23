import React, { useEffect, useState } from 'react';
import { crearDirector, obtenerDirectores } from '../../services/DirectoresService';

import Table from './Table';
import Error from './Error';
import Toggle from './Toggle';

export default function Directores() {
  const [directores, setDirectores] = useState([]);
  const [estado, setEstado] = useState(false);
  const [error, setError] = useState(false);
  const [director, setDirector] = useState({
    nombre: '',
    estado: true
  });

  useEffect(() => {
    obtenerTodos();
  }, [estado]);

  const obtenerTodos = async () => {
    try {
      const { data } = await obtenerDirectores(estado);
      setDirectores(data);
      if (error) {
        setError(false);
      }
    } catch (e) {
      console.error(e);
      setError(true);
    }
  };

  const cambiarEstado = () => {
    setEstado(!estado);
  };

  const handleChange = e => {
    setDirector({
      ...director,
      [e.target.name]: e.target.value
    });
  };

  const guardar = async () => {
    try {
      const resp = await crearDirector(director);
      obtenerTodos();
      setDirector({
        nombre: '',
        estado: true
      });
      setEstado(true);
      console.log(resp);
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <>
      <Toggle cambiarEstado={cambiarEstado} estado={estado} />
      {error ? <Error /> : <Table directores={directores} />}
      
      <button type="button" className="btn btn-primary" data-bs-toggle="modal" data-bs-target="#exampleModal" data-bs-whatever="@fat">Agregar Director</button>

      <div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h1 className="modal-title fs-5" id="exampleModalLabel">Nuevo Director</h1>
              <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div className="modal-body">
              <form onSubmit={guardar}>
                <div className="mb-3">
                  <label htmlFor="recipient-name" className="col-form-label">Nombre:</label>
                  <input 
                    type="text" 
                    className="form-control" 
                    id="recipient-name"
                    name="nombre"
                    value={director.nombre}
                    onChange={handleChange}
                  />
                </div>
                <button 
                  type="button" 
                  className="btn btn-secondary" 
                  data-bs-dismiss="modal"
                >
                  Cerrar
                </button>
                <button 
                  type="submit" 
                  className="btn btn-primary"
                  disabled={director.nombre.length === 0}
                >
                  Guardar
                </button>
              </form>
            </div>
            <div className="modal-footer"></div>
          </div>
        </div>
      </div>
    </>
  );
}