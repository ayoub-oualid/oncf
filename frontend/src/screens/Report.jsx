
import React, { useState } from 'react';
import { Button,Table } from 'react-bootstrap';

const ControleForm = () => {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    controlDate: '',
    trainNumber: '',
    periodicity: '',
    option: '',
    startDate: '',
    endDate: '',
    newDocumentName: '',
    documents: [],
    observations: '',
    procedureDeviations: [],
    pposDeviations: [],
    documentDeviations: [],
    globalComment: '',
    plannedActions: [],
    documentationRating: '',
    procedureRating: '',
    pposRating: '',
    anomalies: [],
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };
  const handleAddDocument = () => {
    if (formData.newDocumentName.trim() !== '') {
      const newDocument = {
        name: formData.newDocumentName.trim(),
        decision: 'acceptable',
        ecart: false,
        redresse: false,
        observations: formData.newDocumentObservations.trim(),
      };
  
      setFormData({
        ...formData,
        documents: [...formData.documents, newDocument],
        newDocumentName: '',
        newDocumentObservations: '',
      });
    }
  };
  
  const handleDocumentDecisionChange = (index, decision) => {
    const updatedDocuments = [...formData.documents];
    updatedDocuments[index].decision = decision;
  
    setFormData({
      ...formData,
      documents: updatedDocuments,
    });
  };
  
  const handleDocumentEcartChange = (index, ecart) => {
    const updatedDocuments = [...formData.documents];
    updatedDocuments[index].ecart = ecart;
  
    setFormData({
      ...formData,
      documents: updatedDocuments,
    });
  };
  
  const handleDocumentRedresseChange = (index, redresse) => {
    const updatedDocuments = [...formData.documents];
    updatedDocuments[index].redresse = redresse;
  
    setFormData({
      ...formData,
      documents: updatedDocuments,
    });
  };
  
  const [modifyingDocument, setModifyingDocument] = useState(null);

const handleModifyDocument = (index) => {
  setModifyingDocument(formData.documents[index]);
};

