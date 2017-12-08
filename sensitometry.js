// Functions to define and use a sensitometric curve as well as functions to
// convert optical densities to rgb values for on screen display.

function sensitometricCurve(logIt, DO, gamma) {
    // Define a sensitometric curve by specifying one point in the region of
    // interest and the gamma value.
    this.logIt = logIt;
    this.DO = DO;
    this.gamma = gamma;
    this.maxDO = 3.0;  // maximum value for the optical density
    this.minDO = 0.3;  // minimum value for the optical density
    this.yIntercept = this.DO - this.gamma * this.logIt;
    this.minRGB = 0;
    this.maxRGB = 255;
    this.rgbSlope = (this.maxRGB - this.minRGB) / (this.minDO - this.maxDO);
    this.rgbIntercept = this.maxRGB - this.rgbSlope * this.minDO;
}

sensitometricCurve.prototype.energyToDO = function(energy) {
    // Convert a given energy to an optical density.
    var x = Math.log10(energy);
    var optDensity = this.gamma * x + this.yIntercept;
    return d3.max([d3.min([optDensity, this.maxDO]), this.minDO]);
};

sensitometricCurve.prototype.DOToRGB = function(optDensity) {
    // Convert an optical density to an RGB value. 255 corresponds to white
    // (minimum optical density, 0.3) whereas 0 corresponds to black (maximum
    // optical density, 3.0).
    return optDensity * this.rgbSlope + this.rgbIntercept;
};

sensitometricCurve.prototype.energyToRGB = function(energy) {
    // Convert the given energy to an RGB value.
    return this.DOToRGB(this.energyToDO(energy));
};

sensitometricCurve.prototype.setGamma = function(gamma) {
    this.gamma = gamma;
    this.yIntercept = this.DO - this.gamma * this.logIt;
}

