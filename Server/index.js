const express = require('express');
const bodyParser  =  require("body-parser");
const app = express();

app.use(bodyParser.json());

let i =1;
let msg = [];

//Routes
app.get('/messages', (req, res) => {
    let id = Number(req.query.id)
    if (isNaN(id)){
        res.status(400);
        res.send('Invalid input');
        return;
    }
    let found = msg.find((entry) => entry.id === id)
    if(found == null){
        res.status(404);
        res.send('Not found');
        return;
    }
   let value = JSON.stringify(found);
   console.log(value)
   res.status(200);
   res.send(value);
});

app.post('/messages', (req, res) => {
    if(req.body.user == null ||req.body.content == null ){
        res.status(400);
        res.send('Invalid input');
    }else{
        let user = req.body.user;
        let content = req.body.content;
        let id = i;
        console.log("id: "+ id + " UserName " + user + " says: " +content);
        msg.push({
            id:i,
            user:user,
            content:content   
        });
        i++;
        res.status(200);
        res.send('Message received');       
    }     
});

//Listen
app.listen(3001, () => console.log('listening on port *:3001'));