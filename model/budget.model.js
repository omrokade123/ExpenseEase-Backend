const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const budgetSchema = new Schema({
    user: {
        type : Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    totalamount:{
        type: Number,
        required: true
    },
    category: {
        type: String,
        required: true,
        enum: ['Food','Transport','Utilities','Entertainment','Healthcare','Other']
    },
    month:{
        type: String,
        required: true,
        enum: ['January','February','March','April','May','June','July','August','September','October','November','December']
    },
    year:{
        type: Number,
        required: true,
        min: 2000,
        max: 2100
    }
})

budgetSchema.index(
  { user: 1, category: 1, month: 1, year: 1 },
  { unique: true }
);

module.exports = mongoose.model('Budget',budgetSchema);