import Color from "https://colorjs.io/dist/color.js";

var colorSteps = 1;
var colorDegrees = [30, 10, 320, 300, 270, 250, 235, 210, 180, 145, 130, 115, 100, 85, 65, 40];
var container = document.querySelector("#perceptive");
var slider = document.querySelector("#colorSlider");
var sliderV = document.querySelector("#sliderValue");

document.addEventListener("DOMContentLoaded", function() {
    for (let i = 0; i < colorSteps; i++) {
        let containerdiv = document.createElement("div");
        containerdiv.classList.add("d-flex");
        containerdiv.id = "c" + i;
        container.appendChild(containerdiv);
        colorDegrees.forEach(function(colorDegree) {
            let div = document.createElement("div");
            div.classList.add("p-2");
            div.classList.add("flex-fill");
            div.classList.add("colorbox");
            div.classList.add("m-2");
            div.classList.add("editable");
            div.style.backgroundColor = "oklch(70% 0.15 " + colorDegree + ")";
            div.innerHTML = "<div class='d-flex' style='height: 100%;'><div class='align-self-center text-center lead' style='width: 100%;'>L 70%<br>C 0.15</div></div>";
            containerdiv.appendChild(div); // Append to containerdiv instead of container
        });
    }
    slider.addEventListener("input", function() {
        let val = 50 + (slider.value * 10);
        let colorDivs = document.querySelectorAll(".editable");
        colorDivs.forEach(function(div) {
            let color = new Color(div.style.backgroundColor);
            console.log(color);
            color.oklch.l = val;
            div.style.backgroundColor = color;
        });
        sliderV.textContent = val + "%";
    });
});


