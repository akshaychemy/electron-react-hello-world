// Import contextBridge and ipcRenderer from the Electron package.
import { contextBridge, ipcRenderer } from 'electron';

// Use contextBridge to expose a limited API to the renderer process.
contextBridge.exposeInMainWorld('electronAPI', {
    // Define an openFile function that uses ipcRenderer to invoke the 'dialog:openFile' event.
    // This function will be available in the renderer process under the window.electronAPI object.
    openFile: () => ipcRenderer.invoke('dialog:openFile')
});
