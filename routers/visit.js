const {Router} = require("express");
const {PatientRegistry} = require("../registry/patient.registry");
const {DoctorRegistry} = require("../registry/doctor.registry");
const {VisitsRegistry} = require("../registry/visits.registry");

const visitRouter = Router();

visitRouter
    .get('/add-form', (req, res) => {
        res.render('visit/visit-add-form');
    })
    .post('/', async (req, res) => {
        const {patientId, doctorId, dataVisit} = req.body;

        const visit = new VisitsRegistry({
            ...req.body,
        });
        const id = await visit.insert();

        res.render('visit/visit-added', {
            id,
            patientId: visit.patientId,
            doctorId: visit.doctorId,
        });
    })
    .get('/visits', async (req, res) => {
        const visitsList = await VisitsRegistry.listAll();
        const patientsList = await PatientRegistry.listAll();
        const doctorsList = await DoctorRegistry.listAll();
        res.render('visit/visit-list-all', {
            patientsList,
            doctorsList,
            visitsList,
        });
    });

module.exports = {
    visitRouter,
};