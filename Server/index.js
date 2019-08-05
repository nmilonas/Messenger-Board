const express = require('express');
const bodyParser  =  require("body-parser");
const app = express();

app.use(bodyParser.json());

let identifier =1;
let Msg = [];
const dictionary = new Set(['bad','horrible','liar']);  
let badPpl = new Map;
let banned = [];
const TOOMANYSWEARS = 3;


//Routes
app.get('/messages', (req, res) => {
    let id = Number(req.query.id)
    if (isNaN(id)){
        res.status(400);
        res.send('Invalid input');
        return;
    }
    let found = Msg.find((entry) => entry.id === id)
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
        //If user has already sent 10+ offensive words, ban them
        if(badPpl.get(user) >= 10){
            let tempCount = 0;
            for(it of Msg){
                if(it.user == user){
                    Msg.splice(tempCount)
                }
                tempCount++;
            }
            res.status(403);
            res.send('Permission Denied');
            console.log(Msg);
            return;    
        }
        let content = req.body.content;
        let id = identifier;
        let count = 0;
        let badWords = content.split(" "); 
        for( i in badWords){
            if(dictionary.has(badWords[i].toLowerCase())){     //make sure user doesn't use Caps to get around the dictionary
                //console.log(badWords[i]);
                content = content.replace(badWords[i],'****') 
                if(!badPpl.has(user)){
                    badPpl.set(user,1);
                }else{
                    badPpl.set(user,badPpl.get(user)+1); 
                }               
                count++;
            }           
        }
        console.log(badPpl.get(user));
        if(count < TOOMANYSWEARS){
            console.log("id: "+ id + " UserName " + user + " says: " +content);
            Msg.push({
                id:i,
                user:user,
                content:content   
            });
            identifier++;
        }else{
            console.log('Sorry ' + user + ' this message is too offensive to be sent')
            res.status(403);
            res.send('Permission Denied');  
            return;
        }       
        res.status(200);
        res.send('Message received');       
    }     
});

//Listen
app.listen(3001, () => console.log('listening on port *:3001'));