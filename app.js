const canvas = document.querySelector("#jsCanvas");
const context = canvas.getContext("2d");
const colors = document.getElementsByClassName("jsColor");
const range = document.querySelector("#jsRange");
const mode = document.getElementById("jsMode");
const save = document.getElementById("jsSave");
const clear = document.getElementById("jsClear");

const DEFAULT_COLOR = "#2c2c2c";
const DEFAULT_LINE_WIDTH = 2.5;
const CANVAS_WIDTH = 700;
const CANVAS_HEIGHT = 700;

let painting = false;
let filling = false;

function handleClearClick(){
    clearCanvas();
}
function clearCanvas(){
    context.fillStyle = "white";
    context.fillRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
}
function setInitialCanvas() {
    canvas.width = CANVAS_WIDTH;
    canvas.height = CANVAS_HEIGHT;
    clearCanvas();
    context.fillStyle = DEFAULT_COLOR;
    context.strokeStyle = DEFAULT_COLOR;
    context.lineWidth = DEFAULT_LINE_WIDTH;
}
function handleCM(event) {
    event.preventDefault();
}
function handleSaveClick() {
    const image = canvas.toDataURL("image/png");
    // const image = canvas.toDataURL();
    const link = document.createElement("a");
    link.href = image;
    link.download = "PaintJS😁";
    link.click();
}
function handleCanvasClick() {
    if (filling) context.fillRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
}

function handleModeClick() {
    const text = (filling) ? "fill" : "paint";
    mode.innerText = text;
    filling = !filling;
}
function handleRangeChange(event) {
    const lineWidth = event.target.value;
    context.lineWidth = lineWidth;
}

function handleColorClick(event) {
    const currentDiv = event.target;
    const chosenColor = currentDiv.style.backgroundColor;
    context.strokeStyle = chosenColor;
    context.fillStyle = chosenColor;
    Array.from(colors).forEach(color => color.classList.remove("colorClicked"));
    currentDiv.classList.add("colorClicked");
}
function stopPainting() {
    painting = false;
}

function startPainting() {
    painting = true;
}

function onMouseMove(event) {
    const x = event.offsetX;
    const y = event.offsetY;
    if (!painting) {
        context.beginPath();
        context.moveTo(x, y);
    } else {
        context.lineTo(x, y);
        context.stroke();
    }
}

function init() {
    if (canvas) {
        setInitialCanvas();
        canvas.addEventListener("mousemove", onMouseMove);
        canvas.addEventListener("mousedown", startPainting);
        canvas.addEventListener("mouseup", stopPainting);
        canvas.addEventListener("mouseleave", stopPainting);
        canvas.addEventListener("click", handleCanvasClick);
        canvas.addEventListener("contextmenu", handleCM);
    }
    if (range) {
        range.addEventListener("input", handleRangeChange);
    }
    if (mode) {
        mode.addEventListener("click", handleModeClick);
    }
    if (save) {
        save.addEventListener("click", handleSaveClick);
    }
    if(clear){
        clear.addEventListener("click", handleClearClick);
    }
}

init();
Array.from(colors).forEach(color => color.addEventListener("click", handleColorClick));