import React, { useState, useEffect } from 'react';
import './elevator.css';

const Elevator = () => {
  const [pisoActual, setCurrentFloor] = useState(1);
  const [pisoDestino, setDestinationFloor] = useState(1);
  const [direction, setDirection] = useState('');
  const [moving, setMoving] = useState(false);
  const [arrivalMessage, setArrivalMessage] = useState('');
  const [inputFloor, setInputFloor] = useState('');

  const handleFloorSelection = (floor) => {
    if (!moving) {
      setDestinationFloor(floor);
    }
  };



  const handleMove = () => {
    if (!moving) {
      setMoving(true);
      setArrivalMessage('');
    }
  };

  const handleInputFloor = (e) => {
    setInputFloor(e.target.value);
  };

  const handleCallElevator = () => {
    if (!moving) {
      const inputFloorNumber = parseInt(inputFloor);
      if (inputFloorNumber >= 1 && inputFloorNumber <= 10) {
        setDestinationFloor(inputFloorNumber);
        setInputFloor('');
        setMoving(true);
        setArrivalMessage(`El elevador está en camino al piso ${inputFloorNumber}.`);
      } else {
        alert('Ingresa un piso válido (1-10).');
      }
    }
  };

  useEffect(() => {
    if (moving) {
      const timer = setInterval(() => {
        setCurrentFloor((prevFloor) => {
          if (prevFloor < pisoDestino) {
            return prevFloor + 1;
          } else if (prevFloor > pisoDestino) {
            return prevFloor - 1;
          } else {
            setMoving(false);
            clearInterval(timer);
            setArrivalMessage(`Piso ${pisoDestino}!`);
            return prevFloor;
          }
        });
      }, 1000);
    }
  }, [moving, pisoDestino]);

 

  return (
    <div className="elevator-wrapper">
      <h2>Elevador</h2>
      <div className="button-container">
        <div className="button-wrapper">
          {[...Array(10)].map((_, index) => (
            <button
              key={index}
              onClick={() => handleFloorSelection(index + 1)}
              className={pisoActual === (index + 1) ? 'current-floor-button' : ''}
              disabled={moving}
            >
              {index + 1}
            </button>
          ))}
        </div>
        <div className={`elevator-box ${moving ? 'moving' : ''}`}>
          <p className="floor-display">{moving ? pisoActual : pisoDestino}</p>
        </div>
        <div className="button-wrapper">
          <label>A que piso te quieres dirigir: </label>
          <input type="number" value={inputFloor} onChange={handleInputFloor} disabled={moving} />
          <button onClick={handleCallElevator} disabled={moving}>Ir al piso</button>
        </div>
    
      </div>
      <p className="current-floor">Haz llegado a tu destino: {pisoActual}</p>
      {arrivalMessage && <p className="arrival-message">{arrivalMessage}</p>}
    </div>
  );
};

export default Elevator;