const mongoose = require("mongoose");
const userSchema = mongoose.Schema({
  firstName: {
    type: String,
    required: true,
  },
  lastName: {
    type: String,
    required: false,
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
  userType: {
    type: String,
    required: true,
    enum: ["user", "admin"],
    default: "user",  
  },
  phoneNumber: {
    type: Number,
    required: false,
  },
});



module.exports = mongoose.model("User", userSchema);
