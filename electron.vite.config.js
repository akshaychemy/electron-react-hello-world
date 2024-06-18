// Import the defineConfig function from the electron-vite package.
// This function is used to create a configuration object for the Electron-Vite setup.
import { defineConfig } from "electron-vite";

// Import the React plugin for Vite. This plugin allows Vite to handle React files (.jsx and .tsx) correctly.
import react from '@vitejs/plugin-react';

// Export the configuration object using the defineConfig function.
// The configuration object is passed to defineConfig to provide type checking and IntelliSense support in some editors.
export default defineConfig({
    // Disable the public directory.
    // Setting publicDir to false tells Vite not to serve static assets from the default 'public' directory.
    publicDir: false,
    
    // Configuration for the main process.
    // This is where you can define entry points, output directories, and other settings for the main process.
    main: {},
    
    // Configuration for the preload script.
    // The preload script runs before other scripts in the renderer process and can be used to expose Node.js APIs.
    preload: {},
    
    // Configuration for the renderer process.
    // The renderer process is responsible for displaying the UI and handling user interactions.
    renderer: {
        // Specify the plugins to use in the renderer process.
        // In this case, we are using the React plugin to enable support for React in the renderer process.
        plugins: [react()]
    }
});
