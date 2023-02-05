import { topLevelContainerSize } from '/jsm/utils/topLevelContainerSize.js'
import { portraitLandscapeSwitcher } from '/jsm/utils/portraitLandscapeSwitcher.js'
import { setRhombileTiling } from '/jsm/setRhombileTiling.js'
export { setBlockLayout }

let topLevelContainerParams

// Main Square
let block;
let topLevelContainerDimensions, topLevelContainerWidth, topLevelContainerHeight, containerSquareWidth, containerXOffset, containerYOffset;

function containerSquarePositioning(containerSquare, containerSquareWidth, containerXOffset, containerYOffset) {
    containerSquare.style.width = containerSquareWidth + "px";
    containerSquare.style.height = containerSquareWidth + "px";
    containerSquare.style.left = "".concat((containerXOffset * 2), "px");
    containerSquare.style.top = "".concat(containerYOffset, "px");
}

function setBlockLayout(topLevelContainer, rhombileSettings) {

    /////////////////////////////////////////////////////
    // set layout based on screen size
    /////////////////////////////////////////////////////
    // Get top level container size and position
    topLevelContainerDimensions = topLevelContainerSize(topLevelContainer)
    topLevelContainerWidth = topLevelContainerDimensions[0]
    topLevelContainerHeight = topLevelContainerDimensions[1]
    
    topLevelContainerParams = portraitLandscapeSwitcher(topLevelContainerWidth > topLevelContainerHeight, topLevelContainerWidth, topLevelContainerHeight)
    containerSquareWidth = topLevelContainerParams[0]
    containerXOffset = topLevelContainerParams[1]
    containerYOffset = topLevelContainerParams[2]
    
    // set position and size of main container square
    const containerSquareElement = `<div id="rhombileTilingArea" style="position: absolute; outline: 1px solid red;"></div>`;
    topLevelContainer.insertAdjacentHTML("beforeend", containerSquareElement);
    const containerSquare = document.querySelector("#rhombileTilingArea");
    containerSquarePositioning(containerSquare, containerSquareWidth, containerXOffset, containerYOffset);

    /////////////////////////////////////////////
    // set the rhombile tiling
    ////////////////////////////////////////////
    setRhombileTiling(containerSquare, containerSquareWidth, rhombileSettings["tilingWidthNumber"]);
}
