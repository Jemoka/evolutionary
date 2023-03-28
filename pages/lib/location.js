export default function location(prevLocation, prevLocations, scale=1, minComfort=10) {
    // distance from each block's previous location to the new location
    let diffs = prevLocations.map((v) =>
        prevLocation.map((value, index) => (v[index] - value)));

    // we want to add the changes up
    let totalChanges = diffs.reduce((res, item) =>
        [res[0] + item[0],
         res[1] + item[1]], [0,0]);


    // // and we want to find the average direction by dividing
    let averageChanges = [totalChanges[0]/prevLocations.length,
                           totalChanges[1]/prevLocations.length];

    // and now we norm and scale this vector
    let norm = Math.sqrt((averageChanges[0]**2 + averageChanges[1]**2));

    // if our distance is too close, move out
    if (norm < minComfort) {
        scale = -1*scale;
    }

    let factor = scale/norm;
    let averageChangesScaled = [averageChanges[0]*factor, averageChanges[1]*factor];

    // and return the added result
    return [prevLocation[0] + averageChangesScaled[0],
            prevLocation[1] + averageChangesScaled[1]];
}
