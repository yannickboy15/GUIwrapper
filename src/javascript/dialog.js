const { ipcMain, dialog, BrowserWindow } = require('electron');

// Open file dialog to open file
ipcMain.on('open-file-dialog', (event) => {
    dialog.showOpenDialog(BrowserWindow.getFocusedWindow(),
        {
            filters: [{ name: 'All files', extensions: ['*'] }],
            properties: ['openFile']
        }).then((files) => {
            if (!files.canceled) {
                event.sender.send('SelectedFile', files.filePaths);
            }
        });
});

// Opens an error dialog message
ipcMain.on('open-error-dialog', (event) => {
    dialog.showErrorBox('Error', 'Could not execute the selected program!\nPlease select a valid executable program');
});
// Opens an error dialog message
ipcMain.on('open-errorEXE-dialog', (event) => {
    dialog.showErrorBox('Error', 'Could not execute the selected program!');
});
// Opens an error dialog message
ipcMain.on('open-errorKilled-dialog', (event) => {
    dialog.showErrorBox('Error', 'An error occured while executing the program!\nSee the ouput for details.');
});

// Opens a warning dialog message
ipcMain.on('open-warning-dialog', (event) => {
    const options =
    {
        type: "info",
        title: "Warning",
        message: "Please select an executable file first!",
        buttons: ['Ok']
    };
    dialog.showMessageBox(BrowserWindow.getFocusedWindow(), options);
});

// Opens a warning dialog message
ipcMain.on('open-isRunning-dialog', (event) => {
    const options =
    {
        type: "info",
        title: "Warning",
        message: "Please terminate the running application before starting a new one",
        buttons: ['Ok']
    };
    dialog.showMessageBox(BrowserWindow.getFocusedWindow(), options);
})

// Opens a success dialog message
ipcMain.on('open-successfulTermination-dialog', (event) => {
    const options =
    {
        type: "info",
        title: "Success",
        message: "Application terminated successfully",
        buttons: ['Ok']
    };
    dialog.showMessageBox(BrowserWindow.getFocusedWindow(), options);
})