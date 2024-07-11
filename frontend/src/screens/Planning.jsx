import React, { useState, useEffect } from 'react';
import { Calendar, momentLocalizer } from 'react-big-calendar';
import moment from 'moment';
import { Modal, Button, Container, Row, Col, OverlayTrigger, Form, Tooltip } from 'react-bootstrap';
import 'react-big-calendar/lib/css/react-big-calendar.css';

const localizer = momentLocalizer(moment);

const MyCalendar = (props) => {
  const [show, setShow] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [events, setEvents] = useState([]);
  const [showAddEventModal, setShowAddEventModal] = useState(false);
  const [newEventTitle, setNewEventTitle] = useState('');
  const [newEventStart, setNewEventStart] = useState('');

  const handleClose = () => setShow(false);
  const handleShow = (event) => {
    setSelectedEvent(event);
    setShow(true);
  };
  const handleAddEvent = async () => {
    console.log(newEventTitle, newEventStart);
    try {
      const response = await fetch('/api/events', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          title: newEventTitle,
          start: newEventStart,
          // Add other event properties here
        }),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const event = await response.json();

      // Add the new event to the events array
      setEvents((prevEvents) => [...prevEvents, event]);

      // Close the modal
      setShowAddEventModal(false);
    } catch (error) {
      console.error('Failed to add event:', error);
    }
  };

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const res = await fetch('/api/events'); // Replace with your actual API endpoint
        const data = await res.json();
        setEvents(data);
      } catch (error) {
        console.error('Failed to fetch events:', error);
      }
    };

    fetchEvents();
  }, []);


  const renderTooltip = (event) => (
    <Tooltip id={`tooltip-${event.start}`}>
      {event.title}
    </Tooltip>
  );

  return (
    <Container fluid>
      <Row className="justify-content-center">
        <Col md={10} lg={8} >
          <Calendar
            localizer={localizer}
            events={events}
            startAccessor="start"
            endAccessor="end"
            defaultView="month"
            views={['month']}
            style={{ height: '600px' }}
            onSelectEvent={handleShow}
            components={{
              event: ({ event }) => (
                <OverlayTrigger
                  placement="top"
                  overlay={renderTooltip(event)}
                >
                  <div>{event.title}</div>
                </OverlayTrigger>
              ),
            }}
          />
          <div className='justify-content-end d-flex mt-3'>
            <Button onClick={() => setShowAddEventModal(true)}>Add Event</Button>
          </div>
          <Modal show={showAddEventModal} onHide={() => setShowAddEventModal(false)}>
            <Modal.Header closeButton>
              <Modal.Title>Add Event</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <Form>
                <Form.Group controlId="formEventTitle">
                  <Form.Label>Title</Form.Label>
                  <Form.Control type="text" placeholder="Enter title" value={newEventTitle} onChange={(e) => setNewEventTitle(e.target.value)} />
                </Form.Group>

                <Form.Group controlId="formEventStart">
                  <Form.Label>Start Date</Form.Label>
                  <Form.Control type="date" value={newEventStart} onChange={(e) => setNewEventStart(e.target.value)} />
                </Form.Group>
              </Form>
            </Modal.Body>
            <Modal.Footer>
              <Button variant="secondary" onClick={() => setShowAddEventModal(false)}>
                Close
              </Button>
              <Button variant="primary" onClick={handleAddEvent}>
                Save Changes
              </Button>
            </Modal.Footer>
          </Modal>
        </Col>
      </Row>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>{selectedEvent?.title}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <h5>Start: {selectedEvent?.start.toLocaleString()}</h5>
          <h5>End: {selectedEvent?.end.toLocaleString()}</h5>
          <p>{selectedEvent?.desc}</p>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </Container>
  );
};

export default MyCalendar;