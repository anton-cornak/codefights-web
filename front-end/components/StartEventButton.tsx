import React, { useState } from 'react';
import axios from 'axios';
import { buttonVariants } from './Button';

interface StartEventButtonProps {
  eventId: string | null;
  token: string | null;
}

const StartEventButton: React.FC<StartEventButtonProps> = ({ eventId, token }) => {
  const startEventUrl: string = `${process.env.NEXT_PUBLIC_STARTEVENT_URL}/${eventId || 'tempId'}`;
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);

  const startEvent = () => {
    if (token !== null) {
      axios
        .post(
          startEventUrl,
          {},
          {
            headers: {
              Token: token,
            },
          }
        )
        .then((response) => {
          // Handle successful response if needed
          console.log('Event started successfully');
          setShowSuccessMessage(true); // Show success message
        })
        .catch((error) => {
          console.error('Error starting event:', error);
        });
    } else {
      console.error('Token is null');
    }
  };

  return (
    <div>
      <button
        onClick={startEvent}
        className={buttonVariants({ variant: 'default' })}
      >
        Start Event
      </button>
      {showSuccessMessage && (
  <div
    className="bg-green-100 border border-green-400 text-green-700 text-white px-4 py-3 mt-4 rounded"
    style={{ backgroundColor: '#CFDE38', borderColor: '#CFDE38' }}
  >
    Event: {eventId} has started
          <button
            onClick={() => setShowSuccessMessage(false)}
            className="ml-2 text-sm font-bold text-green-700 hover:text-green-900"
          >
            Close
          </button>
        </div>
      )}
    </div>
  );
};

export default StartEventButton;
