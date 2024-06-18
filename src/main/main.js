// Import necessary modules from Electron and Node.js path module.
import { app, BrowserWindow, dialog, ipcMain } from 'electron';
import * as path from 'path';

// Declare a variable to hold the main window instance.
let mainWindow;

// Asynchronous function to handle file open dialog.
async function handleFileOpen() {
  // Show the open file dialog.
  const { cancelled, filePaths } = await dialog.showOpenDialog({});
  // If the user didn't cancel the dialog, return the first selected file path.
  if (!cancelled) {
    return filePaths[0];
  }
}

// Function to create the main application window.
function createWindow() {
  // Create a new BrowserWindow instance with specific web preferences.
  mainWindow = new BrowserWindow({
    webPreferences: {
      // Specify the path to the preload script.
      preload: path.join(__dirname, '../preload/preload.js'),
      // Disable web security for development purposes (not recommended for production).
      webSecurity: false
    }
  });

  // Load the Vite development server URL in the window.
  mainWindow.loadURL('http://localhost:5173');

  // Set the mainWindow variable to null when the window is closed.
  mainWindow.on('closed', () => mainWindow = null);
}

// When Electron has finished initializing and is ready to create browser windows.
app.whenReady().then(() => {
  // Register an IPC handler for 'dialog:openFile' that calls handleFileOpen.
  ipcMain.handle('dialog:openFile', handleFileOpen);
  // Create the main application window.
  createWindow();
});

// Quit the application when all windows are closed, except on macOS.
app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

// Re-create the main window when the app is activated (e.g., clicking the dock icon on macOS) and no other windows are open.
app.on('activate', () => {
  if (mainWindow == null) {
    createWindow();
  }
});
