let socket = io()

let username = ""
$("#loginBox").show()
$("#chatBox").hide()

$("#btnStart").click(()=>{
    socket.emit("login",{
        username: $("#inpUsername").val(),
        password: $("#inpPass").val()
    })
    console.log("Start")
    username = $("#inpUsername").val()
})

$("#btnInpSend").click(()=>{
    socket.emit("msg_send",{
        msg: $("#inpNewMsg").val(),
        to: $("#inpToUser").val(),
        from: username
    })
})


socket.on("msg_recvd", (data)=>{
    $("#ulMsgs").append($(`<li>From ${data.from}
        <ul><li>${data.msg}</li></ul>
    </li>`))
})

socket.on("logged_in", (data)=>{
    window.alert("Welcome back ", data.username)
    $("#chatBox").show()
    $("#loginBox").hide()
})

socket.on("login_failed", ()=>{
    window.alert("Wrong Username/Password")
})
socket.on("signed_in", (data)=>{
    window.alert("Welcome ", data.username)
    $("#chatBox").show()
    $("#loginBox").hide()
})