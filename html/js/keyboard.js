const relation = {
    "z": "D2",
    "x": "Eb2",
    "c": "E2",
    "v": "F2",
    "b": "Gb2",
    "n": "G2",
    "m": "Ab2",
    ",": "A2",
    ".": "Bb2",
    "/": "B2",

    "a": "C3",
    "s": "Db3",
    "d": "D3",
    "f": "Eb3",
    "g": "E3",
    "h": "F3",
    "j": "Gb3",
    "k": "G3",
    "l": "Ab3",
    ";": "A3",
    ":": "Bb3",
    "]": "B3",

    "q": "C4",
    "w": "Db4",
    "e": "D4",
    "r": "Eb4",
    "t": "E4",
    "y": "F4",
    "u": "Gb4",
    "i": "G4",
    "o": "Ab4",
    "p": "A4",
    "@": "Bb4",
    "[": "B4",

    "1": "C5",
    "2": "Db5",
    "3": "D5",
    "4": "Eb5",
    "5": "E5",
    "6": "F5",
    "7": "Gb5",
    "8": "G5",
    "9": "Ab5",
    "0": "A5",
    "-": "Bb5",
    "^": "B5",
    "\\": "C6"
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