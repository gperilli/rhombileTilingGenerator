export { portraitLandscapeSwitcher }

let centralContainerSquareWidth, centralContainerXOffset, centralContainerYOffset;

function portraitLandscapeSwitcher(portraitOrLandscape, screenWidth, screenHeight) {
    if (portraitOrLandscape == true) {
        // is landscape
        centralContainerSquareWidth = screenHeight;
        centralContainerXOffset = ((screenWidth - screenHeight) / 2);
        centralContainerYOffset = 0;
    } else {
        // is portrait
        centralContainerSquareWidth = screenWidth;
        centralContainerXOffset = 0;
        centralContainerYOffset = ((screenHeight - screenWidth) / 2);
    }
    let centralContainerParams = [centralContainerSquareWidth, centralContainerXOffset, centralContainerYOffset]
    return centralContainerParams
}
