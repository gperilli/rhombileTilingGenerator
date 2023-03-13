import { topLevelContainerSize } from '/src/utils/topLevelContainerSize.js'
import { portraitLandscapeSwitcher } from '/src/utils/portraitLandscapeSwitcher.js'
import { setRhombileTiling } from '/src/setRhombileTiling.js'
import { ObjectFadeIn } from '/src/objectFadeIn.js'
export { setRhombileBlockLayout }
export { updateBlockLayout }

let topLevelContainerParams
let containerSquare
let isLandscape
// Main Square
let block;
let topLevelContainerDimensions, topLevelContainerWidth, topLevelContainerHeight, containerSquareWidth, containerXOffset, containerYOffset;

function containerSquarePositioning(containerSquare, containerSquareWidth, containerXOffset, containerYOffset) {
    containerSquare.style.width = containerSquareWidth + "px";
    containerSquare.style.height = containerSquareWidth + "px";
    containerSquare.style.left = "".concat((containerXOffset * 2), "px");
    containerSquare.style.top = "".concat(containerYOffset, "px");
}

function setRhombileBlockLayout(topLevelContainer, rhombileSettings) {

    /////////////////////////////////////////////////////
    // set layout based on screen size
    /////////////////////////////////////////////////////
    // Get top level container size and position
    topLevelContainerDimensions = topLevelContainerSize(topLevelContainer)
    topLevelContainerWidth = topLevelContainerDimensions[0]
    topLevelContainerHeight = topLevelContainerDimensions[1]
    
    isLandscape = topLevelContainerWidth > topLevelContainerHeight;
    topLevelContainerParams = portraitLandscapeSwitcher(isLandscape, topLevelContainerWidth, topLevelContainerHeight)
    containerSquareWidth = topLevelContainerParams[0]
    containerXOffset = topLevelContainerParams[1]
    containerYOffset = topLevelContainerParams[2]
    
    // set position and size of main container square
    const containerSquareElement = `<div id="rhombileTilingArea" style="position: absolute; overflow: hidden;"></div>`;
    topLevelContainer.insertAdjacentHTML("beforeend", containerSquareElement);
    containerSquare = document.querySelector("#rhombileTilingArea");
    containerSquarePositioning(containerSquare, containerSquareWidth, containerXOffset, containerYOffset);

    /////////////////////////////////////////////
    // set the rhombile tiling
    ////////////////////////////////////////////
    setRhombileTiling(containerSquare, containerSquareWidth, rhombileSettings);
    
}


function updateBlockLayout(topLevelContainer, rhombileSettings) {

    // get screen size
    topLevelContainerDimensions = topLevelContainerSize(topLevelContainer)
    topLevelContainerWidth = topLevelContainerDimensions[0]
    topLevelContainerHeight = topLevelContainerDimensions[1]

    // Central container
    isLandscape = topLevelContainerWidth > topLevelContainerHeight;
    topLevelContainerParams = portraitLandscapeSwitcher(isLandscape, topLevelContainerWidth, topLevelContainerHeight)
    containerSquareWidth = topLevelContainerParams[0]
    containerXOffset = topLevelContainerParams[1]
    containerYOffset = topLevelContainerParams[2]
    document.querySelector("#rhombileTilingArea").innerHTML = '';
    containerSquarePositioning(containerSquare, containerSquareWidth, containerXOffset, containerYOffset);
    
    // main square
    //paisleyBlock.width = containerSquareWidth
    //paisleyBlock.height = containerSquareWidth

    // update position and size     
    setRhombileTiling(containerSquare, containerSquareWidth, rhombileSettings);

}
