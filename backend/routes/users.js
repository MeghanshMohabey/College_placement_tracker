const express = require('express');
const router = express.Router();
const User = require('../models/User');
const { protect, admin } = require('../middleware/auth');

// Get all students (Admin only)
router.get('/students', protect, admin, async (req, res) => {
    try {
        const students = await User.find({ role: 'student' }).select('-password');
        res.json(students);
    } catch (err) {
        res.status(500).json({ message: 'Server error', error: err.message });
    }
});

// Update student profile (Student only)
router.put('/profile', protect, async (req, res) => {
    try {
        const { cgpa, skills } = req.body;
        const user = await User.findById(req.user._id);

        if (user) {
            user.cgpa = cgpa !== undefined ? cgpa : user.cgpa;
            user.skills = skills !== undefined ? skills : user.skills;
            
            const updatedUser = await user.save();
            res.json({
                _id: updatedUser._id,
                name: updatedUser.name,
                email: updatedUser.email,
                role: updatedUser.role,
                cgpa: updatedUser.cgpa,
                skills: updatedUser.skills
            });
        } else {
            res.status(404).json({ message: 'User not found' });
        }
    } catch (err) {
        res.status(500).json({ message: 'Server error', error: err.message });
    }
});

module.exports = router;
