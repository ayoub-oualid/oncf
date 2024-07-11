import React, { Component } from 'react';
import EngineDetails from './EngineDetails';
import AnomalyDetails from './AnomalyDetails';
import Summary from './Summary';

const engineData = [
  { id: 1, engineName: 'Diesel' },
  { id: 2, engineName: 'Electric' },
  { id: 3, engineName: 'Steam' },
];

class EngineForm extends Component {
  state = {
    step: 1,
    engine: '',
    description: '',
    anomalies: '',
  };

  nextStep = () => {
    const { step } = this.state;
    this.setState({ step: step + 1 });
  };

  prevStep = () => {
    const { step } = this.state;
    this.setState({ step: step - 1 });
  };

  handleChange = input => e => {
    this.setState({ [input]: e.target.value });
  };

  submitData = e => {
    e.preventDefault();
    alert('Data sent');
  };

  render() {
    const { step, engine, description, anomalies } = this.state;
    const engineOptions = engineData.map(el => ({ engine: el.engineName, id: el.id }));

    switch (step) {
      case 1:
        return (
          <EngineDetails
            nextStep={this.nextStep}
            handleChange={this.handleChange}
            engineOptions={engineOptions}
            engine={engine}
          />
        );
        case 2:
            return (
              <AnomalyDetails
                nextStep={this.nextStep}
                prevStep={this.prevStep}
                handleChange={this.handleChange}
                anomalies={anomalies}
              />
            );
          case 3:
            return (
              <Summary
                prevStep={this.prevStep}
                engine={engine}
                description={description}
                anomalies={anomalies}
                submitData={this.submitData}
              />
            );
      default:
        return null;
    }
  }
}

export default EngineForm;