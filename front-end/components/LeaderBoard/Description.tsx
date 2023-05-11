const Description = () => {
    return ( 
        <div className='flex flex-row justify-center text-2xl my-10 text-color1'>
        {/* left side */}
        <div className='flex justify-center w-1/2 gap-40 '>
            <div className=' '>
                <p>TOP 1-10</p>
            </div>

            <div>
                <p>TEAM NAME</p>
            </div>

            <div>
                <p>SCORE</p>
            </div>

        </div>
        {/* left side */}

        {/* right side */}
        <div className='flex justify-center w-1/2 gap-40 '>
            <div>
                <p>TOP 11-20</p>
            </div>

            <div>
                <p>TEAM NAME</p>
            </div>

            <div>
                <p>SCORE</p>
            </div>

        </div>
        {/* right side */}

    </div>
     );
}
 
export default Description;