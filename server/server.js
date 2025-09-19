import express from "express";
import "dotenv/config"; //LOADS ENVIRONMENT VARIABLES FROM A FILE CALLED .ENV INTO PROCESS.ENV
import cors from "cors"; 
import http from "http";
import { Server } from "socket.io";
import { connectDb } from "./lib/db.js";
import userRouter from "./routes/userRoutes.js";
import messageRouter from "./routes/messageRoutes.js";

//CREATE EXPRESS APP AND HTTP SERVER
const app=express();
const server=http.createServer(app);

//INITIALIZE SOCKET.IO SERVER
export const io = new Server(server, {
    cors : {origin: "*"}
})

//STORE ONLINE USERS
export const userSocketMap = {};

//SOCKET IO CONNECTION HANDLER
io.on("connection",(socket)=>{
    const userId = socket.handshake.query.userId;         //READ THEIR USERID FROM THE QUERY SENT BY FRONTEND
    console.log("User Connected", userId);
    if  (userId) userSocketMap[userId] = socket.id;

    //EMIT ONLINE USERS TO ALL CONNECTED CLIENTS
    io.emit("getOnlineUsers",Object.keys(userSocketMap)); //TELL ALL CLIENTS WHO IS ONLINE

    socket.on("disconnect",()=>{
        console.log("User Disconnected",userId);
        delete userSocketMap[userId];
        io.emit("getOnlineUsers",Object.keys(userSocketMap));
    })
});


//MIDDLEWARE SETUP
app.use(express.json({limit : "4mb"}));
app.use(cors());
app.use("/api/status", (req,res)=>{res.send("Server is live")} );
app.use("/api/auth",userRouter);
app.use("/api/messages",messageRouter);

//CONNECT TO MONGODB DATABASE
await connectDb();

const PORT=process.env.PORT || 5000;
server.listen(PORT, ()=> console.log(`Server is running on port: ${PORT}`));
