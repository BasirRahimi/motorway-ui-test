import './Modal.css';

import React from 'react';

function Modal({handleClose, show, img}) {
  const className = show ? "show" : "";
  if(img) {
    return (
      <div className={`Modal ${className}`}>
        <img src={`${img.url}.jpg`} alt={img.alt_description} />
        <button type="button" onClick={handleClose}>Close</button>
      </div>
    )
  } else {
    return (
      <div></div>
    );
  }
}

export default Modal;
