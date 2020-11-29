const fsP = require('fs').promises;
const path = require('path');

const PATH_TO_THE_DB_RECRUITE = path.join(
    __dirname,
    '..',
    'db',
    'recruit.json'
);

class Recruit {
    static async add(spacemarine) {
        const order = await Recruit.readFile(PATH_TO_THE_DB_RECRUITE);
        const sameIndex = Recruit.getSameIndex(order, spacemarine.id);

        if (sameIndex >= 0) {
            order.recruit[sameIndex].count += 1;
        } else {
            spacemarine.count = 1;
            order.recruit.push(spacemarine)
        }

        order.score += Number(spacemarine.cost);
        await Recruit.writeFile(PATH_TO_THE_DB_RECRUITE, order);
    }

    static async fetch() {
        return Recruit.readFile(PATH_TO_THE_DB_RECRUITE);
    }

    static async readFile(pathTo) {
        return JSON.parse(await fsP.readFile(pathTo, 'utf-8'))
    }

    static async writeFile(pathTo, order) {
        await fsP.writeFile(pathTo, JSON.stringify(order))
    }

    static async remove(id) {
        const order = await Recruit.readFile(PATH_TO_THE_DB_RECRUITE);
        const sameIndex = Recruit.getSameIndex(order, id);

        if (sameIndex >= 0 && order.recruit[sameIndex].count > 1 ) {
            order.recruit[sameIndex].count--;
        } else {
            order.recruit = order.recruit.filter(element => element.id != id);
        }

        await Recruit.writeFile(PATH_TO_THE_DB_RECRUITE, order);
        return order;
    }

    static getSameIndex(order, id) {
       return order.recruit.findIndex(element => element.id === id)
    }
}

module.exports = Recruit;