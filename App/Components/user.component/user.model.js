const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

const skillSchema = new mongoose.Schema({
    name: {
      type:String,
      required:[true, "Skill must have a name"]
    },
    experience: {
      type: Number,
    },
    comments: {
      type:String,
    }
})

const userSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: [true, "Please tell us your name!"],
  },
  skills: [skillSchema],
  lastName: {
    type: String,
  },
  email: {
    type: String,
    required: [true, "Please provide your email"],
    unique: true,
    lowercase: true,
  },
  password: {
    type: String,
    required: [true, "Please provide a password"],
    minlength: 8,
    select: false,
  },
  age: {
    type: Number,
    default:0
  },
  phoneNo: [Number],
  type: {
    type: String,
    required: [true, 'A user must have a type'],
    enum: {
      values: ['owner', 'employee', 'temporary'],
      message: 'User is either: owner, employee, temporary'
    }
  },
});

userSchema.pre("save", async function (next) {
  // Only run this function if password was actually modified
  if (!this.isModified("password")) return next();

  // Hash the password with cost of 12
  this.password = await bcrypt.hash(this.password, 12);
  next();
});


userSchema.methods.correctPassword = async function (
  candidatePassword,
  userPassword
) {
  return await bcrypt.compare(candidatePassword, userPassword);
};

const User = mongoose.model("User", userSchema);

module.exports = {User}

