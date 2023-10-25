import React, { useContext, useEffect, useState } from "react";
import correctLogo from "../assets/correct.png";
import wrongLogo from "../assets/wrong.png";
import { UserContext } from "../context/UserContext";
import { AuthContext } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import Loading from "./Loading";

const EnglishQuiz = () => {
  const { user } = useContext(AuthContext);
  const { questionData, setQuestionData } = useContext(UserContext);
  const userEmail = user.email;
  const [curQuestion, setCurQuestion] = useState(null);
  const [showNextIcon, setShowNextIcon] = useState(false);
  const [curDifficulty, setCurDifficulty] = useState(null);
  const [currentExcercise, setCurrentExcercise] = useState(null);
  const [questionNo, setQuestionNo] = useState(1);
  const [showResultIcon, setShowResultIcon] = useState(false);
  const [isShowing, setShowing] = useState(false);

  const navigate = useNavigate();

  // this runs once to get question data from backend for that user
  useState(() => {
    try {
      const fetchData = async () => {
        const response = await fetch("http://localhost:4000/api/user/getdata", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ userEmail }),
        });
        const json = await response.json();

        // set user's question data for english language
        setQuestionData(json[0]);
        const userQuestion = json[0].english;

        let { nextDifficulty, curExcercise, nextQuestionNo } = userQuestion;
        setCurDifficulty(nextDifficulty);
        setCurrentExcercise(curExcercise);
        setQuestionNo(nextQuestionNo);

        // setting current question to display on the basis of difficulty
        switch (nextDifficulty) {
          case 1:
            setCurQuestion(userQuestion.availableQuestion.one[0]);
            break;
          case 2:
            setCurQuestion(userQuestion.availableQuestion.two[0]);
            break;
          case 3:
            setCurQuestion(userQuestion.availableQuestion.three[0]);
            break;
          case 4:
            setCurQuestion(userQuestion.availableQuestion.four[0]);
            break;
          default:
            setCurQuestion(userQuestion.availableQuestion.five[0]);
        }
      };
      fetchData();
    } catch (error) {
      console.log(error.message);
    }
  }, []);

  // options display icon states (correct,wrong)
  const [curAnswer, setCurAnswer] = useState(null);
  const [opt0Correct, setOpt0Correct] = useState(false);
  const [opt1Correct, setOpt1Correct] = useState(false);
  const [opt2Correct, setOpt2Correct] = useState(false);
  const [opt3Correct, setOpt3Correct] = useState(false);
  const [opt0wrong, setOpt0Wrong] = useState(false);
  const [opt1wrong, setOpt1Wrong] = useState(false);
  const [opt2wrong, setOpt2Wrong] = useState(false);
  const [opt3wrong, setOpt3Wrong] = useState(false);


  // this runs when ever curAnswer changes (when an option is selected) and DB and component are updated
  // and accordin to the option (correct or wrong) next question is fetched
  useEffect(() => {
    const showIconAndUpdateDB = async () => {
      const { correctOption, difficulty } = curQuestion;

      switch (correctOption) {
        case 0:
          setOpt0Correct(true);
          break;
        case 1:
          setOpt1Correct(true);
          break;
        case 2:
          setOpt2Correct(true);
          break;
        default:
          setOpt3Correct(true);
      }
      if (curAnswer !== correctOption) {
        switch (curAnswer) {
          case 0:
            setOpt0Wrong(true);
            break;
          case 1:
            setOpt1Wrong(true);
            break;
          case 2:
            setOpt2Wrong(true);
            break;
          default:
            setOpt3Wrong(true);
        }

        setCurDifficulty((pre) => (pre === 1 ? pre : pre - 1));
      } else {
        setCurDifficulty((pre) => (pre === 5 ? pre : pre + 1));
      }
      updateQuestionData(difficulty);

      if (questionNo !== 10) setShowNextIcon(true);
      else setShowResultIcon(true);

      // update user db
      updateUserDB(curQuestion, curAnswer, curDifficulty);
    };

    if (curAnswer != null && showNextIcon === false && showResultIcon === false)
      showIconAndUpdateDB();
  }, [curAnswer]);


  // helper to update questionData
  const updateQuestionData = (difficulty) => {
    let prvDifficulty;
    switch (difficulty) {
      case 1:
        prvDifficulty = questionData.english.availableQuestion.one;
        break;
      case 2:
        prvDifficulty = questionData.english.availableQuestion.two;
        break;
      case 3:
        prvDifficulty = questionData.english.availableQuestion.three;
        break;
      case 4:
        prvDifficulty = questionData.english.availableQuestion.four;
        break;
      default:
        prvDifficulty = questionData.english.availableQuestion.five;
    }

    let newDifficulty = prvDifficulty.slice(1);
    let prvQuestionSet = questionData;
    switch (difficulty) {
      case 1:
        prvQuestionSet.english.availableQuestion.one = newDifficulty;
        break;
      case 2:
        prvQuestionSet.english.availableQuestion.two = newDifficulty;
        break;
      case 3:
        prvQuestionSet.english.availableQuestion.three = newDifficulty;
        break;
      case 4:
        prvQuestionSet.english.availableQuestion.four = newDifficulty;
        break;
      default:
        prvQuestionSet.english.availableQuestion.five = newDifficulty;
    }

    setQuestionData(prvQuestionSet);
  };

  // when next button is clicked next question is fetched and updated
  const handleClickNext = async () => {
    removeIcons();
    setCurAnswer(null);
    setQuestionNo((prv) => prv + 1);
    switch (curDifficulty) {
      case 1:
        setCurQuestion(questionData.english.availableQuestion.one[0]);
        break;
      case 2:
        setCurQuestion(questionData.english.availableQuestion.two[0]);
        break;
      case 3:
        setCurQuestion(questionData.english.availableQuestion.three[0]);
        break;
      case 4:
        setCurQuestion(questionData.english.availableQuestion.four[0]);
        break;
      default:
        setCurQuestion(questionData.english.availableQuestion.five[0]);
    }
    setShowNextIcon(false);
  };

  // helper to remove option icons
  const removeIcons = () => {
    setOpt0Correct(false);
    setOpt1Correct(false);
    setOpt2Correct(false);
    setOpt3Correct(false);
    setOpt0Wrong(false);
    setOpt1Wrong(false);
    setOpt2Wrong(false);
    setOpt3Wrong(false);
  };

  // update user DB
  const updateUserDB = async (curQuestion, curAnswer, curDifficulty) => {
    try {
      const response = await fetch("http://localhost:4000/api/user/savedata", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...curQuestion,
          curAnswer,
          userEmail,
          curDifficulty,
        }),
      });

      const json = await response.json();
   
    } catch (error) {
      console.log(error.message);
    }
  };

  // to show current excercise score (after 10 questions)
  const handleClickResult = () => {
    setShowing(true);
    navigate("/excerciseScore");
  };

  // while component is loading and data is being fetched from backend
  if (!curQuestion) {
    return <Loading />;
  }

  return (
    curQuestion && (
      <div>
        <h3 className="flex justify-center text-2xl font-bold mb-[-1.2rem] mt-1">
          Excercise : {currentExcercise}
        </h3>
        <div className="p-4 mt-10 mx-6 border rounded-lg shadow-md">
          <div className="border p-5 m-4 rounded-xl">
            <h2 className="text-lg font-semibold mb-4">
              <span className="font-bold mr-2">{questionNo}.</span>
              {curQuestion?.question}
            </h2>
          </div>

          <div
            onClick={() => setCurAnswer(0)}
            className="rounded-xl border p-5 m-5 cursor-pointer  hover:bg-[#e7dbe4] hover:font-bold"
          >
            <div className="flex">
              <span className="font-bold mr-2">A)</span>
              {curQuestion.options[0]}
              {opt0Correct && (
                <img
                  className="ml-4 mt-[-0.4rem] w-7"
                  src={correctLogo}
                  alt=""
                />
              )}
              {opt0wrong && (
                <img className="ml-4 mt-[-0.4rem] w-7" src={wrongLogo} alt="" />
              )}
            </div>
          </div>
          <div
            onClick={() => setCurAnswer(1)}
            className="rounded-xl border p-5 m-5 cursor-pointer ] hover:bg-[#e7dbe4] hover:font-bold"
          >
            <div className="flex">
              <span className="font-bold mr-2">B)</span>
              {curQuestion.options[1]}
              {opt1Correct && (
                <img
                  className="ml-4 mt-[-0.4rem] w-7"
                  src={correctLogo}
                  alt=""
                />
              )}
              {opt1wrong && (
                <img className="ml-4 mt-[-0.4rem] w-7" src={wrongLogo} alt="" />
              )}
            </div>
          </div>
          <div
            onClick={() => setCurAnswer(2)}
            className="rounded-xl border p-5 m-5  cursor-pointer hover:bg-[#e7dbe4] hover:font-bold"
          >
            <div className="flex ">
              <span className="font-bold mr-2">C)</span>
              {curQuestion.options[2]}
              {opt2Correct && (
                <img
                  className="ml-4 mt-[-0.4rem] w-7"
                  src={correctLogo}
                  alt=""
                />
              )}
              {opt2wrong && (
                <img className="ml-4 mt-[-0.4rem] w-7" src={wrongLogo} alt="" />
              )}
            </div>
          </div>
          <div
            onClick={() => setCurAnswer(3)}
            className="rounded-xl border p-5 m-5 cursor-pointer hover:bg-[#e7dbe4] hover:font-bold"
          >
            <div className="flex">
              <span className="font-bold mr-2">D)</span>
              {curQuestion.options[3]}
              {opt3Correct && (
                <img
                  className="ml-4 mt-[-0.4rem] w-7"
                  src={correctLogo}
                  alt=""
                />
              )}
              {opt3wrong && (
                <img className="ml-4 mt-[-0.4rem] w-7" src={wrongLogo} alt="" />
              )}
            </div>
          </div>
        </div>
        {showNextIcon && (
          <div onClick={handleClickNext} className="flex justify-center mt-5">
            <button className="bg-[#c2a7a7] hover:bg-[#4d3e4b] hover:text-[#fff] rounded-lg px-8 py-3 font-bold ">
              Next
            </button>
          </div>
        )}
        {showResultIcon && (
          <div onClick={handleClickResult} className="flex justify-center mt-5">
            <button className="bg-[#c2a7a7] hover:bg-[#4d3e4b] hover:text-[#fff] rounded-lg px-8 py-3 font-bold ">
              {isShowing ? "Showing Result..." : "Show Result"}
            </button>
          </div>
        )}
      </div>
    )
  );
};

export default EnglishQuiz;
