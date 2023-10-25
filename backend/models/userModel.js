const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const validator = require("validator");
const Schema = mongoose.Schema;

const userSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  english: {
    curExcercise: {
      type: Number,
      default: 1,
    },
    nextQuestionNo: {
      type: Number,
      default: 1,
    },
    excerciseQuestion: {
      type: Array,
      default: [],
    },
    nextDifficulty: {
      type: Number,
      default: 1,
    },
    attemptedDifficulty: {
      one: {
        type: Number,
        default: 0,
      },
      two: {
        type: Number,
        default: 0,
      },
      three: {
        type: Number,
        default: 0,
      },
      four: {
        type: Number,
        default: 0,
      },
      five: {
        type: Number,
        default: 0,
      },
    },
    correctedDifficulty: {
      one: {
        type: Number,
        default: 0,
      },
      two: {
        type: Number,
        default: 0,
      },
      three: {
        type: Number,
        default: 0,
      },
      four: {
        type: Number,
        default: 0,
      },
      five: {
        type: Number,
        default: 0,
      },
    },
    availableQuestion: {
      one: {
        type: Array,
      },
      two: {
        type: Array,
      },
      three: {
        type: Array,
      },
      four: {
        type: Array,
      },
      five: {
        type: Array,
      },
    },
  },
});

//static signup method (attched on user model)
userSchema.statics.signup = async function (email, password, name) {
  // validation of email and password
  if (!email || !password) {
    throw Error("All fields must be filled");
  }
  if (!validator.isEmail(email)) {
    throw Error("Email not valid");
  }
  if (!validator.isStrongPassword(password)) {
    throw Error("Password not strong enough");
  }

  // if email exists then throw error else create a new user and store email and hashed password
  const exists = await this.findOne({ email });
  if (exists) {
    throw Error("Email already in use");
  }

  // hashing the password using a random salt
  const salt = await bcrypt.genSalt(10);
  const hash = await bcrypt.hash(password, salt);

  const user = await this.create({ email, password: hash, name });

  return user;
};

// static login method
userSchema.statics.login = async function (email, password) {
  if (!email || !password) {
    throw Error("All fields must be filled");
  }

  const user = await this.findOne({ email });
  if (!user) {
    throw Error("Incorrect email");
  }

  // compare hashed password with actual one
  const match = await bcrypt.compare(password, user.password);
  if (!match) {
    throw Error("Incorrect password");
  }

  return user;
};

module.exports = mongoose.model("User", userSchema);
