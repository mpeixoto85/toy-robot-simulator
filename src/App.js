import React from 'react';
import CommandInput from './components/CommandInput';
import TableTop from './components/TableTop';
import ReportDisplay from './components/ReportDisplay';
import useRobot from './hook/useRobot';
import './assets/styles.css';

const App = () => {
  const { position, report,error, executeCommands } = useRobot();
  return (
    <div>
      <h1>Toy Robot Simulator</h1>
      <CommandInput onCommand={executeCommands} />

        <TableTop position={!error ? position : ''} />

     <ReportDisplay report={error || report} />
    </div>
  );
};

export default App;