import React, { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import './index.css'; // Tu archivo de estilos
import { ConfirmedBooking } from './ConfirmedBooking';

const BookingForm = () => {
  const { register, handleSubmit, watch, formState: { errors }, trigger } = useForm();
  const [page, setPage] = useState(0);
  const [availableTimes, setAvailableTimes] = useState([]);
  const [apiFunctionsLoaded, setApiFunctionsLoaded] = useState(false);
  const [message, setMessage] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);

  const selectedDate = watch('Date');

  // Función para cargar el script de la API
  const loadAPIScript = () => {
    return new Promise((resolve, reject) => {
      if (document.querySelector('script[src="/api.js"]')) {
        resolve();
        return;
      }

      const script = document.createElement('script');
      script.src = '/api.js';
      script.async = true;
      script.onload = () => resolve();
      script.onerror = () => reject(new Error('Failed to load API script'));
      document.body.appendChild(script);
    });
  };

  const initializeTimes = () => {
    const today = new Date();
    const formattedDate = today.toISOString().split('T')[0];
    updateTimes(formattedDate);
  };

  const updateTimes = (date) => {
    const fetchAPI = window.fetchAPI;
    if (typeof fetchAPI === "function") {
      const times = fetchAPI(new Date(date));
      setAvailableTimes(times);
    }
  };

  useEffect(() => {
    loadAPIScript()
      .then(() => {
        setApiFunctionsLoaded(true);
        initializeTimes();
      })
      .catch((error) => console.error(error));
  }, []);

  useEffect(() => {
    if (selectedDate && apiFunctionsLoaded) {
      updateTimes(selectedDate);
    }
  }, [selectedDate, apiFunctionsLoaded]);

  const onSubmit = (data) => {
    const submitAPI = window.submitAPI;
    if (typeof submitAPI === "function") {
      const success = submitAPI(data);
      if (success) {
        setMessage('Reservation successfully submitted!');
        setIsModalOpen(true);
      } else {
        setMessage('Failed to submit reservation :(');
      }
    }
  };

  const nextPage = async () => {
    const isValid = await trigger();
    if (isValid) {
      setPage((prev) => prev + 1);
    }
  };

  const prevPage = () => setPage((prev) => prev - 1);

  const Page1 = () => (
    <>
      <p>Please provide us with the following information to proceed with your reservation.</p>
      <div className="reservation-step-one">
        <label htmlFor='location'>At which location (*)</label>
        <select {...register('location', {
          required: 'Location is required',
          validate: value => value !== '--' || 'Please select a valid location'
        })}>
          <option value="--">--</option>
          <option value="Viña del Mar">Viña del Mar</option>
          <option value="Santiago">Santiago</option>
        </select>
        {errors.location && <span>{errors.location.message}</span>}

        <label htmlFor='area'>Select area (*)</label>
        <select {...register('area', {
          required: 'Area is required',
          validate: value => value !== '--' || 'Please select a valid area'
        })}>
          <option value="--">--</option>
          <option value="Bar">Bar</option>
          <option value="Table">Table</option>
        </select>
        {errors.area && <span>{errors.area.message}</span>}

        <div className="reservation-step-one_last-info">
          <div>
            <label htmlFor='Date'>Date:</label>
            <input data-testid="input-date" type="date" {...register('Date', { required: 'Date is required' })}
              defaultValue={new Date().toISOString().split('T')[0]}
              min={new Date().toISOString().split('T')[0]}
            />
            {errors.Date && <span>{errors.Date.message}</span>}
          </div>
          <div>
            <label htmlFor='Time'>Available times (*):</label>
            <select data-testid="select-time" {...register('Time', { required: 'Time is required' })}>
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
            {errors.Time && <span>{errors.Time.message}</span>}
          </div>
          <div>
            <label htmlFor='numberOfPeople'>Number of people (*):</label>
            <input type="number" {...register('numberOfPeople', {
              required: 'Number of people is required',
              min: { value: 1, message: 'At least one person is required' }
            })} />
            {errors.numberOfPeople && <span>{errors.numberOfPeople.message}</span>}
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
        <label htmlFor='reason'>Reason for your reservation:</label>
        <select {...register('reason')}>
        <option value="occasional">occasional</option>
          <option value="Birthday">Birthday</option>
          <option value="Engagement">Engagement</option>
          <option value="Anniversary">Anniversary</option>
        </select>
        <label htmlFor='text-area'>Specifications (optional):</label>
        <input id='text-area' className="text-area" placeholder="e.g., food intolerance, a particular table, or any additional comments" {...register('specification')} />
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
        <label htmlFor='name'>Full name (*):</label>
        <input {...register('name', { required: 'Full name is required' })} />
        {errors.name && <span>{errors.name.message}</span>}
        <label htmlFor='phone'>Phone number (*):</label>
        <input {...register('phone', {
          required: 'Phone number is required',
          pattern: {
            value: /^[0-9]*$/,
            message: 'Only numbers are allowed'
          }
        })} />
        {errors.phone && <span>{errors.phone.message}</span>}
        <label htmlFor='email'>Email (*):</label>
        <input type="email" {...register('email', {
          required: 'Email is required',
          pattern: {
            value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
            message: 'Please enter a valid email address'
          }
        })} />
        {errors.email && <span>{errors.email.message}</span>}
      </div>
      <div className="button-box-end">
        <button type="button" onClick={prevPage}>Back</button>
        <button type="submit">Make Reservation</button>
      </div>
    </>
  );

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

  // Limpieza de efectos para evitar fugas
  useEffect(() => {
    return () => {
      setAvailableTimes([]); // Limpia los tiempos disponibles
      setApiFunctionsLoaded(false); // Resetea el estado
      setMessage(""); // Limpia el mensaje
      setIsModalOpen(false); // Cierra el modal
    };
  }, []);

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
