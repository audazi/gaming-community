import { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronLeft, faChevronRight } from '@fortawesome/free-solid-svg-icons';
import './Calendar.css';

const events = {
  '2025-01-15': 'Spring Open Cup',
  '2025-01-20': 'Hosted Cup By MSK.RU',
  '2025-01-25': 'Winter Championship Finals',
  '2025-02-05': 'Regional Qualifiers',
  '2025-02-15': 'Pro League Season Start'
};

const Calendar = () => {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [currentMonth, setCurrentMonth] = useState(currentDate.getMonth());
  const [currentYear, setCurrentYear] = useState(currentDate.getFullYear());

  const generateCalendar = () => {
    const firstDay = new Date(currentYear, currentMonth, 1);
    const lastDay = new Date(currentYear, currentMonth + 1, 0);
    const startingDay = firstDay.getDay();
    const monthLength = lastDay.getDate();
    
    const days = [];
    
    // Add empty cells for days before the first day of the month
    for (let i = 0; i < startingDay; i++) {
      days.push(<div key={`empty-${i}`} className="calendar-day inactive" />);
    }
    
    // Add days of the month
    for (let day = 1; day <= monthLength; day++) {
      const dateString = `${currentYear}-${String(currentMonth + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
      const hasEvent = events[dateString];
      
      days.push(
        <div 
          key={day} 
          className={`calendar-day${hasEvent ? ' has-event' : ''}`}
        >
          {day}
          {hasEvent && (
            <>
              <div className="event-indicator" />
              <div className="event-tooltip">{events[dateString]}</div>
            </>
          )}
        </div>
      );
    }
    
    return days;
  };

  const handlePrevMonth = () => {
    if (currentMonth === 0) {
      setCurrentMonth(11);
      setCurrentYear(currentYear - 1);
    } else {
      setCurrentMonth(currentMonth - 1);
    }
  };

  const handleNextMonth = () => {
    if (currentMonth === 11) {
      setCurrentMonth(0);
      setCurrentYear(currentYear + 1);
    } else {
      setCurrentMonth(currentMonth + 1);
    }
  };

  const monthNames = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ];

  return (
    <div className="calendar-container">
      <div className="calendar-header">
        <button onClick={handlePrevMonth}>
          <FontAwesomeIcon icon={faChevronLeft} />
        </button>
        <h2>{`${monthNames[currentMonth]} ${currentYear}`}</h2>
        <button onClick={handleNextMonth}>
          <FontAwesomeIcon icon={faChevronRight} />
        </button>
      </div>
      <div className="weekdays">
        <div>Sun</div>
        <div>Mon</div>
        <div>Tue</div>
        <div>Wed</div>
        <div>Thu</div>
        <div>Fri</div>
        <div>Sat</div>
      </div>
      <div className="calendar">
        {generateCalendar()}
      </div>
    </div>
  );
};

export default Calendar;
