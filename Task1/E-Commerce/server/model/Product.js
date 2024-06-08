const mongoose= require('mongoose');
 
const Product= new mongoose.Schema({
    brand: {type:String, required: true},
    price: {type: String, required: true}
});

const prodModel= mongoose.model('Product', Product);

module.export=prodModel;