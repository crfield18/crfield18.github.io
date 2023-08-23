// Get references to the HTML elements
// User inputs
const A280Input = document.getElementById("A280");
const DilutionFactorInput = document.getElementById("DilutionFactor");
const ExtinctionInput = document.getElementById("Extinction");
const MWInput = document.getElementById("MW");
const PathLengthInput = document.getElementById("PathLength");
// Calculate button and results paragraph
const calculateButton = document.getElementById("calculateButton");
const resultParagraph = document.getElementById("result");

// function Magnitude(conc){
//     if (conc >= 1000){
//         return (conc/1000).toString()
//     } else if (conc < 1){

//     }
// }

// Function to perform the calculation
function calculateSum() {
    const num1 = new Big(A280Input.value);
    const num2 = new Big(DilutionFactorInput.value);
    const num3 = new Big(ExtinctionInput.value);
    const num4 = new Big(PathLengthInput.value);
    const num5 = new Big(MWInput.value);

    if (Number.isNaN(num1) || Number.isNaN(num2) || Number.isNaN(num3)) {
        resultParagraph.textContent = "Please enter valid numbers";
    } else {
        const MicroMolar = (num1 * num2) * 1000000 / (num3 * num4);
        const mgml = (MicroMolar / 1000000) * num5;

        const RoundedMicroMolar = MicroMolar.toFixed(4);
        const Roundedmgml = mgml.toFixed(4);

        resultParagraph.textContent = `Estimated protein concentration:\
        ${RoundedMicroMolar} µM or ${Roundedmgml} mg/ml`;

        // Think about adding a method for shifting between M mM µM
        // depending on the size of RoundedMicroMolar

        // Maybe also show the concentration in M in brackets to like 10 d.p.
        // as a backup
    }
}

// Add click event listener to the button
calculateButton.addEventListener("click", calculateSum);
