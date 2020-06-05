//CREATED JS BY RAHUL MISHRA
let conn;
var fps = 0;
let main = document.getElementsByClassName("main")[0];
function config(ip,port){
   var s = 'wss://'+ip+':'+port;
    //s = "ws://localhost:5000";
    console.log(s);
   conn = new WebSocket(s); 
    conn.onopen = (e)=>{
    main.style.display = "none";
    u_status("Connected");
}
conn.onclose = (e)=>{
   main.style.display = "flex";
    u_status("Disconnected");
}
conn.onmessage = (e)=>{
    if(e.data instanceof Blob){
       img(URL.createObjectURL(e.data));
     delete e.data;
    }
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
var buffer = [];
function img(str){
     if(buffer.length >= 60)
    {
         buffer.forEach((e)=>{
          URL.revokeObjectURL(e);
        });
       buffer.length = 0;
    }
    document.getElementById("imgs").src = str;
    fps++;
    buffer.push(str);
   
}
setInterval(showfps,1000);
function showfps()
{
    document.getElementById("fps").innerHTML = fps;
    fps = 0;
}
