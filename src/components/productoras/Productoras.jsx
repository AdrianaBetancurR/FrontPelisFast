import React, { useState, useEffect } from 'react';
import { crearProductora, obtenerProductoras } from '../../services/ProductorasService';
import Table from './Table';
import Error from './Error';
import Toggle from './Toggle';

export default function Productoras() {
  const [productoras, setProductoras] = useState([]);
  const [estado, setEstado] = useState(false);
  const [error, setError] = useState(false);
  const [productora, setProductora] = useState({
    nombre: '',
    slogan: '',
    descripcion: '',
    estado: true
  });

  useEffect(() => {
    obtenerTodos();
  }, [estado]);

  const obtenerTodos = async () => {
    try {
      const { data } = await obtenerProductoras(estado);
      setProductoras(data);
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
    setProductora({
      ...productora,
      [e.target.name]: e.target.value
    });
  };

  const guardar = async () => {
    try {
      const resp = await crearProductora(productora);
      obtenerTodos();
      setProductora({
        nombre: '',
        slogan: '',
        descripcion: '',
        estado: true
      });
      setEstado(true);
      console.log(resp);
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <>
      <Toggle cambiarEstado={cambiarEstado} estado={estado} />
      {error ? <Error /> : <Table productoras={productoras} />}
      
      <button type="button" className="btn btn-primary" data-bs-toggle="modal" data-bs-target="#exampleModal" data-bs-whatever="@fat">Agregar Productora</button>

      <div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h1 className="modal-title fs-5" id="exampleModalLabel">Nueva Productora</h1>
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
                    value={productora.nombre}
                    onChange={handleChange}
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="recipient-slogan" className="col-form-label">Slogan:</label>
                  <input 
                    type="text" 
                    className="form-control" 
                    id="recipient-slogan"
                    name="slogan"
                    value={productora.slogan}
                    onChange={handleChange}
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="message-text" className="col-form-label">Descripción:</label>
                  <textarea 
                    className="form-control" 
                    id="message-text"
                    name="descripcion"
                    value={productora.descripcion}
                    onChange={handleChange}
                  />
                </div>
                <div className="mb-3 form-check">
                  <input 
                    type="checkbox" 
                    className="form-check-input" 
                    id="estado" 
                    name="estado"
                    checked={productora.estado}
                    onChange={handleChange}
                  />
                  <label className="form-check-label" htmlFor="estado">Estado</label>
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
                  disabled={productora.nombre.length === 0 || productora.slogan.length === 0 || productora.descripcion.length === 0}
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