import { useEffect, useState } from 'react';
import axios from 'axios';

interface Event {
  _id: string;
  name: string;
  description: string;
  photo: string;
}

const EventsPage: React.FC = () => {
  const [events, setEvents] = useState<Event[]>([]);

  useEffect(() => {
    axios
      .get('http://localhost:8080/events')
      .then((response) => {
        const eventData = response.data.map((event: any) => ({
          _id: event._id,
          name: event.name,
          description: event.description,
          photo: `data:image/jpeg;base64,${event.photo}`,
        }));
        setEvents(eventData);
      })
      .catch((error) => {
        console.error('Error fetching events:', error);
      });
  }, []);

  return (
    <>
      <h1>Upcoming Events</h1>
      <div>
        {events.map((event, index) => (
          <div key={index}>
            <h3>{event.name}</h3>
            <p>{event.description}</p>
            <img src={event.photo} alt="Event" />
          </div>
        ))}
      </div>
    </>
  );
};

export default EventsPage;




