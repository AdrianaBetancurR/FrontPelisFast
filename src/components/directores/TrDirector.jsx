import React from 'react';
import dayjs from 'dayjs';
import { editarDirector, eliminarDirector } from '../../services/DirectoresService';
import { Modal, ModalHeader, ModalBody, Button } from 'reactstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit, faTrashAlt } from '@fortawesome/free-solid-svg-icons';

export default function TrDirector({ index, director }) {
  const [mostrarConfirmacion, setMostrarConfirmacion] = React.useState(false);
  const [editarNombre, setEditarNombre] = React.useState('');
  const [modalEditar, setModalEditar] = React.useState(false);

  const handleEditar = () => {
    setEditarNombre(director.nombre);
    setModalEditar(true);
  };

  const handleEliminar = () => {
    setMostrarConfirmacion(true);
  };

  const confirmarEliminar = () => {
    eliminarDirector(director._id)
      .then(response => {
        console.log("Director eliminado exitosamente:", response);
        setMostrarConfirmacion(false);
        window.location.reload(); // Recargar la página después de eliminar
      })
      .catch(error => {
        console.error("Error al eliminar el director:", error);
      });
  };

  const handleSubmitEdicion = (e) => {
    e.preventDefault();
    const data = {
      nombre: editarNombre,
    };
    editarDirector(director._id, data)
      .then(response => {
        console.log("Director editado exitosamente:", response);
        setModalEditar(false);
        window.location.reload(); // Recargar la página después de editar
      })
      .catch(error => {
        console.error("Error al editar el director:", error);
      });
  };

  return (
    <tr>
      <th scope="row">{index + 1}</th>
      <td>{director.nombre}</td>
      <td>{dayjs(director.fechaCreacion).format('YYYY-MM-DD')}</td>
      <td>{director.estado ? 'Activo' : 'Inactivo'}</td>
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
            ¿Estás seguro de que deseas eliminar este director?
          </ModalBody>
          <div className="modal-footer">
            <Button color="secondary" onClick={() => setMostrarConfirmacion(false)}>No</Button>
            <Button color="danger" onClick={confirmarEliminar}>Sí</Button>
          </div>
        </Modal>

        <Modal isOpen={modalEditar} toggle={() => setModalEditar(!modalEditar)}>
          <ModalHeader toggle={() => setModalEditar(!modalEditar)}>Editar director</ModalHeader>
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
              <Button color="primary" type="submit">Editar</Button>
            </form>
          </ModalBody>
        </Modal>
      </td>
    </tr>
  );
}