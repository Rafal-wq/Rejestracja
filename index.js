const express = require("express");
require('express-async-errors');
const {engine} = require("express-handlebars");
const {homePageRouter} = require("./routers/homePage");
const {patientRouter} = require("./routers/patient");
const {doctorRouter} = require("./routers/doctor");
const {urlencoded} = require("express");

const app = express();

app.use(express.json());
app.use(urlencoded({
    extended: true,
}));
app.engine('.hbs', engine({
    extname: '.hbs',
}));
app.set('view engine', '.hbs');

app.use('/', homePageRouter);
app.use('/patient', patientRouter);
app.use('/doctor', doctorRouter);

app.listen(3000, 'localhost', () => {
    console.log('Listening on http://localhost:3000');
});