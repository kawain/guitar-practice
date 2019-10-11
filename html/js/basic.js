const playNote = {
    //鳴らす音
    string1: "",
    sound1: "",
    //次の音
    string2: "",
    sound2: ""
};

function makeRandom() {
    //common.fingerboardのキーからランダムに一つ選択
    const keys = Object.keys(fingerboard);
    const kResult = keys[Math.floor(keys.length * Math.random())];

    //選んだキーの値から(12フレットまで)ランダムに一つ選択
    const vResult = Math.floor(12 * Math.random());

    if (playNote.string2 === "" || playNote.sound2 === "") {
        playNote.string2 = kResult;
        playNote.sound2 = fingerboard[kResult][vResult];
    } else {
        playNote.string1 = playNote.string2;
        playNote.sound1 = playNote.sound2;
        playNote.string2 = kResult;
        playNote.sound2 = fingerboard[kResult][vResult];
    }
}

function playSoundLoop(obj) {
    const bpmValue = 60000 / parseInt(default_bpm);
    intervalID = setInterval(() => {
        //4拍子固定
        if (count > 0 && count % 4 == 0) {
            makeRandom();
            //ギター単音
            playSound(obj[0], ansFrequency(playNote.sound1));
            //表示
            //ctx.clearRect(0, 0, w, h);
            ctx.fillStyle = "chartreuse";
            ctx.rect(0, 0, w, h);
            ctx.fill();

            ctx.fillStyle = "black";
            ctx.font = "80px sans-serif";
            ctx.textAlign = "center";
            ctx.fillText(`${playNote.string1}弦 ${playNote.sound1}`, canvas.width / 2, 140);

            ctx.font = "24px sans-serif";
            ctx.textAlign = "center";
            ctx.fillText(`(次の音) ${playNote.string2}弦 ${playNote.sound2}`, canvas.width / 2, 250);

        } else if (count === 0) {
            makeRandom();

            //表示
            //ctx.clearRect(0, 0, w, h);
            ctx.fillStyle = "red";
            ctx.rect(0, 0, w, h);
            ctx.fill();

            ctx.fillStyle = "black";
            ctx.font = "80px sans-serif";
            ctx.textAlign = "center";
            ctx.fillText("Ready", canvas.width / 2, 140);

            ctx.font = "24px sans-serif";
            ctx.textAlign = "center";
            ctx.fillText(`(最初の音) ${playNote.string2}弦 ${playNote.sound2}`, canvas.width / 2, 250);
        }
        //ハイハット
        playSound(obj[1], 1);
        count++;
    }, bpmValue);
}