export { degrees_to_radians }
export { pythagorean }

function degrees_to_radians(degrees) {
    var pi = Math.PI;
    return degrees * (pi/180);
  }
  
function pythagorean(sideA, sideB){
    return Math.sqrt(Math.pow(sideA, 2) + Math.pow(sideB, 2));
}
