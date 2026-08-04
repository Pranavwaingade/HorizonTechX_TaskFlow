import mongoose from "mongoose";
import bcrypt from "bcryptjs";

const userSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: [true, "Name is required"],
            trim: true,
            minlength: 2,
            maxlength: 50,
        },

        email: {
            type: String,
            required: [true, "Email is required"],
            unique: true,
            lowercase: true,
            trim: true,
        },

        password: {
            type: String,
            required: [true, "Password is required"],
            minlength: 6,
            select: false,
        },

        avatar: {
            type: String,
            default: "",
        },

        role: {
            type: String,
            enum: ["member", "admin"],
            default: "member",
        },
    },
    {
        timestamps: true,
    }
);

// Hash Password Before Saving
userSchema.pre("save", async function () {

    if (!this.isModified("password")) return;

    const salt = await bcrypt.genSalt(10);

    this.password = await bcrypt.hash(this.password, salt);

});

// Compare Password
userSchema.methods.comparePassword = async function (enteredPassword) {

    return await bcrypt.compare(enteredPassword, this.password);

};

const User = mongoose.model("User", userSchema);

export default User;