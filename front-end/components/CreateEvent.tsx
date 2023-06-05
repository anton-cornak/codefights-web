import { useState } from 'react';
import { useRouter } from "next/router";
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

interface FormData {
  eventName: string;
  eventDescription: string;
  eventDate: Date;
}

interface ImageState {
  preview: string;
  data: File | string;
}

const ImageUploadNEW = () => {
  const [image, setImage] = useState<ImageState>({ preview: '', data: '' });
  const [status, setStatus] = useState('');
  const router = useRouter();
  
  // Define the validation schema using Yup
  const validationSchema = Yup.object({
    eventName: Yup.string().required('Event Name is required').max(60, 'Event Name must not exceed 60 characters'),
    eventDescription: Yup.string().required('Event Description is required').max(120, 'Event Description must not exceed 120 characters'),
    eventDate: Yup.date().required('Event Date is required'), 
  });

  const handleSubmit = async (values: FormData) => {
    const { eventName, eventDescription, eventDate } = values;

    let formData = new FormData();
    formData.append('eventImage', image.data as File);
    formData.append('eventName', eventName);
    formData.append('eventDescription', eventDescription);
    formData.append('eventDate', eventDate.toISOString()); // Convert date to a string format, such as ISO string

    console.log('FormData:', formData);

    const token = localStorage.getItem("token");

    const response = await fetch('http://localhost:8080/image', {
      method: 'POST',
      body: formData,
      headers: {
        Token: `Bearer ${token}`,
      },
    });

    console.log('Response:', response);
    router.push("/events");

    if (response) setStatus(response.statusText);
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>, setFieldValue: (field: string, value: any) => void) => {
    const file = e.target.files?.[0];
    if (file) {
      const img = {
        preview: URL.createObjectURL(file),
        data: file,
      };
      setImage(img);
      setFieldValue('eventImage', file); // Update the value of the file input
    }
  };

  console.log('Image state:', image);

  return (
    <div className='App'>
      {image.preview && <img src={image.preview} width='100' height='100' />}
      <hr></hr>

      <Formik
        initialValues={{
          eventName: '',
          eventDescription: '',
          eventDate: new Date(), // Set the initial value to the current date or any other default value
        }}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        {({ setFieldValue, values }) => ( // Access setFieldValue and values from Formik props
          <Form>
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
                as="textarea"
                id="eventDescription"
                name="eventDescription"
                className="mt-1 px-3 py-2 border border-black dark:border-white bg-white dark:bg-white rounded-lg w-full h-40 focus:outline-none focus:ring-2 focus:ring-gray-600"
              />
              <ErrorMessage name="eventDescription" component="div" className="text-red-500" />
            </div>

            <div className="mb-4">
              <label htmlFor="eventDate" className="block font-medium text-black dark:text-white mt-6">
                Event Date
              </label>
              <DatePicker
                id="eventDate"
                name="eventDate"
                className="mt-1 px-3 py-2 border rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-gray-600"
                selected={values.eventDate}
                onChange={(date) => setFieldValue('eventDate', date)}
              />
              <ErrorMessage name="eventDate" component="div" className="text-red-500" />
            </div>

            <div className="mb-4">
              <label htmlFor="eventImage" className="block font-medium text-black dark:text-white mt-6">
                Event Image
              </label>
              <input
                type="file"
                id="eventImage"
                name="eventImage"
                className="mt-1"
                onChange={(e) => handleFileChange(e, setFieldValue)}
              />
              <ErrorMessage name="eventImage" component="div" className="text-red-500" />
            </div>

            <button type='submit'>Submit</button>
          </Form>
        )}
      </Formik>

      {status && <h4>{status}</h4>}
    </div>
  );
}

export default ImageUploadNEW;
