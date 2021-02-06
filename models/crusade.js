 const { Schema, model } = require('mongoose');

 const crusadeShema = new Schema({
    recruit: [{
        spacemarine: {
            type: Object,
            required: true
        },
        count: {
            type: Number,
            required: true
        }
    }],
    inquisitor: {
        name: String,
        inquisitorId: {
            type: Schema.Types.ObjectId,
            ref: 'Inquisitor',
            required: true
        }
    },
    date: {
        type: Date,
        default: Date.now
    }
 });

 module.exports = model('Crusade', crusadeShema);
