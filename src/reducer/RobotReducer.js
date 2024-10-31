
import { DIRECTIONS, TABLE_SIZE } from '../utils/constants';

const initialState = {
  position: null,
  report: '',
  error: '',
};

const RobotReducer = (state, action) => {
  switch (action.type) {
    case 'PLACE': {
      const { x, y, direction } = action.payload;
      if (x < 0 || x >= TABLE_SIZE || y < 0 || y >= TABLE_SIZE) {
        return { ...state, error: `Error: PLACE command out of bounds (x: ${x}, y: ${y})` };
      }
      if (!DIRECTIONS.includes(direction)) {
        return { ...state, error: `Error: Invalid direction "${direction}"` };
      }
      return { ...state, position: { x, y, direction }, error: '' };
    }
    case 'MOVE': {
      if (!state.position)
        return { ...state, error: 'Error: MOVE command issued before PLACE' };
      
      const { x, y, direction } = state.position;
      let newX = x;
      let newY = y;
      switch (direction) {
        case 'NORTH':
          if (y < TABLE_SIZE - 1) newY += 1;
          else return { ...state, error: 'Error: MOVE would go out of bounds' };
          break;
        case 'SOUTH':
          if (y > 0) newY -= 1;
          else return { ...state, error: 'Error: MOVE would go out of bounds' };
          break;
        case 'EAST':
          if (x < TABLE_SIZE - 1) newX += 1;
          else return { ...state, error: 'Error: MOVE would go out of bounds' };
          break;
        case 'WEST':
          if (x > 0) newX -= 1;
          else return { ...state, error: 'Error: MOVE would go out of bounds' };
          break;
        default:
          break;
      }
      return { ...state, position: { x: newX, y: newY, direction }, error: '' };
    }
    case 'LEFT': {
      if (!state.position) 
        return { ...state, error: 'Error: LEFT command issued before PLACE' };
      const { direction } = state.position;
      const newDirection = DIRECTIONS[(DIRECTIONS.indexOf(direction) + 3) % 4];
      return { ...state, position: { ...state.position, direction: newDirection }, error: '' };
    }
    case 'RIGHT': {
      if (!state.position) 
        return { ...state, error: 'Error: RIGHT command issued before PLACE' };
      const { direction } = state.position;
      const newDirection = DIRECTIONS[(DIRECTIONS.indexOf(direction) + 1) % 4];
      return { ...state, position: { ...state.position, direction: newDirection }, error: '' };
    }
    case 'REPORT': {
      if (!state.position) 
        return { ...state, error: 'Error: REPORT command issued before PLACE' };
      const { x, y, direction } = state.position;
      return { ...state, report: `Output: ${x},${y},${direction}`, error: '' };
    }
    default:
      return state;
  }
};

export { initialState, RobotReducer };