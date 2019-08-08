const express = require("express");
const bodyParser = require("body-parser");
const app = express();
const cors = require("cors");

app.use(bodyParser.json());
app.use(cors()); //Allow express to use cors in order to send and receive messages between local hosts

let identifier = 1;
let messages = [];
const dictionary = new Set(["bad", "horrible", "liar"]);
let badPpl = new Map();
const TOOMANYSWEARS = 3;

//Routes
app.get("/messages", (req, res) => {
  res.status(200);
  res.send(JSON.stringify(messages));
});
app.post("/messages", (req, res) => {
  if (req.body.user == "" || req.body.user == null) {
    res.status(400);
    res.send("Invalid input: A Name must be entered");
  } else if (req.body.content == "" || req.body.content == null) {
    res.status(400);
    res.send("Invalid input: A Message must be entered");
  } else {
    let user = req.body.user;
    //If user has already sent 10+ offensive words, ban them
    if (badPpl.get(user) >= 10) {
      messages = messages.filter(function messages(message) {
        if (message.user != user) {
          return true;
        }
      }); //Find all instances of the banned user's name and remove from memory
      console.log("Begone " + user + " ! You are banned !");
      res.status(403);
      res.send("Begone " + user + " ! You are banned !");
      return;
    }

    let content = req.body.content;
    let count = 0;
    let badWords = content.split(" ");
    for (i in badWords) {
      if (dictionary.has(badWords[i].toLowerCase())) {
        //make sure user doesn't use Caps to get around the dictionary
        content = content.replace(badWords[i], "****");
        if (!badPpl.has(user)) {
          badPpl.set(user, 1);
        } else {
          badPpl.set(user, badPpl.get(user) + 1);
        }
        count++;
      }
    }
    if (count < TOOMANYSWEARS) {
      console.log(
        "id: " + identifier + " UserName " + user + " says: " + content
      );
      messages.push({
        id: identifier,
        user: user,
        content: content
      });
      identifier++;
    } else {
      //If a user has sent too many inappropriate words in a message, do not allow the message to be sent.
      console.log(
        "Sorry " + user + ", this message is too offensive to be sent."
      );
      res.status(403);
      res.send("Sorry " + user + ", this message is too offensive to be sent.");
      return;
    }
    res.status(200);
    res.send("Message received");
  }
});

//Listen
app.listen(3001, () => console.log("listening on port *:3001"));
