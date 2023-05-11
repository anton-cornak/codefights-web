
import Navbar from '@/components/Navbar';
import Button, { buttonVariants } from '@/components/ui/Button';
import LargeHeading from '@/components/ui/LargeHeading';
import TextAnimation from '@/components/ui/TextAnimation'
import TextField from '@/components/ui/TextField';
import type { Metadata } from 'next';


export const metadata: Metadata = {
  title: 'VISMA WARS',
  description: 'KASV project for Vsima employees',
}



export default function Home() {
  return (
    <>
      <Navbar />
      <div className=' bg-black relative h-screen overflow-x-hidden'>

        <div className='container flex flex-col justify-start items-center w-full h-fit'>



          {/* LOGO x Description */}
          <div className=' gap-6 pt-20 text-center flex flex-col justify-center lg:justify-center items-center'>

            <LargeHeading size='lg' className='font-bruno three-d text-green dark:text-green'>
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


          <div className='w-full'>
            <TextField />
            <Button className={buttonVariants({ variant: 'default' })}
              >
              SEND
            </Button>
          </div>



        </div>
      </div>
    </>)
}
