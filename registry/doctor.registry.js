const {v4 : uuid} = require("uuid");
const {pool} = require("../utils/db");

class DoctorRegistry {
    constructor(obj) {
        if (!obj.name || obj.name.length < 3 || obj.name.length > 25) {
            throw new Error('Imię musi mieć od 3 do 25 znaków.');
        }

        this.id = obj.id;
        this.name = obj.name;
        this.surname = obj.surname;
        this.specialization = obj.specialization;
    }

    async insert() {
        if (!this.id) {
            this.id = uuid();
        }

        await pool.execute("INSERT INTO `doctors`(`id`, `name`, `surname`, `specialization`) VALUES(:id, :name, :surname, :specialization)", {
            id: this.id,
            name: this.name,
            surname: this.surname,
            specialization: this.specialization,
        });

        return this.id;
    }
    static async listAll() {
        const [doctors] = await pool.execute("SELECT * FROM `doctors`");
        return doctors.map(obj => new DoctorRegistry(obj));
    }
}


module.exports = {
    DoctorRegistry,
};