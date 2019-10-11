const playNote = {
    //鳴らす音
    string1: "",
    sound1: [],
    //次の音
    string2: "",
    sound2: []
};

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
            chord = fingerboard[6][frets];
            chord = chord.slice(0, -1);
            chord = `6弦ルート ${chord}M7`;

            chords.push(fingerboard[2][frets]);
            chords.push(fingerboard[3][frets + 1]);
            chords.push(fingerboard[4][frets + 1]);
            //ルート
            chords.push(fingerboard[6][frets]);
            break;
        case 1:
            //http://127.0.0.1:5500/html/img/chord/CM7-5.png
            //コード名
            chord = fingerboard[5][frets];
            chord = chord.slice(0, -1);
            chord = `5弦ルート ${chord}M7`;

            chords.push(fingerboard[2][frets + 2]);
            chords.push(fingerboard[3][frets + 1]);
            chords.push(fingerboard[4][frets + 2]);
            //ルート
            chords.push(fingerboard[5][frets]);
            break;
        case 2:
            //http://127.0.0.1:5500/html/img/chord/C-7-6.png
            //コード名
            chord = fingerboard[6][frets];
            chord = chord.slice(0, -1);
            chord = `6弦ルート ${chord}m7`;

            //ルート
            chords.push(fingerboard[2][frets]);
            chords.push(fingerboard[3][frets]);
            chords.push(fingerboard[4][frets]);
            chords.push(fingerboard[6][frets]);
            break;
        case 3:
            //http://127.0.0.1:5500/html/img/chord/C-7-5.png
            //コード名
            chord = fingerboard[5][frets];
            chord = chord.slice(0, -1);
            chord = `5弦ルート ${chord}m7`;

            chords.push(fingerboard[2][frets + 1]);
            chords.push(fingerboard[3][frets]);
            chords.push(fingerboard[4][frets + 2]);
            //ルート
            chords.push(fingerboard[5][frets]);
            break;
        case 4:
            //http://127.0.0.1:5500/html/img/chord/C7-6.png
            //コード名
            chord = fingerboard[6][frets];
            chord = chord.slice(0, -1);
            chord = `6弦ルート ${chord}7`;

            chords.push(fingerboard[2][frets]);
            chords.push(fingerboard[3][frets + 1]);
            chords.push(fingerboard[4][frets]);
            //ルート
            chords.push(fingerboard[6][frets]);
            break;
        case 5:
            //http://127.0.0.1:5500/html/img/chord/C7-5.png
            //コード名
            chord = fingerboard[5][frets];
            chord = chord.slice(0, -1);
            chord = `5弦ルート ${chord}7`;

            chords.push(fingerboard[2][frets + 2]);
            chords.push(fingerboard[3][frets]);
            chords.push(fingerboard[4][frets + 2]);
            //ルート
            chords.push(fingerboard[5][frets]);
            break;
        case 6:
            //http://127.0.0.1:5500/html/img/chord/Cm7b5-6.png
            //コード名
            chord = fingerboard[6][frets];
            chord = chord.slice(0, -1);
            chord = `6弦ルート ${chord}m7b5`;

            chords.push(fingerboard[2][frets - 1]);
            chords.push(fingerboard[3][frets]);
            chords.push(fingerboard[4][frets]);
            //ルート
            chords.push(fingerboard[6][frets]);
            break;
        case 7:
            //http://127.0.0.1:5500/html/img/chord/Cm7b5-5.png
            //コード名
            chord = fingerboard[5][frets];
            chord = chord.slice(0, -1);
            chord = `5弦ルート ${chord}m7b5`;

            chords.push(fingerboard[2][frets + 1]);
            chords.push(fingerboard[3][frets]);
            chords.push(fingerboard[4][frets + 1]);
            //ルート
            chords.push(fingerboard[5][frets]);
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

function playSoundLoop(obj) {
    const bpmValue = 60000 / parseInt(default_bpm);
    intervalID = setInterval(() => {
        //4拍子固定
        if (count > 0 && count % 4 == 0) {
            makeRandom();
            //ギター和音
            playSound(obj[0], ansFrequency(playNote.sound1[0]));
            playSound(obj[0], ansFrequency(playNote.sound1[1]));
            playSound(obj[0], ansFrequency(playNote.sound1[2]));
            playSound(obj[0], ansFrequency(playNote.sound1[3]));
            //表示
            //ctx.clearRect(0, 0, w, h);
            ctx.fillStyle = "chartreuse";
            ctx.rect(0, 0, w, h);
            ctx.fill();

            ctx.fillStyle = "black";
            ctx.font = "42px sans-serif";
            ctx.textAlign = "center";
            ctx.fillText(playNote.string1, w / 2, 140);

            ctx.font = "24px sans-serif";
            ctx.textAlign = "center";
            ctx.fillText(`(次) ${playNote.string2}`, w / 2, 250);

        } else if (count === 0) {
            makeRandom();

            //表示
            //ctx.clearRect(0, 0, w, h);
            ctx.fillStyle = "red";
            ctx.rect(0, 0, w, h);
            ctx.fill();

            ctx.fillStyle = "black";
            ctx.font = "42px sans-serif";
            ctx.textAlign = "center";
            ctx.fillText("Ready", w / 2, 140);

            ctx.font = "24px sans-serif";
            ctx.textAlign = "center";
            ctx.fillText(`(最初) ${playNote.string2}`, w / 2, 250);
        }
        //ハイハット
        playSound(obj[1], 1);
        count++;
    }, bpmValue);
}