const {Router} = require("express");
const {DoctorRegistry} = require("../registry/doctor.registry");

const doctorRouter = Router();



doctorRouter
    .get('/add-form', (req, res) => {
        res.render('doctor/doctor-add-form');
    })
    .post('/', async (req, res) => {
        const {name, surname, specialization} = req.body;

        const doctor = new DoctorRegistry({
            ...req.body,
        });
        const id = await doctor.insert();

        res.render('doctor/doctor-added', {
            id,
            name: doctor.name,
            surname: doctor.surname,
            specialization: doctor.specialization,
        });
    })
    .get('/doctors', async (req, res) => {
        const doctorsList = await DoctorRegistry.listAll();

        res.render('doctor/doctor-list-all', {
            doctorsList,
        })
    });

module.exports = {
    doctorRouter,
};