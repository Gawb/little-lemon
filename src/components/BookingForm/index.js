import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import './index.css';

const BookingForm = () => {
    const { register, handleSubmit } = useForm();
  const [page, setPage] = useState(0);

  const nextPage = () => setPage(prev => prev + 1);
  const prevPage = () => setPage(prev => prev - 1);

  const onSubmit = (data) => {
    console.log(data);
  };


  const Page1 = () => (
    <>
    <p>Please provide us with the following information to proceed with your reservation.</p>
    <div className="reservation-step-one">
      <label>At which location</label>
      <select {...register('Select location')}>
        <option value="" >--</option>
        <option value="Viña del Mar">Viña del Mar</option>
        <option value="Santiago">Santiago</option>
      </select>
      <label>Select area</label>
      <select {...register('Select area')}>
        <option value="" >--</option>
        <option value="Table">Table</option>
        <option value="Bar">Bar</option>
      </select>
      <div className="reservation-step-one_last-info">
         <div>
            <label>Date:</label>
            <input type="datetime-local" {...register('Date')} />
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
            <option value="Engagment">Engagment</option>
            <option value="Anniversary">Anniversary</option>
        </select>
        <label >Specifications (optional):</label>
        <input className="text-area" placeholder='e.g., food intolerance, a particular table, or any additional comments' {...register('specification')} />
      </div>
      <div className='button-box'>
        <button type="button" onClick={prevPage}>Back</button>
        <button type="button" onClick={nextPage}>Next</button>
      </div>
    </>
  );

  const Page3 = () => (
    <>
      <p>Fill in these last fields to complete your reservation.</p>  
      <div className='reservation-step-one'>
        <label>Full name:</label>
        <input {...register('name')} />
        <label>Phone number:</label>
        <input {...register('phone')} />
        <label>Email:</label>
        <input type="email" {...register('email')} />
      </div>
      <div className='button-box-end'>
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
    <form className="reservation-section" id='reservation' onSubmit={handleSubmit(onSubmit)}>
      {renderPage()}
    </form>
  );
}

export { BookingForm };

