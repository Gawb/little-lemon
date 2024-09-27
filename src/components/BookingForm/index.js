import React, { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import './index.css'; // Tu archivo de estilos
import { ConfirmedBooking } from './ConfirmedBooking'

const BookingForm = () => {
  const { register, handleSubmit, watch, formState: { errors }, trigger } = useForm();
  const [page, setPage] = useState(0);
  const [availableTimes, setAvailableTimes] = useState([]);
  const [apiFunctionsLoaded, setApiFunctionsLoaded] = useState(false); // Nuevo estado para verificar si el script se cargó
  const [message, setMessage] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);

  const selectedDate = watch('Date'); // Obtener la fecha seleccionada del formulario

  // Función para cargar el script de la API
  const loadAPIScript = () => {
    return new Promise((resolve, reject) => {
      // Verificamos si el script ya ha sido cargado
      if (document.querySelector('script[src="/api.js"]')) {
        resolve();
        return;
      }

      const script = document.createElement('script');
      script.src = '/api.js'; // Cambia a la ruta de tu archivo api.js en la carpeta public
      script.async = true;
      script.onload = () => {
        console.log('API script loaded');
        resolve();
      };
      script.onerror = () => reject(new Error('Failed to load API script'));
      document.body.appendChild(script);
    });
  };

  // Función para inicializar los horarios disponibles
  const initializeTimes = () => {
    const today = new Date(); // Crear la fecha de hoy
    const formattedDate = today.toISOString().split('T')[0]; // Convertir a formato YYYY-MM-DD
    updateTimes(formattedDate); // Llamar a updateTimes para obtener los horarios de hoy
  };

  // Función para actualizar los horarios disponibles según la fecha seleccionada
  const updateTimes = (date) => {
    const fetchAPI = window.fetchAPI; // Asegurarnos de que fetchAPI esté disponible en window
    if (typeof fetchAPI === "function") {
      console.log("fetchAPI is being called with date:", date);
      const times = fetchAPI(new Date(date)); // Llama directamente a fetchAPI
      console.log("Available times fetched:", times);
      setAvailableTimes(times); // Actualizar el estado con los horarios obtenidos
    } else {
      console.log("fetchAPI is not defined yet");
    }
  };

  // Cargar el script de la API cuando el componente se monte
  useEffect(() => {
    loadAPIScript()
      .then(() => {
        setApiFunctionsLoaded(true); // Marcamos que las funciones están cargadas
        initializeTimes(); // Llamar a initializeTimes después de que se cargue el script
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  // Actualizar los horarios disponibles cuando cambie la fecha
  useEffect(() => {
    if (selectedDate && apiFunctionsLoaded) {
      updateTimes(selectedDate);
    }
  }, [selectedDate, apiFunctionsLoaded]);

  // Función para manejar el envío del formulario
  const onSubmit = (data) => {
    const submitAPI = window.submitAPI; // Asegurarnos de que submitAPI esté disponible en window
    if (typeof submitAPI === "function") {
      console.log("Form data:", data);
      const success = submitAPI(data); // Llama directamente a submitAPI
      console.log("Submit success:", success);
      if (success) {
        console.log('Reservation successfully submitted');
        setMessage('Reservation successfully submitted!');
        setIsModalOpen(true);
      } else {
        console.log('Failed to submit reservation');
        setMessage('Failed to submit reservation :(');
      }
    } else {
      console.log("submitAPI is not defined yet");
    }
  };

  const nextPage = async () => {
    const isValid = await trigger(); // Valida todos los campos visibles en la página actual
    if (isValid) {
      setPage((prev) => prev + 1); // Cambia de página solo si la validación es exitosa
    }
  };
  const prevPage = () => setPage((prev) => prev - 1);

  const Page1 = () => (
    <>
      <p>Please provide us with the following information to proceed with your reservation.</p>
      <div className="reservation-step-one">
        <label htmlFor='location'>At which location</label>
        <select {...register('location', {
          required: 'Location is required', // Este mensaje se muestra si no se selecciona ninguna ubicación
          validate: value => value !== '--' || 'Please select a valid location' // Valida que el valor no sea '--'
        })}>
          <option value="--">--</option>
          <option value="Viña del Mar">Viña del Mar</option>
          <option value="Santiago">Santiago</option>
        </select>
        {errors.location && <span>{errors.location.message}</span>}
        <label htmlFor='area'>Select area</label>
        <select {...register('area', {
          required: 'Area is required', // Este mensaje se muestra si no se selecciona ninguna ubicación
          validate: value => value !== '--' || 'Please select a valid area' // Valida que el valor no sea '--'
        })}>
          <option value="--">--</option>
          <option value="Bar">bar</option>
          <option value="Table">Table</option>
        </select>
        {errors.area && <span>{errors.area.message}</span>}
        <div className="reservation-step-one_last-info">
          <div>
            <label>Date:</label>
            <input type="date" {...register('Date')}
              defaultValue={new Date().toISOString().split('T')[0]}
              min={new Date().toISOString().split('T')[0]}
            />
          </div>
          <div>
            <label>Available times:</label>
            <select {...register('Time')}>

              {availableTimes.length > 0 ? (
                availableTimes.map((time, index) => (
                  <option key={index} value={time}>
                    {time}
                  </option>
                ))
              ) : (
                <option>No times available</option>
              )}
            </select>
          </div>
          <div>
            <label>Number of people:</label>
            <input type="number" {...register('numberOfPeople')} />
          </div>
        </div>
      </div>
      <button type="button" onClick={nextPage}>Next</button>
    </>
  );

  const Page2 = () => (
    <>
      <p>We have a table for you. Please provide us with some instructions for your reservation.</p>
      <div className="reservation-step-one">
        <label>Reason for your reservation:</label>
        <select {...register('reason')}>
          <option value="Birthday">Birthday</option>
          <option value="Engagement">Engagement</option>
          <option value="Anniversary">Anniversary</option>
        </select>
        <label>Specifications (optional):</label>
        <input className="text-area" placeholder="e.g., food intolerance, a particular table, or any additional comments" {...register('specification')} />
      </div>
      <div className="button-box">
        <button type="button" onClick={prevPage}>Back</button>
        <button type="button" onClick={nextPage}>Next</button>
      </div>
    </>
  );

  const Page3 = () => (
    <>
      <p>Fill in these last fields to complete your reservation.</p>
      <div className="reservation-step-one">
        <label>Full name:</label>
        <input {...register('name')} />
        <label>Phone number:</label>
        <input {...register('phone')} />
        <label>Email:</label>
        <input type="email" {...register('email')} />
      </div>
      <div className="button-box-end">
        <button type="button" onClick={prevPage}>Back</button>
        <button type="submit">Make Reservation</button>
      </div>
    </>
  );

  // Controlamos qué "página" mostrar
  const renderPage = () => {
    switch (page) {
      case 0:
        return <Page1 />;
      case 1:
        return <Page2 />;
      case 2:
        return <Page3 />;
      default:
        return <Page1 />;
    }
  };

  return (
    <>
      <form className="reservation-section" id="reservation" onSubmit={handleSubmit(onSubmit)}>
        {renderPage()}
      </form>
      <ConfirmedBooking message={message} isOpen={isModalOpen} />
    </>

  );
};

export { BookingForm };
