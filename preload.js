const { contextBridge } = require("electron");

contextBridge.exposeInMainWorld("spd", {
  version: "1.0.0",
  system: "Captain AI Lena"
});
