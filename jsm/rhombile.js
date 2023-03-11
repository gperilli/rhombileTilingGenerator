import { setRhombileBlockLayout } from '/jsm/setLayout.js'
import { updateBlockLayout } from '/jsm/setLayout.js'

// https://en.wikipedia.org/wiki/Rhombille_tiling
// https://www.mathsisfun.com/sine-cosine-tangent.html


/////////////////////////////////////////////////////
// localStorage Retrieval
/////////////////////////////////////////////////////
localStorage.setItem("rhombileSettings-reset", "false")
if (localStorage.getItem("rhombileSettings") == null || localStorage.getItem("rhombileSettings-reset") == "true") {
    // load default rhombile Settings
    localStorage.setItem("rhombileSettings", JSON.stringify({ 
        tileDensity: 20, 
        coloring: "colors", 
        colorTwo: "#000",
        coloringOpacity: 0.5, 
        fadeIn: "appearOnLoad"
    }))
}
const rhombileSettings = JSON.parse(localStorage.getItem("rhombileSettings"))
console.log(rhombileSettings);
document.querySelector(`#${rhombileSettings.coloring}`).checked = true
document.querySelector(`#${rhombileSettings.fadeIn}`).checked = true
document.querySelector("#tileDensity").value = rhombileSettings["tileDensity"]
document.querySelector("#coloringOpacity").value = rhombileSettings["coloringOpacity"] * 100
document.querySelectorAll('.text-input')[0].value = rhombileSettings["colorTwo"]



/////////////////////////////////////////////
// the options menu 
////////////////////////////////////////////
document.querySelector("#tileDensity").addEventListener("input", function(event) {
    console.log(event.target.id)
    rhombileSettings.tileDensity = event.target.value
    console.log(rhombileSettings)
    localStorage.setItem("rhombileSettings", JSON.stringify(rhombileSettings))
    document.querySelector("#rhombileTilingArea").remove()
    setRhombileBlockLayout(topLevelContainer, rhombileSettings)
})

document.querySelectorAll(".coloringRadio").forEach((radioButton) => {
    radioButton.addEventListener("click", function(event) {
        rhombileSettings.coloring = event.target.id
        console.log(rhombileSettings)
        localStorage.setItem("rhombileSettings", JSON.stringify(rhombileSettings))
        document.querySelector("#rhombileTilingArea").remove()
        setRhombileBlockLayout(topLevelContainer, rhombileSettings)
    })
})

document.querySelector("#coloringOpacity").addEventListener("input", function(event) {
    rhombileSettings.coloringOpacity = event.target.value * 0.01
    rhombileSettings.color = `'[rgba(0,0,0,${rhombileSettings.coloringOpacity})]'`
    console.log(rhombileSettings)
    localStorage.setItem("rhombileSettings", JSON.stringify(rhombileSettings))
    document.querySelector("#rhombileTilingArea").remove()
    setRhombileBlockLayout(topLevelContainer, rhombileSettings)
})

document.querySelectorAll(".fadeInRadio").forEach((radioButton) => {
    radioButton.addEventListener("click", function(event) {
        rhombileSettings.fadeIn = event.target.id
        console.log(rhombileSettings)
        localStorage.setItem("rhombileSettings", JSON.stringify(rhombileSettings))
        document.querySelector("#rhombileTilingArea").remove()
        setRhombileBlockLayout(topLevelContainer, rhombileSettings)
    })
})

// menu display button
document.querySelector("#chevron").addEventListener("click", (event) => {
    document.querySelector("#chevron").classList.toggle("chevron--point_down")
    document.getElementsByClassName("menu-container")[0].classList.toggle("raised");
})

const topLevelContainer = document.querySelector("body");
window.addEventListener( 'load', function(event) {
    setRhombileBlockLayout(topLevelContainer, rhombileSettings);
});

window.addEventListener( 'resize', function(event) {
    updateBlockLayout(topLevelContainer, rhombileSettings)
});

var hueb = new Huebee( '.text-input', {
    // options
    notation: 'hex',
    saturations: 3,
    staticOpen: true, 
    shades: 1,
    hues: 6
});
  
hueb.on( 'change', function( color, hue, sat, lum ) {
    rhombileSettings.colorTwo = color;
    console.log(rhombileSettings)
    localStorage.setItem("rhombileSettings", JSON.stringify(rhombileSettings))
    document.querySelector("#rhombileTilingArea").remove()
    setRhombileBlockLayout(topLevelContainer, rhombileSettings)
})
