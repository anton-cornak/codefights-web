import Paragraph from "@/components/ui/LargeHeading";
import LargeHeading from "@/components/ui/LargeHeading";
import Image from "next/image";

export default function upcomingEvents() {
    return (
        <>
            <div className=' font-bruno bg-black relative h-screen overflow-x-hidden'>

                <div className=" items-center text-center text-6xl py-3 text-color1">
                    <p>UPCOMING EVENTS</p>
                </div>

                <div className="inline-flex items-center justify-center w-full">
                    <hr className="h-px w-[85rem] bg-color1 border-0 dark:bg-color1 "></hr>
                </div>


                <div className="grid grid-cols-2 grid-rows-2 h-50 pl-20 pr-20">
                    <a href="events/java">
                        <div className="grid grid-cols-2 py-5">
                            <div>
                                <Image className="flex opacity-60  rounded-xl" src="/characters/jaro.jpg" alt="jaro" width={300} height={300} />
                            </div>
                            <div><LargeHeading size={"lg"} className="py-3">
                                Java #1
                            </LargeHeading>
                                <Paragraph size={"sm"} className="font-thin text-left">
                                    example of description
                                </Paragraph>
                            </div>

                        </div>
                    </a>
                    <a href="events/python">
                    <div className="grid grid-cols-2 py-5" >
                        

                        <div>
                            <Image className="flex opacity-60 rounded-xl" src="/characters/zena.jpg" alt="jaro" width={300} height={300} />
                        </div>

                        <div>
                            <LargeHeading size={"lg"} className="py-3">
                                Python #1
                            </LargeHeading>

                            <Paragraph size={"sm"} className="font-thin text-left">
                                example of description
                            </Paragraph>
                        </div>

                    </div>
                    </a>
                </div>



            </div>
        </>)
}
