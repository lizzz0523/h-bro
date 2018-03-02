"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const electron_1 = require("electron");
const path = require("path");
const url = require("url");
class WindowManager {
    static isEmpty() {
        return WindowManager.windows.size === 0;
    }
    static create() {
        const window = new electron_1.BrowserWindow({
            width: 800,
            height: 600,
            show: false
        });
        window.loadURL(url.format({
            pathname: path.resolve(__dirname, '../../view/index.html'),
            protocol: 'file:',
            slashes: true
        }));
        window.once('ready-to-show', () => {
            window.maximize();
            window.show();
        });
        window.once('closed', () => {
            WindowManager.windows.delete(window);
        });
        WindowManager.windows.add(window);
    }
    static send(channel) {
        WindowManager.windows.forEach((window) => {
            window.webContents.send(channel);
        });
    }
}
WindowManager.windows = new Set();
exports.WindowManager = WindowManager;
//# sourceMappingURL=window.js.map