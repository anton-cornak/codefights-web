import React, { useState } from "react";

const TextField = (): JSX.Element => {
	const [inputValue, setInputValue] = useState("");

	const handleChange = (event: any) => {
		const newValue = event.target.value;
		setInputValue(newValue);
	};

	return (
		<div className="w-full">
			<textarea
				placeholder="// input your solution"
				className="mx-right focus:ring-green focus:border-green h-[20rem] w-1/2 resize-none appearance-none overflow-auto rounded border bg-gray-800  px-2 leading-tight text-slate-100 shadow focus:shadow-inner"
				value={inputValue}
				onChange={handleChange}
			/>
		</div>
	);
};

export default TextField;
