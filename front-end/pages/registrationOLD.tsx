import { useState } from "react";
import { useRouter } from "next/router";
import Link from "next/link";
import BoxShadowImage from "components/BoxShadowImage";

const languageOptions = [
  { value: 1, label: "Python" },
  { value: 2, label: "goLang" },
  { value: 3, label: "C#" },
];

const Registration = () => {
  const [teamName, setTeamName] = useState("");
  const [members, setMembers] = useState<string[]>([]);
  const [emails, setEmails] = useState<string[]>([]);
  const [languageID, setLanguageID] = useState(1);
  const [ai, setAi] = useState(false);
  const router = useRouter();

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = {
      teamname: teamName,
      members: members,
      emails: emails,
      languageID: languageID,
      ai: ai,
      };

       console.log(formData);
      
    fetch('http://192.168.33.199:9090/register-team', {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      mode: 'no-cors', // Add CORS mode
  credentials: 'include', // Add credentials option
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
    index: number
  ) => {
    const newMembers = [...members];
    newMembers[index] = event.target.value;
    setMembers(newMembers);
  };

  const handleEmailChange = (
    event: React.ChangeEvent<HTMLInputElement>,
    index: number
  ) => {
    const newEmails = [...emails];
    newEmails[index] = event.target.value;
    setEmails(newEmails);
  };

  const handleAddMember = () => {
    setMembers([...members, ""]);
    setEmails([...emails, ""]);
    };

    

    return (
        <div>
        <div className="md:flex">
               {/* lava cast obrazovky */}
                <div className="p-8"> 
            <div className="uppercase tracking-wide text-2xl text-grey-700 font-semibold">registration</div>
    <form onSubmit={handleSubmit} className="block mt-1 text-lg leading-tight font-medium text-black hover:text-grey-700">
      <div className="mb-4">
        <label htmlFor="teamname" className="block font-medium text-gray-700 mt-6">
          Team Name
        </label>
        <input
          type="text"
          id="teamname"
          className="mt-1 px-3 py-2 border rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-gray-600"
          value={teamName}
          onChange={(event) => setTeamName(event.target.value)}
        />
      </div>
      <div className="mb-4">
        <label htmlFor="members" className="block font-medium text-gray-700">
          Members
        </label>
        {members.map((member, index) => (
          <div key={index} className="flex space-x-2 mb-2">
            <input
              type="text"
              className="mt-1 px-3 py-2 border rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-gray-600"
              placeholder={`Member ${index + 1}`}
              value={member}
              onChange={(event) => handleMemberChange(event, index)}
            />
            <input
              type="text"
              className="mt-1 px-3 py-2 border rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-custom_light_grey"
              placeholder="Email"
              value={emails[index]}
              onChange={(event) => handleEmailChange(event, index)}
            />
          </div>
        ))}
        <button
          type="button"
          className="px-4 py-2 text-sm font-medium text-white bg-custom_light_grey rounded-sm hover:bg-custom_green focus:outline-none focus:ring-2 focus:ring-custom_green"
          onClick={handleAddMember}
        >
          Add Member
        </button>
      </div>
      <div className="mb-4">
        <label htmlFor="language" className="block font-medium text-gray-700">
          Language
        </label>
        <select
          id="language"
          className="mt-1 px-3 py-2 border rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-gray-600"
          value={languageID}
          onChange={(event) => setLanguageID(Number(event.target.value))}
        >
          {languageOptions.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
      </div>
      <div className="mb-4">
        <div className="flex items-center">
          <input
            type="checkbox"
            id="ai"
            className="mr-2 text-custom_green focus:ring-custom_green"
            checked={ai}
            onChange={(event) => setAi(event.target.checked)}
          />
          <label htmlFor="ai" className="font-medium text-gray-700">
            AI
          </label>
        </div>
      </div>
    <div className="flex flex-col items-start sm:flex-row sm:items-start">
  <button
    type="submit"
    className="px-4 py-2 text-sm font-medium text-white bg-custom_light_grey rounded-sm hover:bg-custom_green focus:outline-none focus:ring-2 focus:ring-custom_green"
  >
    Register
  </button>
  <Link
    href="/"
    className="mt-2 sm:mt-0 sm:ml-2 px-4 py-2 text-sm font-medium text-black hover:text-custom_green"
  >
    Already registered? Log in.
  </Link>
</div>

            </form>
                </div>
                    <div className="md:shrink-0 mr-16 mt-10 ml-16">            
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