"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const electron_1 = require("electron");
const window_1 = require("./window");
const history_1 = require("./history");
electron_1.app.on('ready', () => {
    electron_1.globalShortcut.register('Esc', () => {
        window_1.WindowManager.send('blur');
    });
    history_1.HistoryManager.setup();
    window_1.WindowManager.create();
});
electron_1.app.on('quit', () => {
    history_1.HistoryManager.destroy();
});
electron_1.app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') {
        electron_1.app.quit();
    }
});
electron_1.app.on('activate', () => {
    if (window_1.WindowManager.isEmpty()) {
        window_1.WindowManager.create();
    }
});
//# sourceMappingURL=index.js.map