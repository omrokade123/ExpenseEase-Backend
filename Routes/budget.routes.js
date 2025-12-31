const express = require('express');
const router = express.Router();
const Budget = require('../model/budget.model.js'); // Adjust path to your model
const authMiddleware = require('../middleware/auth.middleware.js'); // You definitely need this

router.use(authMiddleware);
// 1. CREATE or UPDATE a Budget
// POST /api/budget
router.post('/', async (req, res) => {
    try {
        const { totalamount, category, month,year } = req.body;

        // Validation: Check if all fields are there
        if (!totalamount || !category || !month || !year) {
            return res.status(400).json({ error: "Please provide amount, category, month, and year" });
        }

        // LOGIC: Check if a budget already exists for this User + Category + Month + Year
        // If yes -> Update it. If no -> Create new.
        
        let budget = await Budget.findOne({ 
            user: req.user.id, 
            category, 
            month, 
            year 
        });

        if (budget) {
            // Update existing
            budget.totalamount = totalamount;
            await budget.save();
            return res.json({ message: "Budget updated", data: budget });
        } else {
            // Create new
            budget = new Budget({
                user: req.user.id,
                totalamount,
                category,
                month,
                year
            });
            await budget.save();
            return res.status(201).json({ message: "Budget set", data: budget });
        }

    } catch (error) {
        console.log(error);
        return res.status(500).json({ error: "Server error" });
    }
});

// 2. GET Budgets (Usually filtering by Month/Year)
// GET /api/budget?month=January&year=2025
router.get('/', async (req, res, next) => {
    try {
        const { month, year } = req.query;
        
        const query = { user: req.user.id };
        
        // If user sends month/year, filter by it. Otherwise return ALL budgets.
        if (month) query.month = month;
        if (year) query.year = year;

        const budgets = await Budget.find(query);
        res.json(budgets);
    } catch (error) {
        next(error);
    }
});

module.exports = router;