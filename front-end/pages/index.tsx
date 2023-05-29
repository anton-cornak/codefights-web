
import '../pages/'
import StraightLine from '@/components/StraightLine';
import Image from 'next/image';
export default function Home() {
    return (
      <div className=' bg-black relative h-screen overflow-x-hidden'>

      

      


      <div className=" bg-bgBlack text-color1">
        {/* INTRO */}
        <div>
          <div className=" ">
            <Image className="flex mx-auto items-center justify-center rounded-xl opacity-60 " src="/intro.jpg" alt="dsadsa" width={750} height={650} />

            <div className=" text-9xl absolute mt-12 top-80 left-24 ">
              <h1>VISMA</h1>
            </div>

            <div className="text-9xl absolute mt-24 top-96 left-40">
              <h1>WARS</h1>
            </div>

            <div className="text-4xl absolute right-0 top-48 h-full flex items-center w-[25rem] mr-24 text-right">
              <p>TEAMWORK IS ESSENTIAL IN CODING. TOGETHER WE CAN SOLVE COMPLEX PROBLEMS THAT SEEMS
                IMPOSSIBLE TO SOLVE ALONE.</p>
            </div>
          </div>


          <StraightLine />

        </div>
        {/* INTRO */}

        {/* LANGUAGES */}
        <div>
          <div className=" items-center text-center text-9xl">
            <p>LANGUAGES</p>
          </div>

          <div className="text-color2 text-2xl text-right mr-96 ">
            <p>FIREBASE-POWERED.</p>
          </div>

          <div className="w-full flex justify-around px-24">
            <div className="flex flex-col gap-10">

              <div className=" mt-24 text-4xl">
                <ul>
                  <li>• PYTHON</li>
                  <li>• JAVA</li>
                  <li>• GO LANG</li>
                  <li>• C#</li>
                </ul>
              </div>

              <div className=" text-4xl w-[35rem] text-left">
                <p>CODING IS NOT A SOLITARY ACTIVITY, ITS A TEAM SPORT. COLLABORATION IS KEY TO SUCCESS.</p>
              </div>
            </div>

            <Image className="flex right-0 items-end justify-end py-5 opacity-60 rounded-xl" src="/languages.jpg" alt="dsadsa" width={550} height={650} />
          </div>

          <StraightLine />

        </div>
        {/* LANGUAGES */}

        {/* YOUR GOAL */}
        <div>
          <div className="text-center text-9xl">
            <p>YOUR GOAL</p>
          </div>

          <div className="w-full flex justify-around px-24 py-5">
            <div className="text-left first:text-4xl pr-40 mt-28">
              <p>JOIN FORCES WITH YOUR TEAM TO SOLVE OUR PROGRAMMING PROBLEMS, AND COMPETE AGAINST OTHER TEAMS ON OUR LEADERBOARD TO EARN RECOGNITION AS A TOP TEAM.</p>
            </div>

            <Image className="flex right-0 items-end justify-end opacity-60 rounded-xl" src="/yourGoalRight.jpg" alt="dsadsa" width={450} height={400} />
          </div>

          <div className="w-full flex justify-around px-24">
            <Image className="flex left-0 items-start justify-start opacity-60 rounded-xl" src="/yourGoalLeft.jpg" alt="dsadsa" width={450} height={400} />

            <div className="text-right text-4xl flex pl-40 mt-28 right-0 ">
              <p>PUT YOUR CODING SKILLS TO THE TEST WITH OUR PLATFORM’S PROGRAMMING PROBLEMS AND WORK WITH OTHERS TO FIND SOLUTIONS.</p>
            </div>
          </div>



          <StraightLine />

        </div>
        {/* YOUR GOAL */}

        {/* REGISTRATINON */}
        <div className="">
          <div className="text-4xl text-center my-4 ">
            <p>ARE YOU READY?</p>
          </div>

          <div className="flex justify-center items-center pb-5">
            <button className="rounded-sm bg-color2 text-4xl text-center inline-flex items-center px-36">
              <p className="text-bgBlack">REGISTER</p>
            </button>
          </div>

        </div>
        {/* REGISTRATION */}






      </div>

    </div >
);
}
