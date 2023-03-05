export { setRhombileTiling }
import { degrees_to_radians } from '/jsm/utils/trig.js'
import { pythagorean } from '/jsm/utils/trig.js'

class RhombileBlock {
    constructor(blockDiameter, coloringOpacity) {
      this.blockDiameter = blockDiameter;
      this.coloringOpacity = coloringOpacity;
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
      
      // Polygon One
      var cubeTopPoints = [ 
        this.hexagonCenterPoint,      
        this.hexagonLeftUpperPoint, 
        this.hexagonUpperMostPoint,
        this.hexagonRightUpperPoint,    
      ];
  
      this.createCubeSidePolygon(cubeTopPoints, `rgb( ${(255 - (this.coloringOpacityShades[2] * 255))}, ${(255 - (this.coloringOpacityShades[2] * 255))}, ${(255 - (this.coloringOpacityShades[2] * 255))} )`);
  
      // Polygon Two
      var cubeLeftPoints = [ 
        this.hexagonCenterPoint,
        this.hexagonBottomMostPoint,
        this.hexagonLeftLowerPoint,
        this.hexagonLeftUpperPoint,
      ];
  
      this.createCubeSidePolygon(cubeLeftPoints, `rgb( ${(255 - (this.coloringOpacityShades[1] * 255))}, ${(255 - (this.coloringOpacityShades[1] * 255))}, ${(255 - (this.coloringOpacityShades[1] * 255))} )`);
  
      // Polygon Three
      var cubeRightPoints = [ 
        this.hexagonCenterPoint, 
        this.hexagonBottomMostPoint,
        this.hexagonRightLowerPoint,
        this.hexagonRightUpperPoint
      ];
  
      this.createCubeSidePolygon(cubeRightPoints, `rgb( ${(255 - (this.coloringOpacityShades[0] * 255))}, ${(255 - (this.coloringOpacityShades[0] * 255))}, ${(255 - (this.coloringOpacityShades[0] * 255))} )`);
        
      return this.blockContainer;
    }

    createCubeSidePolygon(points, color) {
      var cubeSidePolygon = document.createElementNS("http://www.w3.org/2000/svg", "polygon");
      cubeSidePolygon.setAttribute("fill", color);
      console.log(color);
      cubeSidePolygon.setAttribute("stroke", color);
      this.blockContainer.appendChild(cubeSidePolygon);
      for (let i = 0; i < points.length; i++) {
        var point = this.blockContainer.createSVGPoint();
        point.x = points[i][0];
        point.y = points[i][1];
        cubeSidePolygon.points.appendItem(point);
      }
    }

  }
  
function isOdd(num) { return num % 2;}

function setRhombileTiling(containerSquare, tilingAreaWidthLength, rhombileSettings) {
    var tilingArea = containerSquare;

    const blockDiameter = tilingAreaWidthLength / rhombileSettings["tileDensity"];
    const hexagonWidth = blockDiameter * 2;
    const blockPerspDiameter = Math.tan(degrees_to_radians(30)) * blockDiameter;
    const blockHypotenuse = pythagorean(blockDiameter, blockPerspDiameter);
    
    console.log(Math.round(tilingAreaWidthLength / (blockHypotenuse + blockPerspDiameter)));

    let rhombileRows = Math.round(tilingAreaWidthLength / (blockHypotenuse + blockPerspDiameter)) + 1;

    let blocks = [];
    for (let j = 1; j < (rhombileRows); j++) {
      blocks[j] = [];
      let xPositioningAdjuster = isOdd(j) == 1 ? 0 : blockDiameter * -1;
      let blockRowAdjuster = isOdd(j) == 1 ? (rhombileSettings["tileDensity"] / 2) : ((rhombileSettings["tileDensity"] / 2) + 1);

      for (let i = 0; i < blockRowAdjuster; i++) {
        blocks[j][i] = new RhombileBlock(blockDiameter, rhombileSettings["coloringOpacity"]);
        console.log((tilingAreaWidthLength - ((blockHypotenuse + blockPerspDiameter) * j)));
        blocks[j][i].blockContainer.style.top = `${((tilingAreaWidthLength - ((blockHypotenuse + blockPerspDiameter) * j)))}px`;
        blocks[j][i].blockContainer.style.left = `${((hexagonWidth * i) + xPositioningAdjuster)}px`;
        tilingArea.insertAdjacentHTML("beforeend", blocks[j][i].blockContainer.outerHTML);
      }
    }
}
