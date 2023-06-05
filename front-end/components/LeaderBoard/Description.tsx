import React from "react";

const Description = (): JSX.Element => {
	return (
		<div className="text-color1 my-10 flex justify-center xl:text-2xl md:text-xl md:w-auto xl:w-auto  ">
			<div className="flex justify-center xl:gap-40 md:gap-6 sm:gap-0">
				<div>
					<p>TOP 1-10</p>
				</div>

				<div>
					<p>TEAM NAME</p>
				</div>

				<div>
					<p>SCORE</p>
				</div>

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
		</div>
	);
};

export default Description;
