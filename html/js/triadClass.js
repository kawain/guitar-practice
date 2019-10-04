module.exports = class Triad {
    constructor() {

        console.log("test");

        this.notes = require("./fingerboard.js");
        this.Tone = require("Tone");

        this.synth = new this.Tone.PolySynth().toMaster();
        this.hiHat = new this.Tone.MetalSynth().toMaster();

        //音量
        const Volume = require("./volumeClass.js");
        new Volume(this.synth, this.hiHat);

        this.playNote = {
            string1: "",
            sound1: [],
            string2: "",
            sound2: []
        };

        this.now = document.getElementById("now-triad");
        this.next = document.getElementById("next");
        this.start = document.getElementById("start");
        this.stop = document.getElementById("stop");
        this.bpm = document.getElementById("bpm");

        this.start.addEventListener("click", () => {
            this.playSound();
        });
        this.stop.addEventListener("click", () => {
            this.stopSound();
        });

        this.intervalID;
        this.count = 0;

    }

    makeRandom() {
        let chord;
        let chords = [];
        //ルート音のフレット
        //範囲指定のランダム
        //Math.random() * (max - min + 1) + min
        //この範囲は色々
        let min = 4;
        let max = 15;
        let frets = Math.floor(Math.random() * (max - min + 1) + min);
        //配列のインデックス用でマイナスする
        frets--;

        //全18種類の押さえるパーターン
        const pattern = Math.floor(18 * Math.random());
        switch (pattern) {
            case 0:
                //http://127.0.0.1:5500/html/img/triad1/C-1.png
                //コード名
                chord = this.notes[1][frets];
                chord = chord.slice(0, -1);
                chord = `123-1 ${chord}`;

                //ルート
                chords.push(this.notes[1][frets]);
                chords.push(this.notes[2][frets]);
                chords.push(this.notes[3][frets + 1]);
                break;
            case 1:
                //http://127.0.0.1:5500/html/img/triad1/Cm-1.png
                //コード名
                chord = this.notes[1][frets];
                chord = chord.slice(0, -1);
                chord = `123-1 ${chord}m`;

                //ルート
                chords.push(this.notes[1][frets]);
                chords.push(this.notes[2][frets]);
                chords.push(this.notes[3][frets]);
                break;
            case 2:
                //http://127.0.0.1:5500/html/img/triad1/Cm7b5-1.png
                //コード名
                chord = this.notes[1][frets];
                chord = chord.slice(0, -1);
                chord = `123-1 ${chord}m7b5`;

                //ルート
                chords.push(this.notes[1][frets]);
                chords.push(this.notes[2][frets - 1]);
                chords.push(this.notes[3][frets]);
                break;
            case 3:
                //http://127.0.0.1:5500/html/img/triad1/C-2.png
                //コード名
                chord = this.notes[2][frets];
                chord = chord.slice(0, -1);
                chord = `123-2 ${chord}`;

                chords.push(this.notes[1][frets - 1]);
                //ルート
                chords.push(this.notes[2][frets]);
                chords.push(this.notes[3][frets - 1]);
                break;
            case 4:
                //http://127.0.0.1:5500/html/img/triad1/Cm-2.png
                //コード名
                chord = this.notes[2][frets];
                chord = chord.slice(0, -1);
                chord = `123-2 ${chord}m`;

                chords.push(this.notes[1][frets - 2]);
                //ルート
                chords.push(this.notes[2][frets]);
                chords.push(this.notes[3][frets - 1]);
                break;
            case 5:
                //http://127.0.0.1:5500/html/img/triad1/Cm7b5-2.png
                //コード名
                chord = this.notes[2][frets];
                chord = chord.slice(0, -1);
                chord = `123-2 ${chord}m7b5`;

                chords.push(this.notes[1][frets - 2]);
                //ルート
                chords.push(this.notes[2][frets]);
                chords.push(this.notes[3][frets - 2]);
                break;
            case 6:
                //http://127.0.0.1:5500/html/img/triad1/C-3.png
                //コード名
                chord = this.notes[3][frets];
                chord = chord.slice(0, -1);
                chord = `123-3 ${chord}`;

                chords.push(this.notes[1][frets - 2]);
                chords.push(this.notes[2][frets]);
                //ルート
                chords.push(this.notes[3][frets]);
                break;
            case 7:
                //http://127.0.0.1:5500/html/img/triad1/Cm-3.png
                //コード名
                chord = this.notes[3][frets];
                chord = chord.slice(0, -1);
                chord = `123-3 ${chord}m`;

                chords.push(this.notes[1][frets - 2]);
                chords.push(this.notes[2][frets - 1]);
                //ルート
                chords.push(this.notes[3][frets]);
                break;
            case 8:
                //http://127.0.0.1:5500/html/img/triad1/Cm7b5-3.png
                //コード名
                chord = this.notes[3][frets];
                chord = chord.slice(0, -1);
                chord = `123-3 ${chord}m7b5`;

                chords.push(this.notes[1][frets - 3]);
                chords.push(this.notes[2][frets - 1]);
                //ルート
                chords.push(this.notes[3][frets]);
                break;
            case 9:
                //http://127.0.0.1:5500/html/img/triad2/C-2.png
                //コード名
                chord = this.notes[2][frets];
                chord = chord.slice(0, -1);
                chord = `234-2 ${chord}`;

                //ルート
                chords.push(this.notes[2][frets]);
                chords.push(this.notes[3][frets - 1]);
                chords.push(this.notes[4][frets + 1]);
                break;
            case 10:
                //http://127.0.0.1:5500/html/img/triad2/Cm-2.png
                //コード名
                chord = this.notes[2][frets];
                chord = chord.slice(0, -1);
                chord = `234-2 ${chord}m`;

                //ルート
                chords.push(this.notes[2][frets]);
                chords.push(this.notes[3][frets - 1]);
                chords.push(this.notes[4][frets]);
                break;
            case 11:
                //http://127.0.0.1:5500/html/img/triad2/Cm7b5-2.png
                //コード名
                chord = this.notes[2][frets];
                chord = chord.slice(0, -1);
                chord = `234-2 ${chord}m7b5`;

                //ルート
                chords.push(this.notes[2][frets]);
                chords.push(this.notes[3][frets - 2]);
                chords.push(this.notes[4][frets]);
                break;
            case 12:
                //http://127.0.0.1:5500/html/img/triad2/C-3.png
                //コード名
                chord = this.notes[3][frets];
                chord = chord.slice(0, -1);
                chord = `234-3 ${chord}`;

                chords.push(this.notes[2][frets]);
                //ルート
                chords.push(this.notes[3][frets]);
                chords.push(this.notes[4][frets]);
                break;
            case 13:
                //http://127.0.0.1:5500/html/img/triad2/Cm-3.png
                //コード名
                chord = this.notes[3][frets];
                chord = chord.slice(0, -1);
                chord = `234-3 ${chord}m`;

                chords.push(this.notes[2][frets - 1]);
                //ルート
                chords.push(this.notes[3][frets]);
                chords.push(this.notes[4][frets]);
                break;
            case 14:
                //http://127.0.0.1:5500/html/img/triad2/Cm7b5-3.png
                //コード名
                chord = this.notes[3][frets];
                chord = chord.slice(0, -1);
                chord = `234-3 ${chord}m7b5`;

                chords.push(this.notes[2][frets - 1]);
                //ルート
                chords.push(this.notes[3][frets]);
                chords.push(this.notes[4][frets - 1]);
                break;
            case 15:
                //http://127.0.0.1:5500/html/img/triad2/C-4.png
                //コード名
                chord = this.notes[4][frets];
                chord = chord.slice(0, -1);
                chord = `234-4 ${chord}`;

                chords.push(this.notes[2][frets - 2]);
                chords.push(this.notes[3][frets - 1]);
                //ルート
                chords.push(this.notes[4][frets]);
                break;
            case 16:
                //http://127.0.0.1:5500/html/img/triad2/Cm-4.png
                //コード名
                chord = this.notes[4][frets];
                chord = chord.slice(0, -1);
                chord = `234-4 ${chord}m`;

                chords.push(this.notes[2][frets - 2]);
                chords.push(this.notes[3][frets - 2]);
                //ルート
                chords.push(this.notes[4][frets]);
                break;
            case 17:
                //http://127.0.0.1:5500/html/img/triad2/Cm7b5-4.png
                //コード名
                chord = this.notes[4][frets];
                chord = chord.slice(0, -1);
                chord = `234-4 ${chord}m7b5`;

                chords.push(this.notes[2][frets - 3]);
                chords.push(this.notes[3][frets - 2]);
                //ルート
                chords.push(this.notes[4][frets]);
                break;
            default:
                console.log("error");
        }

        if (this.playNote.string2 === "" || this.playNote.sound2 === "") {
            this.playNote.string2 = chord;
            this.playNote.sound2 = chords;
        } else {
            this.playNote.string1 = this.playNote.string2;
            this.playNote.sound1 = this.playNote.sound2;
            this.playNote.string2 = chord;
            this.playNote.sound2 = chords;
        }
    }

    playSound() {
        this.start.disabled = "true";
        const bpmValue = 60000 / parseInt(this.bpm.value);
        this.intervalID = setInterval(() => {
            //4拍子固定
            if (this.count > 0 && this.count % 4 == 0) {
                this.makeRandom();
                //和音
                this.synth.triggerAttackRelease(this.playNote.sound1, "4n");
                //表示
                this.now.innerHTML = this.playNote.string1;
                this.next.innerHTML = `(次) ${this.playNote.string2}`;
            } else if (this.count === 0) {
                this.makeRandom();
                this.now.innerHTML = "Ready";
                this.next.innerHTML = `(最初) ${this.playNote.string2}`;
            }
            this.hiHat.triggerAttackRelease('32n');
            this.count++;

        }, bpmValue);
    }

    stopSound() {
        this.start.disabled = "";
        clearInterval(this.intervalID);
    }
}