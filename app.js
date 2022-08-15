const express = require('express')
const app = express()
const request = require('postman-request');
const http = require('http');
const mailchimp = require("@mailchimp/mailchimp_marketing");
const bodyParser = require('body-parser');

app.use(bodyParser.urlencoded({extended: true}));

app.use(express.static("public"));

app.get("/", function(req,res){
    res.sendFile(__dirname + "/signup.html" )
})
mailchimp.setConfig({
    //*****************************ENTER YOUR API KEY HERE******************************
     apiKey: "38284786e64cd72767ebe3c54bc2c46f-us14",
    //*****************************ENTER YOUR API KEY PREFIX HERE i.e.THE SERVER******************************
     server: "us14"
    });
app.post("/" , function(req , res){

    const firstName = req.body.firstName;
    const lastName =req.body.secondName;
    const mails = req.body.email;
  
    const listId = "d4bd59a9dd";
    //Creating an object with the users data
    const subscribingUser = {
     firstName: firstName,
     lastName: lastName,
     email: mails,
    };
    //Uploading the data to the server
     async function run() {
    const response = await mailchimp.lists.addListMember(listId, {
     email_address: subscribingUser.email,
     status: "subscribed",
     merge_fields: {
     FNAME: subscribingUser.firstName,
     LNAME: subscribingUser.lastName
    }
    });

}


 res.sendFile(__dirname + "/success.html")
 console.log(
"Successfully added contact as an audience member. The contact's id is ${ response.id}."
);  

//Running the function and catching the errors (if any)
// ************************THIS IS THE CODE THAT NEEDS TO BE ADDED FOR THE NEXT LECTURE*************************
// So the catch statement is executed when there is an error so if anything goes wrong the code in the catch code is executed. In the catch block we're sending back the failure page. This means if anything goes wrong send the faliure page
 run().catch(e => res.sendFile(__dirname + "/failure.html"));
});

app.listen(process.env.POST || 3000, function(){
console.log("world is listening")
})