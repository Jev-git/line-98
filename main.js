const { app, BrowserWindow, ipcMain } = require("electron");
const config = require("./config.json");

const path = require("path");
const fs = require("fs");

let mainWindow;

app.on("ready", () => {
    mainWindow = createWindow(config.mainWindow);
})

app.on("window-all-closed", () => {
    app.quit();
})

function createWindow(config) {
    let newWindow = new BrowserWindow(config);

    // newWindow.loadURL(`file://${__dirname}/app/windows/${config.name}/${config.name}.html`);
    newWindow.loadURL(`file://${__dirname}/app/windows/config/config.html`);
    
    newWindow.once('ready-to-show', () => {
        newWindow.show();
    })

    newWindow.on('close', (event) => {
        newWindow = null;
    })

    return newWindow;
}

ipcMain.on("play", () => {
    mainWindow.loadURL(`file://${__dirname}/app/windows/game/game.html`);
})