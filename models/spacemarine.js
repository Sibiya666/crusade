const { nanoid } = require('nanoid');
const fs = require('fs').promises;
const path = require('path');

const PATH_TO_PLATOON_LIST = path.join(__dirname, '..', 'db', 'platoon-list.json');

class Spacemarine {
    constructor(name, platoonId, photo, cost) {
        this.name = name;
        this.platoonId = platoonId;
        this.photo = photo;
        this.cost = cost
        this.id = nanoid()
    }

    async save() {
        const newPlatoonList = await Spacemarine.getAll();

        newPlatoonList.push({
            name: this.name,
            platoonId: this.platoonId,
            photo: this.photo,
            id: this.id,
            cost: this.cost
        });

       await Spacemarine.writeFile(PATH_TO_PLATOON_LIST, newPlatoonList)
    }

    static async getAll() {
      return JSON.parse( await fs.readFile(PATH_TO_PLATOON_LIST, 'utf-8'));
    }

    static async getById(id) {
        const all = await Spacemarine.getAll();
        return all.find(spacemarine => spacemarine.id === id);
    }

    static async update(name, photo, id, platoonId) {
        const platoon = await Spacemarine.getAll();
        const findSpacemarinteIndex = platoon.findIndex(fidnSpacemarine => fidnSpacemarine.id === id);
    
        platoon[findSpacemarinteIndex] = { name, photo, id, platoonId, cost };

        await Spacemarine.writeFile(PATH_TO_PLATOON_LIST, platoon);
    } 

    static async writeFile(path, platoon) {
        await fs.writeFile(path, JSON.stringify(platoon))
    }
}

module.exports = Spacemarine;