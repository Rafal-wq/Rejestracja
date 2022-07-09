const {v4 : uuid} = require("uuid");
const {pool} = require("../utils/db");

class VisitsRegistry {
    constructor(obj) {
        // if (!obj.name || obj.name.length < 3 || obj.name.length > 25) {
        //     throw new Error('Imię musi mieć od 3 do 25 znaków.');
        // }

        this.id = obj.id;
        this.patientId = obj.patientId;
        this.doctorId = obj.doctorId;
        this.dataVisit = obj.dataVisit;
    }

    async insert() {
        if (!this.id) {
            this.id = uuid();
        }

        await pool.execute("INSERT INTO `visits`(`id`, `patientId`, `doctorId`, `dataVisit`) VALUES(:id, :patientId, :doctorId, :dataVisit)", {
            id: this.id,
            patientId: this.patientId,
            doctorId: this.doctorId,
            dataVisit: this.dataVisit,
        });

        return this.id;
    }
    static async listAll() {
        const [visits] = await pool.execute("SELECT * FROM `visits`");
        return visits.map(obj => new VisitsRegistry(obj));
    }
}


module.exports = {
    VisitsRegistry,
};