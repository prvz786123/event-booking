const express = require("express");
const cors = require('cors');
const bodyParser = require('body-parser');
const fs = require('fs');

const app = express();
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));

app.get("/events-listings",(req,res)=>{
    let obj = JSON.parse(fs.readFileSync('./data/events.json'),'utf-8')
    res.send({success:true,events:obj})
})

app.post("/book-event",(req,res)=>{
    let new_booking_data=req.body;
    
        let booking_records = JSON.parse(fs.readFileSync('./data/bookings.json'),'utf-8');
        booking_records.push(new_booking_data);
        fs.writeFileSync('./data/bookings.json',JSON.stringify(booking_records));
    let obj = JSON.parse(fs.readFileSync('./data/events.json'),'utf-8');
    for(let i=0;i<obj.length; i++){
        if(obj[i]['uid']===req.body.uid){
            obj[i]['seat_availability']=obj[i]['seat_availability']-req.body.seats;
            break;
        }
    }

    fs.writeFileSync('./data/events.json',JSON.stringify(obj));

    res.send({success:true});
    
})

const PORT=process.env.PORT || 8001
app.listen(PORT,()=>{
    console.log(`Server Started on Port${PORT}`)
})

