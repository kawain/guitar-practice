const notes = require("./js/fingerboard.js");

const Tone = require("Tone");
const synth = new Tone.PolySynth().toMaster();
const hiHat = new Tone.MetalSynth().toMaster();

//音量
const Volume = require("./js/volumeClass.js");
new Volume(synth, hiHat);

const playNote = {
    string1: "",
    sound1: [],
    string2: "",
    sound2: []
};

const now = document.getElementById("now-chord");
const next = document.getElementById("next");
const start = document.getElementById("start");
const stop = document.getElementById("stop");
const bpm = document.getElementById("bpm");

start.addEventListener("click", playSound);
stop.addEventListener("click", stopSound);

function makeRandom() {
    let chord;
    let chords = [];
    //ルート音のフレット
    //範囲指定のランダム
    //Math.random() * (max - min + 1) + min
    let min = 2;
    let max = 13;
    let frets = Math.floor(Math.random() * (max - min + 1) + min);
    //配列のインデックス用でマイナスする
    frets--;

    //全8種類の押さえるパーターン
    const pattern = Math.floor(8 * Math.random());
    switch (pattern) {
        case 0:
            //http://127.0.0.1:5500/html/img/chord/CM7-6.png
            //コード名
            chord = notes[6][frets];
            chord = chord.slice(0, -1);
            chord = `6弦ルート ${chord}M7`;

            chords.push(notes[2][frets]);
            chords.push(notes[3][frets + 1]);
            chords.push(notes[4][frets + 1]);
            //ルート
            chords.push(notes[6][frets]);
            break;
        case 1:
            //http://127.0.0.1:5500/html/img/chord/CM7-5.png
            //コード名
            chord = notes[5][frets];
            chord = chord.slice(0, -1);
            chord = `5弦ルート ${chord}M7`;

            chords.push(notes[2][frets + 2]);
            chords.push(notes[3][frets + 1]);
            chords.push(notes[4][frets + 2]);
            //ルート
            chords.push(notes[5][frets]);
            break;
        case 2:
            //http://127.0.0.1:5500/html/img/chord/C-7-6.png
            //コード名
            chord = notes[6][frets];
            chord = chord.slice(0, -1);
            chord = `6弦ルート ${chord}m7`;

            //ルート
            chords.push(notes[2][frets]);
            chords.push(notes[3][frets]);
            chords.push(notes[4][frets]);
            chords.push(notes[6][frets]);
            break;
        case 3:
            //http://127.0.0.1:5500/html/img/chord/C-7-5.png
            //コード名
            chord = notes[5][frets];
            chord = chord.slice(0, -1);
            chord = `5弦ルート ${chord}m7`;

            chords.push(notes[2][frets + 1]);
            chords.push(notes[3][frets]);
            chords.push(notes[4][frets + 2]);
            //ルート
            chords.push(notes[5][frets]);
            break;
        case 4:
            //http://127.0.0.1:5500/html/img/chord/C7-6.png
            //コード名
            chord = notes[6][frets];
            chord = chord.slice(0, -1);
            chord = `6弦ルート ${chord}7`;

            chords.push(notes[2][frets]);
            chords.push(notes[3][frets + 1]);
            chords.push(notes[4][frets]);
            //ルート
            chords.push(notes[6][frets]);
            break;
        case 5:
            //http://127.0.0.1:5500/html/img/chord/C7-5.png
            //コード名
            chord = notes[5][frets];
            chord = chord.slice(0, -1);
            chord = `5弦ルート ${chord}7`;

            chords.push(notes[2][frets + 2]);
            chords.push(notes[3][frets]);
            chords.push(notes[4][frets + 2]);
            //ルート
            chords.push(notes[5][frets]);
            break;
        case 6:
            //http://127.0.0.1:5500/html/img/chord/Cm7b5-6.png
            //コード名
            chord = notes[6][frets];
            chord = chord.slice(0, -1);
            chord = `6弦ルート ${chord}m7b5`;

            chords.push(notes[2][frets - 1]);
            chords.push(notes[3][frets]);
            chords.push(notes[4][frets]);
            //ルート
            chords.push(notes[6][frets]);
            break;
        case 7:
            //http://127.0.0.1:5500/html/img/chord/Cm7b5-5.png
            //コード名
            chord = notes[5][frets];
            chord = chord.slice(0, -1);
            chord = `5弦ルート ${chord}m7b5`;

            chords.push(notes[2][frets + 1]);
            chords.push(notes[3][frets]);
            chords.push(notes[4][frets + 1]);
            //ルート
            chords.push(notes[5][frets]);
            break;
        default:
            console.log("error");
    }

    if (playNote.string2 === "" || playNote.sound2 === "") {
        playNote.string2 = chord;
        playNote.sound2 = chords;
    } else {
        playNote.string1 = playNote.string2;
        playNote.sound1 = playNote.sound2;
        playNote.string2 = chord;
        playNote.sound2 = chords;
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
            //和音
            synth.triggerAttackRelease(playNote.sound1, "4n");
            //表示
            now.innerHTML = playNote.string1;
            next.innerHTML = `(次) ${playNote.string2}`;
        } else if (count === 0) {
            makeRandom();
            now.innerHTML = "Ready";
            next.innerHTML = `(最初) ${playNote.string2}`;
        }
        hiHat.triggerAttackRelease('32n');
        count++;

    }, bpmValue);
}

function stopSound() {
    start.disabled = "";
    clearInterval(intervalID);
}