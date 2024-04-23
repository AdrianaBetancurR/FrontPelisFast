import React, { useState } from 'react';
import dayjs from 'dayjs';
import { editarGenero, eliminarGenero } from '../../services/GenerosService';
import { Modal, ModalHeader, ModalBody, Button } from 'reactstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit, faTrashAlt } from '@fortawesome/free-solid-svg-icons';

export default function TrGenero({ index, genero }) {
  const [mostrarConfirmacion, setMostrarConfirmacion] = useState(false);
  const [editarNombre, setEditarNombre] = useState('');
  const [editarDescripcion, setEditarDescripcion] = useState('');
  const [modalEditar, setModalEditar] = useState(false);

  const handleEditar = () => {
    setEditarNombre(genero.nombre);
    setEditarDescripcion(genero.descripcion);
    setModalEditar(true);
  };

  const handleEliminar = () => {
    setMostrarConfirmacion(true);
  };

  const confirmarEliminar = () => {
    eliminarGenero(genero._id)
      .then(response => {
        console.log("Género eliminado exitosamente:", response);
        setMostrarConfirmacion(false);
        window.location.reload(); // Recargar la página después de eliminar
      })
      .catch(error => {
        console.error("Error al eliminar el género:", error);
      });
  };

  const handleSubmitEdicion = (e) => {
    e.preventDefault();
    const data = {
      nombre: editarNombre,
      descripcion: editarDescripcion,
    };
    editarGenero(genero._id, data)
      .then(response => {
        console.log("Género editado exitosamente:", response);
        setModalEditar(false);
        window.location.reload(); // Recargar la página después de editar
      })
      .catch(error => {
        console.error("Error al editar el género:", error);
      });
  };

  return (
    <tr>
      <th scope="row">{index + 1}</th>
      <td>{genero.nombre}</td>
      <td>{genero.descripcion}</td>
      <td>{dayjs(genero.fechaCreacion).format('YYYY-MM-DD')}</td>
      <td>{genero.estado ? 'Activo' : 'Inactivo'}</td>
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
            ¿Estás seguro de que deseas eliminar este género?
          </ModalBody>
          <div className="modal-footer">
            <Button color="secondary" onClick={() => setMostrarConfirmacion(false)}>No</Button>
            <Button color="danger" onClick={confirmarEliminar}>Sí</Button>
          </div>
        </Modal>

        <Modal isOpen={modalEditar} toggle={() => setModalEditar(!modalEditar)}>
          <ModalHeader toggle={() => setModalEditar(!modalEditar)}>Editar género</ModalHeader>
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
                <label htmlFor="descripcion" className="form-label">Descripción:</label>
                <input
                  type="text"
                  id="descripcion"
                  className="form-control"
                  value={editarDescripcion}
                  onChange={(e) => setEditarDescripcion(e.target.value)}
                />
              </div>
              <Button color="primary" type="submit">Editar</Button>
            </form>
          </ModalBody>
        </Modal>
      </td>
    </tr>
  );
}