const mongoose = require("mongoose");
const {ObjectId} = mongoose.Schema;

//Productcart Schema
const productCartScehma = new mongoose.Schema({
  product:{
    type:ObjectId,
    ref:"Product"
  },
  name:String,
  count:Number,
  price:Number,

})

const ProductCart = mongoose.model("ProductCart", productCartScehma);

//Order Schema
const orderSchema = new mongoose.Schema(
  {
    products:[productCartScehma],
    transaction_id:{},
    amount:{type:Number},
    updated:Date,
    address:String,
    user:{
      type:ObjectId,
      ref:"User"
    }
  },
  {timestamps:true}
);

const Order = mongoose.model("Order", orderSchema);

module.exports = {ProductCart, Order};
