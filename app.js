const express=require("express")
const app=express();
const request =require("request");
const bodyparser=require("body-parser");
const https=require("https");
const { receiveMessageOnPort } = require("worker_threads");
const { json } = require("body-parser");

app.use(express.static("public"));
app.use(bodyparser.urlencoded({
    extended: true
}))
app.get("/",function(req,res){
    res.sendFile(__dirname + "/signup.html");
})
app.post("/",function(req,res){
    const firstname =req.body.fname;
    const secname = req.body.sname;
    const email=req.body.mail;
    console.log(firstname,secname,email);
    const data={
        members:[
            {
                email_address : email,
                status: "subscribed",
                merge_fields:{
                    FNAME:firstname,
                    LNAME: secname
                }
            } 
        ]
};
    const jsonData=JSON.stringify(data);
    const url = "https://us21.api.mailchimp.com/3.0/lists/cb90d6f4ec"
    const options={
        method:"POST",
        auth:"sunil:fcc12a8720e99c95bb3eec11d87a9417-us21"
    }
    const request=https.request(url,options,function(response){
        if(response.statusCode==200){
            res.sendFile(__dirname+"/sucess.html");
        }
        else{
            res.sendFile(__dirname+"/failure.html")
        }
    response.on("data",function(data){
     console.log(JSON.parse(data));
    })
    })
    // request.write(jsonData);
    request.end();
})
app.post("/failure",function(req,res){
    res.redirect("/");  
});
app.listen(3000);

// fcc12a8720e99c95bb3eec11d87a9417-us21
//  cb90d6f4ec