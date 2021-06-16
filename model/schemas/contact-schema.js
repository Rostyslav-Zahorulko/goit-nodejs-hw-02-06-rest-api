const mongoose = require("mongoose");
const mongoosePaginate = require("mongoose-paginate-v2");

const { Schema, SchemaTypes } = mongoose;

const contactSchema = new Schema(
  {
    name: {
      type: String,
      minlength: 5,
      maxLength: 45,
      validate: {
        validator: (value) => /[A-Z]\w+ [A-Z]\w+/.test(value),
        message: (props) => `${props.value} is not a valid name!`,
      },
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    phone: {
      type: String,
      validate: {
        validator: (value) => /\([0-9]{3}\) [0-9]{3}-[0-9]{4}/.test(value),
        message: (props) => `${props.value} is not a valid phone number!`,
      },
      required: true,
    },
    favorite: {
      type: Boolean,
      default: false,
    },
    owner: {
      type: SchemaTypes.ObjectId,
      ref: "user",
    },
  },
  {
    versionKey: false,
    timestamps: true,
    toObject: { virtuals: true },
    toJSON: {
      virtuals: true,
      transform: function (doc, ret) {
        delete ret._id;
        delete ret.createdAt;
        delete ret.updatedAt;

        return ret;
      },
    },
  }
);

contactSchema.plugin(mongoosePaginate);

module.exports = contactSchema;
