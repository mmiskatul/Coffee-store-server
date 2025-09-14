const express = require('express');
const app=express();
const cors = require('cors');
const port =process.env.PORT || 5001;
// middleware
app.use(cors());
app.use(express.json())

// routes
app.get('/',(req,res)=>{
    res.send('Api is working...');
})

app.listen(port ,()=>{
    console.log(`server is running on the http://localhost:${port}`);
})