const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");

const app = express();
app.use(cors());
app.use(bodyParser.json());

let users = {}; // { username: {lat, lng, status} }

// Register user
app.post("/register", (req,res)=>{
  const {username} = req.body;
  if (!users[username]) {
    users[username] = {lat:0, lng:0, status:"safe"};
  }
  res.json({message:"Registered", user: users[username]});
});

// Update location & status
app.post("/update", (req,res)=>{
  const {username, lat, lng, status} = req.body;
  if (!users[username]) {
    users[username] = {lat:0, lng:0, status:"safe"};
  }
  users[username] = {lat, lng, status};
  console.log(`📡 ${username} -> ${status} at (${lat}, ${lng})`);
  res.json({message:"Updated", user: users[username]});
});

// Get all users
app.get("/users", (req,res)=>{
  res.json({users: Object.entries(users).map(([k,v])=>({username:k, ...v}))});
});

const PORT=3000;
app.listen(PORT, ()=>console.log(`✅ Server running at http://localhost:${PORT}`));
