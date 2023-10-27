const mongoose = require('mongoose');
const expenseSchema = new mongoose.Schema({
    expenseName: {
        type: String,
        required: true
    },
    cost: {
        type: Number,
        required: true
    },
    created: {
        type: String,
        required: true,
        default: Date.now
    }
})

module.exports = mongoose.model("Expenses", expenseSchema);