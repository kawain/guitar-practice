const relation = {
    "z": "E2",
    "x": "F2",
    "c": "Gb2",
    "v": "G2",
    "b": "Ab2",
    "n": "A2",
    "m": "Bb2",
    ",": "B2",
    ".": "C3",
    "/": "Db3",
    "\\": "D3",
    "a": "Eb3",
    "s": "E3",
    "d": "F3",
    "f": "Gb3",
    "g": "G3",
    "h": "Ab3",
    "j": "A3",
    "k": "Bb3",
    "l": "B3",
    ";": "C4",
    ":": "Db4",
    "]": "D4",
    "q": "Eb4",
    "w": "E4",
    "e": "F4",
    "r": "Gb4",
    "t": "G4",
    "y": "Ab4",
    "u": "A4",
    "i": "Bb4",
    "o": "B4",
    "p": "C5",
    "@": "Db5",
    "[": "D5",
    "1": "Eb5",
    "2": "E5",
    "3": "F5",
    "4": "Gb5",
    "5": "G5",
    "6": "Ab5",
    "7": "A5",
    "8": "Bb5",
    "9": "B5",
    "0": "C6"
}

//音量
const Config = require("electron-config");
const config = new Config();
let default_volume = 1;
if (config.get("volume")) {
    default_volume = config.get("volume");
} else {
    config.set("volume", default_volume);
}
display_volume.innerHTML = default_volume * 10;
volume_value.value = default_volume;
volume_value.addEventListener("change", () => {
    default_volume = volume_value.value;
    display_volume.innerHTML = default_volume * 10;
    config.set("volume", default_volume);
});


//キャンバス
const keyboard_cvs = document.getElementById("keyboard_canvas");
const keyboard_ctx = keyboard_cvs.getContext("2d");
keyboard_ctx.fillStyle = "black";
keyboard_ctx.rect(0, 0, keyboard_cvs.width, keyboard_cvs.height);
keyboard_ctx.fill();


const context = new AudioContext();
async function LoadFile() {
    const response = await fetch(guitar_file);
    const arraybuf = await response.arrayBuffer();
    const buf = await context.decodeAudioData(arraybuf);
    return buf
}

LoadFile()
    .then(v => {
        const hoge = v;
        document.addEventListener("keydown", (e) => {
            const keyName = e.key;
            if (relation[keyName]) {
                playSound(hoge, ansFrequency(relation[keyName]));
                keyboard_ctx.fillStyle = "chartreuse";
                keyboard_ctx.rect(0, 0, keyboard_cvs.width, keyboard_cvs.height);
                keyboard_ctx.fill();

                keyboard_ctx.fillStyle = "black";
                keyboard_ctx.font = "160px sans-serif";
                keyboard_ctx.textAlign = "center";
                keyboard_ctx.fillText(relation[keyName], keyboard_cvs.width / 2, 210);

            }
        });
    });

function ansFrequency(note) {
    return frequency[note] / frequency[origin];
}

function playSound(buffer, playbackRate) {
    const source = context.createBufferSource();
    source.buffer = buffer;
    source.playbackRate.value = playbackRate;

    //音量
    const gainNode = context.createGain();
    source.connect(gainNode);
    gainNode.gain.value = default_volume;
    gainNode.connect(context.destination);
    //音量ここまで

    source.start(0);

}