const Expense = require('../model/expense.model.js');

const addExpense = async (req , res) => {
    try{
        const {title,amount,date,category,paymentMode} = req.body;
        
        const userID = req.user.id;
        const newExpense = new Expense({
            user: userID,
            title,
            amount,
            date,
            category,
            paymentMode
        });
        await newExpense.save();
        res.status(201).json({data: newExpense});
    }catch(err){
        console.log(err);
        res.status(500).json({error: "Error adding expense"});
    }
}

const showExpenses = async (req,res) => {
    try{
        const userId = req.user.id;
        const expenses = await Expense.find({user: userId});
        res.json({data: expenses});
    }catch(err){
        res.status(500).json({error: "Error fetching expenses"});
    }
}

const showParticularExpense = async (req,res)=>{
    try{
        const expenseId = req.params.id;
        const expense = await Expense.findById(expenseId);
        res.json({data: expense});
    }catch(err){
        res.status(500).json({error: "Error fetching expense"});
    }
}

const updateExpense = async (req , res)=>{
    try{
        const expenseId = req.params.id;
        const {title,amount,category,paymentMode,date} = req.body;
        const updatedExpense = await Expense.findByIdAndUpdate(expenseId,{
            title,
            amount,
            date,
            category,
            paymentMode
        });
        res.json({data: updatedExpense});
    }catch(err){
        res.status(500).json({error: "Error updating expense"});
    }
}

const deleteExpense = async (req,res)=>{
    try{
        const expenseId = req.params.id;
        await Expense.findByIdAndDelete(expenseId);
        res.json({message: "Expense deleted successfully"});
    }catch(err){
        res.status(500).json({error: "Error deleting expense"});
    }
}



module.exports = {
    addExpense,
    showExpenses,
    showParticularExpense,
    updateExpense,
    deleteExpense
}