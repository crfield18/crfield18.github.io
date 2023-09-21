// Get references to the HTML elements
// User inputs
const AbsInput = document.getElementById("Abs");
const DilutionFactorInput = document.getElementById("DilutionFactor");
const ExtinctionInput = document.getElementById("Extinction");
const MWInput = document.getElementById("MW");
const PathLengthInput = document.getElementById("PathLength");
// Calculate button and results paragraph
const calculateButton = document.getElementById("calculateButton");
const resultParagraph = document.getElementById("result");

// Function to perform the calculation
function calculateSum() {
    // Absorbance of the sample at a specific wavelength
    // (typically 280 nm for estimating protein concentration  
    const num1 = new Big(AbsInput.value);
    // Dilution factor
    // By how much was the sample diluted to allow for accurate readings
    const num2 = new Big(DilutionFactorInput.value);
    // Molar extinction coefficient (ε) (M^-1 cm^-1)
    const num3 = new Big(ExtinctionInput.value);
    // Path length (cm)
    // Generally 1 cm or path length corrected to 1 cm
    const num4 = new Big(PathLengthInput.value);
    // Molecular weight of the protein
    const num5 = new Big(MWInput.value);

    // Estimated protein concentration in micromolar (µm)
    const MicroMolar = (num1 * num2) * 1000000 / (num3 * num4);
    const RoundedMicroMolar = MicroMolar.toFixed(2);

    // Is the final concentration valid (is it a positive number)
    if (isNaN(RoundedMicroMolar) || RoundedMicroMolar <= 0) {
        resultParagraph.textContent = `Result is not valid (RoundedMicroMolar\
            = ${RoundedMicroMolar})`;
        return;
    }
    // Only print concentration in µm if protein mass is not set or is <= 0 
    if (isNaN(num5) || num5 <= 0) {
        resultParagraph.textContent = `Estimated protein concentration:\
            ${RoundedMicroMolar} µM`;
        return;
    } else {
        const mgml = (MicroMolar / 1000000) * num5;
        resultParagraph.textContent = `Estimated protein concentration:\
            ${RoundedMicroMolar} µM or ${mgml.toFixed(2)} mg/ml`;
        return;
    }
    
    // Think about adding a method for shifting between M mM µM
    // depending on the size of RoundedMicroMolar

    // Maybe also show the concentration in M in brackets to like 10 d.p.
    // as a backup
}

// Add click event listener to the button
calculateButton.addEventListener("click", calculateSum);
