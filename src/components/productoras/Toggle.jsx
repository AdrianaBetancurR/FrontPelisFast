// Toggle.jsx
import React from 'react';

export default function Toggle({ cambiarEstado, estado }) {
  return (
    <div className="form-check form-switch">
      <input
        onChange={cambiarEstado} // Cambiado de onClick a onChange
        className="form-check-input"
        type="checkbox"
        role="switch"
        id="flexSwitchCheckChecked"
        checked={estado}
      />
      <label className="form-check-label" htmlFor="flexSwitchCheckChecked">
        Activos/Inactivos
      </label>
    </div>
  );
}
