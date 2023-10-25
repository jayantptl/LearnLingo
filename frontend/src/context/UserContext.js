import { createContext, useState } from "react";

export const UserContext = createContext();

export const UserState = (props) => {
  // a global state - user's data , using context api
  const [language, setLanguage] = useState(null);
  const [questionData, setQuestionData] = useState(null);
  return (
    <UserContext.Provider
      value={{ language, setLanguage, questionData, setQuestionData }}
    >
      {props.children}
    </UserContext.Provider>
  );
};
