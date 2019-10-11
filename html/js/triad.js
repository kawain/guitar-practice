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
    //この範囲は色々
    let min;
    let max;
    if (triad_no === 0) {
        min = 4;
        max = 15;
    } else if (triad_no === 1) {
        min = 2;
        max = 13;
    } else if (triad_no === 2) {
        min = 3;
        max = 14;
    } else if (triad_no === 3) {
        min = 4;
        max = 15;
    } else if (triad_no === 4) {
        min = 3;
        max = 14;
    } else if (triad_no === 5) {
        min = 2;
        max = 13;
    } else if (triad_no === 6) {
        min = 4;
        max = 15;
    }

    let frets = Math.floor(Math.random() * (max - min + 1) + min);
    //配列のインデックス用でマイナスする
    frets--;

    //押さえるパーターン
    let pattern;
    if (triad_no === 0) {
        //0 ～ 17まで
        pattern = Math.floor(Math.random() * 18);
    } else if (triad_no === 1) {
        //0,1,2
        pattern = Math.floor(Math.random() * 3);
    } else if (triad_no === 2) {
        //3,4,5
        pattern = Math.floor(Math.random() * (5 - 3)) + 3;
    } else if (triad_no === 3) {
        //6,7,8
        pattern = Math.floor(Math.random() * (8 - 6)) + 6;
    } else if (triad_no === 4) {
        //9,10,11
        pattern = Math.floor(Math.random() * (11 - 9)) + 9;
    } else if (triad_no === 5) {
        //12,13,14
        pattern = Math.floor(Math.random() * (14 - 12)) + 12;
    } else if (triad_no === 6) {
        //15,16,17
        pattern = Math.floor(Math.random() * (17 - 15)) + 15;
    }

    switch (pattern) {
        case 0:
            //http://127.0.0.1:5500/html/img/triad1/C-1.png
            //コード名
            chord = fingerboard[1][frets];
            chord = chord.slice(0, -1);
            chord = `123-1 ${chord}`;

            //ルート
            chords.push(fingerboard[1][frets]);
            chords.push(fingerboard[2][frets]);
            chords.push(fingerboard[3][frets + 1]);
            break;
        case 1:
            //http://127.0.0.1:5500/html/img/triad1/Cm-1.png
            //コード名
            chord = fingerboard[1][frets];
            chord = chord.slice(0, -1);
            chord = `123-1 ${chord}m`;

            //ルート
            chords.push(fingerboard[1][frets]);
            chords.push(fingerboard[2][frets]);
            chords.push(fingerboard[3][frets]);
            break;
        case 2:
            //http://127.0.0.1:5500/html/img/triad1/Cm7b5-1.png
            //コード名
            chord = fingerboard[1][frets];
            chord = chord.slice(0, -1);
            chord = `123-1 ${chord}m7b5`;

            //ルート
            chords.push(fingerboard[1][frets]);
            chords.push(fingerboard[2][frets - 1]);
            chords.push(fingerboard[3][frets]);
            break;
        case 3:
            //http://127.0.0.1:5500/html/img/triad1/C-2.png
            //コード名
            chord = fingerboard[2][frets];
            chord = chord.slice(0, -1);
            chord = `123-2 ${chord}`;

            chords.push(fingerboard[1][frets - 1]);
            //ルート
            chords.push(fingerboard[2][frets]);
            chords.push(fingerboard[3][frets - 1]);
            break;
        case 4:
            //http://127.0.0.1:5500/html/img/triad1/Cm-2.png
            //コード名
            chord = fingerboard[2][frets];
            chord = chord.slice(0, -1);
            chord = `123-2 ${chord}m`;

            chords.push(fingerboard[1][frets - 2]);
            //ルート
            chords.push(fingerboard[2][frets]);
            chords.push(fingerboard[3][frets - 1]);
            break;
        case 5:
            //http://127.0.0.1:5500/html/img/triad1/Cm7b5-2.png
            //コード名
            chord = fingerboard[2][frets];
            chord = chord.slice(0, -1);
            chord = `123-2 ${chord}m7b5`;

            chords.push(fingerboard[1][frets - 2]);
            //ルート
            chords.push(fingerboard[2][frets]);
            chords.push(fingerboard[3][frets - 2]);
            break;
        case 6:
            //http://127.0.0.1:5500/html/img/triad1/C-3.png
            //コード名
            chord = fingerboard[3][frets];
            chord = chord.slice(0, -1);
            chord = `123-3 ${chord}`;

            chords.push(fingerboard[1][frets - 2]);
            chords.push(fingerboard[2][frets]);
            //ルート
            chords.push(fingerboard[3][frets]);
            break;
        case 7:
            //http://127.0.0.1:5500/html/img/triad1/Cm-3.png
            //コード名
            chord = fingerboard[3][frets];
            chord = chord.slice(0, -1);
            chord = `123-3 ${chord}m`;

            chords.push(fingerboard[1][frets - 2]);
            chords.push(fingerboard[2][frets - 1]);
            //ルート
            chords.push(fingerboard[3][frets]);
            break;
        case 8:
            //http://127.0.0.1:5500/html/img/triad1/Cm7b5-3.png
            //コード名
            chord = fingerboard[3][frets];
            chord = chord.slice(0, -1);
            chord = `123-3 ${chord}m7b5`;

            chords.push(fingerboard[1][frets - 3]);
            chords.push(fingerboard[2][frets - 1]);
            //ルート
            chords.push(fingerboard[3][frets]);
            break;
        case 9:
            //http://127.0.0.1:5500/html/img/triad2/C-2.png
            //コード名
            chord = fingerboard[2][frets];
            chord = chord.slice(0, -1);
            chord = `234-2 ${chord}`;

            //ルート
            chords.push(fingerboard[2][frets]);
            chords.push(fingerboard[3][frets - 1]);
            chords.push(fingerboard[4][frets + 1]);
            break;
        case 10:
            //http://127.0.0.1:5500/html/img/triad2/Cm-2.png
            //コード名
            chord = fingerboard[2][frets];
            chord = chord.slice(0, -1);
            chord = `234-2 ${chord}m`;

            //ルート
            chords.push(fingerboard[2][frets]);
            chords.push(fingerboard[3][frets - 1]);
            chords.push(fingerboard[4][frets]);
            break;
        case 11:
            //http://127.0.0.1:5500/html/img/triad2/Cm7b5-2.png
            //コード名
            chord = fingerboard[2][frets];
            chord = chord.slice(0, -1);
            chord = `234-2 ${chord}m7b5`;

            //ルート
            chords.push(fingerboard[2][frets]);
            chords.push(fingerboard[3][frets - 2]);
            chords.push(fingerboard[4][frets]);
            break;
        case 12:
            //http://127.0.0.1:5500/html/img/triad2/C-3.png
            //コード名
            chord = fingerboard[3][frets];
            chord = chord.slice(0, -1);
            chord = `234-3 ${chord}`;

            chords.push(fingerboard[2][frets]);
            //ルート
            chords.push(fingerboard[3][frets]);
            chords.push(fingerboard[4][frets]);
            break;
        case 13:
            //http://127.0.0.1:5500/html/img/triad2/Cm-3.png
            //コード名
            chord = fingerboard[3][frets];
            chord = chord.slice(0, -1);
            chord = `234-3 ${chord}m`;

            chords.push(fingerboard[2][frets - 1]);
            //ルート
            chords.push(fingerboard[3][frets]);
            chords.push(fingerboard[4][frets]);
            break;
        case 14:
            //http://127.0.0.1:5500/html/img/triad2/Cm7b5-3.png
            //コード名
            chord = fingerboard[3][frets];
            chord = chord.slice(0, -1);
            chord = `234-3 ${chord}m7b5`;

            chords.push(fingerboard[2][frets - 1]);
            //ルート
            chords.push(fingerboard[3][frets]);
            chords.push(fingerboard[4][frets - 1]);
            break;
        case 15:
            //http://127.0.0.1:5500/html/img/triad2/C-4.png
            //コード名
            chord = fingerboard[4][frets];
            chord = chord.slice(0, -1);
            chord = `234-4 ${chord}`;

            chords.push(fingerboard[2][frets - 2]);
            chords.push(fingerboard[3][frets - 1]);
            //ルート
            chords.push(fingerboard[4][frets]);
            break;
        case 16:
            //http://127.0.0.1:5500/html/img/triad2/Cm-4.png
            //コード名
            chord = fingerboard[4][frets];
            chord = chord.slice(0, -1);
            chord = `234-4 ${chord}m`;

            chords.push(fingerboard[2][frets - 2]);
            chords.push(fingerboard[3][frets - 2]);
            //ルート
            chords.push(fingerboard[4][frets]);
            break;
        case 17:
            //http://127.0.0.1:5500/html/img/triad2/Cm7b5-4.png
            //コード名
            chord = fingerboard[4][frets];
            chord = chord.slice(0, -1);
            chord = `234-4 ${chord}m7b5`;

            chords.push(fingerboard[2][frets - 3]);
            chords.push(fingerboard[3][frets - 2]);
            //ルート
            chords.push(fingerboard[4][frets]);
            break;
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
            //表示
            //ctx.clearRect(0, 0, w, h);
            ctx.fillStyle = "chartreuse";
            ctx.rect(0, 0, w, h);
            ctx.fill();

            ctx.fillStyle = "black";
            ctx.font = "42px sans-serif";
            ctx.textAlign = "center";
            ctx.fillText(playNote.string1, canvas.width / 2, 140);

            ctx.font = "24px sans-serif";
            ctx.textAlign = "center";
            ctx.fillText(`(次) ${playNote.string2}`, canvas.width / 2, 250);

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
            ctx.fillText("Ready", canvas.width / 2, 140);

            ctx.font = "24px sans-serif";
            ctx.textAlign = "center";
            ctx.fillText(`(最初) ${playNote.string2}`, canvas.width / 2, 250);
        }
        //ハイハット
        playSound(obj[1], 1);
        count++;
    }, bpmValue);
}