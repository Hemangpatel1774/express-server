const express = require("express");
const mongoose = require('mongoose')
const cors = require("cors");
const { networkInterfaces } = require('os');
const server = express();
server.use(cors({origin:true}))
// ==== get Local wifi ip address for Hostname :---
const setHost = (nets) => {
    for (const name of Object.keys(nets)) {
        for (const obj of nets[name]) {
            if (obj.family === 'IPv4') {
                return obj.address;
            }
        }
    }
}

const user = mongoose.Schema({
    name: String,
    ip: String,
})
const User = mongoose.model("User", user);

const dbCon = mongoose.connect("mongodb+srv://hemang:hemang1774@mycluster.noazrlx.mongodb.net/mernstack?retryWrites=true&w=majority&appName=myCluster/mernstack");
server.get('/', async (req, res) => {
    res.send("Hello World")
    // console.log(req.ips);
    // const newUser = await User({ user: "hello", ip: req.ip });
    // newUser.save()
    // res.send("Your ip is :" + req.ip)
})
server.get('/getUser', async (req, res) => {
    const allUser = await User.find();
    console.log(allUser);
    
    res.send(allUser)
})
server.delete('/deleteAll', async (req, res) => {
    const allUser = await User.deleteOne();
    res.send("all user removed..!")
})
const net = networkInterfaces();
const host = setHost(net)
server.listen(5001, host, (err) => {
    if (err) {
        console.log(err);
    } else {
        console.log(`server listen at http://${host}:5001`);
    }
});