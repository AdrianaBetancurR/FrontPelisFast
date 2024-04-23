  import React, { useEffect, useState } from 'react'; // Importa useState
  import { crearTipo, obtenerTipos} from '../../services/TiposService';
  import Table from './Table';
  import Error from './Error';
  import 'bootstrap/dist/css/bootstrap.min.css'; // Importa los estilos de Bootstrap

  export default function Tipos() {
    const [tipos, setTipos] = useState([]);
    const [error, setError] = useState(false);
    const [tipo, setTipo] = useState({
      nombre: '',
      descripcion: '',
    });

    useEffect(() => {
      obtenerTodos();
    }, []);
    const obtenerTodos = async () => {
      try {
          const { data } = await obtenerTipos();
          console.log("Datos recibidos:", data);
          setTipos(data);
          setError(false);
      } catch (e) {
          console.error("Error al obtener tipos:", e);
          setError(true);
      }
  };

  const handleChange = e => {
    setTipo({
      ...tipo,
      [e.target.name]: e.target.value
    });
  };


    const guardar = async () => {
      try {
        await crearTipo(tipo);
        obtenerTodos();
        setTipo({
          nombre: '',
          descripcion: '',
        });
      } catch (e) {
        console.error(e);
      }
    };
 



    return (
      <>
        
        {error ? <Error /> : <Table tipos={tipos} />}
        
        <button type="button" className="btn btn-primary" data-bs-toggle="modal" data-bs-target="#exampleModal" data-bs-whatever="@fat">Agregar Tipo</button>

        <div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <h1 className="modal-title fs-5" id="exampleModalLabel">Nuevo Tipo</h1>
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
                      value={tipo.nombre}
                      onChange={handleChange}
                    />
                  </div>
                  <div className="mb-3">
                    <label htmlFor="message-text" className="col-form-label">Descripción:</label>
                    <textarea 
                      className="form-control" 
                      id="message-text"
                      name="descripcion"
                      value={tipo.descripcion}
                      onChange={handleChange}
                    >
                    </textarea>
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
                    disabled={tipo.nombre.length === 0}
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