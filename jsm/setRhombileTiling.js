export { setRhombileTiling }
import { degrees_to_radians } from '/jsm/utils/trig.js'
import { pythagorean } from '/jsm/utils/trig.js'

class RhombileBlock {
    constructor(blockDiameter, rgbaColor) {
      this.blockDiameter = blockDiameter;
      this.rgbaColor = rgbaColor;
      this.coloringOpacity = rgbaColor[3];
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
      
      this.createCubeSidePolygon(cubeTopPoints, `rgb( ${this.RGBAtoRGB(this.rgbaColor[0], this.rgbaColor[1],this.rgbaColor[2], this.coloringOpacityShades[0])[0]}, ${this.RGBAtoRGB(this.rgbaColor[0], this.rgbaColor[1],this.rgbaColor[2],this.coloringOpacityShades[0])[1]}, ${this.RGBAtoRGB(this.rgbaColor[0], this.rgbaColor[1],this.rgbaColor[2],this.coloringOpacityShades[0])[2]} )`);
  
      // Polygon Two
      var cubeLeftPoints = [ 
        this.hexagonCenterPoint,
        this.hexagonBottomMostPoint,
        this.hexagonLeftLowerPoint,
        this.hexagonLeftUpperPoint,
      ];
      // console.log(this.RGBAtoRGB(this.rgbaColor[0], this.rgbaColor[1],this.rgbaColor[2],this.rgbaColor[3]));
      this.createCubeSidePolygon(cubeLeftPoints, `rgb( ${this.RGBAtoRGB(this.rgbaColor[0], this.rgbaColor[1],this.rgbaColor[2], this.coloringOpacityShades[1])[0]}, ${this.RGBAtoRGB(this.rgbaColor[0], this.rgbaColor[1],this.rgbaColor[2],this.coloringOpacityShades[1])[1]}, ${this.RGBAtoRGB(this.rgbaColor[0], this.rgbaColor[1],this.rgbaColor[2],this.coloringOpacityShades[1])[2]} )`);
  
      // Polygon Three
      var cubeRightPoints = [ 
        this.hexagonCenterPoint, 
        this.hexagonBottomMostPoint,
        this.hexagonRightLowerPoint,
        this.hexagonRightUpperPoint
      ];
  
      this.createCubeSidePolygon(cubeRightPoints, `rgb( ${this.RGBAtoRGB(this.rgbaColor[0], this.rgbaColor[1],this.rgbaColor[2], this.coloringOpacityShades[2])[0]}, ${this.RGBAtoRGB(this.rgbaColor[0], this.rgbaColor[1],this.rgbaColor[2],this.coloringOpacityShades[2])[1]}, ${this.RGBAtoRGB(this.rgbaColor[0], this.rgbaColor[1],this.rgbaColor[2],this.coloringOpacityShades[2])[2]} )`);
        
      return this.blockContainer;
    }

    createCubeSidePolygon(points, color) {
      var cubeSidePolygon = document.createElementNS("http://www.w3.org/2000/svg", "polygon");
      cubeSidePolygon.setAttribute("fill", color);
      cubeSidePolygon.setAttribute("stroke", color);
      this.blockContainer.appendChild(cubeSidePolygon);
      for (let i = 0; i < points.length; i++) {
        var point = this.blockContainer.createSVGPoint();
        point.x = points[i][0];
        point.y = points[i][1];
        cubeSidePolygon.points.appendItem(point);
      }
    }

    RGBAtoRGB(r, g, b, a) {
      let alpha = 1 - a;
      let RGB = [];
      RGB[0] = Math.round((a * (r / 255) + (alpha * (255 / 255))) * 255);
      RGB[1] = Math.round((a * (g / 255) + (alpha * (255 / 255))) * 255);
      RGB[2] = Math.round((a * (b / 255) + (alpha * (255 / 255))) * 255);
      return RGB;
    }

    RGBAToHexA(r,g,b,a) {
      r = r.toString(16);
      g = g.toString(16);
      b = b.toString(16);
      a = Math.round(a * 255).toString(16);

      if (r.length == 1)
        r = "0" + r;
      if (g.length == 1)
        g = "0" + g;
      if (b.length == 1)
        b = "0" + b;
      if (a.length == 1)
        a = "0" + a;

      return "#" + r + g + b + a;
    }

  }
  
function isOdd(num) { return num % 2;}

function setRhombileTiling(containerSquare, tilingAreaWidthLength, rhombileSettings) {
    var tilingArea = containerSquare;

    const blockDiameter = tilingAreaWidthLength / rhombileSettings["tileDensity"];
    const hexagonWidth = blockDiameter * 2;
    const blockPerspDiameter = Math.tan(degrees_to_radians(30)) * blockDiameter;
    const blockHypotenuse = pythagorean(blockDiameter, blockPerspDiameter);
    
    // console.log(Math.round(tilingAreaWidthLength / (blockHypotenuse + blockPerspDiameter)));

    let rhombileRows = Math.round(tilingAreaWidthLength / (blockHypotenuse + blockPerspDiameter)) + 2;

    let coloringOpacity = 0;

    let color = rhombileSettings["color"]
    // "rgba(113,205,99,1)"
    //color = color.replace(/value/g, '"value"')
    //color = color.replace(/'/g, '"')
    let rgbaColor = rhombileSettings["color"]
    console.log(rgbaColor);
    rgbaColor = rgbaColor.substring(4, rgbaColor.length-1)
          .replace('(', '')
          .replace(']', '')
          .replace(')', '')
          .replace(/ /g, '')
          .replace('ba0', '0')
          .split(',');
    coloringOpacity = rgbaColor[3];
    console.log(rgbaColor);


    let blocks = [];
    for (let j = 1; j < rhombileRows; j++) {
      blocks[j] = [];
      let xPositioningAdjuster = isOdd(j) == 1 ? 0 : blockDiameter * -1;
      let blockRowAdjuster = isOdd(j) == 1 ? (rhombileSettings["tileDensity"] / 2) : ((rhombileSettings["tileDensity"] / 2) + 1);

      for (let i = 0; i < blockRowAdjuster; i++) {
        blocks[j][i] = new RhombileBlock(blockDiameter, rgbaColor);
        // console.log((tilingAreaWidthLength - ((blockHypotenuse + blockPerspDiameter) * j)));
        blocks[j][i].blockContainer.style.top = `${((tilingAreaWidthLength - ((blockHypotenuse + blockPerspDiameter) * j)) + blockPerspDiameter)}px`;
        blocks[j][i].blockContainer.style.left = `${((hexagonWidth * i) + xPositioningAdjuster)}px`;
        tilingArea.insertAdjacentHTML("beforeend", blocks[j][i].blockContainer.outerHTML);
      }
    }
}
