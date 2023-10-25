const User = require("../models/userModel");
const Question = require("../models/questionModel");
const jwt = require("jsonwebtoken");
const createToken = (_id) => {
  return jwt.sign({ _id }, process.env.SECRET, { expiresIn: "3d" }); // payload is (id)
};

// login a user
const loginUser = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.login(email, password); // using that static method defined in db

    // create a token
    const token = createToken(user._id); // user is the document (json) stored in db

    res.status(200).json({ email, token });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// signup user
const signupUser = async (req, res) => {
  const { email, password, name } = req.body;
  try {
    const user = await User.signup(email, password, name);

    // create a token
    const token = createToken(user._id);
    const questionDocs = await Question.find({});
    user.name = name;
    console.log("name is", name);
    questionDocs.map((question) => {
      switch (question.difficulty) {
        case 1:
          user.english.availableQuestion.one.push(question);
          break;
        case 2:
          user.english.availableQuestion.two.push(question);
          break;
        case 3:
          user.english.availableQuestion.three.push(question);
          break;
        case 4:
          user.english.availableQuestion.four.push(question);
          break;
        default:
          user.english.availableQuestion.five.push(question);
      }
    });
    await user.save();
    res.status(200).json({ email, token });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const getData = async (req, res) => {
  try {
    const { userEmail } = req.body;
    const userData = await User.find({ email: userEmail });
    res.status(200).json(userData);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const saveData = async (req, res) => {
  try {
    const {
      correctOption,
      difficulty,
      id,
      language,
      curAnswer,
      userEmail,
      curDifficulty,
    } = req.body;

    let user = await User.find({ email: userEmail });
    user = user[0];

    user.english.excerciseQuestion.push({
      difficulty,
      id,
      correctOption,
      curAnswer,
    });


    // update next difficulty question
    user.english.nextDifficulty = curDifficulty;
    let prvDifficulty;
    user.english.nextQuestionNo++;
    switch (difficulty) {
      case 1:
        user.english.attemptedDifficulty.one++;
        if (curAnswer === correctOption) user.english.correctedDifficulty.one++;
        prvDifficulty = user.english.availableQuestion.one;
        break;
      case 2:
        user.english.attemptedDifficulty.two++;
        if (curAnswer === correctOption) user.english.correctedDifficulty.two++;
        prvDifficulty = user.english.availableQuestion.two;
        break;
      case 3:
        user.english.attemptedDifficulty.three++;
        if (curAnswer === correctOption)
          user.english.correctedDifficulty.three++;
        prvDifficulty = user.english.availableQuestion.three;

      case 4:
        user.english.attemptedDifficulty.four++;
        if (curAnswer === correctOption)
          user.english.correctedDifficulty.four++;
        prvDifficulty = user.english.availableQuestion.four;

        break;
      default:
        user.english.attemptedDifficulty.five++;
        if (curAnswer === correctOption)
          user.english.correctedDifficulty.five++;
        prvDifficulty = user.english.availableQuestion.five;
    }

    // handle if no qsn left for this diffi
    let newDifficulty = prvDifficulty.slice(1);

    switch (difficulty) {
      case 1:
        user.english.availableQuestion.one = newDifficulty;
        break;
      case 2:
        user.english.availableQuestion.two = newDifficulty;
        break;
      case 3:
        user.english.availableQuestion.three = newDifficulty;
        break;
      case 4:
        user.english.availableQuestion.four = newDifficulty;
        break;
      default:
        user.english.availableQuestion.five = newDifficulty;
    }
    await user.save();
    res.status(200).json(user);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const getExcerciseScore = async (req, res) => {
  try {
    const { email } = req.body;

    let user = await User.find({ email });
    user = user[0];
    result = [];
    let totalCount = [0, 0, 0, 0, 0, 0];
    let correctCount = [0, 0, 0, 0, 0, 0];
    user.english.excerciseQuestion.map((question) => {
      totalCount[question.difficulty]++;
      if (question.correctOption === question.curAnswer)
        correctCount[question.difficulty]++;
    });

    user.english.excerciseQuestion = [];
    user.english.curExcercise++;
    user.english.nextQuestionNo = 1;
    await user.save();
    let finalScore = 0;
    let totalWeight = 0;
    for (let i = 1; i <= 5; i++) {
      let correctRatio = correctCount[i] / (totalCount[i] ? totalCount[i] : 1);
      let questionWeight = i * 10;
      if (totalCount[i] > 0) totalWeight = totalWeight + questionWeight;
      finalScore = finalScore + correctRatio * questionWeight;
      result.push({
        difficulty: i,
        total: totalCount[i],
        correct: correctCount[i],
        scorePercentage: correctRatio * 100,
      });
    }
    finalScore = (finalScore / totalWeight) * 100;

    res.status(200).json({ result, finalScore });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const getDashboard = async (req, res) => {
  try {
    const { email } = req.body;

    let user = await User.find({ email });
    user = user[0];
    result = [];

    let { name } = user;
    let attempted = user.english.attemptedDifficulty;
    let corrected = user.english.correctedDifficulty;

    let finalScore = 0;
    let totalWeight = 0;

    let scorePercentage = [0, 0, 0, 0, 0, 0];
    if (attempted.one > 0) {
      totalWeight += 10;
      let ratio = corrected.one / attempted.one;
      scorePercentage[1] = ratio * 100;
      finalScore = finalScore + ratio * 10;
    }
    if (attempted.two > 0) {
      totalWeight += 20;
      let ratio = corrected.two / attempted.two;
      scorePercentage[2] = ratio * 100;
      finalScore = finalScore + ratio * 20;
    }
    if (attempted.three > 0) {
      totalWeight += 30;
      let ratio = corrected.three / attempted.three;
      scorePercentage[3] = ratio * 100;
      finalScore = finalScore + ratio * 30;
    }
    if (attempted.four > 0) {
      totalWeight += 40;
      let ratio = corrected.four / attempted.four;
      scorePercentage[4] = ratio * 100;
      finalScore = finalScore + ratio * 40;
    }
    if (attempted.five > 0) {
      totalWeight += 50;
      let ratio = corrected.five / attempted.five;
      scorePercentage[5] = ratio * 100;
      finalScore = finalScore + ratio * 50;
    }

    if (totalWeight) finalScore = (finalScore / totalWeight) * 100;

    res.status(200).json({ finalScore, scorePercentage, name, email });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const resetData = async (req, res) => {
  try {
    const { email } = req.body;

    let user = await User.find({ email });
    user = user[0];

    let { name } = user;
    user.english.attemptedDifficulty.one = 0;
    user.english.attemptedDifficulty.two = 0;
    user.english.attemptedDifficulty.three = 0;
    user.english.attemptedDifficulty.four = 0;
    user.english.attemptedDifficulty.five = 0;
    user.english.correctedDifficulty.one = 0;
    user.english.correctedDifficulty.two = 0;
    user.english.correctedDifficulty.three = 0;
    user.english.correctedDifficulty.four = 0;
    user.english.correctedDifficulty.five = 0;

    user.english.curExcercise = 1;
    user.english.nextQuestionNo = 1;
    user.english.excerciseQuestion = [];
    user.english.nextDifficulty = 1;

    const questionDocs = await Question.find({});
    user.english.availableQuestion.one = [];
    user.english.availableQuestion.two = [];
    user.english.availableQuestion.three = [];
    user.english.availableQuestion.four = [];
    user.english.availableQuestion.five = [];

    questionDocs.map((question) => {
      switch (question.difficulty) {
        case 1:
          user.english.availableQuestion.one.push(question);
          break;
        case 2:
          user.english.availableQuestion.two.push(question);
          break;
        case 3:
          user.english.availableQuestion.three.push(question);
          break;
        case 4:
          user.english.availableQuestion.four.push(question);
          break;
        default:
          user.english.availableQuestion.five.push(question);
      }
    });
    await user.save();

    let finalScore = 0;
    let scorePercentage = [0, 0, 0, 0, 0, 0];

    res.status(200).json({ finalScore, scorePercentage, name, email });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const getLeaderboard = async (req, res) => {
  try {
    const leaders = [];
    const users = await User.find({});
    users.map((user) => {
      let attempted = user.english.attemptedDifficulty;
      let corrected = user.english.correctedDifficulty;

      let finalScore = 0;
      let totalWeight = 0;

      if (attempted.one > 0) {
        totalWeight += 10;
        let ratio = corrected.one / attempted.one;
        finalScore = finalScore + ratio * 10;
      }
      if (attempted.two > 0) {
        totalWeight += 20;
        let ratio = corrected.two / attempted.two;

        finalScore = finalScore + ratio * 20;
      }
      if (attempted.three > 0) {
        totalWeight += 30;
        let ratio = corrected.three / attempted.three;

        finalScore = finalScore + ratio * 30;
      }
      if (attempted.four > 0) {
        totalWeight += 40;
        let ratio = corrected.four / attempted.four;

        finalScore = finalScore + ratio * 40;
      }
      if (attempted.five > 0) {
        totalWeight += 50;
        let ratio = corrected.five / attempted.five;

        finalScore = finalScore + ratio * 50;
      }

      if (totalWeight) finalScore = (finalScore / totalWeight) * 100;
      leaders.push({
        name: user.name,
        score: finalScore,
      });
    });
    leaders.sort((a, b) => b.score - a.score);

    res.status(200).json(leaders);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

module.exports = {
  signupUser,
  loginUser,
  getData,
  saveData,
  getExcerciseScore,
  getDashboard,
  resetData,
  getLeaderboard,
};
