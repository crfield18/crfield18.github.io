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

// Convert website inputs (strings) to a number
function convertToNum(input) {
    if (input.endsWith(".")) {
        input += "0";
    }
    try {
        return new Big(input);
    } catch (error) {
        return input;
    }
}

// Calculate protein concentration using Beer-Lambert Law
function calculateSum() {
    // Absorbance of the sample at a specific wavelength
    // (typically 280 nm for estimating protein concentration
    const num1 = convertToNum(AbsInput.value);
    // Dilution factor
    // By how much was the sample diluted to allow for accurate readings
    const num2 = convertToNum(DilutionFactorInput.value);
    // Molar extinction coefficient (ε) (M^-1 cm^-1)
    const num3 = convertToNum(ExtinctionInput.value);
    // Path length (cm)
    // Generally 1 cm or path length corrected to 1 cm
    const num4 = convertToNum(PathLengthInput.value);
    // Molecular weight of the protein
    const num5 = convertToNum(MWInput.value);

    // Estimated protein concentration in micromolar (µm)
    const MicroMolar = (num1 * num2) * 1000000 / (num3 * num4);
    const RoundedMicroMolar = MicroMolar.toFixed(2);

    console.log(`conc in um: ${MicroMolar}`);

    // Is the final concentration valid (is it a positive number)
    if (Number.isNaN(RoundedMicroMolar) || RoundedMicroMolar <= 0) {
        resultParagraph.textContent = `Result is not valid (RoundedMicroMolar\
            = ${RoundedMicroMolar})`;
        return;
    }
    // Only Print concentration in mg/ml if protein mass is a number above 0
    if (Number.isNaN(num5) || num5 <= 0) {
        resultParagraph.textContent = `Estimated protein concentration:\
            ${RoundedMicroMolar} µM`;
        return;
    } else {
        const mgml = (MicroMolar / 1000000) * num5;
        resultParagraph.textContent = `Estimated protein concentration:\
            ${RoundedMicroMolar} µM or ${mgml.toFixed(2)} mg/ml`;
            console.log(`conc in mg/ml: ${mgml}`);
        return;
    }
}

// Add click event listener to the button
calculateButton.addEventListener("click", calculateSum);
