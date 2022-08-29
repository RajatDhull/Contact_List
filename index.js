const express=require('express');
const path=require('path');
const port=8000;
const db=require('./database/mongoose');
const Contactss=require('./models/contact');  //using the model by the name Contactss
const app=express();
app.use(express.urlencoded());
//To use links folder 
app.use(express.static('links'));
// app.get('/',function(req,res){
//     console.log(req);
//     res.send('<p1> Hii WoRlD</p1>');
// });
// app.get('/profile',function(req,res){
//     res.send('<p1> Holaaa WoRlD</p1>');
// });
// let pgTitle;
// function title(){
// pgTitle=prompt("Enter the name of contact list!!");
// }
let contact_list=[];
app.set('view engine','ejs'); //view engine
app.set('views',path.join(__dirname,'views')); //path on which files are present which are to be rendered
app.get('/',function(req,res){      //homepage url
    return res.render('home',{title:"Hlew World"});
});
app.get('/abc',function(req,res){
    Contactss.find({},function(err,contact){
        if(err){
            console.log("Error occured: ",err);
            return;
        }
    
    return res.render('practice',{
        title:"My Contacts",
        contacts:contact
        })
    })
});
app.post('/action',function(req,res){
    //the below one is to push all the requests differently..
    // contact_list.push({
    //     name: req.body.name,
    //     Address: req.body.Address,
    //     phoneNo: req.body.phoneNo 
    // })
    //This one is to push all requests in one go..
    contact_list.push(req.body);
    // return res.redirect('/abc')
    //Create a contact and push it to database referred here by name contactss
    Contactss.create({
        name:req.body.name,
        Address:req.body.Address,
        phoneNo:req.body.phoneNo //this whole is contact_
    },function(err,contact_){
        //here we are getting check that whether error occured or we have added the contact successfully..
        if(err){
            console.log("Error occured: ",err);
            return;
        }
        console.log("Succesfully added contact: ",contact_);
        return res.redirect('back');
    })
    // return res.redirect('/');
    //redirect k ander url bhejni hai, ki kis page pe redirect hona hai...
});
app.get('/delete-contact/', function(req, res){
    console.log(req.query);
    let contact_id = req.query._id; //jo id request me aai hai

    // let contactindex = contact_list.findIndex(contact => contact.phoneNo == phoneNo);
    // if(contactindex != -1){
    //     contact_list.splice(contactindex, 1);
    // }
    // return res.redirect('/abc');
    Contactss.findByIdAndDelete(contact_id,function(err){
        if(err){
            console.log("Error occured while deleting the contact: ",err);
            return;
        }
        console.log("Contact deleted successfully!!");
    })
    return res.redirect('back');
});

app.listen(port,function(err){
    if(err){
        console.log('Error occured bro!!');
    }
    else{
        console.log('Sab thik chal rha hai');
    }
})
