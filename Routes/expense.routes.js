const express = require('express');
const router = express.Router();
const {showExpenses,addExpense,showParticularExpense,updateExpense,deleteExpense} = require('../controller/expense.controller.js');
const auth = require('../middleware/auth.middleware.js');
router.use(auth);

router.get("/", showExpenses);
router.post("/", addExpense);
router.get("/:id", showParticularExpense);
router.put("/:id", updateExpense);
router.delete("/:id", deleteExpense);

module.exports = router;