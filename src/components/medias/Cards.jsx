import React, { useState } from 'react';
import { editarMedia, eliminarMedia } from '../../services/MediasService';
import { Modal, ModalHeader, ModalBody, ModalFooter, Button } from 'reactstrap';

// Objeto de mapeo para convertir códigos a nombres
const generoMap = {
  '6600b59b614dce86476ed4d9': 'Aventura',
  '662318f4345b27f370af8271': 'Acción',
  '6623897602ebc782af35e86c': 'Drama',
  '6623898b02ebc782af35e871': 'Ciencia Ficción',
  '662389a802ebc782af35e876': 'Terror',
};

const directorMap = {
  '660137960db2a9421f8aebb8': "Christopher Nolan",
  '660b93f4be88a01b6f662b1e': "John Krasinski",
  '6625c1e63437fd8b66918031': "Josh Cooley",
  '6625c6703437fd8b6691805e': "Vince Gilligan",
  '6625ce093437fd8b66918083': "Lilly Wachowski",
  '66263b82ca2971038baf8191': "Juan Antonio Bayona",
  '662646caca2971038baf81a9': "Tate Taylor"
};

const productoraMap = {
  '66023af384908fb0787bfc85': "Syncopy Films",
  '660b97e3be88a01b6f662b25': "Platinum Dunes",
  '6625c2b73437fd8b66918039': "Pixar",
  '6625c73b3437fd8b66918067': "AMC",
  '6625cfb53437fd8b6691809e': "Village Roadshow Pictures",
  '66263c70ca2971038baf819a': "Netflix",
  '662647b7ca2971038baf81b0': "DreamWorks Pictures"
};

const tipoMap = {
  '6625765f8a6dce7669247ef0': 'Películas',
  '6625840c03254b90256ded21': 'Series'
};

// Función para obtener solo el año de una fecha
const obtenerAnio = (fecha) => {
  return new Date(fecha).getFullYear();
};

export default function Cards({ medias }) {
  const [modal, setModal] = useState(false);
  const [selectedMedia, setSelectedMedia] = useState(null);
  const [mostrarConfirmacion, setMostrarConfirmacion] = useState(false);
  const [modalEditar, setModalEditar] = useState(false);
  const [editarTitulo, setEditarTitulo] = useState('');
  const [editarSinopsis, setEditarSinopsis] = useState('');
  const [editarUrl, setEditarUrl] = useState('');
  const [editarImage, setEditarImage] = useState('');
  const [editarFechaEstreno, setEditarFechaEstreno] = useState('');
  const [editarGenero, setEditarGenero] = useState('');
  const [editarDirector, setEditarDirector] = useState('');
  const [editarProductora, setEditarProductora] = useState('');
  const [editarTipo, setEditarTipo] = useState('');

  const toggleModal = () => setModal(!modal);

  const openModal = (media) => {
    setSelectedMedia(media);
    toggleModal();
  };

  const toggleModalEditar = () => setModalEditar(!modalEditar);

  const handleEditar = () => {
    if (selectedMedia) {
      setEditarTitulo(selectedMedia.titulo);
      setEditarSinopsis(selectedMedia.sinopsis);
      setEditarUrl(selectedMedia.url);
      setEditarImage(selectedMedia.image);
      setEditarFechaEstreno(selectedMedia.fechaEstreno);
      setEditarGenero(selectedMedia.genero);
      setEditarDirector(selectedMedia.director);
      setEditarProductora(selectedMedia.productora);
      setEditarTipo(selectedMedia.tipo);
      toggleModalEditar();
    }
  };

  const handleEliminar = () => {
    setMostrarConfirmacion(true);
  };

  const confirmarEliminar = () => {
    eliminarMedia(selectedMedia._id)
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
    editarMedia(selectedMedia._id, data)
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
    <div className="row row-cols-1 row-cols-md-3 g-4">
      {medias.map((media, index) => (
        <div className="col" key={media._id}>
          <div className="card" onClick={() => openModal(media)}>
            <img src={media.image} className="card-img-top" alt={media.titulo} />
            <div className="card-body">
              <h5 className="card-title">{media.titulo}</h5>
              <p className="card-text">{media.sinopsis}</p>
            </div>
            <Button color="danger" onClick={handleEliminar}>Eliminar</Button>
            <Button color="primary" onClick={handleEditar}>Editar</Button>
          </div>
        </div>
      ))}

      {/* Modal */}
      <Modal isOpen={modal} toggle={toggleModal} size="lg">
        <ModalHeader toggle={toggleModal}>Detalles de la Película</ModalHeader>
        <ModalBody>
          {selectedMedia && (
            <>
              <p><strong>Serial:</strong> {selectedMedia.serial}</p>
              <p><strong>Fecha de Estreno:</strong> {obtenerAnio(selectedMedia.fechaEstreno)}</p>
              <p><strong>Género:</strong> {generoMap[selectedMedia.genero]}</p>
              <p><strong>Director:</strong> {directorMap[selectedMedia.director]}</p>
              <p><strong>Productora:</strong> {productoraMap[selectedMedia.productora]}</p>
              <p><strong>Tipo:</strong> {tipoMap[selectedMedia.tipo]}</p>
           
              {selectedMedia.url && (
      <Button color="primary" href={selectedMedia.url} target="_blank" rel="noopener noreferrer">Ver Trailer</Button>
    )}
  </>
)}
        </ModalBody>
        <ModalFooter>
          <Button color="secondary" onClick={toggleModal}>Cerrar</Button>
        </ModalFooter>
      </Modal>

      {/* Modal de Confirmación */}
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

      {/* Modal de Edición */}
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
    </div>
  );
}
