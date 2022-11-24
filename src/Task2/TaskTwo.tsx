import { useConvertor } from './TaskTwoController';

const TaskTwo = () => {
  const [celsius, fahrenheit, onChangeHandler] = useConvertor();
  return (
    <div className='container'>
      <h2>Task Two: Temperature Converter</h2>
      <div>
        <input id='celsius' type='number' value={celsius ?? ''} onChange={onChangeHandler} />
        <label htmlFor='celsius'>Celsius=</label>
        <input id='fahrenheit' type='number' value={fahrenheit ?? ''} onChange={onChangeHandler} />
        <label htmlFor='fahrenheit'>Fahrenheit</label>
      </div>
    </div>
  );
};

export default TaskTwo;
