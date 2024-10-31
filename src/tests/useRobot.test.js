import { renderHook, act } from '@testing-library/react';
import useRobot from '../hook/useRobot';

describe('useRobot Hook', () => {
  test('executes PLACE command correctly', () => {
    const { result } = renderHook(() => useRobot());

    act(() => {
      result.current.executeCommands(['PLACE 1,2,EAST']);
    });
    expect(result.current.position).toEqual({ x: 1, y: 2, direction: 'EAST' });
  });

  test('executes PLACE and MOVE commands in sequence', () => {
    const { result } = renderHook(() => useRobot());

    act(() => {
      result.current.executeCommands(['PLACE 1,2,NORTH', 'MOVE']);
    });
n
    expect(result.current.position).toEqual({ x: 1, y: 3, direction: 'NORTH' });
  });

  test('executes LEFT command correctly after PLACE', () => {
    const { result } = renderHook(() => useRobot());

    act(() => {
      result.current.executeCommands(['PLACE 1,2,EAST', 'LEFT']);
    });

    expect(result.current.position).toEqual({ x: 1, y: 2, direction: 'NORTH' });
  });

  test('generates correct report after sequence of commands', () => {
    const { result } = renderHook(() => useRobot());

    act(() => {
      result.current.executeCommands(['PLACE 0,0,NORTH', 'MOVE', 'REPORT']);
    });

    expect(result.current.report).toBe('Output: 0,1,NORTH');
  });

  test('ignores MOVE command if PLACE has not been called', () => {
    const { result } = renderHook(() => useRobot());

    act(() => {
      result.current.executeCommands(['MOVE']);
    });

    expect(result.current.position).toBe(null);
  });
});
