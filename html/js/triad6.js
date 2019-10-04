/*

234
  R

*/
const Triad = require("./js/triadClass.js");

class Triad6 extends Triad {
    makeRandom() {
        let chord;
        let chords = [];
        //ルート音のフレット
        //範囲指定のランダム
        //Math.random() * (max - min + 1) + min
        let min = 4;
        let max = 15;
        let frets = Math.floor(Math.random() * (max - min + 1) + min);
        //配列のインデックス用でマイナスする
        frets--;

        //パーターン
        const pattern = Math.floor(3 * Math.random());
        switch (pattern) {
            case 0:
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
            case 1:
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
            case 2:
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

new Triad6();