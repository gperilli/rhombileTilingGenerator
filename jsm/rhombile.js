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
    localStorage.setItem("rhombileSettings", JSON.stringify({ tileDensity: 20, coloring: "colors", coloringOpacity: 0.5, fadeIn: "appearOnLoad"}))
}
const rhombileSettings = JSON.parse(localStorage.getItem("rhombileSettings"))
console.log(rhombileSettings);

document.querySelector(`#${rhombileSettings.coloring}`).checked = true
document.querySelector(`#${rhombileSettings.fadeIn}`).checked = true
document.querySelector("#tileDensity").value = rhombileSettings["tileDensity"]
document.querySelector("#coloringOpacity").value = rhombileSettings["coloringOpacity"] * 100



/////////////////////////////////////////////
// the options menu 
////////////////////////////////////////////
document.querySelector("#tileDensity").addEventListener("change", function(event) {
    console.log(event.target.id)
    rhombileSettings.tileDensity = event.target.value
    console.log(rhombileSettings)
    localStorage.setItem("rhombileSettings", JSON.stringify(rhombileSettings))
    document.querySelector("#rhombileTilingArea").remove()
    setRhombileBlockLayout(topLevelContainer, rhombileSettings)
})

document.querySelector("#coloringOpacity").addEventListener("change", function(event) {
    console.log(event.target.id)
    rhombileSettings.coloringOpacity = event.target.value * 0.01
    console.log(rhombileSettings)
    localStorage.setItem("rhombileSettings", JSON.stringify(rhombileSettings))
    document.querySelector("#rhombileTilingArea").remove()
    setRhombileBlockLayout(topLevelContainer, rhombileSettings)
})

document.querySelectorAll(".coloringRadio").forEach((radioButton) => {
    radioButton.addEventListener("click", function(event) {
        console.log(event.target.id)
        rhombileSettings.coloring = event.target.id
        console.log(rhombileSettings)
        localStorage.setItem("rhombileSettings", JSON.stringify(rhombileSettings))
        document.querySelector("#rhombileTilingArea").remove()
        setRhombileBlockLayout(topLevelContainer, rhombileSettings)
    })
})

document.querySelectorAll(".fadeInRadio").forEach((radioButton) => {
    radioButton.addEventListener("click", function(event) {
        console.log(event.target.id)
        rhombileSettings.fadeIn = event.target.id
        console.log(rhombileSettings)
        localStorage.setItem("rhombileSettings", JSON.stringify(rhombileSettings))
        document.querySelector("#rhombileTilingArea").remove()
        setRhombileBlockLayout(topLevelContainer, rhombileSettings)
    })
})


// menu display button
document.querySelector("#chevron").addEventListener("click", (event) => {
    console.log(event.target)
    document.querySelector("#chevron").classList.toggle("chevron--point_down")
    document.getElementsByClassName("menu-container")[0].classList.toggle("raised");
})


const topLevelContainer = document.querySelector("body");
window.addEventListener( 'load', setRhombileBlockLayout(topLevelContainer, rhombileSettings) );
window.addEventListener( 'resize', function(event) {
    updateBlockLayout(topLevelContainer, rhombileSettings)
} );
