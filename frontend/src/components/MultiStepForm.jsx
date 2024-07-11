import React, { useState } from 'react';
import MultiStep from 'react-multistep';
import StepOne from './stepOne.jsx';
import StepTwo from './stepTwo.jsx';
import StepThree from './stepThree.jsx';
// import StepFour from './stepFour.js';

const MultiStepForm = () => {


  return (
    <div className='container'>
    {/* <MultiStep > */}
    <MultiStep >
      <StepOne title='Step 1'/>
      <StepTwo title='Step 2'/>
      <StepThree title='Step 3'/>
      {/* <StepFour title='Step 4'/> */}
    </MultiStep>
  </div>
  );
};

export default MultiStepForm;