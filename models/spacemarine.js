const { Schema, model } = require("mongoose");

const spacemarinSchema = new Schema({
  name: {
    type: String,
    require: true,
  },
  platoonId: {
    type: Number,
    require: true,
  },
  photo: {
    type: String,
    require: true,
  },
  cost: {
    type: Number,
    require: true,
  },

  inquisitorId: {
    type: Schema.Types.ObjectId,
    ref: "Inquisitor",
  },
});

spacemarinSchema.method("toClient", function () {
  const spacemarine = this.toObject();
  spacemarine.id = spacemarine._id;
  delete spacemarine._id;

  return spacemarine;
});

module.exports = model("Spacemarine", spacemarinSchema);
