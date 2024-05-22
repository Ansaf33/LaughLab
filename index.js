import express from "express"
import bodyParser from "body-parser";
import JokesAPI from "sv443-joke-api";
import axios from "axios";

const port = 3000;
const app = express();
app.listen(port,()=>{
  console.log("Listening at port " + port);
});

// ENSURING THAT STYLES IS USED
app.use(express.static("public"));
app.use(bodyParser.urlencoded({extended:true}));
// GETTING THE HOME PAGE ( SHOULD CONTAIN DATA LATER ON )

app.get("/",(req,res)=>{
  res.render("index.ejs");
});

app.post("/",async(req,res)=>{

  try{
    // GET THE FLAGS
    console.log(req.body);
    const partial = encodeURI(req.body.content);
    console.log(partial);
   


    const URL = "https://v2.jokeapi.dev/joke/"+req.body.category+"?type="+req.body.type+"&contains="+partial
    console.log(URL);

    
    const response = await axios(URL);
    console.log(response.data);
    
    res.render("index.ejs",{
      joke:response.data
    });

  }
  catch (error) {
    console.error("Failed to make request:", error.message);
    res.render("index.ejs", {
      error: error.message,
    });
  }
  

  

  

  


})



