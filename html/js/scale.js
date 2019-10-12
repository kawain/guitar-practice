const scales_json = require('./scales.json');

//指板配列
const fretboard2 = [
    ["F", "Gb", "G", "Ab", "A", "Bb", "B", "C", "Db", "D", "Eb", "E", "F", "Gb", "G", "Ab", "A", "Bb", "B", "C"],
    ["C", "Db", "D", "Eb", "E", "F", "Gb", "G", "Ab", "A", "Bb", "B", "C", "Db", "D", "Eb", "E", "F", "Gb", "G"],
    ["Ab", "A", "Bb", "B", "C", "Db", "D", "Eb", "E", "F", "Gb", "G", "Ab", "A", "Bb", "B", "C", "Db", "D", "Eb"],
    ["Eb", "E", "F", "Gb", "G", "Ab", "A", "Bb", "B", "C", "Db", "D", "Eb", "E", "F", "Gb", "G", "Ab", "A", "Bb"],
    ["Bb", "B", "C", "Db", "D", "Eb", "E", "F", "Gb", "G", "Ab", "A", "Bb", "B", "C", "Db", "D", "Eb", "E", "F"],
    ["F", "Gb", "G", "Ab", "A", "Bb", "B", "C", "Db", "D", "Eb", "E", "F", "Gb", "G", "Ab", "A", "Bb", "B", "C"]
];

//20列
const column = [44, 81, 117, 153, 189, 225, 261, 297, 333, 369, 405, 441, 477, 513, 549, 585, 621, 657, 693, 729];

//6行
const row = [41, 68, 93, 119, 145, 171];

//移調用
const key_array = ["C", "Db", "D", "Eb", "E", "F", "Gb", "G", "Ab", "A", "Bb", "B"]

//キャンバス
const scale_cvs = document.getElementById("scale_canvas");
const scale_ctx = scale_cvs.getContext("2d");

const img = new Image();
img.src = "./img/fretboard.png";
img.onload = () => {
    console.log("読み込み完了");
    scale_ctx.drawImage(img, 0, 0);
}

function drawFret(sound_array) {
    //arcを書き出すための配列
    let arc = [];
    //ルート
    let root_count = 0;
    //ルートの色
    let color1 = "red";
    //それ以外の色
    let color2 = "blue";
    //ループして
    for (const v of sound_array) {
        //1~6弦
        for (let g = 0; g < 6; g++) {
            for (let i = 0; i < fretboard2[g].length; i++) {
                if (v === fretboard2[g][i]) {
                    let tmp = (root_count === 0) ? [column[i], row[g], color1] : [column[i], row[g], color2];
                    arc.push(tmp);
                }
            }
        }
        root_count++;
    }
    //描く
    scale_ctx.drawImage(img, 0, 0);
    for (const v of arc) {
        scale_ctx.beginPath();
        scale_ctx.fillStyle = v[2];
        scale_ctx.arc(v[0], v[1], 10, 0, Math.PI * 2);
        scale_ctx.fill();
    }
}

//メトロノーム用
function playSoundLoop(obj) {
    const bpmValue = 60000 / parseInt(default_bpm);
    intervalID = setInterval(() => {
        //ハイハット
        playSound(obj[1], 1);
    }, bpmValue);
}

//form関係のdom
const root_sound = document.getElementById("root_sound");
const select_scale = document.getElementById("select_scale");
const show_btn = document.getElementById("show_btn");

//select_scale作成
function make_select_scale() {
    //dom作成
    let html = "<option></option>";
    for (const v of scales_json) {
        html += `<option value="${v.keys}">${v.name}</option>`;
    }
    select_scale.innerHTML = html;
}

//移調関数
function transposition(n) {
    let n2 = n - 1;
    let i = 0;
    const a1 = [];
    const a2 = [];

    for (const v of key_array) {
        if (i >= n2) {
            a1.push(v);
        } else {
            a2.push(v);
        }
        i++;
    }

    return a1.concat(a2);
}

show_btn.addEventListener("click", (e) => {
    e.preventDefault();
    if (root_sound.value !== "" && select_scale.value !== "") {
        const ary = transposition(root_sound.value);
        const tmp = [];
        //配列にする
        const keys = select_scale.value.split(',');

        for (let i = 0; i < ary.length; i++) {
            for (const v of keys) {
                if (parseInt(v) === i + 1) {
                    tmp.push(ary[i]);
                }
            }
        }
        drawFret(tmp);
    }
});

make_select_scale();