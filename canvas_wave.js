/** 
 * canvas 画波浪线
 * 
*/
let canvas = document.getElementById('jsCanvas');
let ctx = canvas.getContext('2d');
canvas.width = canvas.parentNode.offsetWidth;
canvas.height = canvas.parentNode.offsetHeight;
$(window).resize(function() {
    canvas.width = canvas.parentNode.offsetWidth;
    canvas.height = canvas.parentNode.offsetHeight;
})
let lines = ["rgba(255,255,255, 0.5)", "rgba(255,255,255, 0.2)", "rgba(255,255,255, 0.1)"];
let step = 0;
function loop() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    step++;
    if (step == canvas.width) {
        step = 0;
    }
    for (var j = lines.length - 1; j >= 0; j--) {
        ctx.strokeStyle = lines[j];
        let angle = (step + j * 45) * Math.PI / 180;
        let deltaHeight = Math.sin(angle) * 50;
        let deltaHeightRight = Math.cos(angle) * 50;
        ctx.beginPath();
        ctx.moveTo(0, canvas.height / 2 + deltaHeight);
        ctx.bezierCurveTo(canvas.width / 2, canvas.height / 2 + deltaHeight - 50, canvas.width / 2, canvas.height / 2 + deltaHeightRight - 50, canvas.width, canvas.height / 2 + deltaHeightRight);
        ctx.stroke();
    }
    requestAnimationFrame(loop);
}
loop();