import React from 'react';
import TrTipo from './TrTipo';

export default function Tipos({ tipos = [] }) {
  return (
    <table className="table"> 
      <thead>
        <tr>
          <th scope="col">#</th>
          <th scope="col">Nombre</th>
          <th scope="col">Descripción</th>
          <th scope="col">Creación</th>
          <th>Acciones</th>
        </tr>
      </thead>
      <tbody>
        {tipos.map((tipo, index) => (
          <TrTipo key={index} index={index} tipo={tipo} /> 
        ))}

      </tbody>
    </table>
  );
}