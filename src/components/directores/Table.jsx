import React from 'react';
import TrDirector from './TrDirector';

export default function Table({ directores = [] }) {
  return (
    <table className="table">
      <thead>
        <tr>
          <th scope="col">#</th>
          <th scope="col">Nombre</th>
          <th scope="col">Creación</th>
          <th scope="col">Estado</th>
          <th>Acciones</th>
        </tr>
      </thead>
      <tbody>
        {directores.map((director, index) => (
          <TrDirector key={index} index={index} director={director} />
        ))}
      </tbody>
    </table>
  );
}