import React from 'react';

const Robot = ({ direction }) => (
  <div className={`robot robot-${direction.toLowerCase()}`} data-testid="robot">{direction[0]}</div>
);

export default Robot;