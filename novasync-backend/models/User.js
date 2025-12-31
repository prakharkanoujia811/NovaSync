import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
    {
        name:{
            type:String,
            required:true,
            trim:true
        },
        email:{
            type:String,
            required:true,
            unique:true,
            lowercase:true
        },
        password:{
            type:String,
            required:true
        },
        phone:{
            type:String,
            unique:true,
            trim:true,
            sparse:true,
            validate: {
                validator: function(v) {
                    return /^\+[1-9]\d{1,14}$/.test(v);
                }
            }
        }
    } , { timestamps:true }
)

export default mongoose.model("User",userSchema);