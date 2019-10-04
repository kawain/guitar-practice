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

//キャンバス
const cvs = document.getElementById("canvas");
const ctx = cvs.getContext("2d");

const img = new Image();
img.src = "./img/fretboard.png";
img.onload = () => {
    console.log("読み込み完了");
    hoge();
}

function hoge() {
    ctx.drawImage(img, 0, 0);

    ctx.fillStyle = "red";

    //1
    ctx.beginPath();
    ctx.arc(44, 41, 10, 0, Math.PI * 2);
    ctx.fill();

    ctx.beginPath();
    ctx.arc(81, 41, 10, 0, Math.PI * 2);
    ctx.fill();

    ctx.beginPath();
    ctx.arc(117, 41, 10, 0, Math.PI * 2);
    ctx.fill();

    ctx.beginPath();
    ctx.arc(153, 41, 10, 0, Math.PI * 2);
    ctx.fill();

    ctx.beginPath();
    ctx.arc(189, 41, 10, 0, Math.PI * 2);
    ctx.fill();

    ctx.beginPath();
    ctx.arc(225, 41, 10, 0, Math.PI * 2);
    ctx.fill();

    ctx.beginPath();
    ctx.arc(261, 41, 10, 0, Math.PI * 2);
    ctx.fill();

    ctx.beginPath();
    ctx.arc(297, 41, 10, 0, Math.PI * 2);
    ctx.fill();

    ctx.beginPath();
    ctx.arc(333, 41, 10, 0, Math.PI * 2);
    ctx.fill();

    ctx.beginPath();
    ctx.arc(369, 41, 10, 0, Math.PI * 2);
    ctx.fill();

    ctx.beginPath();
    ctx.arc(405, 41, 10, 0, Math.PI * 2);
    ctx.fill();

    ctx.beginPath();
    ctx.arc(441, 41, 10, 0, Math.PI * 2);
    ctx.fill();

    ctx.beginPath();
    ctx.arc(477, 41, 10, 0, Math.PI * 2);
    ctx.fill();

    ctx.beginPath();
    ctx.arc(513, 41, 10, 0, Math.PI * 2);
    ctx.fill();

    ctx.beginPath();
    ctx.arc(549, 41, 10, 0, Math.PI * 2);
    ctx.fill();

    ctx.beginPath();
    ctx.arc(585, 41, 10, 0, Math.PI * 2);
    ctx.fill();

    ctx.beginPath();
    ctx.arc(621, 41, 10, 0, Math.PI * 2);
    ctx.fill();

    ctx.beginPath();
    ctx.arc(657, 41, 10, 0, Math.PI * 2);
    ctx.fill();

    ctx.beginPath();
    ctx.arc(693, 41, 10, 0, Math.PI * 2);
    ctx.fill();

    ctx.beginPath();
    ctx.arc(729, 41, 10, 0, Math.PI * 2);
    ctx.fill();

    //2
    ctx.beginPath();
    ctx.arc(44, 68, 10, 0, Math.PI * 2);
    ctx.fill();

    //3
    ctx.beginPath();
    ctx.arc(44, 93, 10, 0, Math.PI * 2);
    ctx.fill();

    //4
    ctx.beginPath();
    ctx.arc(44, 119, 10, 0, Math.PI * 2);
    ctx.fill();
    //5
    ctx.beginPath();
    ctx.arc(44, 145, 10, 0, Math.PI * 2);
    ctx.fill();
    //6
    ctx.beginPath();
    ctx.arc(44, 171, 10, 0, Math.PI * 2);
    ctx.fill();
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
        let html = "<option></option>";
        for (const element of docs) {
            html += `<option value="${element._id}">${element.scale_name}</option>`;
        }
        select_scale.innerHTML = html;
        delete_scale.innerHTML = html;

    });
}

//スケール選択
select_scale.addEventListener("change", (e) => {
    console.log(e.target.value);
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
            sound_array: new_confirm_arr,
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