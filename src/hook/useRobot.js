import { useReducer } from 'react';
import { RobotReducer, initialState } from '../reducer/RobotReducer';

const useRobot = () => {
  const [state, dispatch] = useReducer(RobotReducer, initialState);

  const place = (x, y, direction) => dispatch({ type: 'PLACE', payload: { x, y, direction } });
  const move = () => dispatch({ type: 'MOVE' });
  const left = () => dispatch({ type: 'LEFT' });
  const right = () => dispatch({ type: 'RIGHT' });
  const report = () => dispatch({ type: 'REPORT' });

  const executeCommands = (commands) => {
    commands.forEach(command => {
      const [action, params] = command.split(' ');
      switch (action) {
        case 'PLACE':
          const [x, y, direction] = (params || '').split(',');
          if (x && y && direction) {
            place(parseInt(x, 10), parseInt(y, 10), direction);
          } else {
            dispatch({ type: 'ERROR', payload: 'Error: Invalid PLACE command format' });
          }
          break;
        case 'MOVE':
          move();
          break;
        case 'LEFT':
          left();
          break;
        case 'RIGHT':
          right();
          break;
        case 'REPORT':
          report();
          break;
          default:
            dispatch({ type: 'ERROR', payload: `Error: Unknown command "${command}"` });
      }
    });
  };

  return { position: state.position, report: state.report, error: state.error, executeCommands };
};

export default useRobot;
