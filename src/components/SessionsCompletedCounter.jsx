import React from 'react';
import '../styles/sessionsCompletedCounter.css';

function SessionsCompletedCounter({ sessionsCompleted }) {
  return (
    <div className="sessions-completed-container">
      <span className="sessions-completed-label">Sessions Completed</span>
      <span className="sessions-completed-number">{ sessionsCompleted }</span>
    </div>
  );
}

export default SessionsCompletedCounter;
