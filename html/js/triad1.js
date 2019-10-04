/*

123
R

*/
const Triad = require("./js/triadClass.js");

class Triad1 extends Triad {
    makeRandom() {
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

        //パーターン
        const pattern = Math.floor(3 * Math.random());
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

}

new Triad1();