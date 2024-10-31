import React from 'react';
import Robot from './Robot';

const TableTop = ({position}) => {
  return (
    <div className="tabletop">
      {[...Array(5)].map((_, y) => (
        <div key={y} className="row">
          {[...Array(5)].map((_, x) => (
            <div key={x} className="cell">
              {position?.x === x && position?.y === 4 - y && <Robot direction={position.direction} />}
            </div>
          ))}
        </div>
      ))}
    </div>
  );
};

export default TableTop;