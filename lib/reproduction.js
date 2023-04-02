function n(vec) {
    return Math.sqrt(vec[0]**2 + vec[1]**2);
}

export default function reproduction(location, locations, ring=5,
                                     minNeighbors=2, maxNeighbors=4,
                                    prob=0.5) {
    // distance from each block's previous location to the new location
    let diffs = locations.map((v) =>
        n(location.map((value, index) => (v[index] - value))));

    diffs = diffs.filter((e)=>(e<=ring))

    // reproduce if within range, oterwise death
    if (diffs.length >= minNeighbors && diffs.length <= maxNeighbors) {
        if (Math.random() < prob)
            return [location, [location[0] + Math.random(),
                            location[1] + Math.random(),
                            [location[2][0] + Math.random(),
                                location[2][1] + Math.random(),
                             location[2][2] + Math.random()],
                               Math.random()]]
        else
            return [location]
    } 
}
