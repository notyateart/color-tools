var lightness = 95;
var chromas = [0.21, 0.18, 0.15, 0.12, 0.09, 0.06, 0.03];
var hues = [30, 10, 320, 300, 270, 250, 235, 210, 180, 145, 130, 115, 100, 85, 65, 40];
var container = document.querySelector("#perceptive");
var slider = document.querySelector("#colorSlider");
var sliderV = document.querySelector("#sliderValue");
var darkMode = false;
var darkSwitch = document.querySelector("#darkSwitch");

var matchedColors = [
    [65, 0.21, 30], 
    [60, 0.21, 10], 
    [50, 0.21, 320], 
    [50, 0.15, 300], 
    [50, 0.12, 270],
    [65, 0.18, 250],
    [75, 0.15, 235],
    [75, 0.12, 210],
    [60, 0.09, 180],
    [70, 0.18, 145],
    [75, 0.18, 130],
    [85, 0.18, 115],
    [90, 0.18, 100],
    [85, 0.15, 85],
    [75, 0.15, 65],
    [70, 0.18, 40]
]

function OKLCH(l, c, h) {
    return new Color("oklch(" + l + "% " + c + " " + h + " / 1)");
}

function getHex(c) {
    if (c.to("srgb").inGamut()){
        return c.toString({format: "hex"});
    } else {
        return "#00000000";
    }
}

document.addEventListener("DOMContentLoaded", function() {
    chromas.forEach(function(chroma){
        let containerdiv = document.createElement("div");
        containerdiv.classList.add("d-flex");
        containerdiv.id = "c" + chroma;
        container.appendChild(containerdiv);
        hues.forEach(function(hue) {
            let div = document.createElement("div");
            div.classList.add("flex-fill");
            div.classList.add("colorbox");
            div.classList.add("m-2");
            div.classList.add("editable");
            div.classList.add("rounded-2");
            div.classList.add("border");
            div.classList.add("border-0");
            div.classList.add("border-dark");
            let c = OKLCH(lightness, chroma, hue);
            div.setAttribute("ok-l", lightness);
            div.setAttribute("ok-c", chroma);
            div.setAttribute("ok-h", hue);
            if (c.inGamut("srgb")) {
                div.style.backgroundColor = c.toString({format: "hex"});
            } else {
                div.classList.add("invisible");
                div.style.backgroundColor = "#000000";
            }
            div.style.color = "#000000";
            div.innerHTML = "<div class='d-flex flex-column justify-content-center' style='height: 100%'><div class='text-center lead select-l'>L " + lightness + "%</div><div class='text-center lead select-c'>C " + chroma + "</div></div>";
            containerdiv.appendChild(div);
        });
    });

    slider.addEventListener("input", function() {
        lightness = 0 + (slider.value * 5);
        sliderV.textContent = lightness + "%";

        let lightnessTexts = document.querySelectorAll(".select-l");
        lightnessTexts.forEach(function(lt) {
            lt.innerHTML = "L " + lightness + "%";
        });

        let colorDivs = document.querySelectorAll(".editable");
        colorDivs.forEach(function(div) {
            let c = OKLCH(div.getAttribute("ok-l"), div.getAttribute("ok-c"), div.getAttribute("ok-h"));
            c.oklch.l = lightness/100;
            div.setAttribute("ok-l", lightness);
            if (c.inGamut("srgb")) {
                div.style.backgroundColor = c.toString({format: "hex"});
                div.classList.remove("invisible");
            } else {
                div.classList.add("invisible");
                div.style.backgroundColor = "#000000";
            }
            let textB = new Color("#000000");
            let textW = new Color("#ffffff");
            let contrastB = c.contrast(textB, "APCA");
            let contrastW = c.contrast(textW, "APCA");
            if (Math.abs(contrastB) > Math.abs(contrastW)) {
                div.style.color = "#000000";
            } else {
                div.style.color = "#ffffff";
            }
            div.classList.remove("border-4");
            div.classList.add("border-0");
            div.classList.remove("m-1");
            div.classList.add("m-2");
            matchedColors.forEach(function(color){
                if (div.getAttribute("ok-l") == color[0]){
                    if (div.getAttribute("ok-c") == color[1]) {
                        if (div.getAttribute("ok-h") == color[2]) {
                            console.log("Found!");
                            div.classList.remove("border-0");
                            div.classList.add("border-4");
                            div.classList.remove("m-2");
                            div.classList.add("m-1");
                        }
                    }
                }
            });
        });
    });

    darkSwitch.addEventListener("click", function(){
        darkMode = !darkMode;
        if (darkMode) {
            document.querySelector("body").classList.remove("text-bg-light");
            document.querySelector("body").classList.add("text-bg-dark");
        } else {
            document.querySelector("body").classList.remove("text-bg-dark");
            document.querySelector("body").classList.add("text-bg-light");
        }
        document.querySelectorAll(".editable").forEach(function(div){
            if (darkMode) {
                div.classList.remove("border-dark");
                div.classList.add("border-light");
            } else {
                div.classList.remove("border-light");
                div.classList.add("border-dark");
            }
        });
    });


});


