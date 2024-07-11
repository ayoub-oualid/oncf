import React from 'react';

const Summary = ({ prevStep, engine, description, anomalies, submitData }) => {
  const goBackToPrevStep = e => {
    e.preventDefault();
    prevStep();
  };

  const handleSubmit = e => {
    e.preventDefault();
    submitData();
  };

  return (
    <div>
      <h2>Summary</h2>
      <p><strong>Engine:</strong> {engine}</p>
      <p><strong>Description:</strong> {description}</p>
      <p><strong>Anomalies:</strong> {anomalies}</p>
      <button onClick={goBackToPrevStep}>Back</button>
      <button onClick={handleSubmit}>Submit</button>
    </div>
  );
};

export default Summary;