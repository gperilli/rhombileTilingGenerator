export { ObjectShimmer }
export { shimmerFrame }

class ObjectShimmer {
    constructor(frequency, amplitude) {
        this.frequency = frequency;
        this.amplitude = amplitude;
        this.glowClock = 0;
        this.shimmerValue = 0;
    }

}

function shimmerFrame(shimmer, element) {
    console.log("tick");
    shimmer.glowClock += 50;
    shimmer.amplitude = Math.sin(((Math.PI * 2) / shimmer.frequency) * shimmer.glowClock);
    element.style.opacity = 0.5 + (shimmer.amplitude * 0.3);
    // console.log(this.amplitude);
    //this.element.style.opacity = this.amplitude;
}
