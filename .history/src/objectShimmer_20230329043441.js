export { ObjectShimmer }
export { shimmerFrame }

class ObjectShimmer {
    constructor(frequency, amplitude) {
        this.frequency = frequency;
        this.amplitude = amplitude;
        this.glowClock = frequency * 0.75;
    }

}

function shimmerFrame(shimmer, element) {
    shimmer.glowClock += 50;
    let shimmerSineValue = Math.sin(((Math.PI * 2) / shimmer.frequency) * shimmer.glowClock);
    shimmer.amplitude = (shimmerSineValue * 0.5) + 0.5;
    element.style.opacity = shimmer.amplitude;
}
