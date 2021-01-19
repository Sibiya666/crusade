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
    inqvisitor: {
        name: String,
        inqvisitorId: {
            type: Schema.Types.ObjectId,
            ref: 'Inqvisitor',
            required: true
        }
    },
    date: {
        type: Date,
        default: Date.now
    }
 });

 module.exports = model('Crusade', crusadeShema);
