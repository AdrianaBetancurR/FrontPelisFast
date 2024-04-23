import React, { useState } from 'react';
import dayjs from 'dayjs';
import { editarProductora, eliminarProductora } from '../../services/ProductorasService';
import { Modal, ModalHeader, ModalBody, Button } from 'reactstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit, faTrashAlt } from '@fortawesome/free-solid-svg-icons';

export default function TrProductora({ index, productora }) {
  const [mostrarConfirmacion, setMostrarConfirmacion] = useState(false);
  const [editarNombre, setEditarNombre] = useState('');
  const [editarSlogan, setEditarSlogan] = useState('');
  const [editarDescripcion, setEditarDescripcion] = useState('');
  const [editarEstado, setEditarEstado] = useState(false);
  const [modalEditar, setModalEditar] = useState(false);

  const handleEditar = () => {
    setEditarNombre(productora.nombre);
    setEditarSlogan(productora.slogan);
    setEditarDescripcion(productora.descripcion);
    setEditarEstado(productora.estado);
    setModalEditar(true);
  };

  const handleEliminar = () => {
    setMostrarConfirmacion(true);
  };

  const confirmarEliminar = () => {
    eliminarProductora(productora._id)
      .then(response => {
        console.log("Productora eliminada exitosamente:", response);
        setMostrarConfirmacion(false);
        window.location.reload(); // Recargar la página después de eliminar
      })
      .catch(error => {
        console.error("Error al eliminar la productora:", error);
      });
  };

  const handleSubmitEdicion = (e) => {
    e.preventDefault();
    const data = {
      nombre: editarNombre,
      slogan: editarSlogan,
      descripcion: editarDescripcion,
      estado: editarEstado
    };
    editarProductora(productora._id, data)
      .then(response => {
        console.log("Productora editada exitosamente:", response);
        setModalEditar(false);
        window.location.reload(); // Recargar la página después de editar
      })
      .catch(error => {
        console.error("Error al editar la productora:", error);
      });
  };

  return (
    <tr>
      <th scope="row">{index + 1}</th>
      <td>{productora.nombre}</td>
      <td>{productora.slogan}</td>
      <td>{productora.descripcion}</td>
      <td>{dayjs(productora.fechaCreacion).format('YYYY-MM-DD')}</td>
      <td>{productora.estado ? 'Activo' : 'Inactivo'}</td>
      <td>
        <button
          type="button"
          className="btn btn-outline-success"
          onClick={handleEditar}
        >
          <FontAwesomeIcon icon={faEdit} />
        </button>
        <button
          type="button"
          className="btn btn-outline-danger"
          onClick={handleEliminar}
        >
          <FontAwesomeIcon icon={faTrashAlt} />
        </button>

        <Modal isOpen={mostrarConfirmacion} toggle={() => setMostrarConfirmacion(!mostrarConfirmacion)}>
          <ModalHeader toggle={() => setMostrarConfirmacion(!mostrarConfirmacion)}>Confirmación de Eliminación</ModalHeader>
          <ModalBody>
            ¿Estás seguro de que deseas eliminar esta productora?
          </ModalBody>
          <div className="modal-footer">
            <Button color="secondary" onClick={() => setMostrarConfirmacion(false)}>No</Button>
            <Button color="danger" onClick={confirmarEliminar}>Sí</Button>
          </div>
        </Modal>

        <Modal isOpen={modalEditar} toggle={() => setModalEditar(!modalEditar)}>
          <ModalHeader toggle={() => setModalEditar(!modalEditar)}>Editar productora</ModalHeader>
          <ModalBody>
            <form onSubmit={handleSubmitEdicion}>
              <div className="mb-3">
                <label htmlFor="nombre" className="form-label">Nombre:</label>
                <input
                  type="text"
                  id="nombre"
                  className="form-control"
                  value={editarNombre}
                  onChange={(e) => setEditarNombre(e.target.value)}
                />
              </div>
              <div className="mb-3">
                <label htmlFor="slogan" className="form-label">Slogan:</label>
                <input
                  type="text"
                  id="slogan"
                  className="form-control"
                  value={editarSlogan}
                  onChange={(e) => setEditarSlogan(e.target.value)}
                />
              </div>
              <div className="mb-3">
                <label htmlFor="descripcion" className="form-label">Descripción:</label>
                <input
                  type="text"
                  id="descripcion"
                  className="form-control"
                  value={editarDescripcion}
                  onChange={(e) => setEditarDescripcion(e.target.value)}
                />
              </div>
              <div className="mb-3 form-check">
                <input
                  type="checkbox"
                  className="form-check-input"
                  id="estado"
                  checked={editarEstado}
                  onChange={(e) => setEditarEstado(e.target.checked)}
                />
                <label className="form-check-label" htmlFor="estado">Estado</label>
              </div>
              <Button color="primary" type="submit">Editar</Button>
            </form>
          </ModalBody>
        </Modal>
      </td>
    </tr>
  );
}
