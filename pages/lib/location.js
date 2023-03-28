function n(vec) {
    return Math.sqrt(vec[0]**2 + vec[1]**2);
}

export default function location(prevLocation, prevLocations, scale=1, minComfort=10) {
    // distance from each block's previous location to the new location
    let diffs = prevLocations.map((v) =>
        prevLocation.map((value, index) => (v[index] - value)));

    // we want to add the changes up, weighted by their distance
    let totalChanges = diffs.reduce((res, item) => {
        let [a,b] = item;

        // if we are too close for comfort, get comfortable
        if (n(item) <= minComfort) {
            a = -(item[0]/(n(item)+1e-10))*scale;
            b = -(item[1]/(n(item)+1e-10))*scale;
        }

        // otherwise, move towards it
        return [res[0] + a*scale,
                res[1] + b*scale];
    }, [0,0]);

    // and return the added result
    return [prevLocation[0] + totalChanges[0],
            prevLocation[1] + totalChanges[1]];
}
