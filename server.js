
const express = require("express");
const { createServer } = require("http");
const app= express();
const PORT=process.env.PORT || 7000;
const httpServer = createServer(app);
const { Server } = require("socket.io");
const path=require("path");

const io = new Server(httpServer, { /* options */ });
//#region middleware
app.use(express.static(__dirname+"/public"));
//#end region
app.get("/",(req,res)=>{
    // console.log(req.url)
    // console.log(getPath("index.ejs"))

    res.render("index.ejs");
})
io.on("connection", (socket) => {
    console.log(socket.id); 
    socket.on("send-event", (message) => {
        // console.log(message);
        socket.broadcast.emit("recieve-event",{message});
    });
});

// io.emit("send", (socket) => {
//     console.log("socket"); 
// });

//app.listen(PORT,()=>{ console.log("http://localhost:"+PORT)})
httpServer.listen(PORT,()=>{ console.log("http://localhost:"+PORT)});

function getPath(relativePath){
    return path.join(__dirname,"../client/"+relativePath)
}