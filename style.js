//CREATED JS BY RAHUL MISHRA
let conn;

function config(ip,port){
   var s = 'ws://'+ip+':'+port;
    console.log(s);
   conn = new WebSocket(s); 
    conn.onopen = (e)=>{
    u_status("Connected");
}
conn.onclose = (e)=>{
    u_status("Disconnected");
}
conn.onmessage = (e)=>{
    if(e.data instanceof Blob)
        img(e.data);
    else{
     var s = document.createElement("span");
     cb.appendChild(s);
     s.className = "admin";
     s.innerHTML = "Admin : "+ e.data;
    }
}
}
document.getElementById("sub").onclick = ()=>{config(document.getElementById("ip").value,document.getElementById("port").value)};
console.log(conn);
let snd = document.getElementById("send");
let din = document.getElementById("msg");
let cb = document.getElementsByClassName("chatbox")[0];
let cbbut = document.getElementsByClassName("chatbut")[0];
let frame = document.getElementsByClassName("frame")[0];

function u_status(str){
    document.getElementById("status").innerHTML = str;
}

snd.onclick = ()=>{
    var s = document.createElement("span");
    s.className = "user";
    s.innerHTML = "You : "+din.value;
    conn.send(din.value);
    din.value = "";
}
var c = false;
cbbut.onclick = ()=>{
    (c)?cb.style.display="none":cb.style.display="flex";
    c = !c;
}
function img(data){
    document.getElementById("imgs").src=URL.createObjectURL(data);
    delete data;
    
}