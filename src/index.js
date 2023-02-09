const { app, BrowserWindow, ipcMain } = require('electron');
const path = require('path');
const ipc = ipcMain;

// Handle creating/removing shortcuts on Windows when installing/uninstalling.
if (require('electron-squirrel-startup')) {
  app.quit();
}

const createWindow = () => {
  // Create the browser window.
  const mainWindow = new BrowserWindow({
    width: 840,
    height: 800,
    resizable:false,
    frame:false,
    webPreferences: {
      nodeIntegration:true,
      contextIsolation:false,
      preload: path.join(__dirname, 'preload.js'),
    },
  });

  // and load the index.html of the app.
  mainWindow.loadFile(path.join(__dirname, 'index.html'));


  // Close the Window
  ipc.on('closeApp',()=>{mainWindow.close();});

  // Minimize the Window
  ipc.on('minimizeApp',()=>{mainWindow.minimize();});

  // Maximize the Window
  ipc.on('maximizeApp',()=>{
    
    if(mainWindow.isMaximized())
    {
      mainWindow.restore();
    }
    else
    {
      mainWindow.maximize();
    }
  });

  //
  mainWindow.on('maximize', ()=>{mainWindow.webContents.send('isMaximized')});

  //
  mainWindow.on('unmaximize', ()=>{mainWindow.webContents.send('isRestored')});

};

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.on('ready', createWindow);

// Quit when all windows are closed, except on macOS. There, it's common
// for applications and their menu bar to stay active until the user quits
// explicitly with Cmd + Q.
app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('activate', () => {
  // On OS X it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow();
  }
});

// In this file you can include the rest of your app's specific main process
// code. You can also put them in separate files and import them here.
