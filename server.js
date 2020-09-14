const http = require("http")
const express = require("express")
const app = express()
const socketio = require("socket.io")

const server = http.createServer(app)
const io = socketio(server)

let users = {
    "Arush": "arush"
}

io.on("connection", (socket)=>{
    console.log("connected with socket id = ", socket.id)

    socket.on("login", (data)=>{
        if(users[data.username]){
            if(users[data.username] == data.password){
                socket.join(data.username)
                socket.emit("logged_in", data) 
            }else{
                socket.emit("login_failed")
            }
        }else{
            users[data.username] = data.password,
            socket.join(data.username)
            socket.emit("signed_in", data)
        }
    })

    socket.on("msg_send", (data)=>{
        if(data.to){
            io.to(data.to).emit("msg_recvd", data)
        }else{
            socket.broadcast.emit("msg_recvd", data)
        }
    })
    console.log(users)
})


app.use("/", express.static(__dirname + "/public"))


server.listen(8000, ()=>{
    console.log("started on http://localhost:8000")
})
