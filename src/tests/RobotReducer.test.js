import { RobotReducer, initialState } from '../reducer/RobotReducer';

describe('RobotReducer', () => {
  it('should handle PLACE command within bounds', () => {
    const action = { type: 'PLACE', payload: { x: 1, y: 2, direction: 'EAST' } };
    const newState = RobotReducer(initialState, action);
    expect(newState.position).toEqual({ x: 1, y: 2, direction: 'EAST' });
  });

  it('should ignore PLACE command out of bounds', () => {
    const action = { type: 'PLACE', payload: { x: 6, y: 7, direction: 'NORTH' } };
    const newState = RobotReducer(initialState, action);
    expect(newState.position).toBe(null); 
  });

  it('should handle MOVE command based on direction', () => {
    const state = { ...initialState, position: { x: 1, y: 1, direction: 'NORTH' } };
    const newState = RobotReducer(state, { type: 'MOVE' });
    expect(newState.position).toEqual({ x: 1, y: 2, direction: 'NORTH' });
  });

  it('should handle LEFT rotation', () => {
    const state = { ...initialState, position: { x: 1, y: 1, direction: 'NORTH' } };
    const newState = RobotReducer(state, { type: 'LEFT' });
    expect(newState.position.direction).toBe('WEST');
  });

  it('should handle RIGHT rotation', () => {
    const state = { ...initialState, position: { x: 1, y: 1, direction: 'NORTH' } };
    const newState = RobotReducer(state, { type: 'RIGHT' });
    expect(newState.position.direction).toBe('EAST');
  });

  it('should generate a report correctly', () => {
    const state = { ...initialState, position: { x: 3, y: 3, direction: 'SOUTH' } };
    const newState = RobotReducer(state, { type: 'REPORT' });
    expect(newState.report).toBe('Output: 3,3,SOUTH');
  });
});
