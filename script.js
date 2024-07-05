var contrastType = "WCAG21";
var oklabPercent = 0.5;
var textcol1 = new Color("#000000");
var textcol2 = new Color("#ffffff")
var linkedColors = true;

function updateColorBoxes(){
    document.querySelectorAll(".color-box").forEach(function(element){
        let c = new Color(window.getComputedStyle(element).backgroundColor);
        switch (contrastType){
            case "OKLAB":
                //Try: #515b63
                document.querySelector("#oklabPercent").disabled = false;
                let darkerText = textcol1.oklab.l > textcol2.oklab.l ? textcol2 : textcol1;
                let lighterText = textcol1.oklab.l > textcol2.oklab.l ? textcol1 : textcol2;
                console.log("D: " + darkerText.oklab.l + "\nL: " + lighterText.oklab.l + "\nC: " + c.oklab.l + "\nV: " + (darkerText.oklab.l + (oklabPercent * (lighterText.oklab.l - darkerText.oklab.l))));
                if (c.oklab.l < (darkerText.oklab.l + (oklabPercent * (lighterText.oklab.l - darkerText.oklab.l)))) {
                    element.firstChild.style.color = lighterText.toString({format: "hex"});
                } else {
                    element.firstChild.style.color = darkerText.toString({format: "hex"});
                }
                break;
            case "APCA":
                let apcacontrast1 = c.contrast(textcol1, "APCA");
                let apcacontrast2 = c.contrast(textcol2, "APCA");
                if (Math.abs(apcacontrast1) > Math.abs(apcacontrast2)){
                    element.firstChild.style.color = textcol1.toString({format: "hex"});
                } else {
                    element.firstChild.style.color = textcol2.toString({format: "hex"});
                }
                console.log(apcacontrast1);
                console.log(apcacontrast2);
                break;
            default:
                document.querySelector("#oklabPercent").disabled = true;
                let contrastcol1 = c.contrast(textcol1, contrastType);
                let contrastcol2 = c.contrast(textcol2, contrastType);
                if (contrastcol1 > contrastcol2) {
                    element.firstChild.style.color = textcol1.toString({format: "hex"});
                } else {
                    element.firstChild.style.color = textcol2.toString({format: "hex"});
                }
            }
        element.firstChild.innerHTML = c.to("srgb").toString({format: "hex"});
    })
}

Coloris({
    theme: 'large',
    alpha: false,
    el: ".coloris"
});

Coloris.setInstance('#col1', {
    defaultColor: '#0000ff'
})

Coloris.setInstance('#col2', {
    defaultColor: '#ffffff'
})

Coloris.setInstance('#textcol1', {
    defaultColor: '#000000'
})

Coloris.setInstance('text#col2', {
    defaultColor: '#ffffff'
})

document.querySelector("#col1").addEventListener("input", event => {
    document.documentElement.style.setProperty("--col1", document.querySelector("#col1").parentElement.style.color);
    updateColorBoxes(true);
})

document.querySelector("#col2").addEventListener("input", event => {
    document.documentElement.style.setProperty("--col2", document.querySelector("#col2").parentElement.style.color);
    updateColorBoxes(true);
})

document.querySelector("#textcol1").addEventListener("input", event => {
    document.documentElement.style.setProperty("--textcol1", document.querySelector("#textcol1").parentElement.style.color);
    textcol1 = new Color(document.querySelector("#textcol1").parentElement.style.color);
    updateColorBoxes(true);
})

document.querySelector("#textcol2").addEventListener("input", event => {
    document.documentElement.style.setProperty("--textcol2", document.querySelector("#textcol2").parentElement.style.color);
    textcol2 = new Color(document.querySelector("#textcol2").parentElement.style.color);
    updateColorBoxes(true);
})



function delayClick(element) {
    setTimeout(function() {
        element.click();
    }, 500);
}

document.addEventListener("DOMContentLoaded", () => {
    document.querySelector('#col1').value = "#0000ff";
    document.querySelector('#col1').dispatchEvent(new Event('input', { bubbles: true }));
    document.querySelector('#col2').value = "#ffffff";
    document.querySelector('#col2').dispatchEvent(new Event('input', { bubbles: true }));
    document.querySelector('#textcol1').value = "#000000";
    document.querySelector('#textcol1').dispatchEvent(new Event('input', { bubbles: true }));
    document.querySelector('#textcol2').value = "#ffffff";
    document.querySelector('#textcol2').dispatchEvent(new Event('input', { bubbles: true }));
    document.querySelectorAll(".color-box").forEach(function(element){
        element.addEventListener("click", event => {
            navigator.clipboard.writeText(element.firstChild.innerHTML);
            let alertelement = document.createElement("div");
            alertelement.innerHTML = 'Copied <strong>' + element.firstChild.innerHTML + '</strong> to clipboard!<button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>';
            alertelement.className = "alert alert-info alert-dismissible fade show position-absolute top-50 start-50 translate-middle shadow-md";
            alertelement.style = "width: auto;"
            alertelement.setAttribute("role", "alert");
            document.querySelector("#main").appendChild(alertelement);
            delayClick(document.querySelector(".btn-close"));
        });
    });

    document.querySelector("#contrastType").addEventListener("change", event => {
        contrastType = event.target.value;
        updateColorBoxes();
    });
    document.querySelector("#oklabPercent").addEventListener("change", event => {
        oklabPercent = event.target.value;
        updateColorBoxes();
    });
  });