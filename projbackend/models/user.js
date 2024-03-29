const mongoose = require("mongoose");
const crypto = require('crypto');
const uuidv1 = require("uuid/v1");

const userSchema = new mongoose.Schema(
  {
    name:{
      type: String,
      required: true,
      maxlength: 40,
      trim:true
    },
    lastname:{
      type:String,
      maxlength:40,
      trim:true
    },
    email:{
      type:String,
      reuired:true,
      trim:true,
      unique:true
    },
    userinfo: {
      type:String,
      trim:true
    },
    //TODO: come back later
    encry_password:{
      type: String,
      required: true
    },
    salt: String,
    role:{
      type:Number,
      default: 0
    },
    purchases:{
      type: Array,
      default: []
    }
  },
  {
  timestamps: true
  }
);

userSchema
  .virtual("password")
  .set(function(password){
    this._password = password;
    this.salt = uuidv1();
    this.encry_password = this.securePassword(password);
  })
  .get(function(){
    return this._password;
  });

userSchema.methods = {
  authenticate: function(plainPassword){
    return this.securePassword(plainPassword) === this.encry_password;
  },
  securePassword : function(plainPassword){
    if(!plainPassword)
      return "";
    try {
      return crypto.createHmac("sha256", this.salt)
      .update(plainPassword)
      .digest("hex");
    } catch (err) {
      return "";
    }

  }
}


module.exports = mongoose.model("User", userSchema);
