export { portraitLandscapeSwitcher }

let centralContainerSquareWidth, centralContainerXOffset, centralContainerYOffset;

function portraitLandscapeSwitcher(isLandscape, screenWidth, screenHeight) {
    if (isLandscape == true) {
        // is landscape
        centralContainerSquareWidth = screenHeight;
        centralContainerXOffset = ((screenWidth - screenHeight) / 2);
        centralContainerYOffset = 0;
    } else {
        // is portrait
        centralContainerSquareWidth = screenWidth;
        centralContainerXOffset = 0;
        centralContainerYOffset = 0;
    }
    let centralContainerParams = [centralContainerSquareWidth, centralContainerXOffset, centralContainerYOffset]
    return centralContainerParams
}
