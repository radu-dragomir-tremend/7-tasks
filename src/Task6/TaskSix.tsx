import { useCircleDrawer } from './TaskSixController';
import { getCircleStyles } from './utils';

const TaskSix = () => {
  const [
    circles,
    createCircle,
    onChangeDiameter,
    onMouseMoveHandler,
    undo,
    redo,
    circleClicked,
    onCircleClick,
    menuClicked,
    onMenuClick,
    onClickOutside,
  ] = useCircleDrawer();

  return (
    <div className='container'>
      <h2>Task Six: Circle Drawer</h2>

      <div className='card card-xl' onClick={onClickOutside}>
        <div className='row'>
          <button onClick={undo}>Undo</button>
          <button onClick={redo}>Redo</button>
        </div>

        <div className='canvas' onClick={createCircle} onMouseMove={onMouseMoveHandler}>
          {circles.map((circle, index) => (
            <div
              key={index}
              className='circle'
              style={getCircleStyles(circle)}
              //set event listener on parent and not on every child
              onContextMenu={(e) => {
                onCircleClick(e, circle);
              }}
            ></div>
          ))}
          {circleClicked && (
            <div
              className='menu'
              style={{ left: circleClicked.centerX, top: circleClicked.centerY }}
              onClick={(e) => onMenuClick(e, circleClicked)}
            >
              Adjust diameter
              {menuClicked && (
                <input
                  type='range'
                  className='range'
                  defaultValue={circleClicked.diameter}
                  onChange={(e) => onChangeDiameter(circleClicked, +e.target.value)}
                />
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default TaskSix;
