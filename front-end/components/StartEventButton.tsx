import React from 'react';
import axios from 'axios';

interface StartEventButtonProps {
  eventId: string;
  token: string | null;
}

const StartEventButton: React.FC<StartEventButtonProps> = ({ eventId, token }) => {
  const startEventUrl: string = process.env.NEXT_PUBLIC_STARTEVENT_URL + `/${eventId}`;

  const startEvent = () => {
    axios
      .post(startEventUrl, {}, {
        headers: {
          Token: `Bearer ${token}`,
        },
      })
      .then((response) => {
        // Handle successful response if needed
        console.log('Event started successfully');
      })
      .catch((error) => {
        console.error('Error starting event:', error);
      });
  };

  return (
    <button onClick={startEvent}>Start Event</button>
  );
};

export default StartEventButton;
