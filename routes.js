const express = require('express')
const router = express.Router();
const Expenses = require("../models/user");

// add expense
router.post("/CreateExpense", (req, res) => {
    // console.log(req.body)
    const expense = new Expenses({
        expenseName: req.body.expenseName,
        cost: req.body.expenseAmount,
        created: Date.now()
    })
    expense.save((error) => {
        if (error) {
            res.json({ message: error, type: "danger" })
        }
        else {
            res.redirect("/");
            console.log("Success");
        }
    })
})
router.get("/", (req, res) => {
    Expenses.find().exec((err, expenses) => {
        if (err) {
            res.json({ message: err.message })
        }
        else {
            const a = Expenses.find();
            console.log(a)
            res.render("index", {
                title: "Home Page",
                expenses: expenses
            })
        }
    })
})
router.get("/Create", (req, res) => {
    res.render("Create", { title: "Create" });
})
router.get("/edit/:id", (req, res) => {
    let id = req.params.id;
    Expenses.findById(id, (err, expense) => {
        if (err) res.redirect('/')
        else {
            res.render('Update', {
                title: "Edit Expense",
                expense: expense
            });
        }
    })
})
router.post("/updatedExpense/:id", (req, res) => {
    let id = req.params.id;
    Expenses.findByIdAndUpdate(id, {
        expenseName: req.body.expenseName,
        cost: req.body.expenseAmount,
    }, (err, result) => {
        if (err) res.json({ message: err.message })
        else {
            res.redirect("/");
        }
    })
})
router.get("/Delete/:id", (req, res) => {
    let id = req.params.id;
    Expenses.findByIdAndDelete(id, (err, result) => {
        if (err) res.json({ message: err.message })
        else res.redirect("/");
    })

})


module.exports = router;