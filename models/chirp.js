const {Schema, model, Types} = require("mongoose");
const dateFormat = require("../utils/dateFormat");

// `chirpText`,`createdAt`,`username`,`reactions`
const chirpSchema = new Schema(
    {
      chirpText: {
        type: String,
        required: true,
        maxlength: 150,
      },
      createdAt: {
        type: Date,
        default: Date.now,
        get: (createdAtVal) => dateFormat(createdAtVal),
      },
      username: {
        type: String,
        required: true,
      },
    },
    {
      toJSON: {
        virtuals: true,
        getters: true,
      },
      id: false,
    }
  );