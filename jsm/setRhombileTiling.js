export { setRhombileTiling }
import { degrees_to_radians } from '/jsm/utils/trig.js'
import { pythagorean } from '/jsm/utils/trig.js'

class RhombileBlock {
    constructor(blockDiameter) {
      this.blockDiameter = blockDiameter;
      this.hexagonWidth = blockDiameter * 2;
      this.blockPerspDiameter = Math.tan(degrees_to_radians(30)) * blockDiameter;
      this.blockHypotenuse = pythagorean(blockDiameter, this.blockPerspDiameter)
      this.blockContainer = document.createElementNS("http://www.w3.org/2000/svg", "svg");
      
      this.init()
    }
  
    init() {
      let value;
      this.blockContainer.setAttribute("height", this.blockHypotenuse);
      this.blockContainer.setAttribute("width", (this.blockDiameter * 2));
      this.blockContainer.style.overflow = "visible";
      this.blockContainer.style.position = "absolute";
      //this.blockContainer.style.top = "100px";
      
  
      // Polygon One
      var polygonOneArray = [ 
              [ 0,0 ], 
              [ this.blockDiameter,(0 - this.blockPerspDiameter) ],
              [ this.hexagonWidth,0 ],  
              [ this.blockDiameter,(this.blockPerspDiameter) ]
      ];
  
      var leftSidePolygon = document.createElementNS("http://www.w3.org/2000/svg", "polygon");
      leftSidePolygon.setAttribute("fill", "#eee");
      this.blockContainer.appendChild(leftSidePolygon);
      for (value of polygonOneArray) {
        var point = this.blockContainer.createSVGPoint();
        point.x = value[0];
        point.y = value[1];
        leftSidePolygon.points.appendItem(point);
      }
  
      // Polygon Two
      var sideArray = [ 
                  [ 0,0 ], 
                  [ this.blockDiameter,(this.blockPerspDiameter) ],
                  [ this.blockDiameter,(this.blockPerspDiameter + this.blockHypotenuse) ],
                  [ 0,(this.blockHypotenuse) ],
      ];
  
      var leftSidePolygon = document.createElementNS("http://www.w3.org/2000/svg", "polygon");
      leftSidePolygon.setAttribute("fill", "#ccc");
      this.blockContainer.appendChild(leftSidePolygon);
      for (value of sideArray) {
        var point = this.blockContainer.createSVGPoint();
        point.x = value[0];
        point.y = value[1];
        leftSidePolygon.points.appendItem(point);
      }
  
      // Polygon Three
      var sideArray = [ 
                  [ this.blockDiameter,(this.blockPerspDiameter) ], 
                  [ this.blockDiameter,(this.blockPerspDiameter + this.blockHypotenuse) ],
                  [ this.hexagonWidth,(this.blockHypotenuse) ],
                  [ this.hexagonWidth,0 ]
      ];
  
      var rightSidePolygon = document.createElementNS("http://www.w3.org/2000/svg", "polygon");
      rightSidePolygon.setAttribute("fill", "#bbb");
      this.blockContainer.appendChild(rightSidePolygon);
      for (value of sideArray) {
        var point = this.blockContainer.createSVGPoint();
        point.x = value[0];
        point.y = value[1];
        rightSidePolygon.points.appendItem(point);
      }
  
      return this.blockContainer;
    }
  }
  
function isOdd(num) { return num % 2;}

function setRhombileTiling(containerSquare, tilingAreaWidthLength, tilingWidthNumber, isLandscape) {
    var tilingArea = containerSquare;

    const blockDiameter = tilingAreaWidthLength / tilingWidthNumber;
    const hexagonWidth = blockDiameter * 2;
    const blockPerspDiameter = Math.tan(degrees_to_radians(30)) * blockDiameter;
    const blockHypotenuse = pythagorean(blockDiameter, blockPerspDiameter);
    let portraitLandscapeBlockRowAdjuster = isLandscape == true ? 1 : 2;
    let portraitLandscapeBlockRowYPosAdjuster = isLandscape == true ? 1 : 0;
    
    console.log(Math.round(tilingAreaWidthLength / (blockHypotenuse + blockPerspDiameter)));

    let rhombileRows = Math.round(tilingAreaWidthLength / (blockHypotenuse + blockPerspDiameter)) + 2;

    let blocks = [];
    for (let j = 1; j < (rhombileRows); j++) {
      blocks[j] = [];
      let xPositioningAdjuster = isOdd(j) == 1 ? 0 : blockDiameter * 3;
      let blockRowAdjuster = isOdd(j) == 1 ? (tilingWidthNumber / 2) : ((tilingWidthNumber / 2) + 1);
      let blockRowXPositionAdjuster = isOdd(j) == 1 ? 0 : hexagonWidth * portraitLandscapeBlockRowAdjuster;
      for (let i = 0; i < blockRowAdjuster; i++) {
        blocks[j][i] = new RhombileBlock(blockDiameter);
        blocks[j][i].blockContainer.style.top = `${(tilingAreaWidthLength - ((blockHypotenuse + blockPerspDiameter) * j) + (blockPerspDiameter * portraitLandscapeBlockRowYPosAdjuster))}px`;
        blocks[j][i].blockContainer.style.left = `${((hexagonWidth * i) + xPositioningAdjuster) - blockRowXPositionAdjuster}px`;
        tilingArea.insertAdjacentHTML("beforeend", blocks[j][i].blockContainer.outerHTML);
      }
    }
}
