import { useCounter } from './TaskOneController';

const TaskOne = () => {
  const [count, increaseCount] = useCounter();

  return (
    <div className='container'>
      <h2>Task One: Counter</h2>
      <div>
        <input readOnly value={count.toString()} />
        <button onClick={increaseCount}>Count!</button>
      </div>
    </div>
  );
};

export default TaskOne;
