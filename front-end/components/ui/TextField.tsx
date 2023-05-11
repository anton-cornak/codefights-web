import React, { useState } from 'react';


const TextField = () => {
  const [inputValue, setInputValue] = useState('');


  const handleChange = (event:any) => {
    const newValue = event.target.value;
    setInputValue(newValue);
  };

  return (
    <div className='w-full'>
      <textarea placeholder='// input your solution'
      className="overflow-auto resize-none text-slate-100 bg-gray-800 shadow appearance-none border rounded w-1/2 mx-right h-[20rem]  px-2 leading-tight focus:shadow-inner focus:ring-green focus:border-green" value={inputValue} onChange={handleChange} />
      
    </div>
  );
};

export default TextField;