// This is just a sample app. You can structure your Neutralinojs app code as you wish.
// This example app is written with vanilla JavaScript and HTML.
// Feel free to use any frontend framework you like :)
// See more details: https://neutralino.js.org/docs/how-to/use-a-frontend-library

/*
    Function to display information about the Neutralino app.
    This function updates the content of the 'info' element in the HTML
    with details regarding the running Neutralino application, including
    its ID, port, operating system, and version information.
*/

/*
    Function to set up a system tray menu with options specific to the window mode.
    This function checks if the application is running in window mode, and if so,
    it defines the tray menu items and sets up the tray accordingly.
*/
function setTray() {
    // Tray menu is only available in window mode
    if(NL_MODE != "window") {
        console.log("INFO: Tray menu is only available in the window mode.");
        return;
    }

    // Define tray menu items
    let tray = {
        icon: "/resources/icons/trayIcon.png",
        menuItems: [
            {id: "VERSION", text: "Get version"},
            {id: "SEP", text: "-"},
            {id: "QUIT", text: "Quit"}
        ]
    };

    // Set the tray menu
    Neutralino.os.setTray(tray);
}

/*
    Function to handle click events on the tray menu items.
    This function performs different actions based on the clicked item's ID,
    such as displaying version information or exiting the application.
*/
function onTrayMenuItemClicked(event) {
    switch(event.detail.id) {
        case "VERSION":

            break;
        case "QUIT":
            Neutralino.app.exit();
            break;
    }
}

/*
    Function to handle the window close event by gracefully exiting the Neutralino application.
*/
function onWindowClose() {
    Neutralino.app.exit();
}

// Initialize Neutralino
Neutralino.init();

// Register event listeners
Neutralino.events.on("trayMenuItemClicked", onTrayMenuItemClicked);
Neutralino.events.on("windowClose", onWindowClose);

// Conditional initialization: Set up system tray if not running on macOS
if(NL_OS != "Darwin") { // TODO: Fix https://github.com/neutralinojs/neutralinojs/issues/615
    setTray();
}

// Make Cmd+Q (Command+Q) exit the application on macOS.
// Some macOS setups may not forward the system Quit shortcut to the renderer,
// but this captures the keydown in the window and exits the app when Cmd+Q is pressed.
if (typeof NL_OS !== 'undefined' && NL_OS === "Darwin") {
    window.addEventListener('keydown', function (e) {
        if ((e.metaKey || e.ctrlKey) && (e.key === 'q' || e.key === 'Q')) {
            e.preventDefault();
            Neutralino.app.exit();
        }
    }, true);
}
