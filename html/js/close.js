const remote = require("electron").remote;
document.getElementById("close-btn").addEventListener("click", () => {
    const window = remote.getCurrentWindow();
    window.close();
});