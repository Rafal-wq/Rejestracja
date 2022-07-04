const {Router} = require("express");
const {PatientRegistry} = require("../registry/patient.registry");

const patientRouter = Router();



patientRouter
    .get('/add-form', (req, res) => {
        res.render('patient/patient-add-form');
    })
    .post('/', async (req, res) => {
        const {name, surname, pesel} = req.body;

        const patient = new PatientRegistry({
            ...req.body,
        });
        const id = await patient.insert();

        res.render('patient/patient-added', {
            id,
            name: patient.name,
            surname: patient.surname,
        });
    })
    .get('/patients', async (req, res) => {
        const patientsList = await PatientRegistry.listAll();

        res.render('patient/patient-list-all', {
            patientsList,
        })
    });

module.exports = {
    patientRouter,
};