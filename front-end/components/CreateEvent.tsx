import { useState } from "react";
import { useRouter } from "next/router";
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { buttonVariants } from './Button';
import axios from 'axios';

interface FormData {
  eventName: string;
  eventDescription: string;
}

const CreateEvent = () => {
  const [eventName, setEventName] = useState("");
  const [eventDescription, setEventDescription] = useState("");
  const router = useRouter();

  // Define the validation schema using Yup
  const validationSchema = Yup.object({
    eventName: Yup.string().required('Event Name is required').max(60, 'Event Name must not exceed 60 characters'),
    eventDescription: Yup.string().required('Event Description is required').max(120, 'Event Description must not exceed 120 characters'),
  });

  const handleSubmit = async (values:FormData) => {
    const formData = {
      eventName: values.eventName,
      eventDescription: values.eventDescription,
    };

    console.log(formData);

    const token = localStorage.getItem("token");

    try {
      const response = await axios.post('http://localhost:8080/createEvent', formData, {
        headers: {
          "Content-Type": "application/json",
          "Token": `Bearer ${token}`,
        },
      });

      console.log(response.data);
      router.push("/events");
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>
      <div className="md:flex">
        <div className="p-8">
          <h1 className="text-5xl text-black dark:text-white">
            Create event
          </h1>
          <Formik
            initialValues={{
              eventName: '',
              eventDescription: '',
            }}
            validationSchema={validationSchema}
            onSubmit={handleSubmit}
          >
            <Form className="block mt-1 text-lg leading-tight font-medium text-black dark:text-white">
              <div className="mb-4">
                <label htmlFor="eventName" className="block font-medium text-black dark:text-white mt-6">
                  Event Name
                </label>
                <Field
                  type="text"
                  id="eventName"
                  name="eventName"
                  className="mt-1 px-3 py-2 border rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-gray-600"
                />
                <ErrorMessage name="eventName" component="div" className="text-red-500" />
              </div>

              <div className="mb-4">
                <label htmlFor="eventDescription" className="block font-medium text-black dark:text-white mt-6">
                  Event Description
                </label>
                <Field
                  type="textarea"
                  id="eventDescription"
                  name="eventDescription"
                  className="mt-1 px-3 py-2 border border-black dark:border-white bg-white dark:bg-white rounded-lg w-full h-40 focus:outline-none focus:ring-2 focus:ring-gray-600"
                />
                <ErrorMessage name="eventDescription" component="div" className="text-red-500" />
                </div>
                          
              <div className="mb-4">
                <label htmlFor="eventImage" className="block font-medium text-black dark:text-white mt-6">
                 Event Image
                </label>
               <Field
                  type="file"
                  id="eventImage"
                  name="eventImage"
                  className="mt-1"
                />
                <ErrorMessage name="eventImage" component="div" className="text-red-500" />
  </div>

              <div className="flex flex-col items-start sm:flex-row sm:items-start">
                <button
                  type="submit"
                  className={buttonVariants({ variant: 'default' })}
                >
                  Create event
                </button>
              </div>
            </Form>
          </Formik>
        </div>
      </div>
    </div>
  );
};

export default CreateEvent;
