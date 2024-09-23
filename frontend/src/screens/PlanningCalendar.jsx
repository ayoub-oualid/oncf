import React, { useState, useEffect } from 'react';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPlugin from '@fullcalendar/interaction';
import bootstrapPlugin from '@fullcalendar/bootstrap';
import '../main.scss';
import EventModal from '../components/EventModal';
import { fetchPlannings, createPlanning, updatePlanning, deletePlanning } from '../slices/PlanningService';
import { useSelector } from 'react-redux';
import axios from 'axios';
import { Card, Button, Modal, Form } from 'react-bootstrap';

function CollabPlanning() {
  const [events, setEvents] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [selectedDate, setSelectedDate] = useState(null);
  const [collabs, setCollabs] = useState({});
  const [unassignedCollabs, setUnassignedCollabs] = useState([]);
  const [showEditModal, setShowEditModal] = useState(false);
  const [selectedCollab, setSelectedCollab] = useState(null);
  const [selectedInspector, setSelectedInspector] = useState('');

  const { userInfo } = useSelector((state) => state.auth);

  useEffect(() => {
    loadPlannings();
    fetchCollabs();
  }, []);

  const loadPlannings = async () => {
    try {
      const plannings = await fetchPlannings();
      const formattedEvents = plannings.map(planning => ({
        id: planning._id,
        title: `${collabs[planning.collabId]?.prenom.charAt(0)} ${collabs[planning.collabId]?.nom}`,
        start: planning.date,
        allDay: true,
        extendedProps: {
          collabId: planning.collabId,
          status: planning.status,
          notes: planning.notes
        }
      }));
      setEvents(formattedEvents);
    } catch (error) {
      console.error('Error fetching plannings:', error);
    }
  };

  const fetchCollabs = async () => {
    try {
      const response = await axios.get('/api/collabs');
      const collabsData = response.data.reduce((acc, collab) => {
        acc[collab._id] = collab;
        return acc;
      }, {});
      setCollabs(collabsData);
      setUnassignedCollabs(response.data.filter(collab => collab.dateIns === null));
    } catch (error) {
      console.error('Error fetching collaborators:', error);
    }
  };

  const handleDateClick = (arg) => {
    setSelectedEvent(null);
    setSelectedDate(arg.date);
    setShowModal(true);
  };

  const handleEventClick = (info) => {
    setSelectedEvent(info.event);
    setSelectedDate(info.event.start);
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setSelectedEvent(null);
    setSelectedDate(null);
  };

  const handleSaveEvent = async (eventData) => {
    try {
      if (selectedEvent) {
        await updatePlanning(selectedEvent.id, eventData);
      } else {
        await createPlanning(eventData);
      }
      await loadPlannings();
      handleCloseModal();
    } catch (error) {
      console.error('Error saving event:', error);
    }
  };

  const handleDeleteEvent = async () => {
    if (selectedEvent) {
      try {
        await deletePlanning(selectedEvent.id);
        await loadPlannings();
        handleCloseModal();
      } catch (error) {
        console.error('Error deleting event:', error);
      }
    }
  };

  const handleEditCollab = (collab) => {
    setSelectedCollab(collab);
    setShowEditModal(true);
  };

  const handleCloseEditModal = () => {
    setShowEditModal(false);
    setSelectedCollab(null);
    setSelectedInspector('');
  };

  const handleSaveEdit = async () => {
    try {
      await axios.put(`/api/collabs/${selectedCollab._id}`, {
        dateIns: new Date(),
        affected: selectedInspector
      });
      fetchCollabs();
      handleCloseEditModal();
    } catch (error) {
      console.error('Error updating collaborator:', error);
    }
  };

  return (
    <div className="calendar-container">
      <FullCalendar
        plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin, bootstrapPlugin]}
        initialView="dayGridMonth"
        headerToolbar={{
          left: 'prev,next today',
          center: 'title',
          right: 'dayGridMonth,timeGridWeek,timeGridDay'
        }}
        events={events}
        dateClick={handleDateClick}
        eventClick={handleEventClick}
        themeSystem="bootstrap"
        height="auto"
      />
      <EventModal 
        show={showModal} 
        handleClose={handleCloseModal} 
        event={selectedEvent} 
        handleSave={handleSaveEvent}
        handleDelete={handleDeleteEvent}
        userId={userInfo._id}
        selectedDate={selectedDate}
        collabs={collabs}
      />
      
      <h2 className="mt-4">Unassigned Collaborators</h2>
      <div className="d-flex flex-wrap">
        {unassignedCollabs.map(collab => (
          <Card key={collab._id} className="m-2" style={{ width: '18rem' }}>
            <Card.Body>
              <Card.Title>{`${collab.prenom} ${collab.nom}`}</Card.Title>
              <Card.Text>
                Matricule: {collab.matricule}<br />
                Centre: {collab.centre}
              </Card.Text>
              <Button variant="primary" onClick={() => handleEditCollab(collab)}>
                Add to Planning
              </Button>
            </Card.Body>
          </Card>
        ))}
      </div>

      <Modal show={showEditModal} onHide={handleCloseEditModal}>
        <Modal.Header closeButton>
          <Modal.Title>Add Collaborator to Planning</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group>
              <Form.Label>Select Inspector</Form.Label>
              <Form.Control 
                as="select" 
                value={selectedInspector} 
                onChange={(e) => setSelectedInspector(e.target.value)}
              >
                <option value="">Select an inspector</option>
                {Object.values(collabs).filter(c => ['kn1', 'kn2', 'kn3', 'inspector'].includes(c.role)).map(inspector => (
                  <option key={inspector._id} value={inspector._id}>
                    {`${inspector.prenom} ${inspector.nom}`}
                  </option>
                ))}
              </Form.Control>
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseEditModal}>
            Close
          </Button>
          <Button variant="primary" onClick={handleSaveEdit}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}

export default CollabPlanning;