export const parsePlaceCommand = (command) => {
    const parts = command.split(' ');
    if (parts[0] !== 'PLACE' || parts.length !== 2) return null;
    const [x, y, direction] = parts[1].split(',');
    return { x: parseInt(x, 10), y: parseInt(y, 10), direction };
  };