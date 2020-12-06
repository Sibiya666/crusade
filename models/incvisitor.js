const { Schema, model } = require('mongoose');

const inquisitorSchema = new Schema({
    name: {
        type: String,
        required: true
    },

    email: {
        type: String,
        required: true
    },

    recruit: {
        items: [
            {
                count: {
                    type: String,
                    require: true,
                    default: 1
                },
                spacemarineId: {
                    type: Schema.Types.ObjectId,
                    ref: 'Schema',
                    require: true,
                }
            }
        ]
    }
});

incvisitorSchema.methods.addToCrusade = function (spacemarine) {
    const items = [...this.recruit.items];
}

module.exports = model('Incvisitor', inquisitorSchema);