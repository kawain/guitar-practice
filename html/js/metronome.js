const Tone = require("Tone");
const hiHat = new Tone.MetalSynth().toMaster();

//音量
const Volume = require("./js/volumeClass.js");
new Volume(undefined, hiHat);

const start = document.getElementById("start");
const stop = document.getElementById("stop");
const bpm = document.getElementById("bpm");

start.addEventListener("click", playSound);
stop.addEventListener("click", stopSound);

let intervalID;

function playSound() {
    start.disabled = "true";
    const bpmValue = 60000 / parseInt(bpm.value);
    intervalID = setInterval(() => {
        hiHat.triggerAttackRelease('32n');
    }, bpmValue);
}

function stopSound() {
    start.disabled = "";
    clearInterval(intervalID);
}