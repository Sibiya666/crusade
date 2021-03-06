const { Schema, model } = require("mongoose");

const inquisitorSchema = new Schema({
  login: {
    type: String,
    required: true,
  },

  name: String,
  avatar: String,

  resetPasswordToken: String,
  resetPasswordTokenExparation: Date,

  email: {
    type: String,
    required: true,
  },

  password: {
    type: String,
    required: true,
  },

  recruit: {
    items: [
      {
        count: {
          type: String,
          require: true,
          default: 1,
        },
        spacemarineId: {
          type: Schema.Types.ObjectId,
          ref: "Spacemarine",
          require: true,
        },
      },
    ],
  },
});

inquisitorSchema.methods.addToCrusade = function (spacemarine) {
  const items = [...this.recruit.items];
  const index = items.findIndex(
    (element) => element.spacemarineId.toString() === spacemarine._id.toString()
  );

  if (index >= 0) {
    items[index].count = +items[index].count + 1;
  } else {
    items.push({
      spacemarineId: spacemarine._id,
      cound: 1,
    });
  }

  this.recruit = { items };

  return this.save();
};

inquisitorSchema.methods.removeFromCrusade = function (id) {
  let items = [...this.recruit.items];

  const index = items.findIndex(
    (element) => element.spacemarineId.toString() === id.toString()
  );

  if (items[index].count > 1) {
    items[index].count--;
  } else {
    items = items.filter(
      (element) => element.spacemarineId.toString() !== id.toString()
    );
  }

  this.recruit = { items };
  return this.save();
};

inquisitorSchema.methods.clearRecruit = function () {
  this.recruit = { items: [] };
  return this.save();
};

module.exports = model("Inquisitor", inquisitorSchema);
