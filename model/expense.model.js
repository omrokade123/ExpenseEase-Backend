const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const budgetSchema = require('./budget.model.js');

const expenseSchema = new Schema({
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    title:{
        type: String,
        required: true
    },
    amount:{
        type: Number,
        required: true
    },
    date:{
        type: Date,
        default: Date.now
    },
    category:{
        type: String,
        required: true,
        enum: ['Food','Transport','Utilities','Entertainment','Healthcare','Other']
    },
    paymentMode : {
        type: String,
        enum: ['UPI','Cash','Card'],
        default: 'UPI'
    }
})


const Expense = mongoose.model('Expense',expenseSchema);
module.exports = Expense;