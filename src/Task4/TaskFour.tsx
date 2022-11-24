import { STEP } from './constants';
import { useTimer } from './TaskFourController';

const TaskFour = () => {
  const [duration, setDuration, currentTime, setCurrentTime] = useTimer();

  return (
    <div className='container'>
      <h2>Task Four: Timer</h2>
      <div className='card'>
        <div className='row'>
          <div>Elapsed time:</div>
          <meter
            min={0}
            max={100}
            value={duration !== 0 ? (currentTime / duration) * 100 : 100}
          ></meter>
        </div>
        <div>{currentTime}</div>
        <div className='row'>
          <div>Duration</div>
          <input
            type='range'
            value={duration}
            min={0}
            max={30}
            step={STEP}
            onChange={(event) => setDuration(+event.target.value)}
          />
        </div>
        <button onClick={() => setCurrentTime(0)}>Reset</button>
      </div>
    </div>
  );
};

export default TaskFour;
