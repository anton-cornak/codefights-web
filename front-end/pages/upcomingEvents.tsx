import Paragraph from "@/components/ui/LargeHeading";
import LargeHeading from "@/components/ui/LargeHeading";
import Image from "next/image";

export default function upcomingEvents() {
    return (
        <>
            <div className=' bg-black relative h-screen overflow-x-hidden'>

                <div className=" items-center text-center text-6xl py-3 text-color1">
                    <p className="font-bruno">UPCOMING EVENTS</p>
                </div>

                <div className="inline-flex items-center justify-center w-full">
                    <hr className="h-px w-[85rem] bg-color1 border-0 dark:bg-color1 "></hr>
                </div>
                

                <div className="grid grid-cols-2 grid-rows-2 h-50 pl-20">
                    <div className="font-bruno py-10">
                        <LargeHeading size={"lg"} className="py-3">
                            Java #1
                        </LargeHeading>
                        <Paragraph size={'sm'} className="font-thin flex justify-end pr-24">
                        </Paragraph>

                        <Image className="flex opacity-60  rounded-xl" src="/characters/jaro.jpg" alt="jaro" width={300} height={300} />

                    </div>
                    <div className="font-bruno" >
                        <LargeHeading size={"lg"} className="py-3">
                            Python #1
                        </LargeHeading>

                        <Paragraph size={"sm"} className="font-thin">
                            example of description
                        </Paragraph>

                        <Image className="flex opacity-60 rounded-xl" src="/characters/zena.jpg" alt="jaro" width={300} height={300} />
                    </div>

                    <div className="font-bruno" >
                        <LargeHeading size={"lg"} className="py-3">
                            CSharp #1
                        </LargeHeading>

                        <Paragraph size={"sm"} className="font-thin">
                            example of description
                        </Paragraph>

                        <Image className="flex opacity-60 rounded-xl" src="/characters/marek.jpg" alt="jaro" width={300} height={300} />
                    </div>

                    <div className="font-bruno" >
                        <LargeHeading size={"lg"} className="py-3">
                            JS #1
                        </LargeHeading>

                        <Paragraph size={"sm"} className="font-thin">
                            example of description
                        </Paragraph>

                        <Image className="flex opacity-60 rounded-xl" src="/characters/zeny.jpg" alt="jaro" width={300} height={300} />
                    </div>
                </div>



            </div>
        </>)
}
