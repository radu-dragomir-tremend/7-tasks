import { FLIGHT_TYPES } from './constants';
import { useFlightBooker } from './TaskThreeController';

const TaskThree = () => {
  const [
    flightType,
    firstDate,
    secondDate,
    setFlightType,
    setFirstDate,
    setSecondDate,
    isValidDate,
    isValidFlight,
    onBookFlightHandler,
  ] = useFlightBooker();
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
          <option value={FLIGHT_TYPES.ONE_WAY}>one-way flight</option>
          <option value={FLIGHT_TYPES.RETURN}>return flight</option>
        </select>
        <input
          className={isValidDate(firstDate) ? '' : 'invalid-date'}
          value={firstDate}
          onChange={(event) => setFirstDate(event.target.value)}
        />
        <input
          className={isValidDate(secondDate) ? '' : 'invalid-date'}
          value={secondDate}
          disabled={flightType === FLIGHT_TYPES.ONE_WAY}
          onChange={(event) => setSecondDate(event.target.value)}
        />
        <button disabled={!isValidFlight(flightType, firstDate, secondDate)}>Book</button>
      </form>
    </div>
  );
};

export default TaskThree;
