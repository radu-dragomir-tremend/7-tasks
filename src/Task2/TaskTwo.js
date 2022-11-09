import React, { useRef } from 'react';

const TaskTwo = () => {
  const celsiusRef = useRef();
  const fahrenheitRef = useRef();

  const onChangeHandler = (event) => {
    if (event.target.value === '') {
      fahrenheitRef.current.value = '';
      celsiusRef.current.value = '';
      return;
    }
    if (event.target.id === 'celsius') {
      fahrenheitRef.current.value = celsiusRef.current.value * (9 / 5) + 32;
    }
    if (event.target.id === 'fahrenheit') {
      celsiusRef.current.value = (fahrenheitRef.current.value - 32) * (5 / 9);
    }
  };

  return (
    <div className='container'>
      <h2>Task Two: Temperature Converter</h2>
      <div>
        <input id='celsius' ref={celsiusRef} type='number' onChange={onChangeHandler} />
        <label htmlFor='celsius'>Celsius=</label>
        <input id='fahrenheit' ref={fahrenheitRef} type='number' onChange={onChangeHandler} />
        <label htmlFor='fahrenheit'>Fahrenheit</label>
      </div>
    </div>
  );
};

export default TaskTwo;
