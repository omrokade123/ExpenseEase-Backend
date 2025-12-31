const express = require('express');
const app = express();
require('dotenv').config();
const port = process.env.PORT || 3000 ;
const userRoutes = require('./Routes/user.routes.js');
const expenseRoutes = require('./Routes/expense.routes.js');
const connectDB = require('./lib/connectDB.js');
const cors = require('cors');
const BudgetRoutes = require('./Routes/budget.routes.js');

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

connectDB();

app.use('/api',userRoutes);
app.use('/api/expense',expenseRoutes);
app.use('/api/budget',BudgetRoutes);

app.get('/', (req,res)=>{
    res.send('Welcome to ExpenseEase API');
})




app.listen(port,()=>{
    console.log(`Server is running on port ${port}`);
})