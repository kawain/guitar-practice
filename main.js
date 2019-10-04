const {
    app,
    BrowserWindow
} = require('electron')

//https://stackoverflow.com/questions/48854265/why-do-i-see-an-electron-security-warning-after-updating-my-electron-project-t
process.env['ELECTRON_DISABLE_SECURITY_WARNINGS'] = 'true';

let win

function createWindow() {
    win = new BrowserWindow({
        backgroundColor: "#222",
        width: 900,
        height: 700,
        webPreferences: {
            nodeIntegration: true
        },
        frame: false,
        show: false
    })

    win.loadFile('html/index.html')

    // Open the DevTools.
    //win.webContents.openDevTools()

    win.on('closed', () => {
        win = null
    })

    win.once('ready-to-show', () => {
        win.show()
    })
}

app.on('ready', createWindow)

app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') {
        app.quit()
    }
})

app.on('activate', () => {
    if (win === null) {
        createWindow()
    }
})