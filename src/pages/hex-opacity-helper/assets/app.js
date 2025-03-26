const elOpacity = document.getElementById("opacity");
const elOpacitySlider = document.getElementById("opacitySlider");
const elHexOpacity = document.getElementById("hexOpacity");
const elColor = document.getElementById("color");
const elFullHex = document.getElementById("fullHex");
const elColorPreview = document.getElementById("colorPreview");


function opacityToHex(opacity) {
    if (opacity < 0) opacity = 0;
    if (opacity > 1) opacity = 1;

    const decimalValue = Math.round(opacity * 255);

    let hexValue = decimalValue.toString(16);
    if (hexValue.length === 1) {
        hexValue = "0" + hexValue;
    }

    return hexValue.toUpperCase();
}

function updateSlider() {
    elOpacitySlider.value = elOpacity.value;
}

function updateInput() {
    elOpacity.value = elOpacitySlider.value;
}

function convertOpacity() {
    const opacity = parseFloat(elOpacity.value);
    const hexOpacity = opacityToHex(opacity);

    elHexOpacity.textContent = hexOpacity;

    let baseColor = elColor.value.trim();
    if (!baseColor.startsWith("#")) {
        baseColor = "#" + baseColor;
    }

    if (baseColor.length > 7) {
        baseColor = baseColor.substring(0, 7);
    }

    const fullHex = baseColor + hexOpacity;
    elFullHex.textContent = fullHex;

    elColorPreview.style.backgroundColor = fullHex;
}

function copyToClipboard(elementId) {
    const text = document.getElementById(elementId).textContent;
    navigator.clipboard.writeText(text).then(() => {
        alert("Copied to clipboard: " + text);
    });
}

window.onload = () => convertOpacity();

