//KeyHandlers
window.addEventListener('keydown',(e)=>{
    conn.send(e.keyCode);
});