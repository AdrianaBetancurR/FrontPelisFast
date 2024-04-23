import React, { useState } from 'react';
import { editarMedia, eliminarMedia } from '../../services/MediasService';
import { Modal, ModalHeader, ModalBody, Button } from 'reactstrap';


export default function TrMedia({ media }) {
  const [mostrarConfirmacion, setMostrarConfirmacion] = useState(false);
  const [modalEditar, setModalEditar] = useState(false);
  const [editarTitulo, setEditarTitulo] = useState(media.titulo);
  const [editarSinopsis, setEditarSinopsis] = useState(media.sinopsis);
  const [editarUrl, setEditarUrl] = useState(media.url);
  const [editarImage, setEditarImage] = useState(media.image);
  const [editarFechaEstreno, setEditarFechaEstreno] = useState(media.fechaEstreno);
  const [editarGenero, setEditarGenero] = useState(media.genero);
  const [editarDirector, setEditarDirector] = useState(media.director);
  const [editarProductora, setEditarProductora] = useState(media.productora);
  const [editarTipo, setEditarTipo] = useState(media.tipo);

  const toggleModalEditar = () => setModalEditar(!modalEditar);

  const handleEditar = () => {
    // Lógica para editar el medio
    toggleModalEditar();
  };

  const handleEliminar = () => {
    setMostrarConfirmacion(true);
  };

  const confirmarEliminar = () => {
    eliminarMedia(media._id)
      .then(response => {
        console.log("Medio eliminado exitosamente:", response);
        setMostrarConfirmacion(false);
        window.location.reload(); // Recargar la página después de eliminar
      })
      .catch(error => {
        console.error("Error al eliminar el medio:", error);
      });
  };

  const handleSubmitEdicion = (e) => {
    e.preventDefault();
    const data = {
      titulo: editarTitulo,
      sinopsis: editarSinopsis,
      url: editarUrl,
      image: editarImage,
      fechaEstreno: editarFechaEstreno,
      genero: editarGenero,
      director: editarDirector,
      productora: editarProductora,
      tipo: editarTipo
    };
    editarMedia(media._id, data)
      .then(response => {
        console.log("Medio editado exitosamente:", response);
        toggleModalEditar();
        window.location.reload(); // Recargar la página después de editar
      })
      .catch(error => {
        console.error("Error al editar el medio:", error);
      });
  };

  return (
    <>
      

      <Modal isOpen={mostrarConfirmacion} toggle={() => setMostrarConfirmacion(!mostrarConfirmacion)}>
        <ModalHeader toggle={() => setMostrarConfirmacion(!mostrarConfirmacion)}>Confirmación de Eliminación</ModalHeader>
        <ModalBody>
          ¿Estás seguro de que deseas eliminar este medio?
        </ModalBody>
        <div className="modal-footer">
          <Button color="secondary" onClick={() => setMostrarConfirmacion(false)}>No</Button>
          <Button color="danger" onClick={confirmarEliminar}>Sí</Button>
        </div>
      </Modal>

      <Modal isOpen={modalEditar} toggle={toggleModalEditar}>
        <ModalHeader toggle={toggleModalEditar}>Editar Medio</ModalHeader>
        <ModalBody>
          <form onSubmit={handleSubmitEdicion}>
            <div className="mb-3">
              <label htmlFor="titulo" className="form-label">Título:</label>
              <input
                type="text"
                id="titulo"
                className="form-control"
                value={editarTitulo}
                onChange={(e) => setEditarTitulo(e.target.value)}
              />
            </div>
            <div className="mb-3">
              <label htmlFor="sinopsis" className="form-label">Sinopsis:</label>
              <textarea
                id="sinopsis"
                className="form-control"
                value={editarSinopsis}
                onChange={(e) => setEditarSinopsis(e.target.value)}
              />
            </div>
            <div className="mb-3">
              <label htmlFor="url" className="form-label">URL:</label>
              <input
                type="text"
                id="url"
                className="form-control"
                value={editarUrl}
                onChange={(e) => setEditarUrl(e.target.value)}
              />
            </div>
            <div className="mb-3">
              <label htmlFor="image" className="form-label">Imagen:</label>
              <input
                type="text"
                id="image"
                className="form-control"
                value={editarImage}
                onChange={(e) => setEditarImage(e.target.value)}
              />
            </div>
            <div className="mb-3">
              <label htmlFor="fechaEstreno" className="form-label">Fecha de Estreno:</label>
              <input
                type="text"
                id="fechaEstreno"
                className="form-control"
                value={editarFechaEstreno}
                onChange={(e) => setEditarFechaEstreno(e.target.value)}
              />
            </div>
            <div className="mb-3">
              <label htmlFor="genero" className="form-label">Género:</label>
              <input
                type="text"
                id="genero"
                className="form-control"
                value={editarGenero}
                onChange={(e) => setEditarGenero(e.target.value)}
              />
            </div>
            <div className="mb-3">
              <label htmlFor="director" className="form-label">Director:</label>
              <input
                type="text"
                id="director"
                className="form-control"
                value={editarDirector}
                onChange={(e) => setEditarDirector(e.target.value)}
              />
            </div>
            <div className="mb-3">
              <label htmlFor="productora" className="form-label">Productora:</label>
              <input
                type="text"
                id="productora"
                className="form-control"
                value={editarProductora}
                onChange={(e) => setEditarProductora(e.target.value)}
              />
            </div>
            <div className="mb-3">
              <label htmlFor="tipo" className="form-label">Tipo:</label>
              <input
                type="text"
                id="tipo"
                className="form-control"
                value={editarTipo}
                onChange={(e) => setEditarTipo(e.target.value)}
              />
            </div>
            <Button color="primary" type="submit">Guardar Cambios</Button>
          </form>
        </ModalBody>
      </Modal>
    </>
  );
}
