import { useState } from 'react';
import { DATE_REGEX, FLIGHT_TYPES } from './constants';

export const useFlightBooker = () => {
  const [flightType, setFlightType] = useState(FLIGHT_TYPES.ONE_WAY as string);
  const [firstDate, setFirstDate] = useState('20.12.2012');
  const [secondDate, setSecondDate] = useState('20.12.2012');

  const formatDateString = (dateString: string) => {
    const dateArray = dateString.split('.');
    return new Date(+dateArray[2], +dateArray[1], +dateArray[0]);
  };
  const isValidDate = (dateString: string) => {
    return DATE_REGEX.test(dateString);
  };

  const isValidFlight = (flightType: string, firstDate: string, secondDate: string) => {
    if (flightType === FLIGHT_TYPES.ONE_WAY) return true;
    if (!isValidDate(firstDate) || !isValidDate(secondDate)) return false;

    return formatDateString(secondDate).getTime() - formatDateString(firstDate).getTime() >= 0;
  };

  const onBookFlightHandler = (flightType: string, firstDate: string, secondDate: string) => {
    switch (flightType) {
      case FLIGHT_TYPES.ONE_WAY:
        return alert(`You have booked a ${flightType} flight on ${firstDate}`);
      case FLIGHT_TYPES.RETURN:
        return alert(`You have booked a ${flightType} flight from ${firstDate} to ${secondDate}`);
      default:
        break;
    }
  };

  return [
    flightType,
    firstDate,
    secondDate,
    setFlightType,
    setFirstDate,
    setSecondDate,
    isValidDate,
    isValidFlight,
    onBookFlightHandler,
  ] as const;
};
