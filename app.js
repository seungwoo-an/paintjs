const canvas = document.querySelector("#jsCanvas");
const context = canvas.getContext("2d");
const colors = document.getElementsByClassName("jsColor");
const colorList = document.getElementById("jsColors");
const range = document.querySelector("#jsRange");
const mode = document.getElementById("jsMode");
const save = document.getElementById("jsSave");
const clear = document.getElementById("jsClear");
const showColor = document.getElementById("jsShowColor");
const eraser = document.getElementById("jsEraser");

const CLEARING_COLOR="white";
const DEFAULT_COLOR = "#2c2c2c";
const DEFAULT_LINE_WIDTH = 10;
const CANVAS_WIDTH = 600;
const CANVAS_HEIGHT = 600;

let painting = false;
let filling = false;
let showingColor = false;

function handleEraserClick(){
    context.strokeStyle=CLEARING_COLOR;
    
}
function handleShowColor(){
    let text;
    if(!showingColor){
        text="closecolors";
        colorList.classList.remove("hidden");
    }else{
        text="showcolors";
        colorList.classList.add("hidden");
    }
    showColor.innerText=text;
    showingColor=!showingColor;
}
function handleClearClick(){
    clearCanvas();
}
function clearCanvas(){
    context.fillStyle = CLEARING_COLOR;
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
    let text = (filling) ? "fill" : "paint";
    if(filling){
        text = "fill";
        eraser.classList.remove("hidden");
    }else{
        text="paint";
        eraser.classList.add("hidden");
    }
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
    if(showColor){
        showColor.addEventListener("click",handleShowColor);
    }
    if(eraser){
        eraser.addEventListener("click",handleEraserClick)
    }
}

init();
Array.from(colors).forEach(color => color.addEventListener("click", handleColorClick));