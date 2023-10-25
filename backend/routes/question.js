const express = require("express");

const router = express.Router();

const { saveQuestions} = require("../controllers/questionController");

// save questions in db
router.post("/save", saveQuestions);


module.exports = router;
