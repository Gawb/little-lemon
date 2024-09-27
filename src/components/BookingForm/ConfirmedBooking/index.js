import './index.css';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

const ConfirmedBooking = (props) => {
  const [openModal, setOpenModal] = useState(false);

  // Sincronizar estado interno con el valor de props.isOpen
  useEffect(() => {
    setOpenModal(props.isOpen);
  }, [props.isOpen]);

  if (!openModal) return null; // Si el modal está cerrado, no renderizar nada

  return (
    <div className="modal-respond">
      <div className="modal-respond-content">
        <h3>{props.message}</h3>
        <button onClick={() => setOpenModal(false)} className="modal-button">
          <Link to={`/`}
              className='nav-item'>
              Close X
          </Link>
      </button>
      </div>

    </div>
  );
};

export { ConfirmedBooking };
