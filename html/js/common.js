const fingerboard = {
    1: ["F4", "Gb4", "G4", "Ab4", "A4", "Bb4", "B4", "C5", "Db5", "D5", "Eb5", "E5", "F5", "Gb5", "G5", "Ab5", "A5", "Bb5", "B5", "C6"],
    2: ["C4", "Db4", "D4", "Eb4", "E4", "F4", "Gb4", "G4", "Ab4", "A4", "Bb4", "B4", "C5", "Db5", "D5", "Eb5", "E5", "F5", "Gb5", "G5"],
    3: ["Ab3", "A3", "Bb3", "B3", "C4", "Db4", "D4", "Eb4", "E4", "F4", "Gb4", "G4", "Ab4", "A4", "Bb4", "B4", "C5", "Db5", "D5", "Eb5"],
    4: ["Eb3", "E3", "F3", "Gb3", "G3", "Ab3", "A3", "Bb3", "B3", "C4", "Db4", "D4", "Eb4", "E4", "F4", "Gb4", "G4", "Ab4", "A4", "Bb4"],
    5: ["Bb2", "B2", "C3", "Db3", "D3", "Eb3", "E3", "F3", "Gb3", "G3", "Ab3", "A3", "Bb3", "B3", "C4", "Db4", "D4", "Eb4", "E4", "F4"],
    6: ["F2", "Gb2", "G2", "Ab2", "A2", "Bb2", "B2", "C3", "Db3", "D3", "Eb3", "E3", "F3", "Gb3", "G3", "Ab3", "A3", "Bb3", "B3", "C4"]
}

const frequency = {
    "E2": 82.407,
    "F2": 87.307,
    "Gb2": 92.499,
    "G2": 97.999,
    "Ab2": 103.826,
    "A2": 110,
    "Bb2": 116.541,
    "B2": 123.471,
    "C3": 130.813,
    "Db3": 138.591,
    "D3": 146.832,
    "Eb3": 155.563,
    "E3": 164.814,
    "F3": 174.614,
    "Gb3": 184.997,
    "G3": 195.998,
    "Ab3": 207.652,
    "A3": 220,
    "Bb3": 233.082,
    "B3": 246.942,
    "C4": 261.626,
    "Db4": 277.183,
    "D4": 293.665,
    "Eb4": 311.127,
    "E4": 329.628,
    "F4": 349.228,
    "Gb4": 369.994,
    "G4": 391.995,
    "Ab4": 415.305,
    "A4": 440,
    "Bb4": 466.164,
    "B4": 493.883,
    "C5": 523.251,
    "Db5": 554.365,
    "D5": 587.33,
    "Eb5": 622.254,
    "E5": 659.255,
    "F5": 698.456,
    "Gb5": 739.989,
    "G5": 783.991,
    "Ab5": 830.609,
    "A5": 880,
    "Bb5": 932.328,
    "B5": 987.767,
    "C6": 1046.502
}

const guitar_file = "./sound/Guitar-C4.wav";
const hihat_file = "./sound/Closed-Hi-Hat.wav";

const origin = "C4";

//------------------------------------------

//音量とテンポ
const Config = require("electron-config");
const config = new Config();

//音量
const display_volume = document.getElementById("display_volume");
const volume_value = document.getElementById("volume_value");
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
//音量ここまで

//テンポ
const display_bpm = document.getElementById("display_bpm");
const bpm_value = document.getElementById("bpm_value");
let default_bpm = 70;
if (config.get("bpm")) {
    default_bpm = config.get("bpm");
} else {
    config.set("bpm", default_bpm);
}
display_bpm.innerHTML = default_bpm;
bpm_value.value = default_bpm;
bpm_value.addEventListener("change", () => {
    default_bpm = bpm_value.value;
    display_bpm.innerHTML = default_bpm;
    config.set("bpm", default_bpm);
});
//テンポここまで

const play_pause = document.getElementById("play_pause");

//読み込むまでdisabled
play_pause.disabled = "true";

const context = new AudioContext();

async function LoadFile() {
    const response = await fetch(guitar_file);
    const arraybuf = await response.arrayBuffer();
    const buf = await context.decodeAudioData(arraybuf);

    const response2 = await fetch(hihat_file);
    const arraybuf2 = await response2.arrayBuffer();
    const buf2 = await context.decodeAudioData(arraybuf2);

    return [buf, buf2]
}

let intervalID;
let play_pause_f = false;

LoadFile()
    .then(v => {
        const hoge = v;
        //読み込んだのでdisabled解除
        play_pause.disabled = "";
        play_pause.addEventListener("click", () => {
            if (play_pause_f) {
                play_pause_f = false;
                clearInterval(intervalID);
            } else {
                play_pause_f = true;
                playSoundLoop(hoge);
            }
        });
    });


function ansFrequency(note) {
    return frequency[note] / frequency[origin];
}

const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");
const w = canvas.width;
const h = canvas.height;
ctx.fillStyle = "black";
ctx.rect(0, 0, w, h);
ctx.fill();

let count = 0;

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

//------------------------------------------