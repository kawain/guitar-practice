// const Tone = require("tone");
// const synth = new Tone.Synth().toMaster();

// //音量
// const Volume = require("./js/volumeClass.js");
// new Volume(synth);

// //音ボタン
// const btns = document.querySelectorAll(".btn-sm");
// for (let v of btns) {
//     v.addEventListener("click", (e) => {
//         let sound = e.target.textContent;
//         synth.triggerAttackRelease(sound, "4n");
//     });
// }

const common = require("./js/common");

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
    source.connect(context.destination);
    source.start(time);

    if (old_source) {
        old_source.stop();
    }

    old_source = source;

}