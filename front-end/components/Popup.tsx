import React from "react";
import Paragraph from "./ui/Paragraph";

interface PopupProps {
    onClose: () => void;
    location: string
}

const Popup: React.FC<PopupProps> = ({ onClose, location }) => {
    const redirect = () => {
        window.location.assign("/events/" + location)
    }
    return (
        <div className="fixed inset-1 flex items-center justify-center">
            <div className="bg-white p-8 rounded">
                <div>
                    <Paragraph className="text-slate-900"> READY TO START AN EVENT ? </Paragraph>
                </div>


                <div className="grid grid-cols-2">
                    <div className="ml-10">
                        <button onClick={onClose} className=" px-3 py-1 bg-green text-white rounded">
                            NO
                        </button>
                    </div>
                    <div className="ml-10">
                        <button onClick={() => redirect()} className="px-3 py-1 bg-green text-white rounded">
                            YES
                        </button>
                    </div>

                </div>
            </div>
        </div>
    );
};

export default Popup;