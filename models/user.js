const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userSchema = new Schema({
  username: { 
    type: String,
    unique: true,
    trim: true,
    required: true,
    match: [/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/, 'Please enter a valid email address']
  },
  hash: { 
    type: String,
    trim: true, 
    required: [true, 'Password is required'] 
  },
  first: {
      type: String,
      trim: true,
      required: true
  },
  last: {
      type: String,
      trim: true,
      required: true
  },
  location: {
    address: {
      type: String,
      trim: true
    },
    city: {
      type: String,
      trim: true
    },
    state: {
      type: String,
      trim: true
    }
  },
  phoneNumber: {
    type: String,
    validate: {
      validator: function(v) {
        return /\d{3}-\d{3}-\d{4}/.test(v);
      },
      message: props => `${props.value} is not a valid phone number!`
    }
  },
  volunteerRadius: Number,
  userCreated: {
    type: Date,
    default: Date.now
  }
});

userSchema.set("toJSON", { virtuals: true });

const User = mongoose.model("User", userSchema);

module.exports = User;
