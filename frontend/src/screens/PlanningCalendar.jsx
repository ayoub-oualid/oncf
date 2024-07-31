import React, { useState, useEffect } from 'react';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPlugin from '@fullcalendar/interaction';
import bootstrapPlugin from '@fullcalendar/bootstrap';
import 'bootstrap/dist/css/bootstrap.css';
import EventModal from '../components/EventModal';
import { fetchPlannings, createPlanning, updatePlanning, deletePlanning } from '../slices/PlanningService';
import { useSelector } from 'react-redux';
import axios from 'axios';

function PlanningCalendar() {
  const [events, setEvents] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [selectedDate, setSelectedDate] = useState(null);
  const [collabs, setCollabs] = useState({});

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
        title: `Inspection for ${collabs[planning.collabId]?.prenom} ${collabs[planning.collabId]?.nom}`,
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
    </div>
  );
}

export default PlanningCalendar;