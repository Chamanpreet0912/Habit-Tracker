// route folder for all habit-related API endpoints
// server/routes/habits.js
const express = require('express');
const router = express.Router(); // create a new router object to define our routes on
const Habit = require('../models/Habit');

// GET all habits
router.get('/', async (req, res) => {
  try {
    const habits = await Habit.find();
    res.json(habits);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// POST - create a new habit
router.post('/', async (req, res) => {
  const habit = new Habit({
    name: req.body.name,
    frequency: req.body.frequency || 'daily'
  });
  try {
    const newHabit = await habit.save();
    res.status(201).json(newHabit);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// PATCH - check in for today (the streak magic happens here!)
router.patch('/:id/checkin', async (req, res) => {
  try {
    const habit = await Habit.findById(req.params.id);

    const today = new Date();
    today.setHours(0, 0, 0, 0); // strip the time, keep only the date

    // check if already checked in today
    const alreadyDone = habit.checkIns.some(date => {
      const d = new Date(date);
      d.setHours(0, 0, 0, 0);
      return d.getTime() === today.getTime();
    });

    if (alreadyDone) {
      return res.json({ message: 'Already checked in today!', habit });
    }

    // add today to checkIns
    habit.checkIns.push(today);

    // calculate streak
    const yesterday = new Date(today);
    yesterday.setDate(yesterday.getDate() - 1);

    const checkedYesterday = habit.checkIns.some(date => {
      const d = new Date(date);
      d.setHours(0, 0, 0, 0);
      return d.getTime() === yesterday.getTime();
    });

    if (checkedYesterday) {
      habit.currentStreak += 1;
    } else {
      habit.currentStreak = 1; // streak broken, start over
    }

    habit.longestStreak = Math.max(habit.longestStreak, habit.currentStreak);

    await habit.save();
    res.json(habit);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// DELETE a habit
router.delete('/:id', async (req, res) => {
  try {
    await Habit.findByIdAndDelete(req.params.id);
    res.json({ message: 'Habit deleted' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router; // export the router so we can use it in our main server file