export { portraitLandscapeSwitcher }

let centralContainerSquareWidth, centralContainerXOffset, centralContainerYOffset;

function portraitLandscapeSwitcher(isLandscape, screenWidth, screenHeight) {
    if (isLandscape == true) {
        // is landscape
        centralContainerSquareWidth = screenWidth;
        centralContainerXOffset = 0;
        centralContainerYOffset = ((screenWidth - screenHeight) / 2) * -1;
    } else {
        // is portrait
        centralContainerSquareWidth = screenHeight;
        centralContainerXOffset = ((screenHeight - screenWidth) / 2) * -1;
        centralContainerYOffset = 0;
    }
    let centralContainerParams = [centralContainerSquareWidth, centralContainerXOffset, centralContainerYOffset]
    return centralContainerParams
}
