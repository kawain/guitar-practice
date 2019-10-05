//https://github.com/louischatriot/nedb
const Database = require("nedb");
const db = new Database({
    filename: "./html/db/scale.db"
});

db.loadDatabase((error) => {
    if (error !== null) {
        console.error(error);
    }
    console.log("load database completed.");
});

//指板配列
const fretboard = [
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

//キャンバス
const cvs = document.getElementById("canvas");
const ctx = cvs.getContext("2d");

const img = new Image();
img.src = "./img/fretboard.png";
img.onload = () => {
    console.log("読み込み完了");
    ctx.drawImage(img, 0, 0);
}

function drawFret(sound_text) {
    //配列にする
    let sound_array = sound_text.split(',');
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
            for (let i = 0; i < fretboard[g].length; i++) {
                if (v === fretboard[g][i]) {
                    let tmp = (root_count === 0) ? [column[i], row[g], color1] : [column[i], row[g], color2];
                    arc.push(tmp);
                }
            }
        }
        root_count++;
    }
    //描く
    ctx.drawImage(img, 0, 0);
    for (const v of arc) {
        ctx.beginPath();
        ctx.fillStyle = v[2];
        ctx.arc(v[0], v[1], 10, 0, Math.PI * 2);
        ctx.fill();
    }
}

//form関係のdom
const select_scale = document.getElementById("select_scale");
const new_name = document.getElementById("new_name");
const new_sound = document.getElementById("new_sound");
const new_add = document.getElementById("new_add");
const new_confirm = document.getElementById("new_confirm");
const new_delete = document.getElementById("new_delete");
const new_save = document.getElementById("new_save");
const delete_scale = document.getElementById("delete_scale");
const delete_btn = document.getElementById("delete_btn");

//スケール一覧
function redraw() {
    db.find({}).sort({
        created_at: -1
    }).exec((error, docs) => {
        if (error !== null) {
            console.error(error);
        }
        //dom作成
        let html1 = "<option></option>";
        let html2 = "<option></option>";

        for (const element of docs) {
            html1 += `<option value="${element.sound_text}">${element.scale_name} (${element.sound_text})</option>`;
        }

        for (const element of docs) {
            html2 += `<option value="${element._id}">${element.scale_name}</option>`;
        }

        select_scale.innerHTML = html1;
        delete_scale.innerHTML = html2;

    });
}

//スケール選択
select_scale.addEventListener("change", (e) => {
    drawFret(e.target.value);
});

//スケール新規追加
let new_confirm_arr = [];

//音追加
new_add.addEventListener("click", (e) => {
    if (new_sound.value !== "") {
        new_confirm_arr.push(new_sound.value);
        new_confirm.value = new_confirm_arr.join(',');
    }
    e.preventDefault();
});

//音削除
new_delete.addEventListener("click", (e) => {
    new_confirm_arr.pop();
    new_confirm.value = new_confirm_arr.join(',');
    e.preventDefault();
});

//保存
new_save.addEventListener("click", (e) => {

    if (new_name.value !== "" && new_confirm.value !== "") {
        const doc = {
            scale_name: new_name.value,
            sound_text: new_confirm.value,
            created_at: new Date(),
        };

        db.insert(doc, (error, newDoc) => {
            if (error !== null) {
                console.error(error);
            }
            console.log(newDoc);
        });

        new_confirm_arr = [];
        new_name.value = "";
        new_confirm.value = "";
        new_sound.selectedIndex = 0;

        redraw();

    } else {
        alert("スケール名と音の両方とも入力してください");
    }

    e.preventDefault();
});

//スケール削除
delete_btn.addEventListener("click", (e) => {
    if (delete_scale.value !== "") {
        const query = {
            _id: delete_scale.value
        };
        const options = {
            multi: false
        };
        db.remove(query, options, (error, numOfDocs) => {
            if (error !== null) {
                console.error(error);
            }
            redraw();
        });
    }
    e.preventDefault();
});


redraw();