import { easeFunctions } from '/jsm/utils/easeFunctions.js'

export { ObjectFadeIn }

class ObjectFadeIn {
    constructor(duration, elementToBeFaded) {
        this.duration = duration;
        this.startTime;
        this.endTime;
        this.opacity = 0;
        this.fadeInterval;
        this.fading = false;
        this.elementToBeFaded = elementToBeFaded;
    }
    
    startObjectFadeIn() {
        
        this.fading = true;
        let startTime = Date.now();
        this.startTime = startTime
        let duration = this.duration
        let fadeObject = this.elementToBeFaded

        let id = setInterval(frame, 20);
        function frame() {
            
            let timeNow = Date.now()
            if (timeNow > (startTime + duration)) {
                fadeObject.setAttribute('class', `rhombileCubes startTime-${startTime} endTime-${startTime + duration}`);
                clearInterval(id);
              } else {
                let t = timeNow - startTime; //elapsed time
                let	b = 0; // starting point
                let	c = 1; // distance
                let d = duration; // duration
                let opacity = easeFunctions.easeOutExpo(t, b, c, d);
                //console.log(fadeObject);
                fadeObject.style.opacity = opacity;

            }
        }
    }
}
