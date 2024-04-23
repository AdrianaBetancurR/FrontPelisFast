import React, { useEffect, useState } from 'react';
import dayjs from 'dayjs'; 
import { crearMedia, obtenerMedias } from '../../services/MediasService';
import 'bootstrap/dist/css/bootstrap.min.css'; 
import Cards from './Cards';

export default function Medias() {
  const [medias, setMedias] = useState([]);
  const [error, setError] = useState(false);
  const [media, setMedia] = useState({
    serial: '',
    titulo: '',
    sinopsis: '',
    url: '',
    image: '',
    fechaEstreno: '', // No es necesario inicializarlo aquí
    genero: '',
    director: '',
    productora: '',
    tipo: '',
  });

  useEffect(() => {
    obtenerTodos();
  }, []);

  const obtenerTodos = async () => {
    try {
      const { data } = await obtenerMedias();
      console.log("Datos recibidos (GET):", data);
      setMedias(data);
      setError(false);
    } catch (e) {
      console.error("Error al obtener medias (GET):", e);
      setError(true);
    }
  };

  const handleChange = e => {
    setMedia({
      ...media,
      [e.target.name]: e.target.value
    });
  };

  const guardar = async (e) => {
    e.preventDefault(); // Evita el refresco de la página al enviar el formulario
    try {
      // Realiza las validaciones necesarias antes de crear la media
      if (!media.serial.trim() || !media.titulo.trim() || !media.sinopsis.trim() || !media.url.trim() || !media.image.trim() || !media.fechaEstreno.trim() || !media.genero.trim() || !media.director.trim() || !media.productora.trim() || !media.tipo.trim()) {
        throw new Error("Todos los campos son obligatorios");
      }

      // Convierte el campo fechaEstreno a tipo dayjs si está presente y no es una cadena vacía
      if (media.fechaEstreno && media.fechaEstreno.trim()) {
        media.fechaEstreno = dayjs(media.fechaEstreno.trim());
      }

      // Aquí puedes realizar la creación de la media
      await crearMedia(media);
      console.log("Método POST realizado"); // Imprime en la consola después de crear la media
      obtenerTodos();
      // Limpia el estado después de crear la media
      setMedia({
        serial: '',
        titulo: '',
        sinopsis: '',
        url: '',
        image: '',
        fechaEstreno: '',
        genero: '',
        director: '',
        productora: '',
        tipo: '',
      });
    } catch (error) {
      console.error("Error al enviar los datos (POST):", error);
      // Maneja el error mostrando un mensaje al usuario
      setError(true);
    }
  };

  return (
    <>
     <Cards medias={medias} />
      <button type="button" className="btn btn-primary mt-3" data-bs-toggle="modal" data-bs-target="#exampleModal" data-bs-whatever="@fat">Agregar Media</button>
      <div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h1 className="modal-title fs-5" id="exampleModalLabel">Nueva Media</h1>
              <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div className="modal-body">
              <form onSubmit={guardar}>
                <div className="mb-3">
                  <label htmlFor="recipient-serial" className="col-form-label">Serial:</label>
                  <input 
                    type="text" 
                    className="form-control" 
                    id="recipient-serial"
                    name="serial"
                    value={media.serial}
                    onChange={handleChange}
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="recipient-title" className="col-form-label">Título:</label>
                  <input 
                    type="text" 
                    className="form-control" 
                    id="recipient-title"
                    name="titulo"
                    value={media.titulo}
                    onChange={handleChange}
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="message-synopsis" className="col-form-label">Sinopsis:</label>
                  <textarea 
                    className="form-control" 
                    id="message-synopsis"
                    name="sinopsis"
                    value={media.sinopsis}
                    onChange={handleChange}
                  >
                  </textarea>
                </div>
                <div className="mb-3">
                  <label htmlFor="recipient-url" className="col-form-label">URL:</label>
                  <input 
                    type="text" 
                    className="form-control" 
                    id="recipient-url"
                    name="url"
                    value={media.url}
                    onChange={handleChange}
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="recipient-image" className="col-form-label">Imagen:</label>
                  <input 
                    type="text" 
                    className="form-control" 
                    id="recipient-image"
                    name="image"
                    value={media.image}
                    onChange={handleChange}
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="recipient-date" className="col-form-label">Fecha de Estreno:</label>
                  <input 
                    type="text" 
                    className="form-control" 
                    id="recipient-date"
                    name="fechaEstreno"
                    value={media.fechaEstreno}
                    onChange={handleChange}
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="recipient-genre" className="col-form-label">Género:</label>
                  <input 
                    type="text" 
                    className="form-control" 
                    id="recipient-genre"
                    name="genero"
                    value={media.genero}
                    onChange={handleChange}
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="recipient-director" className="col-form-label">Director:</label>
                  <input 
                    type="text" 
                    className="form-control" 
                    id="recipient-director"
                    name="director"
                    value={media.director}
                    onChange={handleChange}
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="recipient-producer" className="col-form-label">Productora:</label>
                  <input 
                    type="text" 
                    className="form-control" 
                    id="recipient-producer"
                    name="productora"
                    value={media.productora}
                    onChange={handleChange}
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="recipient-type" className="col-form-label">Tipo:</label>
                  <input 
                    type="text" 
                    className="form-control" 
                    id="recipient-type"
                    name="tipo"
                    value={media.tipo}
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
