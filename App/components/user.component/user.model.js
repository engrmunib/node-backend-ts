const bcrypt = require("bcryptjs");



// userSchema.pre("save", async function (next) {
//   // Only run this function if password was actually modified
//   if (!this.isModified("password")) return next();

//   // Hash the password with cost of 12
//   this.password = await bcrypt.hash(this.password, 12);
//   next();
// });


// userSchema.methods.correctPassword = async function (
//   candidatePassword,
//   userPassword
// ) {
//   return await bcrypt.compare(candidatePassword, userPassword);
// };

// const User = mongoose.model("User", userSchema);

module.exports = {User}

