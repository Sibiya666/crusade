const { Schema, model } = require('mongoose');

const spacemarinSchema = new Schema({
    name: {
        type: String,
        require: true
    },
    platoonId: {
        type: Number,
        require: true
    },
    photo: {
        type: String,
        require: true
    },
    cost: {
        type: Number,
        require: true
    },

    incvisitorId: {
        type: Schema.Types.ObjectId,
        ref: 'Incvisitor'
    }
});

module.exports = model('spacemarine', spacemarinSchema);