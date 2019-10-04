const notes = require("./js/fingerboard.js");

const Tone = require("Tone");
const synth = new Tone.PolySynth().toMaster();
const hiHat = new Tone.MetalSynth().toMaster();

//音量
const Volume = require("./js/volumeClass.js");
new Volume(synth, hiHat);

const playNote = {
    string1: "",
    sound1: "",
    string2: "",
    sound2: ""
};

const now = document.getElementById("now");
const next = document.getElementById("next");
const start = document.getElementById("start");
const stop = document.getElementById("stop");
const bpm = document.getElementById("bpm");

start.addEventListener("click", playSound);
stop.addEventListener("click", stopSound);

function makeRandom() {
    //notesのキーからランダムに一つ選択
    const keys = Object.keys(notes);
    const kResult = keys[Math.floor(keys.length * Math.random())];

    //選んだキーの値からランダムに一つ選択
    //const vResult = Math.floor(notes[kResult].length * Math.random());
    //12フレットまで
    const vResult = Math.floor(12 * Math.random());

    if (playNote.string2 === "" || playNote.sound2 === "") {
        playNote.string2 = kResult;
        playNote.sound2 = notes[kResult][vResult];
    } else {
        playNote.string1 = playNote.string2;
        playNote.sound1 = playNote.sound2;
        playNote.string2 = kResult;
        playNote.sound2 = notes[kResult][vResult];
    }
}

let intervalID;
let count = 0;

function playSound() {
    start.disabled = "true";
    const bpmValue = 60000 / parseInt(bpm.value);
    intervalID = setInterval(() => {
        //4拍子固定
        if (count > 0 && count % 4 == 0) {
            makeRandom();
            //単音
            synth.triggerAttackRelease([playNote.sound1], "4n");
            //表示
            now.innerHTML = `${playNote.string1}弦 ${playNote.sound1}`;
            next.innerHTML = `(次の音) ${playNote.string2}弦 ${playNote.sound2}`;
        } else if (count === 0) {
            makeRandom();
            now.innerHTML = "Ready";
            next.innerHTML = `(最初の音) ${playNote.string2}弦 ${playNote.sound2}`;
        }
        hiHat.triggerAttackRelease('32n');
        count++;

    }, bpmValue);
}

function stopSound() {
    start.disabled = "";
    clearInterval(intervalID);
}