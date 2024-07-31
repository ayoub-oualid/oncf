import React, { useState, useEffect } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';

function EventModal({ show, handleClose, event, handleSave, handleDelete, userId, selectedDate, collabs }) {
  const [selectedCollabId, setSelectedCollabId] = useState('');
  const [status, setStatus] = useState('scheduled');
  const [notes, setNotes] = useState('');

  useEffect(() => {
    if (event) {
      setSelectedCollabId(event.extendedProps.collabId);
      setStatus(event.extendedProps.status);
      setNotes(event.extendedProps.notes);
    } else {
      setSelectedCollabId('');
      setStatus('scheduled');
      setNotes('');
    }
  }, [event]);

  const onSave = () => {
    // Ensure the date is set to noon UTC to avoid timezone issues
    const adjustedDate = new Date(selectedDate);
    adjustedDate.setDate(adjustedDate.getDate() + 1);
    adjustedDate.setUTCHours(12, 0, 0, 0);
    
    handleSave({ 
      userId, 
      collabId: selectedCollabId, 
      date: adjustedDate.toISOString(), 
      status, 
      notes 
    });
  };

  const formatDate = (date) => {
    if (!date) return '';
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return date.toLocaleDateString(undefined, options);
  };

  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>{event ? 'Edit Event' : 'Add Event'}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Form.Group>
            <Form.Label>Collaborator</Form.Label>
            <Form.Control 
              as="select" 
              value={selectedCollabId} 
              onChange={(e) => setSelectedCollabId(e.target.value)}
            >
              <option value="">Select a collaborator</option>
              {Object.values(collabs).map(collab => (
                <option key={collab._id} value={collab._id}>
                  {`${collab.prenom} ${collab.nom}`}
                </option>
              ))}
            </Form.Control>
          </Form.Group>
          <Form.Group>
            <Form.Label>Date</Form.Label>
            <Form.Control 
              type="text" 
              value={formatDate(selectedDate)} 
              readOnly 
            />
          </Form.Group>
          <Form.Group>
            <Form.Label>Status</Form.Label>
            <Form.Control 
              as="select" 
              value={status} 
              onChange={(e) => setStatus(e.target.value)}
            >
              <option value="scheduled">Scheduled</option>
              <option value="completed">Completed</option>
              <option value="failed">Failed</option>
            </Form.Control>
          </Form.Group>
          <Form.Group>
            <Form.Label>Notes</Form.Label>
            <Form.Control 
              as="textarea" 
              rows={3} 
              value={notes} 
              onChange={(e) => setNotes(e.target.value)} 
            />
          </Form.Group>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        {event && <Button variant="danger" onClick={handleDelete}>Delete</Button>}
        <Button variant="secondary" onClick={handleClose}>Close</Button>
        <Button variant="primary" onClick={onSave}>Save Changes</Button>
      </Modal.Footer>
    </Modal>
  );
}

export default EventModal;