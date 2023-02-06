import { setBlockLayout } from '/jsm/setLayout.js'
import { updateBlockLayout } from '/jsm/setLayout.js'

// https://en.wikipedia.org/wiki/Rhombille_tiling
// https://www.mathsisfun.com/sine-cosine-tangent.html

const topLevelContainer = document.querySelector("body");

const rhombileSettings = {
    tilingWidthNumber: 30,
}

window.addEventListener( 'load', setBlockLayout(topLevelContainer, rhombileSettings) );
window.addEventListener( 'resize', function(event) {
    updateBlockLayout(topLevelContainer, rhombileSettings)
} );
