const {
    fingerboard
} = require('./js/variable');

let correct;
const question = document.getElementById("question");
const answer = document.getElementById("answer");
const next = document.getElementById("next");
const ansbtns = document.querySelectorAll(".ansbtn");

next.addEventListener("click", Questions);

for (let v of ansbtns) {
    v.addEventListener("click", (e) => {
        if (correct === e.target.dataset.note) {
            answer.innerHTML = `<h3 class="text-success">正解</h3>`;
        } else {
            answer.innerHTML = `<h3 class="text-danger">不正解</h3>正解は ${correct} です`;
        }
    });
}

//出題
function Questions() {
    //初期化
    answer.innerHTML = "";
    //fingerboardのキーからランダムに一つ選択
    const keys = Object.keys(fingerboard);
    const kResult = keys[Math.floor(keys.length * Math.random())];
    //選んだキーの値から(20フレットまで)ランダムに一つ選択
    const vResult = Math.floor(20 * Math.random());
    //答え
    correct = fingerboard[kResult][vResult].slice(0, -1);
    //質問
    question.innerHTML = `${kResult}弦の${vResult + 1}フレットは何の音？`;
}

Questions();