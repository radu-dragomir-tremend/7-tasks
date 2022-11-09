import React, { useRef } from 'react';

const TaskOne = () => {
  const inputRef = useRef();
  const increaseCount = () => {
    inputRef.current.value++;
  };

  return (
    <div className='container'>
      <h2>Task One: Counter</h2>
      <div>
        <input readOnly ref={inputRef} defaultValue={0} />
        <button onClick={increaseCount}>Count!</button>
      </div>
    </div>
  );
};

export default TaskOne;
