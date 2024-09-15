const express = require('express');
const mongoose = require('mongoose')
const cors = require('cors')
const UserModel = require('./models/User')

const app = express()
app.use(express.json())
app.use(cors())

mongoose.connect("mongodb://127.0.0.1:27017/Sem5-project");

app.post('/signup', (req, res) => {
    UserModel.create(req.body)
        .then(users => res.json(users))
        .catch(err => res.json(err))
})

app.post('/login', (req, res) => {
    const {email, password} = req.body;
    UserModel.findOne({ email: email })
        .then(user => {
            if (user) {
                if (user.password === password) {
                    res.json("Success");
                } else {
                    res.json("The password is incorrect")
                }
            } else {
                res.json("No record exist")
            }
        })
})

app.listen(8080, () => {
    console.log('Server is running on port 8080');
})