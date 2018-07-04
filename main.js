const {app, BrowserWindow, Menu,Tray} = require('electron')
const path = require('path')
const url = require('url')

let win

function createWindow () {
  win = new BrowserWindow({width: 900, height: 700})

  // load the dist folder from Angular
  win.loadURL(url.format({
    pathname: path.join(__dirname, 'dist/index.html'),
    protocol: 'file:',
    slashes: true
  }))

  // add the menu items
  let template = [
    {
        label: app.getName(),
        submenu:[
            {
                label:`About us`,
                click:_=>{
                    //console.log('clicked about');
                },
                role:'about',
                checked:true
            },
            {
                type:'separator'
            },
            {
                label:'Quit',
                click:_=>{
                    app.quit()
                },
                accelerator: 'Cmd+Q'
            }
        ]
    }
]
const menu=Menu.buildFromTemplate(template);
Menu.setApplicationMenu(menu);
const tray=new Tray(path.join('src','/assets/icons/context.png'));
tray.setContextMenu(menu);
tray.setToolTip("My Society App");

  // Open the DevTools optionally:
  // win.webContents.openDevTools()

  win.on('closed', () => {
    win = null
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