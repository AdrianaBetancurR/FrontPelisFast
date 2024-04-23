import React, { useState } from 'react';
import dayjs from 'dayjs';
import { eliminarTipo, editarTipo } from '../../services/TiposService'; // Importa la función para editar el tipo
import { Modal, ModalHeader, ModalBody, Button } from 'reactstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit, faTrashAlt } from '@fortawesome/free-solid-svg-icons';

export default function TrTipo({ index, tipo }) {
  const [mostrarConfirmacion, setMostrarConfirmacion] = useState(false);
  const [mostrarModalEditar, setMostrarModalEditar] = useState(false);
  const [editarNombre, setEditarNombre] = useState(tipo.nombre);
  const [editarDescripcion, setEditarDescripcion] = useState(tipo.descripcion);

  const handleEliminar = () => {
    setMostrarConfirmacion(true);
  };

  const confirmarEliminar = () => {
    eliminarTipo(tipo._id)
      .then(response => {
        console.log("Tipo eliminado exitosamente:", response);
        setMostrarConfirmacion(false);
        window.location.reload(); // Recarga la página después de eliminar
      })
      .catch(error => {
        console.error("Error al eliminar el tipo:", error);
      });
  };

  const abrirModalEditar = () => {
    setEditarNombre(tipo.nombre);
    setEditarDescripcion(tipo.descripcion);
    setMostrarModalEditar(true);
  };

  const cerrarModalEditar = () => {
    setMostrarModalEditar(false);
  };

  const handleSubmitEdicion = (e) => {
    e.preventDefault();
    const data = {
      nombre: editarNombre,
      descripcion: editarDescripcion,
    };
    editarTipo(tipo._id, data)
      .then(response => {
        console.log("Tipo editado exitosamente:", response);
        cerrarModalEditar();
        window.location.reload(); // Recarga la página después de editar
      })
      .catch(error => {
        console.error("Error al editar el tipo:", error);
      });
  };

  return (
    <tr>
      <th scope="row">{index + 1}</th>
      <td>{tipo.nombre}</td>
      <td>{tipo.descripcion}</td>
      <td>{dayjs(tipo.fechaCreacion).format('YYYY-MM-DD')}</td>
  
      <td>
        <button
          type="button"
          className="btn btn-outline-success"
          onClick={abrirModalEditar} // Abre el modal de edición al hacer clic en el botón editar
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
            ¿Estás seguro de que deseas eliminar este tipo?
          </ModalBody>
          <div className="modal-footer">
            <Button color="secondary" onClick={() => setMostrarConfirmacion(false)}>No</Button>
            <Button color="danger" onClick={confirmarEliminar}>Sí</Button>
          </div>
        </Modal>

        <Modal isOpen={mostrarModalEditar} toggle={cerrarModalEditar}>
          <ModalHeader toggle={cerrarModalEditar}>Editar tipo</ModalHeader>
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
