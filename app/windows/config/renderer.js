const { ipcRenderer } = require("electron");

const playBtn = document.getElementById("playBtn");

playBtn.onclick = () => {
    ipcRenderer.send("play");
}