import Color from "https://colorjs.io/dist/color.js";

var colorSteps = 1;
var colorDegrees = [30, 10, 320, 300, 270, 250, 235, 210, 180, 145, 130, 115, 100, 85, 65, 40];
var container = document.querySelector("#perceptive");

document.addEventListener("DOMContentLoaded", function() {
    for (let i = 0; i < colorSteps; i++) {
        let containerdiv = document.createElement("div");
        containerdiv.classList.add("flex-container");
        containerdiv.id = "c" + i;
        container.appendChild(containerdiv);
        colorDegrees.forEach(function(colorDegree) {
            let div = document.createElement("div");
            div.classList.add("p-2");
            div.classList.add("flex-fill");
            div.style.backgroundColor = "oklab(70% 0.15 " + colorDegree + ")";
            div.textContent = "L 70%<br>C 0.15";
            containerdiv.appendChild(div); // Append to containerdiv instead of container
        });
    }
});





// function getContrast(BackgroundColorObject, TextColorObject) {
//     window.open("https://www.myndex.com/APCA/?BG=" + BackgroundColorObject.to("srgb") + "&TXT=" + TextColorObject.to("srgb"));
// }

// function delayClick(element) {
//     setTimeout(function() {
//         element.click();
//     }, 500);
// }

// document.querySelectorAll(".flex-item").forEach(e => {
//     console.log("Found Element");
//     let BGC = new Color(e.style.backgroundcolor);
//     let TXW = new Color("#ffffff");
//     let TXB = new Color("#000000");
//     let contrastW = BGC.contrast(TXW, "APCA");
//     let contrastB = BGC.contrast(TXB, "APCA");
//     if (Math.abs(contrastW) < Math.abs(contrastB)) {
//         e.addEventListener("click", event => getContrast(BGC, TXB));
//     } else {
//         e.addEventListener("click", event => getContrast(BGC, TXW));
//     }
// });

// document.querySelectorAll(".flex-item").forEach(function(element){
//     element.addEventListener("click", event => {
//         navigator.clipboard.writeText("Test");
//         let alertelement = document.createElement("div");
//         alertelement.innerHTML = 'Copied <strong>Test</strong> to clipboard!<button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>';
//         alertelement.className = "alert alert-info alert-dismissible fade show position-absolute top-50 start-50 translate-middle shadow-md";
//         alertelement.style = "width: auto;"
//         alertelement.setAttribute("role", "alert");
//         document.querySelector("#main").appendChild(alertelement);
//         delayClick(document.querySelector(".btn-close"));
//     });
// });