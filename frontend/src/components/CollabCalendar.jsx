/* import React, { useState, useEffect } from 'react';
import { Calendar, momentLocalizer } from 'react-big-calendar';
import moment from 'moment';
import { useDispatch, useSelector } from 'react-redux';
import { fetchCollabs, updateCollab } from '../slices/collabSlice'

const localizer = momentLocalizer(moment);

const CollabCalendar = ({ userInfo }) => {
  const dispatch = useDispatch();
  const { collabs, loading, error } = useSelector((state) => state.collabs);

  const [events, setEvents] = useState([]);

  useEffect(() => {
    dispatch(fetchCollabs(userInfo._id));
  }, [dispatch, userInfo._id]);

  useEffect(() => {
    const convertedEvents = collabs.map((collab) => ({
      id: collab._id,
      title: `${collab.nom} ${collab.prenom}`,
      start: collab.dateEA,
      end: collab.dateEA,
    }));
    setEvents(convertedEvents);
  }, [collabs]);

  const handleEventDrop = async (droppedEvent, newStart, newEnd) => {
    const updatedCollab = {
      ...droppedEvent,
      dateEA: newStart,
    };
    await dispatch(updateCollab(updatedCollab));
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div>
      <Calendar
        localizer={localizer}
        events={events}
        onEventDrop={handleEventDrop}
        startAccessor={(e) => e.start}
        endAccessor={(e) => e.end}
        style={{ height: 500 }}
      />
    </div>
  );
};

export default CollabCalendar; */