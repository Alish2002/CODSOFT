// importing the required libraries/modules to make server
const express= require('express');
const mongoose=require('mongoose');
const bodyParser=require('body-parser');
const cors=require('cors');
const route=require('./routes/route');

// to connect with mongodb database
mongoose.connect('mongodb+srv://alishkamboj2002:ecommerce123456789@cluster0.f5ro2e3.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0',{
    // automatically detect changes in db
    useNewUrlParser:true,
    useUnifiedTopology:true
})

// // to make instance of database  to access it
const db=mongoose.connection;

// db.on() is just like a listener
db.on('open',()=>{
    console.log("Connected to MongoDB.");
})

// creating an instance of express server
const app=express();

const PORT=5000;

// used as a middleware to pass the data stream that we recieve from the client to the server side(app.use(express.json))
app.use(bodyParser.json());

app.use(cors({
    origin: 'http://localhost:3000',  
    methods: ['GET', 'POST','DELETE','UPDATE'],
  }));

// url->http://127.0.0.1:5000/data    5000-> port of server
// this method is used to handle the server side request driven by client
app.get('/data',(req,res)=>{
    // console.log(req.body);
    // u can also use---> res.json and res.status(200).json({message:""})
    console.log(req.body);
   res.send(req.body);  
})

app.post('/postdata',(req,res)=>{
    // here we will save data in database
    console.log(req.body);
    res.send(req.body);
})
// for routing we use this method
app.use('/api',route);

// to run a server
app.listen(PORT,()=>{
    console.log("Server is running at port="+PORT);
})