// Render the modify document modal or form
if (modifyingDocument) {
  return (
    <div>
      <h3>Modify Document</h3>
      <input
        type="text"
        placeholder="Enter document name"
        value={modifyingDocument.name}
        onChange={(e) =>
          setModifyingDocument({
            ...modifyingDocument,
            name: e.target.value,
          })
        }
      />
      <textarea
        placeholder="Enter observations"
        value={modifyingDocument.observations}
        onChange={(e) =>
          setModifyingDocument({
            ...modifyingDocument,
            observations: e.target.value,
          })
        }
      />
      {/* Add other fields for modification */}
      <Button onClick={() => handleSaveModifiedDocument(modifyingDocument)}>
        Save
      </Button>
      <Button onClick={() => setModifyingDocument(null)}>Cancel</Button>
    </div>
  );
}
  
  const handleDeleteDocument = (index) => {
    const updatedDocuments = [...formData.documents];
    updatedDocuments.splice(index, 1);
  
    setFormData({
      ...formData,
      documents: updatedDocuments,
    });
  };
  

  const handleAddAnomaly = () => {
    setFormData({
      ...formData,
      anomalies: [...formData.anomalies, { aspect: '', rating: '' }],
    });
  };

  const handleAnomalyChange = (index, field, value) => {
    const updatedAnomalies = [...formData.anomalies];
    updatedAnomalies[index][field] = value;
    setFormData({
      ...formData,
      anomalies: updatedAnomalies,
    });
  };

  const nextStep = () => {
    // Perform validation or data processing for the current step
    // ...

    setStep(step + 1);
  };

  const prevStep = () => {
    setStep(step - 1);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Perform final data processing and submission
    // ...
  };

  const renderStep = () => {
    switch (step) {
        case 1:
            return (
              <div className='d-inline-flex flex-column justify-content-around mx-auto'>
                <h2>Step 1: Basic Information</h2>
                <div className='mt-3'>
                  <label htmlFor="controlDate" className="me-3">Date de contrôle:</label>
                  <input
                    type="date"
                    id="controlDate"
                    name="controlDate"
                    value={formData.controlDate}
                    onChange={handleChange}
                  />
                </div>
                <div className='mt-3'>
                  <label htmlFor="trainNumber" className="me-3">N° train:</label>
                  <input
                    type="text"
                    id="trainNumber"
                    name="trainNumber"
                    placeholder="Train Number"
                    value={formData.trainNumber}
                    onChange={handleChange}
                  />
                </div>

                <div className='mt-3'>
                  <label>Peiodicité:</label>
                  <div className='mt-3'>
                    <label>
                      <input
                        type="radio"
                        name="option"
                        value="EV"
                        checked={formData.option === 'EV'}
                        onChange={handleChange}
                      />
                      EV
                    </label>
                    <label>
                      <input
                        type="radio"
                        name="option"
                        value="ACC"
                        checked={formData.option === 'ACC'}
                        onChange={handleChange}
                      />
                      ACC
                    </label>
                    <label>
                      <input
                        type="radio"
                        name="option"
                        value="TR"
                        checked={formData.option === 'TR'}
                        onChange={handleChange}
                      />
                      TR
                    </label>
                    <label>
                      <input
                        type="radio"
                        name="option"
                        value="PS/FS"
                        checked={formData.option === 'PS/FS'}
                        onChange={handleChange}
                      />
                      PS/FS
                    </label>
                  </div>
                </div>
                <div className='mt-3'>
                  <label htmlFor="startDate" className="me-3">Start Date: </label>
                  <input
                    type="date"
                    id="startDate"
                    name="startDate"
                    value={formData.startDate}
                    onChange={handleChange}
                  />
                  <label htmlFor="endDate" className="me-3 ms-3">End Date: </label>
                  <input
                    type="date"
                    id="endDate"
                    name="endDate"
                    value={formData.endDate}
                    onChange={handleChange}
                  />
                </div>
                <Button 
                onClick={nextStep}
                variant='primary'
                className='mt-3'><div style={{color:'white'}}>Next</div></Button>

              </div>
            );
            case 2:
  return (
    <div>
      <h2>Step 2: Documentation</h2>
      <div>
        <h3>Add Document</h3>
        <input
          type="text"
          placeholder="Enter document name"
          value={formData.newDocumentName}
          onChange={(e) =>
            setFormData({
              ...formData,
              newDocumentName: e.target.value,
            })
          }
        />
        <input
        type='text'
          placeholder="Enter observations"
          value={formData.newDocumentObservations}
          onChange={(e) =>
            setFormData({
              ...formData,
              newDocumentObservations: e.target.value,
            })
          }
        />
        <Button 
        onClick={handleAddDocument}
        variant='outline-secondary'
        >Add Document</Button>
      </div>
      <Table striped bordered hover size="sm">
        <thead>
          <tr>
            <th>Document</th>
            <th>Decision</th>
            <th>Écart</th>
            <th>Redressé</th>
            <th>Observations</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {formData.documents.map((document, index) => (
            <tr key={index}>
              <td>{document.name}</td>
              <td>
                <select
                  value={document.decision}
                  onChange={(e) =>
                    handleDocumentDecisionChange(index, e.target.value)
                  }
                >
                  <option value="acceptable">Acceptable</option>
                  <option value="inProcess">In Process</option>
                </select>
              </td>
              <td>
                <input
                  type="checkbox"
                  checked={document.ecart}
                  onChange={(e) =>
                    handleDocumentEcartChange(index, e.target.checked)
                  }
                />
              </td>
              <td>
                <input
                  type="checkbox"
                  checked={document.redresse}
                  onChange={(e) =>
                    handleDocumentRedresseChange(index, e.target.checked)
                  }
                />
              </td>
              <td>{document.observations}</td>
              <td>
                <Button onClick={() => handleModifyDocument(index)}>
                  Modify
                </Button>
                <Button onClick={() => handleDeleteDocument(index)}>
                  Delete
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
      
      <Button 
      onClick={prevStep}
      variant='secondary'
      >Previous</Button>
      <Button onClick={nextStep}>Next</Button>
    </div>
  );
      case 3:
        return (
          <div>
            <h2>Step 3: Scoring</h2>
            <h3>Documentation Rating</h3>
            <select
              name="documentationRating"
              value={formData.documentationRating}
              onChange={handleChange}
            >
              <option value="">Select Rating</option>
              <option value="S">Satisfactory</option>
              <option value="M">Moderate</option>
              <option value="I">Insufficient</option>
              <option value="A">To Be Done</option>
            </select>

            <h3>Procedure Rating</h3>
            <select
              name="procedureRating"
              value={formData.procedureRating}
              onChange={handleChange}
            >
              <option value="">Select Rating</option>
              <option value="S">Satisfactory</option>
              <option value="M">Moderate</option>
              <option value="I">Insufficient</option>
              <option value="A">To Be Done</option>
            </select>

            <h3>PPOS Rating</h3>
            <select
              name="pposRating"
              value={formData.pposRating}
              onChange={handleChange}
            >
              <option value="">Select Rating</option>
              <option value="S">Satisfactory</option>
              <option value="M">Moderate</option>
              <option value="I">Insufficient</option>
              <option value="A">To Be Done</option>
            </select>

            <Button onClick={prevStep}>Previous</Button>
            <Button onClick={nextStep}>Next</Button>
          </div>
        );
        case 4:
            return (
              <div>
                <h2>Step 4: Actions/Recommendations</h2>
                <h3>Anomalies</h3>
                {formData.anomalies.map((anomaly, index) => (
                  <div key={index}>
                    <h4>Anomaly {index + 1}</h4>
                    <select
                      name={`anomaly_${index}_aspect`}
                      value={anomaly.aspect}
                      onChange={(e) => handleAnomalyChange(index, 'aspect', e.target.value)}
                    >
                      <option value="">Select Aspect</option>
                      <option value="engines">Engines</option>
                      <option value="hauled_materials">Hauled Materials</option>
                      <option value="driving_route">Driving Route</option>
                      <option value="production_site">Production Site</option>
                    </select>
                    <select
                      name={`anomaly_${index}_rating`}
                      value={anomaly.rating}
                      onChange={(e) => handleAnomalyChange(index, 'rating', e.target.value)}
                    >
                      <option value="">Select Rating</option>
                      <option value="S">Satisfactory</option>
                      <option value="M">Moderate</option>
                      <option value="I">Insufficient</option>
                      <option value="A">To Be Done</option>
                    </select>
                  </div>
                ))}
                <Button onClick={handleAddAnomaly}>Add Anomaly</Button>
          
                <Button onClick={prevStep}>Previous</Button>
                <Button onClick={handleSubmit}>Submit</Button>
              </div>
            );
          default:
            return null;
          }
          };
          
          return <div>{renderStep()}</div>;
          };
          
          export default ControleForm;