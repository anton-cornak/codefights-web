import React, { useState } from "react";
import { useRouter } from "next/router";
import Link from "next/link";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import BoxShadowImage from "./BoxShadowImage";
import { buttonVariants } from "./Button";

const languageOptions: { value: number; label: string }[] = [
	{ value: 1, label: "Python" },
	{ value: 2, label: "goLang" },
	{ value: 3, label: "C#" },
];

const Registration = (): JSX.Element => {
	const [teamName, setTeamName] = useState("");
	const [members, setMembers] = useState<string[]>([]);
	const [emails, setEmails] = useState<string[]>([]);
	const [languageID, setLanguageID] = useState(1);
	const [ai, setAi] = useState(false);
	const router = useRouter();

	// Define the validation schema using Yup
	const validationSchema = Yup.object({
		teamName: Yup.string()
			.required("Team Name is required")
			.max(30, "Team Name must not exceed 30 characters"),
		members: Yup.array().of(
			Yup.string().required("Member name is required"),
		),
		emails: Yup.array().of(
			Yup.string()
				.email("Invalid email address")
				.required("Email is required"),
		),
		languageID: Yup.number().required("Language is required"),
	});

	const handleSubmit = (values: {
		teamName: string;
		members: string[];
		emails: string[];
		languageID: number;
		ai: boolean;
	}) => {
		const formData = {
			teamname: values.teamName,
			members: values.members,
			emails: values.emails,
			languageID: values.languageID,
			ai: values.ai,
		};

		console.log(formData);

		fetch("http://localhost:3001/api/register", {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			mode: "no-cors",
			credentials: "include",
			body: JSON.stringify(formData),
		})
			.then((response) => response.json())
			.then((data) => {
				console.log(data);
				router.push("/login"); // redirect to success page
			})
			.catch((error) => {
				console.error(error);
			});
	};

	const handleMemberChange = (
		event: React.ChangeEvent<HTMLInputElement>,
		index: number,
	) => {
		const { value } = event.target;
		const newMembers = [...members];
		newMembers[index] = value;
		setMembers(newMembers);
	};

	const handleEmailChange = (
		event: React.ChangeEvent<HTMLInputElement>,
		index: number,
	) => {
		const { value } = event.target;
		const newEmails = [...emails];
		newEmails[index] = value;
		setEmails(newEmails);
	};

	const handleAddMember = () => {
		setMembers([...members, ""]);
		setEmails([...emails, ""]);
	};

	return (
		<div>
			<div className="md:flex">
				<div className="p-8">
					<div className="text-grey-700 text-2xl font-semibold uppercase tracking-wide">
						registration
					</div>
					<Formik
						initialValues={{
							teamName: "",
							members: [""],
							emails: [""],
							languageID: 1,
							ai: false,
						}}
						validationSchema={validationSchema}
						onSubmit={handleSubmit}
					>
						<Form className="hover:text-grey-700 mt-1 block text-lg font-medium leading-tight text-black">
							<div className="mb-4">
								<label
									htmlFor="teamname"
									className="mt-6 block font-medium text-gray-700"
								>
									Team Name
								</label>
								<Field
									type="text"
									id="teamname"
									name="teamName"
									className="mt-1 w-full rounded-lg border px-3 py-2 focus:outline-none focus:ring-2 focus:ring-gray-600"
								/>
								<ErrorMessage
									name="teamName"
									component="div"
									className="text-red-500"
								/>
							</div>
							<div className="mb-4">
								<label
									htmlFor="members"
									className="block font-medium text-gray-700"
								>
									Members
								</label>
								{members.map((member, index) => (
									<div
										key={index}
										className="mb-2 flex space-x-2"
									>
										<Field
											type="text"
											name={`members[${index}]`}
											className="mt-1 w-full rounded-lg border px-3 py-2 focus:outline-none focus:ring-2 focus:ring-gray-600"
											placeholder={`Member ${index + 1}`}
										/>
										<Field
											type="text"
											name={`emails[${index}]`}
											className="focus:ring-custom_light_grey mt-1 w-full rounded-lg border px-3 py-2 focus:outline-none focus:ring-2"
											placeholder="Email"
										/>
									</div>
								))}
								<button
									type="button"
									className="bg-custom_light_grey hover:bg-custom_green focus:ring-custom_green rounded-sm px-4 py-2 text-sm font-medium text-white focus:outline-none focus:ring-2"
									onClick={handleAddMember}
								>
									Add Member
								</button>
								<ErrorMessage
									name="members"
									component="div"
									className="text-red-500"
								/>
								<ErrorMessage
									name="emails"
									component="div"
									className="text-red-500"
								/>
							</div>
							<div className="mb-4">
								<label
									htmlFor="language"
									className="block font-medium text-gray-700"
								>
									Language
								</label>
								<Field
									as="select"
									id="language"
									name="languageID"
									className="mt-1 w-full rounded-lg border px-3 py-2 focus:outline-none focus:ring-2 focus:ring-gray-600"
								>
									{languageOptions.map((option) => (
										<option
											key={option.value}
											value={option.value}
										>
											{option.label}
										</option>
									))}
								</Field>
								<ErrorMessage
									name="languageID"
									component="div"
									className="text-red-500"
								/>
							</div>
							<div className="mb-4">
								<div className="flex items-center">
									<Field
										type="checkbox"
										id="ai"
										name="ai"
										className="text-custom_green focus:ring-custom_green mr-2"
									/>
									<label
										htmlFor="ai"
										className="font-medium text-gray-700"
									>
										AI
									</label>
								</div>
							</div>
							<div className="flex flex-col items-start sm:flex-row sm:items-start">
								<button
									type="submit"
									className={buttonVariants({
										variant: "default",
									})}
								>
									Register
								</button>
								<Link
									href="/"
									className="hover:text-custom_green mt-2 px-4 py-2 text-sm font-medium text-black sm:ml-2 sm:mt-0"
								>
									Already registered? Log in.
								</Link>
							</div>
						</Form>
					</Formik>
				</div>
				<div className="ml-16 mr-16 mt-10 md:shrink-0">
					<BoxShadowImage
						alt="Example Image"
						src="registrationImage.jpg"
						width={350}
						height={350}
					/>
				</div>
			</div>
		</div>
	);
};
export default Registration;
