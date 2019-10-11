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

let canvas;
let ctx;
let w;
let h;

if (document.getElementById("canvas") != null) {
    canvas = document.getElementById("canvas");
    ctx = canvas.getContext("2d");
    w = canvas.width;
    h = canvas.height;
    ctx.fillStyle = "black";
    ctx.rect(0, 0, w, h);
    ctx.fill();
}

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