export { setRhombileTiling }
import { degrees_to_radians } from '/src/utils/trig.js'
import { pythagorean } from '/src/utils/trig.js'
import { ObjectFadeIn } from '/src/objectFadeIn.js'
import { ObjectShimmer } from '/src/objectShimmer.js'
import { shimmerFrame }  from '/src/objectShimmer.js'

class RhombileBlock {
    constructor(blockDiameter, rhombileSettings) {
      this.blockDiameter = blockDiameter;
      this.rhombileSettings = rhombileSettings;

      this.coloringOpacity = rhombileSettings["coloringOpacity"];
      this.coloringOpacityShades = [
        this.coloringOpacity,
        (this.coloringOpacity * 0.6),
        (this.coloringOpacity * 0.4),
      ]
      this.hexagonWidth = blockDiameter * 2;
      this.blockPerspDiameter = Math.tan(degrees_to_radians(30)) * blockDiameter;
      this.blockHypotenuse = pythagorean(blockDiameter, this.blockPerspDiameter)
      this.blockContainer = document.createElementNS("http://www.w3.org/2000/svg", "svg");
      this.blockContainer.setAttribute("height", this.blockHypotenuse);
      this.blockContainer.setAttribute("width", (this.blockDiameter * 2));
      this.blockContainer.style.overflow = "visible";
      this.blockContainer.style.position = "absolute";
      this.hexagonCenterPoint = [ this.blockDiameter,this.blockPerspDiameter ];
      this.hexagonLeftUpperPoint = [ 0,0 ];
      this.hexagonLeftLowerPoint = [ 0,this.blockHypotenuse ];
      this.hexagonRightUpperPoint = [ this.hexagonWidth,0 ];
      this.hexagonRightLowerPoint = [ this.hexagonWidth,(this.blockHypotenuse) ];
      this.hexagonBottomMostPoint = [ this.blockDiameter,(this.blockPerspDiameter + this.blockHypotenuse) ];
      this.hexagonUpperMostPoint = [ this.blockDiameter,(0 - this.blockPerspDiameter) ];
      
      this.init()
    }
  
