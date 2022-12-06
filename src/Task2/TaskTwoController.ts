import { useState, ChangeEvent } from 'react';

export const useConvertor = () => {
  const [celsius, setCelsius] = useState<number | null>();
  const [fahrenheit, setFahrenheit] = useState<number | null>();

  const onChangeHandler = (event: ChangeEvent<HTMLInputElement>) => {
    const targetElement = event.target;
    const targetElementValue = +targetElement.value;
    if (targetElement.value === '') {
      setCelsius(null);
      setFahrenheit(null);
      return;
    }
    if (targetElement.id === 'celsius') {
      setCelsius(targetElementValue);
      setFahrenheit(targetElementValue * (9 / 5) + 32);
    }
    if (targetElement.id === 'fahrenheit') {
      setFahrenheit(targetElementValue);
      setCelsius((targetElementValue - 32) * (5 / 9));
    }
  };

  return [celsius, fahrenheit, onChangeHandler] as const;
};
