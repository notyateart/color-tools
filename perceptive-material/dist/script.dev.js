"use strict";

// import Color from "https://colorjs.io/dist/color.js";
// import ColorSquare from "dist/colorbox.js";
var chroma = [0.02, 0.04, 0.08, 0.12, 0.16];
var colorDegrees = [30, 10, 320, 300, 270, 250, 235, 210, 180, 145, 130, 115, 100, 85, 65, 40];
var container = document.querySelector("#perceptive");
var slider = document.querySelector("#colorSlider");
var sliderV = document.querySelector("#sliderValue");
var lightness = 70;
document.addEventListener("DOMContentLoaded", function () {
  chroma.forEach(function (c) {
    var containerdiv = document.createElement("div");
    containerdiv.classList.add("d-flex");
    containerdiv.id = "c" + c;
    container.appendChild(containerdiv);
    colorDegrees.forEach(function (colorDegree) {
      var div = document.createElement("div");
      div.classList.add("p-2");
      div.classList.add("flex-fill");
      div.classList.add("colorbox");
      div.classList.add("m-2");
      div.classList.add("editable");
      div.style.backgroundColor = "oklch(70% " + c + " " + colorDegree + ")";
      div.innerHTML = "<div class='d-flex flex-column justify-content-center' style='height: 100%;'><div class='text-center lead lightness'>L " + lightness + "%</div><br><div class='text-center lead chroma'>C " + c + "</div></div>";
      containerdiv.appendChild(div);
    });
  });
  slider.addEventListener("input", function () {
    lightness = 50 + slider.value * 10;
    var colorDivs = document.querySelectorAll(".editable");
    colorDivs.forEach(function (div) {
      var color = new Color(div.style.backgroundColor);
      color.oklch.l = lightness / 100;
      console.log(color.toString({
        format: "oklch"
      }));
      div.style.backgroundColor = color.toString({
        format: "oklch"
      });
    });
    sliderV.textContent = lightness + "%";
    var lightnessTexts = document.querySelectorAll(".lightness");
    lightnessTexts.forEach(function (lt) {
      lt.innerHTML = "L " + lightness + "%";
    });
  });
});