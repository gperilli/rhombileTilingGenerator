import { setRhombileBlockLayout } from '/src/setLayout.js'
import { updateBlockLayout } from '/src/setLayout.js'
import GUI from '/node_modules/lil-gui/dist/lil-gui.esm.js';

// https://en.wikipedia.org/wiki/Rhombille_tiling
// https://www.mathsisfun.com/sine-cosine-tangent.html


/////////////////////////////////////////////////////
// localStorage Initial Setting
/////////////////////////////////////////////////////
localStorage.setItem("rhombileSettings-reset", "false")
if (localStorage.getItem("rhombileSettings") == null || localStorage.getItem("rhombileSettings-reset") == "true") {
    // load default rhombile Settings
    localStorage.setItem("rhombileSettings", JSON.stringify({
        tileDensity: 20,
        coloring: "randomCubeColors",
        colorTwo: "#000",
        coloringOpacity: 0.5,
        fadeIn: "appearOnLoad",
        animation: "static"
    }))
}
const rhombileSettings = JSON.parse(localStorage.getItem("rhombileSettings"))
console.log(rhombileSettings);


/////////////////////////////////////////////
// on load / on resize
////////////////////////////////////////////
const topLevelContainer = document.querySelector("body");
window.addEventListener( 'load', function(event) {
    setRhombileBlockLayout(topLevelContainer, rhombileSettings);
});

window.addEventListener( 'resize', function(event) {
    updateBlockLayout(topLevelContainer, rhombileSettings)
});


/////////////////////////////////////////////
// the options menu
////////////////////////////////////////////
const camelConverter = {
    singleColor: "Single Color",
    randomTileColors: 'Random Tile Colors',
    randomCubeColors: 'Random Cube Colors',
    lines: 'Lines',
    appearOnLoad:'Appear On Load',
    randomTileFadeIn: 'Random Tile Fade In',
    randomBlockFadeIn: 'Random Block Fade In',
    shimmer: "Shimmer"
}

const gui = new GUI();

const obj = {
    density: rhombileSettings["tileDensity"],
    opacity: rhombileSettings["coloringOpacity"] * 100,
    coloring: camelConverter[rhombileSettings.coloring],
    fadeins: camelConverter[rhombileSettings.fadeIn],
    color1: rhombileSettings["colorTwo"],
    animations: camelConverter[rhombileSettings.animation]
}

gui.add( obj, 'density', 5, 50 ).onChange( value => {
    rhombileSettings.tileDensity = Math.floor(value);
    console.log(rhombileSettings)
    localStorage.setItem("rhombileSettings", JSON.stringify(rhombileSettings))
    document.querySelector("#rhombileTilingArea").remove()
    setRhombileBlockLayout(topLevelContainer, rhombileSettings)
});

gui.add( obj, 'opacity', 10, 100 ).onChange( value => {
    rhombileSettings.coloringOpacity = value * 0.01
    rhombileSettings.color = `'[rgba(0,0,0,${rhombileSettings.coloringOpacity})]'`
    console.log(rhombileSettings)
    localStorage.setItem("rhombileSettings", JSON.stringify(rhombileSettings))
    document.querySelector("#rhombileTilingArea").remove()
    setRhombileBlockLayout(topLevelContainer, rhombileSettings)
});

gui.add( obj, 'coloring', [ 'Single Color', 'Random Tile Colors', 'Random Cube Colors', 'Lines' ] ).onChange( value => {
    let unspacedValue = value.replaceAll(' ', '');
    let camelizedValue = unspacedValue.replace(unspacedValue.charAt(0), unspacedValue.charAt(0).toLowerCase());
    rhombileSettings.coloring = camelizedValue
    console.log(rhombileSettings)
    localStorage.setItem("rhombileSettings", JSON.stringify(rhombileSettings))
    document.querySelector("#rhombileTilingArea").remove()
    setRhombileBlockLayout(topLevelContainer, rhombileSettings)
});

gui.add( obj, 'fadeins', [ 'Appear On Load', 'Random Tile Fade In', 'Random Block Fade In' ] ).onChange( value => {
    let unspacedValue = value.replaceAll(' ', '');
    let camelizedValue = unspacedValue.replace(unspacedValue.charAt(0), unspacedValue.charAt(0).toLowerCase());
    rhombileSettings.fadeIn = camelizedValue
    console.log(rhombileSettings)
    localStorage.setItem("rhombileSettings", JSON.stringify(rhombileSettings))
    document.querySelector("#rhombileTilingArea").remove()
    setRhombileBlockLayout(topLevelContainer, rhombileSettings)
});

gui.addColor( obj, 'color1' ).onChange( value => {
    rhombileSettings.colorTwo = value;
    console.log(rhombileSettings)
    localStorage.setItem("rhombileSettings", JSON.stringify(rhombileSettings))
    document.querySelector("#rhombileTilingArea").remove()
    setRhombileBlockLayout(topLevelContainer, rhombileSettings)
});

gui.add( obj, 'animations', [ 'Static', 'Shimmer' ] ).onChange( value => {
    let unspacedValue = value.replaceAll(' ', '');
    let camelizedValue = unspacedValue.replace(unspacedValue.charAt(0), unspacedValue.charAt(0).toLowerCase());
    rhombileSettings.animation = camelizedValue
    console.log(rhombileSettings)
    localStorage.setItem("rhombileSettings", JSON.stringify(rhombileSettings))
    document.querySelector("#rhombileTilingArea").remove()
    setRhombileBlockLayout(topLevelContainer, rhombileSettings)
});