    init() {
      let value;
      
      let hexColors = [];
      let tileColors = [];
      let strokeWidth = 1;
      let strokeColors = [];
      if (this.rhombileSettings["coloring"] == "randomTileColors") {
        hexColors[0] = "#" + Math.floor(Math.random()*16777215).toString(16);
        hexColors[1] = "#" + Math.floor(Math.random()*16777215).toString(16);
        hexColors[2] = "#" + Math.floor(Math.random()*16777215).toString(16);
        tileColors = [
          this.generateRGBColor(this.coloringOpacityShades[0], hexColors[0]),
          this.generateRGBColor(this.coloringOpacityShades[1], hexColors[1]),
          this.generateRGBColor(this.coloringOpacityShades[2], hexColors[2])
        ];
        strokeColors = tileColors;
        strokeWidth = 1;
      } else if (this.rhombileSettings["coloring"] == "singleColor") {
        hexColors[0] = this.rhombileSettings["colorTwo"];
        hexColors[1] = this.rhombileSettings["colorTwo"];
        hexColors[2] = this.rhombileSettings["colorTwo"];
        tileColors = [
          this.generateRGBColor(this.coloringOpacityShades[0], hexColors[0]),
          this.generateRGBColor(this.coloringOpacityShades[1], hexColors[1]),
          this.generateRGBColor(this.coloringOpacityShades[2], hexColors[2])
        ];
        strokeColors = tileColors;
        strokeWidth = 1;
      } else if (this.rhombileSettings["coloring"] == "randomCubeColors") {
        let cubeHexColor = "#" + Math.floor(Math.random()*16777215).toString(16);
        hexColors[0] = cubeHexColor;
        hexColors[1] = cubeHexColor;
        hexColors[2] = cubeHexColor;
        tileColors = [
          this.generateRGBColor(this.coloringOpacityShades[0], hexColors[0]),
          this.generateRGBColor(this.coloringOpacityShades[1], hexColors[1]),
          this.generateRGBColor(this.coloringOpacityShades[2], hexColors[2])
        ];
        strokeColors = tileColors;
        strokeWidth = 1;
      } else if (this.rhombileSettings["coloring"] == "lines") {
        hexColors[0] = this.rhombileSettings["colorTwo"];
        hexColors[1] = this.rhombileSettings["colorTwo"];
        hexColors[2] = this.rhombileSettings["colorTwo"];
        tileColors = [
          this.generateRGBColor(this.coloringOpacityShades[0], '#fff'),
          this.generateRGBColor(this.coloringOpacityShades[0], '#fff'),
          this.generateRGBColor(this.coloringOpacityShades[0], '#fff')
        ];
        strokeColors = [
          this.generateRGBColor(this.coloringOpacityShades[0], hexColors[0]),
          this.generateRGBColor(this.coloringOpacityShades[0], hexColors[1]),
          this.generateRGBColor(this.coloringOpacityShades[0], hexColors[2])
        ];
        strokeWidth = 4;
      }
      
      // Polygon One
      var cubeTopPoints = [ 
        this.hexagonCenterPoint,      
        this.hexagonLeftUpperPoint, 
        this.hexagonUpperMostPoint,
        this.hexagonRightUpperPoint,    
      ];

      // Polygon Two
      var cubeLeftPoints = [ 
        this.hexagonCenterPoint,
        this.hexagonBottomMostPoint,
        this.hexagonLeftLowerPoint,
        this.hexagonLeftUpperPoint,
      ];

      // Polygon Three
      var cubeRightPoints = [ 
        this.hexagonCenterPoint, 
        this.hexagonBottomMostPoint,
        this.hexagonRightLowerPoint,
        this.hexagonRightUpperPoint
      ];
      
      this.createCubeSidePolygon(cubeTopPoints, tileColors[0], strokeWidth, strokeColors[0]);
      this.createCubeSidePolygon(cubeLeftPoints, tileColors[1], strokeWidth, strokeColors[1]);
      this.createCubeSidePolygon(cubeRightPoints, tileColors[2], strokeWidth, strokeColors[2]);
      
      return this.blockContainer;
    }

    createCubeSidePolygon(points, tileColor, strokeWidth, strokeColor) {
      var cubeSidePolygon = document.createElementNS("http://www.w3.org/2000/svg", "polygon");
      cubeSidePolygon.setAttribute("fill", tileColor);
      cubeSidePolygon.setAttribute("stroke", strokeColor);
      cubeSidePolygon.setAttribute("stroke-width", strokeWidth);
      cubeSidePolygon.setAttribute('class', 'rhombileTiles');
      this.blockContainer.appendChild(cubeSidePolygon);
      for (let i = 0; i < points.length; i++) {
        var point = this.blockContainer.createSVGPoint();
        point.x = points[i][0];
        point.y = points[i][1];
        cubeSidePolygon.points.appendItem(point);
      }
    }

    generateRGBColor(coloringOpacity, hexColor) {
      
      let rgbColorArray = this.hexToRGB(hexColor);
      return `rgb( 
        ${this.RGBAtoRGB(rgbColorArray[0], rgbColorArray[1], rgbColorArray[2], coloringOpacity)[0]}, 
        ${this.RGBAtoRGB(rgbColorArray[0], rgbColorArray[1], rgbColorArray[2], coloringOpacity)[1]}, 
        ${this.RGBAtoRGB(rgbColorArray[0], rgbColorArray[1], rgbColorArray[2], coloringOpacity)[2]} 
      )`
    }

    RGBAtoRGB(r, g, b, a) {
      let alpha = 1 - a;
      let RGB = [];
      RGB[0] = Math.round((a * (r / 255) + (alpha * (255 / 255))) * 255);
      RGB[1] = Math.round((a * (g / 255) + (alpha * (255 / 255))) * 255);
      RGB[2] = Math.round((a * (b / 255) + (alpha * (255 / 255))) * 255);
      return RGB;
    }

