import React, { useState, useEffect } from 'react'

let state = {
  firstName: '',  
  lastName: ''
}
let firstNameIsInvalid = true

const setFirstName = s => {
  state.firstName = s
  firstNameIsInvalid = state.firstName.length === 0
}
const setLastName = s => state.lastName = s

export const StepOne = (props) => {
  const [stepVisited, setStepVisited] = useState(0)

  useEffect(() => {
    if(stepVisited === 0) {
      props.signalParent({isValid: state.firstName.length > 0, goto: 0})
    }
  }, [stepVisited])

  const validateFirstName = (val) => {
    setStepVisited(c => c += 1)
    
    let prevFirstName = state.firstName
    setFirstName(val)

    if(prevFirstName.length === 0 && val.length === 1) {
      props.signalParent({isValid: true, goto: 0})
    }
    else if(prevFirstName.length === 1 && val.length == 0) {
      props.signalParent({isValid: false, goto: 0})
    }
  }

  const validateLastName = (val) => {
    setStepVisited(c => c += 1)
    setLastName(val)
  }

  const Required = () =>
    firstNameIsInvalid ? <span style={{fontSize: '1rem', color: 'red'}}>&nbsp;[ Required ]</span> : ''
    
  return (
    <div className='container u-full-width'>
      <div className='row'>
        <div className='six columns'>
          <label>First Name<Required /></label>
          <input
            className='u-full-width rounded'
            placeholder='First Name'
            type='text'
            onChange={e => validateFirstName(e.target.value)}
            value={state.firstName}
            autoFocus
            required
          />        
        </div>
      </div>
      <div className='row'>
        <div className='six columns'>
          <label>Last Name</label>
          <input
            className='u-full-width rounded'
            placeholder='Last Name'
            type='text'
            onChange={e => validateLastName(e.target.value)} 
            value={state.lastName}
          />
        </div>
      </div>
      <div className='row'>
        <div className='six columns'>
          <button className='btn btn-primary w-100 mt-3 rounded'>
            Submit
          </button>
        </div>
      </div> 
    </div>)
};
export default StepOne;
