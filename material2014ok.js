import Color from "https://colorjs.io/dist/color.js";

function getContrast(BackgroundColorObject, TextColorObject) {
    window.open("https://www.myndex.com/APCA/?BG=" + BackgroundColorObject.to("srgb") + "&TXT=" + TextColorObject.to("srgb"));
}

document.querySelectorAll(".flex-item").forEach(e => {
    console.log("Found Element");
    let BGC = new Color(e.style.backgroundcolor);
    let TXW = new Color("#ffffff");
    let TXB = new Color("#000000");
    let contrastW = BGC.contrast(TXW, "APCA");
    let contrastB = BGC.contrast(TXB, "APCA");
    if (Math.abs(contrastW) < Math.abs(contrastB)) {
        e.addEventListener("click", event => getContrast(BGC, TXB));
    } else {
        e.addEventListener("click", event => getContrast(BGC, TXW));
    }
});