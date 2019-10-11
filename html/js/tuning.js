const common = require("./js/common");

//音量
const Config = require("electron-config");
const config = new Config();
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

const context = new AudioContext();

async function LoadFile() {
    const response = await fetch(common.guitar_file);
    const arraybuf = await response.arrayBuffer();
    const buf = await context.decodeAudioData(arraybuf);

    // const response2 = await fetch(common.hihat_file);
    // const arraybuf2 = await response2.arrayBuffer();
    // const buf2 = await context.decodeAudioData(arraybuf2);

    return [buf, ""]
}

LoadFile()
    .then(v => {
        const hoge = v;
        const btns = document.querySelectorAll(".btn-sm");
        for (const v of btns) {
            v.addEventListener("click", (e) => {
                const sound = e.target.textContent;
                playSound(hoge[0], ansFrequency(sound), 0);
            });
        }
    });

function ansFrequency(note) {
    return common.frequency[note] / common.frequency[common.origin];
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