function getHandXray(tissues, thickness, spectrum) {
    // Determine the xray image produced by the given spectrum.
    var boneCoeffs = allAttenuationCoeffs(muBone,
        spectrum.map(function(d) { return d[0]; }));
    var softCoeffs = allAttenuationCoeffs(muMuscle,
        spectrum.map(function(d) { return d[0]; }));
    var fractureCoeffs = boneCoeffs.map(function(d) { return d * 0.8; });
    var emptyCoeffs = boneCoeffs.map(function(d) { return 0; });
    var transmittedI = tissues.map(function(d, i) {
        return d.map(function(val, j) {
            //   tissue type (0: nothing, 1: soft tissu, 2: fracture, 3: bone)
            switch(val) {
                case 0:
                  coeffs = emptyCoeffs;
                  break;
                case 1:
                  coeffs = softCoeffs;
                  break;
                case 2:
                  coeffs = fractureCoeffs;
                  break;
                case 3:
                  coeffs = boneCoeffs;
                  break;
                default:
                  coeffs = emptyCoeffs;
                  break;
        }
        return totalIntensity(beerLambert(spectrum, thickness[i][j], coeffs));
    })});

    return transmittedI;
}