    hexToRGB(h) {
      let r = 0, g = 0, b = 0;
    
      // 3 digits
      if (h.length == 4) {
        r = "0x" + h[1] + h[1];
        g = "0x" + h[2] + h[2];
        b = "0x" + h[3] + h[3];
    
      // 6 digits
      } else if (h.length == 7) {
        r = "0x" + h[1] + h[2];
        g = "0x" + h[3] + h[4];
        b = "0x" + h[5] + h[6];
      }
      
      return [r, g, b];
    }

  }
  
function isOdd(num) { return num % 2;}

function setRhombileTiling(containerSquare, tilingAreaWidthLength, rhombileSettings) {
    var tilingArea = containerSquare;

    const blockDiameter = tilingAreaWidthLength / rhombileSettings["tileDensity"];
    const hexagonWidth = blockDiameter * 2;
    const blockPerspDiameter = Math.tan(degrees_to_radians(30)) * blockDiameter;
    const blockHypotenuse = pythagorean(blockDiameter, blockPerspDiameter);
    
    let rhombileRows = Math.round(tilingAreaWidthLength / (blockHypotenuse + blockPerspDiameter)) + 2;
    let blocks = [];
    let blockCount = -1;
    for (let j = 1; j < rhombileRows; j++) {
      blocks[j] = [];
      let xPositioningAdjuster = isOdd(j) == 1 ? 0 : blockDiameter * -1;
      let blockRowAdjuster = isOdd(j) == 1 ? (rhombileSettings["tileDensity"] / 2) : ((rhombileSettings["tileDensity"] / 2) + 1);

      for (let i = 0; i < blockRowAdjuster; i++) {
        blocks[j][i] = new RhombileBlock(blockDiameter, rhombileSettings);
        blocks[j][i].blockContainer.style.top = `${((tilingAreaWidthLength - ((blockHypotenuse + blockPerspDiameter) * j)) + blockPerspDiameter)}px`;
        blocks[j][i].blockContainer.style.left = `${((hexagonWidth * i) + xPositioningAdjuster)}px`;
        
        blocks[j][i].blockContainer.style.opacity = 0;
        blocks[j][i].blockContainer.setAttribute('class', 'rhombileCubes');
        tilingArea.insertAdjacentHTML("beforeend", blocks[j][i].blockContainer.outerHTML);
        blockCount++;
      }
    }


    let allBlocks = document.querySelectorAll(".rhombileCubes")
    let allTiles = document.querySelectorAll(".rhombileTiles")

    if (rhombileSettings["fadeIn"] == "appearOnLoad" && rhombileSettings["animation"] == "static") {
      for (let i = 0; i < allBlocks.length; i++) {
        allBlocks[i].style.opacity = 1;
      }
    } else if (rhombileSettings["fadeIn"] == "randomBlockFadeIn" && rhombileSettings["animation"] == "static") {
      for (let i = 0; i < allBlocks.length; i++) {
        let paisleyFade = new ObjectFadeIn((Math.floor(Math.random() * 60000) + 6000),  allBlocks[i])
        paisleyFade.startObjectFadeIn()
      }
    } else if (rhombileSettings["fadeIn"] == "randomTileFadeIn" && rhombileSettings["animation"] == "static") {
      for (let i = 0; i < allBlocks.length; i++) {
        allBlocks[i].style.opacity = 1;
      }
      for (let i = 0; i < allTiles.length; i++) {
        let paisleyFade = new ObjectFadeIn((Math.floor(Math.random() * 60000) + 6000),  allTiles[i])
        paisleyFade.startObjectFadeIn()
      }
    } else if (rhombileSettings["animation"] == "shimmer") {
      for (let i = 0; i < allBlocks.length; i++) {
        //console.log(allBlocks[i]);
        let shimmer = new ObjectShimmer((Math.floor(Math.random() * 60000) + 6000), 1);
        let shimmerAnimation = setInterval(shimmerFrame, 50, shimmer, allBlocks[i]);
      }
    }
    



      
}
