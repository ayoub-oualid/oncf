import React from 'react';
import { useSelector } from 'react-redux';
import CollabCalendar from '../components/CollabCalendar';

const CalendarScreen = () => {
  const { userInfo } = useSelector((state) => state.auth);

  return (
    <div>
      {userInfo && <CollabCalendar userInfo={userInfo} />}
    </div>
  );
};
  
  export default CalendarScreen;