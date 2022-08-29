const mongoose=require('mongoose');
const contactSchema=new mongoose.Schema({
    name: {
        type:String,
        required:true
    },
    Address: {
        type: String,
        required:true
    },
    phoneNo: {
        type: String,
        required:true
    }
});
// const My_Contacts=mongoose.model('My_Contacts',contactSchema); // model name, schema name are the args
module.exports=mongoose.model('My_Contacts',contactSchema);  //to export the model