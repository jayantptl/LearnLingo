import React, { useContext, useState } from "react";
import { AiOutlineCaretUp, AiOutlineCaretDown } from "react-icons/ai";
import { UserContext } from "../context/UserContext";
import { useNavigate } from "react-router-dom";

const LanguageDropdown = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { setLanguage } = useContext(UserContext);
  const navigate = useNavigate();


  // when english is selected form dropdown
  const handleClickEnglish = () => {
    setLanguage("English");
    navigate("/englishquiz");
  };
  return (
    <div className=" grid place-items-center ">
      <div className="mt-10 text-2xl">
        <h3 className="font-bold ">
          Hay, Select a language that you want to learn
        </h3>
      </div>
      <div className="top-40 relative flex flex-col items-center w-[340px] h-[340px] rounded-lg">
        <button
          onClick={() => setIsOpen((prev) => !prev)}
          className="bg-[#f0e9ed] p-4 w-full flex items-center justify-between font-bold text-lg rounded-lg tracking-wider border-4 border-transparent active:border-white duration-300 active:text-white"
        >
          Select a Language
          {!isOpen ? (
            <AiOutlineCaretDown className="h-8" />
          ) : (
            <AiOutlineCaretUp className="h-8" />
          )}
        </button>
        {isOpen && (
          <div className="bg-[#f7e3f4] absolute top-20 flex flex-col items-start rounded-lg p-2 w-full">
            <div
              onClick={handleClickEnglish}
              className="flex w-full p-4 flex-col justify-between hover: bg-[#f7e3f4] cursor-pointer rounded-r-lg
           border-l-transparent hover:border-l-black border-l-4"
            >
              <h3 className="font-bold">English</h3>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default LanguageDropdown;
