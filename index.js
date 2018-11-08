//Canvas functionality
const canvas = document.querySelector("#draw");
const ctx = canvas.getContext("2d");
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
ctx.strokeStyle = "#BADA55";
ctx.lineJoin = "round";
ctx.lineCap = "round";
ctx.lineWidth = 100;
let isDrawing = false;
let lastX = 0;
let lastY = 0;
let hue = 0;
let direction = true;
//ctx.globalCompositeOperation = "screen";

function draw(e) {
  if (!isDrawing) return; // stop the function from running when they are not moused down
  console.log(e);
  ctx.strokeStyle = `hsl(${hue}, 100%, 50%)`;
  ctx.beginPath();
  ctx.moveTo(lastX, lastY);
  ctx.lineTo(e.offsetX, e.offsetY);
  ctx.stroke();
  [lastX, lastY] = [e.offsetX, e.offsetY];

  hue++;
  if (hue >= 360) {
    hue = 0;
  }

  if (ctx.lineWidth >= 100 || ctx.lineWidth <= 1) {
    direction = !direction;
  }

  if (direction) {
    ctx.lineWidth++;
  } else {
    ctx.lineWidth--;
  }
}

canvas.addEventListener("mousedown", e => {
  isDrawing = true;
  [lastX, lastY] = [e.offsetX, e.offsetY];
});

canvas.addEventListener("mousemove", draw);
canvas.addEventListener("mouseup", () => (isDrawing = false));
canvas.addEventListener("mouseout", () => (isDrawing = false));

//Menu functionality
//Change background

function changeBackground() {
  ctx.save();
  ctx.fillStyle = document.getElementById("colorPicker").value;
  ctx.fillRect(0, 0, canvas.width, canvas.height);
  ctx.restore();
}
colorPicker.addEventListener("change", changeBackground, false);

//Save to file
function downloadCanvas(link, canvasId, filename) {
  link.href = document.getElementById("draw").toDataURL();
  link.download = filename;
}
document.getElementById("download").addEventListener(
  "click",
  function() {
    downloadCanvas(this, "draw", "test.png");
  },
  false
);

//Clear canvas
function deleteCanvas() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
}
let clearCanvas = document.getElementById("clearCanvas");
clearCanvas.addEventListener("click", deleteCanvas, false);