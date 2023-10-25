const Question = require("../models/questionModel");

const saveQuestions = async (req, res) => {
  try {
    const { questionArray } = req.body;
    const savedQuestions = [];
    await Promise.all(
      questionArray.map(async (question) => {
        try {
          const questionDoc = await Question.create(question);
          savedQuestions.push(questionDoc);
        } catch (error) {
          savedQuestions.push(error.message);
        }
      })
    );
    res.status(200).json(savedQuestions);
  } catch (err) {
    res.status(400).json(err.message);
  }
};

module.exports = {
  saveQuestions,
};
