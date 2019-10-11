const carray = [
    "pink",
    "yellow",
    "red",
    "teal",
    "orangered",
    "darkgreen",
    "lime",
    "blue",
    "maroon",
    "ivory",
    "fuchsia",
    "aqua",
    "purple",
    "olive",
    "white",
    "gray",
    "black"
]

function playSoundLoop(obj) {
    const bpmValue = 60000 / parseInt(default_bpm);
    intervalID = setInterval(() => {
        const color_index = Math.floor(carray.length * Math.random());
        ctx.fillStyle = carray[color_index];
        ctx.rect(0, 0, w, h);
        ctx.fill();
        //ハイハット
        playSound(obj[1], 1);
    }, bpmValue);
}