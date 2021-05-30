const express=require("express");
const bodyParser=require("body-parser");
const request=require("request");

const https=require("https");

const app=express();
app.use(bodyParser.urlencoded({extended:true}));

app.use(express.static("public"));
app.get("/",function(req,res){
  res.sendFile(__dirname+"/signup.html");
});


app.post("/",function(req,res){

  const firstname=req.body.firstName;
  const lastname=req.body.lastName;
  const youremail=req.body.yourEmail;
  // console.log(firstname);
  const data={
    members:[
      {
        email_address:youremail,
        status:"subscribed",
        merge_fields:{
          FNAME:firstname,
          LNAME:lastname
        }
      }
    ]
  };
  const jsonData=JSON.stringify(data);

  const url="https://us6.api.mailchimp.com/3.0/lists/b2fbe2477d";

  const options={
    method:"POST",
    auth:"aman:0c5fb86095fc1e34b5209b1a5cb98962-us6"

  }

  const request=https.request(url,options,function(response){
    if (response.statusCode===200){
      res.sendFile(__dirname+"/success.html");
    }
    else{
      res.sendFile(__dirname+"/failure.html");
    }
    response.on("data",function(data){
      console.log(JSON.parse(data));
    });
  });
  request.write(jsonData);
  request.end();
});

app.post("/failure",function(req,res){
  res.redirect("/");
});


app.listen(process.env.PORT || 3000,function(){
  console.log("Server is running on port 3000");
});

// const apikey="0c5fb86095fc1e34b5209b1a5cb98962-us6";

// List ID
// b2fbe2477d
