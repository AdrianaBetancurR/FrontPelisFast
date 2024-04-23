import React from 'react';
import TrProductora from './TrProductora'; 
export default function Productoras({ productoras = [] }) {
  return (
    <table className="table"> 
      <thead>
        <tr>
          <th scope="col">#</th>
          <th scope="col">Nombre</th>
          <th scope="col">Slogan</th>
          <th scope="col">Descripción</th>
          <th scope="col">Creación</th>
          <th scope="col">Estado</th>
          <th>Acciones</th>
        </tr>
      </thead>
      <tbody>
        {productoras.map((productora, index) => (
          <TrProductora key={index} index={index} productora={productora} />
        ))}
      </tbody>
    </table>
  );
}