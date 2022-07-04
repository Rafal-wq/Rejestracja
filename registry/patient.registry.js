const {v4 : uuid} = require("uuid");
const {pool} = require("../utils/db");

class PatientRegistry {
    constructor(obj) {
        if (!obj.name || obj.name.length < 3 || obj.name.length > 25) {
            throw new Error('Imię musi mieć od 3 do 25 znaków.');
        }

        this.id = obj.id;
        this.name = obj.name;
        this.surname = obj.surname;
        this.pesel = obj.pesel;
    }

    async insert() {
        if (!this.id) {
            this.id = uuid();
        }

        await pool.execute("INSERT INTO `patients`(`id`, `name`, `surname`, `pesel`) VALUES(:id, :name, :surname, :pesel)", {
            id: this.id,
            name: this.name,
            surname: this.surname,
            pesel: this.pesel,
        });

        return this.id;
    }
    static async listAll() {
        const [patients] = await pool.execute("SELECT * FROM `patients`");
        return patients.map(obj => new PatientRegistry(obj));
    }
}


module.exports = {
    PatientRegistry,
};