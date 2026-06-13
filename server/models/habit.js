// server/models/Habit.js
const mongoose = require('mongoose');

const habitSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  frequency: {
    type: String,
    default: 'daily'   // 'daily' or 'weekly'
  },
  checkIns: [ //as a diary of dates when user marked it done
    { type: Date }     // array of dates when user marked it done
  ],
  currentStreak: { // how many times in a row they've done it
    type: Number,
    default: 0
  },
  longestStreak: { // the longest streak they've ever had
    type: Number,
    default: 0
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('Habit', habitSchema); // export the Habit model so we can use it in our routes