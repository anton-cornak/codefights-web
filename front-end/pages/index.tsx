/* eslint-disable @next/next/no-page-custom-font */
/* eslint-disable @next/next/no-img-element */
import Head from "next/head";
import Navbar from "../components/Navbar";
import Image from "next/image";

import '../pages/'
const Home = () =>{
  return (
    <div>
      <Head>
        <title>Create Next App</title>
        <link rel="icon" href="/favicon.ico" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link href="https://fonts.googleapis.com/css2?family=Josefin+Sans:wght@300&family=Raleway:wght@300&family=Space+Grotesk:wght@300;400;500;600;700&display=swap" rel="stylesheet" />
      </Head>
      <Navbar />


      <div className="bg-bgBlack text-color1">
        {/* INTRO */}
        <div>
          <div className="relative">
            <div className="flex items-center justify-center">
               <Image src="/intro.jpg" alt="dsadsa" width={750} height={650} />
            </div>
           
            <div className=" text-9xl absolute top-11 left-11 ">
              <h1>VISMA</h1>
            </div>

            <div className="text-9xl absolute">
              <h1>WARS</h1>
            </div>

            <div className="text-2xl absolute right-0 top-0 h-full flex items-center w-[30rem] mr-24 text-right ">
              <p>TEAMWORK IS ESSENTIAL IN CODING. TOGETHER WE CAN SOLVE COMPLEX PROBLEMS THAT SEEMS
                IMPOSSIBLE TO SOLVE ALONE.</p>
            </div>
          </div>


          <div>
            <hr className="h-px my-8 bg-color1 border-0 dark:bg-color1"></hr>
          </div>


        </div>
        {/* INTRO */}

        {/* LANGUAGES */}
        <div>
          <div className=" items-center text-center text-9xl">
            <p>LANGUAGES</p>
          </div>

          <div className="text-color2 text-right pr-20">
            <p>FIREBASE-POWERED.</p>
          </div>

          <div className="pl-4 py-60 text-2xl">
            <ul>
              <li>PYTHON</li>
              <li>JAVA</li>
              <li>GO LANG</li>
              <li>C#</li>

            </ul>
          </div>

          <div className="text-2xl">
            <p>CODING IS NOT A SOLITARY ACTIVITY, ITS A TEAM SPORT. COLLABORATION IS KEY TO SUCCESS.</p>
          </div>


          <div>
            <hr className="h-px my-8 bg-color1 border-0 dark:bg-color1"></hr>
          </div>

        </div>
        {/* LANGUAGES */}

        {/* YOUR GOAL */}
        <div>
          <div className="text-center text-9xl">
            <p>YOUR GOAL</p>
          </div>

          <div className="text-2xl py-11">
            <p>JOIN FORCES WITH YOUR TEAM TO SOLVE OUR PROGRAMMING PROBLEMS, AND COMPETE AGAINST OTHER TEAMS ON OUR LEADERBOARD TO EARN RECOGNITION AS A TOP TEAM.</p>
          </div>

          <div className="text-2xl py-11 text-right">
            <p>PUT YOUR CODING SKILLS TO THE TEST WITH OUR PLATFORM’S PROGRAMMING PROBLEMS AND WORK WITH OTHERS TO FIND SOLUTIONS.</p>
          </div>

          <div>
            <hr className="h-px my-8 bg-color1 border-0 dark:bg-color1"></hr>
          </div>

        </div>
        {/* YOUR GOAL */}

        {/* REGISTRATINON */}
        <div>
          <div className="text-2xl text-center">
            <p>ARE YOU READY?</p>
          </div>

          <div>
            <button className="bg-color2 text-2xl my-11 ml-96">
              <p className="text-bgBlack">REGISTER</p>
            </button>
          </div>

        </div>
        {/* REGISTRATION */}






      </div>

    </div>
  );
};

export default Home;