
import React, { useState } from 'react';

const CommandInput = ({ onCommand }) => {
  const [command, setCommand] = useState('');

  const handleInputChange = (e) => {
    setCommand(e.target.value);
  };

  const handleCommandSubmit = (e) => {
    e.preventDefault();
    const commandList = command.split('\n').map(cmd => cmd.trim()).filter(cmd => cmd !== '');
    onCommand(commandList);
    setCommand(''); 
  };

  return (
    <form onSubmit={handleCommandSubmit}>
      <textarea
        rows="5"

        value={command}
        onChange={handleInputChange}
        placeholder="Enter commands, one per line"
      />
      <button type="submit">Execute</button>
    </form>
  );
};

export default CommandInput;
