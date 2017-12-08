// Functions to define and use a sensitometric curve as well as functions to
// convert optical densities to rgb values for on screen display.

function energyToDO(energy, gamma, Emax, DOmax) {
    // Convert a given energy to an optical density. The film/numeric receptor
    // is considered to be calibrated such that the maximum energy `Emax`
    // corresponds to an optical density `DOmax`.
    var x = Math.log(energy);
    var DO = DOmax + (x - Math.log(Emax)) * gamma;
    DO = d3.max([DO, 0.3]);
    return DO;
}

function DOToRGB(optical_density) {
    // Convert an optical density to an RGB value. 255 corresponds to white
    // (minimum optical density, 0.3) whereas 0 corresponds to black (maximum
    // optical density, 3.0).
    var rgbMin = 0;
    var rgbMax = 255;
    var doMin = 0.3;
    var doMax = 3;
    return (optical_density - doMax) * (rgbMax - rgbMin) / (doMin - doMax);
}

function getDOs(energies, DOmax, gamma, Emax) {
    // Draw a rectangle with grayscale corresponding to the given energies.
    if (DOmax === undefined) { DOmax = 3.0; }
    if (gamma === undefined) { gamma = 3.0; }
    if (Emax === undefined) { Emax = d3.max(energies); }
    var DOs = energies.map(function(d) {
        return DOToRGB(energyToDO(d, gamma, Emax, DOmax));
    });
    return DOs;
}
