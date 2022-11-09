import React, { useState } from 'react';

const DATE_REGEX = /^\s*(3[01]|[12][0-9]|0?[1-9])\.(1[012]|0?[1-9])\.((?:19|20)\d{2})\s*$/;

const TaskThree = () => {
  const [flightType, setFlightType] = useState('one-way');
  const [firstDate, setFirstDate] = useState('20.12.2012');
  const [secondDate, setSecondDate] = useState('20.12.2012');

  const isValidDate = (dateString) => {
    return DATE_REGEX.test(dateString);
  };

  const formatDateString = (dateString) => {
    const dateArray = dateString.split('.');
    return new Date(dateArray[2], dateArray[1], dateArray[0]);
  };

  const isValidFlight = (flightType, firstDate, secondDate) => {
    if (flightType === 'one-way') return true;
    if (!isValidDate(firstDate) || !isValidDate(secondDate)) return false;

    return formatDateString(secondDate) - formatDateString(firstDate) >= 0;
  };

  const onBookFlightHandler = (flightType, firstDate, secondDate) => {
    switch (flightType) {
      case 'one-way':
        return alert(`You have booked a ${flightType} flight on ${firstDate}`);
      case 'return':
        return alert(`You have booked a ${flightType} flight from ${firstDate} to ${secondDate}`);
      default:
        break;
    }
  };

  return (
    <div className='container'>
      <h2>Task Three: Flight Booker</h2>
      <form
        className='booker'
        onSubmit={(event) => {
          event.preventDefault();
          onBookFlightHandler(flightType, firstDate, secondDate);
        }}
      >
        <select onChange={(event) => setFlightType(event.target.value)}>
          <option value='one-way'>one-way flight</option>
          <option value='return'>return flight</option>
        </select>
        <input
          className={isValidDate(firstDate) ? '' : 'invalid-date'}
          value={firstDate}
          onChange={(event) => setFirstDate(event.target.value)}
        />
        <input
          className={isValidDate(secondDate) ? '' : 'invalid-date'}
          value={secondDate}
          disabled={flightType === 'one-way'}
          onChange={(event) => setSecondDate(event.target.value)}
        />
        <button disabled={!isValidFlight(flightType, firstDate, secondDate)}>Book</button>
      </form>
    </div>
  );
};

export default TaskThree;
