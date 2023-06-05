import { useEffect, useState } from 'react';
import axios from 'axios';
import StartEventButton from '../components/StartEventButton';

interface Event {
  _id: string;
  name: string;
  description: string;
  photo: string;
}

const EventsPage: React.FC = () => {
    const [events, setEvents] = useState<Event[]>([]);
    const [isLoading, setIsLoading] = useState(true);


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
                setIsLoading(false);
            })
            .catch((error) => {
                console.error('Error fetching events:', error);
                setIsLoading(false);
            });
    }, []);

    const token = typeof localStorage !== 'undefined' ? localStorage.getItem('token') : null;

    return (
    <div className="bg-white dark:bg-black">
   <h1 className="text-5xl mt-120">Upcoming Events</h1>
            <hr className="border-t-2 border-black w-2/3" />

            {isLoading ? (<div className="text-center mt-8 text-lg">Loading events...</div>)
                : (
                    <div className="flex flex-wrap justify-center mt-8">
                        {events.map((event) => (
                            <div key={event._id} className="w-1/2 lg:w-1/2 p-4">
                                <h3 className='text-3xl'>{event.name}</h3>
                                <p>{event.description}</p>
                                <img src={event.photo} alt="Event" className="h-64 w-132" />
                                <StartEventButton eventId={event._id} token={token} />
                            </div>
                        ))}
                    </div>
                )}
        </div>
    );
}
export default EventsPage;


