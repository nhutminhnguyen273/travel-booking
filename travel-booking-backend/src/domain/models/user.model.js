const mongoose = require("mongoose");
const genderEnum = require("../enums/gender.enum");
const roleEnum = require("../enums/role.enum");

const userSchema = new mongoose.Schema(
    {
        fullName: {
            type: String,
            required: true,
            trip: true
        },
        dateOfBirth: {
            type: Date,
            required: true
        },
        gender: {
            type: String,
            required: true,
            enum: Object.values(genderEnum),
            default: genderEnum.OTHER
        },
        email: {
            type: String,
            unique: true,
            required: true
        },
        phone: {
            type: String,
            unique: true,
            required: true
        },
        role: {
            type: String,
            required: true,
            enum: Object.values(roleEnum),
            default: roleEnum.CUSTOMER
        },
        password: {
            type: String,
            minLength: 6
        },
        isDelete: {
            type: Boolean,
            default: false
        }
    },
    { timestamps: true }
);

module.exports = mongoose.model("users", userSchema);