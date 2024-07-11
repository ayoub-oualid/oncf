import React from 'react';

const EngineDetails = ({ nextStep, handleChange, engineOptions, engine }) => {
  const continueToNextStep = e => {
    e.preventDefault();
    nextStep();
  };

  return (
    <div>
      <h2>Select Engine</h2>
      <select value={engine} onChange={handleChange('engine')}>
        <option value="">--Select an engine--</option>
        {engineOptions.map(option => (
          <option key={option.id} value={option.engine}>
            {option.engine}
          </option>
        ))}
      </select>
      <h2>Enter Description</h2>
      <input type="text" onChange={handleChange('description')} />
      <button onClick={continueToNextStep}>Next</button>
    </div>
  );
};

export default EngineDetails;