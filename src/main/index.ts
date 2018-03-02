import { app, globalShortcut } from 'electron'
import { WindowManager } from './window'
import { HistoryManager } from './history'

app.on('ready', () => {
    globalShortcut.register('Esc', () => {
        WindowManager.send('blur')
    })

    HistoryManager.setup()
    WindowManager.create()
})

app.on('quit', () => {
    HistoryManager.destroy()
})

app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') {
        app.quit()
    }
})

app.on('activate', () => {
    if (WindowManager.isEmpty()) {
        WindowManager.create()
    }
})