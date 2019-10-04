//先頭に戻る
const topBtn = document.getElementById("top");
topBtn.addEventListener("click", () => {
    window.scrollTo({
        top: 0,
        left: 0,
        behavior: "smooth"
    });
});