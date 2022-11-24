import { useState } from 'react';

export const useCounter = () => {
  const [count, setCount] = useState(0);
  const increaseCount = () => {
    setCount((prevCount) => prevCount + 1);
  };

  return [count, increaseCount] as const;
};
