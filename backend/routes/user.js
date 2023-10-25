const express = require("express");

const router = express.Router();

const {
  loginUser,
  signupUser,
  getData,
  saveData,
  getExcerciseScore,
  getDashboard,
  resetData,
  getLeaderboard
} = require("../controllers/userController");

// login route
router.post("/login", loginUser);

// signup route
router.post("/signup", signupUser);

// get question for this user
router.post("/getdata", getData);


// save question response data for this user
router.post("/savedata", saveData);

router.post('/getExcerciseScore',getExcerciseScore);


router.post('/resetData',resetData);

router.post('/getDashboard',getDashboard);

router.get('/getLeaderboard',getLeaderboard);

module.exports = router;
