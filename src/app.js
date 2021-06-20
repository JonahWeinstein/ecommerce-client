const path = require('path')
const express = require('express')
const hbs =require('hbs')



const app = express()


// Defining paths for express config and hbs partials
const publicDirPath = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')

// Setup handlebars engine and views location
app.set('view engine','hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)

// Setup static directory to serve
app.use(express.static(publicDirPath))


app.get('', (req, res) =>{
    res.render('index', {
        title: 'Hello',
    })
})
app.get('/register', (req, res) =>{
    res.render('register', {
        title: 'REGISTER',
    })
})
app.get('/login', (req, res) =>{
    res.render('login', {
        title: 'LOGIN',
    })
})


app.get('/dashboard', (req, res) => {
    res.render('dashboard', {
        title: 'Dashboard'
    })
})



module.exports = app