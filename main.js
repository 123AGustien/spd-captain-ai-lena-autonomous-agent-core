const { app, BrowserWindow } = require("electron");

function createWindow() {
  const win = new BrowserWindow({
    width: 1200,
    height: 800,
    icon: "icon.png",
    webPreferences: {
      nodeIntegration: true
    }
  });

  win.loadFile("cockpit_dashboard.html");
}

app.whenReady().then(createWindow);
