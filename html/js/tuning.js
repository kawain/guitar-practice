const Tone = require("tone");
const synth = new Tone.Synth().toMaster();

//音量
const Volume = require("./js/volumeClass.js");
new Volume(synth);

//音ボタン
const btns = document.querySelectorAll(".btn-sm");
for (let v of btns) {
    v.addEventListener("click", (e) => {
        let sound = e.target.textContent;
        synth.triggerAttackRelease(sound, "4n");
    });
}