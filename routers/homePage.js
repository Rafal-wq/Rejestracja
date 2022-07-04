const {Router} = require("express");

const homePageRouter = Router();

homePageRouter
    .get('/', (req, res) => {
        res.render('home/home');
    });

module.exports = {
    homePageRouter,
}