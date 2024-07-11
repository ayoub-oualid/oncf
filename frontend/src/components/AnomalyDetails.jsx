import React from 'react';

const AnomalyDetails = ({ nextStep, prevStep, handleChange, anomalies }) => {
  const continueToNextStep = e => {
    e.preventDefault();
    nextStep();
  };

  const goBackToPrevStep = e => {
    e.preventDefault();
    prevStep();
  };

  return (
    <div>
      <h2>Add Anomalies</h2>
      <textarea value={anomalies} onChange={handleChange('anomalies')} />
      <button onClick={goBackToPrevStep}>Back</button>
      <button onClick={continueToNextStep}>Next</button>
    </div>
  );
};

export default AnomalyDetails;