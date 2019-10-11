const context = new AudioContext();

//音量
const Config = require("electron-config");
const config = new Config();
let default_volume = 1;
if (config.get("volume")) {
    default_volume = config.get("volume");
}

async function LoadFile() {
    const response = await fetch(guitar_file);
    const arraybuf = await response.arrayBuffer();
    const buf = await context.decodeAudioData(arraybuf);
    return buf
}

LoadFile()
    .then(v => {
        const hoge = v;
        const btns = document.querySelectorAll(".btn-sm");
        for (const v of btns) {
            v.addEventListener("click", (e) => {
                const sound = e.target.textContent;
                playSound(hoge, ansFrequency(sound), 0);
            });
        }
    });

function ansFrequency(note) {
    return frequency[note] / frequency[origin];
}

let old_source;

function playSound(buffer, playbackRate, time) {
    const source = context.createBufferSource();
    source.buffer = buffer;
    source.playbackRate.value = playbackRate;

    //音量
    const gainNode = context.createGain();
    source.connect(gainNode);
    gainNode.gain.value = default_volume;
    gainNode.connect(context.destination);
    //音量ここまで

    source.start(time);

    if (old_source) {
        old_source.stop();
    }

    old_source = source;

}