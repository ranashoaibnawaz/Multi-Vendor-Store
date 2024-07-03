const mongoose = require("mongoose");
const validator = require("validator");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const secreteKey = process.env.KEY;

const UserSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true,
        trim:true
    },
    email:{
        type:String,
        required:true,
        unique:true,
        validator(value)
        {
            if(validator.isEmail(value))
            {
                throw new Error("This Email Is Not Valid")
            }
        }
    },
    phone:{
        type:String,
        required:true,
        maxlength:11
    },
    password:{
        type:String,
        required:true,
        minlength:5
    },
    confirmPassword:{
        type:String,
        required:true,
        minlength:5
    },
    tokens : [
        {
            token:{
                type:String,
                required:true,
            }
        }
    ],
    carts: Array
})

UserSchema.pre("save",async function (next){
    if(this.isModified("password"))
    {
        this.password = await bcrypt.hash(this.password,12);
        this.confirmPassword = await bcrypt.hash(this.confirmPassword,12);
    }
    next();
})

UserSchema.methods.generateAuthToken = async function()
{
    try {
        let token = jwt.sign({_id:this._id},secreteKey)
        this.tokens = this.tokens.concat({token:token});
        await this.save();
        return token;
    } catch (error) {
        console.log(error);
    }
}

UserSchema.methods.AddCart = async function(cart)
{
    try {
        this.carts = this.carts.concat(cart);
        await this.save();
        return this.carts
    } catch (error) {
        console.log(error);
    }
}

const USER = new mongoose.model("USER",UserSchema);



module.exports = USER;