/*

234
 R

*/
const Triad = require("./js/triadClass.js");

class Triad5 extends Triad {
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
            case 1:
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
            case 2:
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

new Triad5();