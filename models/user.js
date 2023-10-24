const {Schema, model} = require("mongoose");

const userSchema = new Schema({
    username: {
        type: String,
        unique: true,
        required: true,
        trim: true
    },
    email: {
        type: String,
        unique: true,
        required: true,
        match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, "Your email was Wrong,please enter a valid email address",]
    },
    chirp: [
        {
            type: Schema.Types.ObjectId,
            ref: "chirp"
        },
    ],
}, {
    toJSON: {
        virtuals: true,
        getters: true
    },
    id: false
});

// Create the model user using the userSchema
const User = model("User", userSchema);
module.exports = User;