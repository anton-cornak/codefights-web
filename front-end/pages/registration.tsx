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
      
    fetch('http://10.2.130.62:9090/register-team', {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      mode: 'cors', // Add CORS mode
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
        <div className="flex">
               {/* lava cast obrazovky */}
                <div className="flex-1"> 
            <h1 className="text-5xl text-left ml-28  mt-4 text-gray-700">REGISTRATION</h1>
    <form onSubmit={handleSubmit} className="max-w-md mx-auto mt-8 ml-24">
      <div className="mb-4">
        <label htmlFor="teamname" className="block font-medium text-gray-700">
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
          className="mt-1 px-3 py-2 border rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-custom_light_grey"
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
      <button
        type="submit"
        className="px-4 py-2 text-sm font-medium text-white bg-custom_light_grey rounded-sm hover:bg-custom_green focus:outline-none focus:ring-2 focus:ring-custom_green"
      >
        Register
              </button>
     <Link
              href="/"
              className="px-4 py-2 text-sm font-medium text-black hover:text-custom_green"
            >
              Already registered? Log in.
            </Link>
            </form>
                </div>
                
                
                {/* prava cast obrazovky */}
                <div className="w-1/3 mt-10 mr-48"> 
                  <div className="relative">
                    
<BoxShadowImage
        alt="Example Image"
        src="registrationImage.jpg"
        width={350}
        height={350
        }
      />                         
              
                    
    </div>
  </div>
</div>
            </div>
  );
};    
 
export default Registration;