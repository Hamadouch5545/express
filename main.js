const express = require('express');
const app = express();


app.get('/', (req, res) => {
    res.sendFile(__dirname + '/home.html');
});

app.get('/services', (req, res) => {
    res.sendFile(__dirname + '/services.html');
});
app.get('/contact', (req, res) => {
    res.sendFile(__dirname + '/contact.html');
});

app.listen(4000, () => {
    console.log('Server started on port 3000');
});

function checkWorkingHours(req, res, next) {
    let date = new Date();
    let day = date.getDay();
    let hour = date.getHours();
    if (day >= 1 && day <= 5 && hour >= 9 && hour <= 17) {
        next();
    } else {
        res.status(503).send('Sorry, the web application is only available during working hours (Monday to Friday, from 9 to 17)');
    }
}
app.get('/', checkWorkingHours, (req, res) => {
    res.sendFile(__dirname + '/home.html');
});
app.get('/services', checkWorkingHours, (req, res) => {
    res.sendFile(__dirname + '/services.html');
});
app.get('/contact', checkWorkingHours, (req, res) => {
    res.sendFile(__dirname + '/contact.html');
});
