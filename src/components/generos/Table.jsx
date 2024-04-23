import React from 'react';
import TrGenero from './TrGenero';

export default function Table({ generos = [] }) {
  return (
    <table className="table">
      <thead>
        <tr>
          <th scope="col">#</th>
          <th scope="col">Nombre</th>
          <th scope="col">Descripción</th>
          <th scope="col">Creado</th>
          <th scope="col">Estado</th>
          <th>Acciones</th>
        </tr>
      </thead>
      <tbody>
        {generos.map((genero, index) => (
          <TrGenero key={index} index={index} genero={genero} />
        ))}
      </tbody>
    </table>
  );
}