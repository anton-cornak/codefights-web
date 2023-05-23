import Navbar from "@/components/Navbar";
import Button, { buttonVariants } from "@/components/ui/Button";
import LargeHeading from "@/components/ui/LargeHeading";
import TextAnimation from "@/components/ui/TextAnimation";
import axios from "axios";
import type { Metadata } from "next";
import { useState } from "react";

export const metadata: Metadata = {
  title: "VISMA WARS",
  description: "KASV project for Vsima employees",
};

const HandleSubmitTask = async (codeSnippet: string) => {

  const asciiString = codeSnippet;
    const encodedAsciiString = btoa(asciiString);
    console.log(encodedAsciiString);

  // data from textarea
  try {
    const url = 'http://10.11.65.63:9090/submit-task';
    const data = {
      language: "csharp",
      method: "challenge1",
      code: encodedAsciiString,
    }

    const headers = {
      'Content-Type': 'application/json',
      'teamname': 'marek'
    }


    

    // Send the POST request
    const response = await axios.post(url, data, { headers })

    // Handle the response as needed
    console.log(response.data);
  } catch (error) {
    // Handle any errors
    console.error(error);
  }

  // data from login - hardcoded string Python
}

export default function Home() {
  const [inputValue, setInputValue] = useState('');


  const handleChange = (event: any) => {
    const newValue = event.target.value;
    setInputValue(newValue);
  };
  return (
    <>
      <div className=" relative h-screen overflow-x-hidden bg-black">
        <Navbar />
        <div className="container flex h-fit w-full flex-col items-center justify-start">
          {/* LOGO x Description */}
          <div className=" flex flex-col items-center justify-center gap-6 pt-20 text-center lg:justify-center">
            <LargeHeading
              size="lg"
              className="font-bruno three-d text-green dark:text-green"
            >
              VISMA WARS
            </LargeHeading>

            <TextAnimation />
            {/* 
      <Paragraph className='font-bruno max-w-xl lg:text-left'>
    
        <Link
        href='/register'
        className='underline underline-offset-2 text-green dark:text-green'>
          NOW
        </Link>
        .
      </Paragraph> */}
          </div>

          <div className="w-full">
            <div className='w-full'>
              <textarea placeholder='// input your solution'
                className="overflow-auto resize-none text-slate-100 bg-gray-800 shadow appearance-none border rounded w-1/2 mx-right h-[20rem]  px-2 leading-tight focus:shadow-inner focus:ring-green focus:border-green" value={inputValue} onChange={handleChange} />

            </div>
            <Button
              className={buttonVariants({ variant: "default" })}
              onClick={() => {
                HandleSubmitTask(inputValue);
              }}
            >
              SEND
            </Button>
          </div>
        </div>
        {/* add response */}
      </div>
    </>
  );
}