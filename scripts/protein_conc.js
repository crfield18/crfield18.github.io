// Get references to the HTML elements
const A280Input = document.getElementById('A280');
const DilutionFactorInput = document.getElementById('DilutionFactor');
const ExtinctionInput = document.getElementById('Extinction');
const MWInput = document.getElementById('MW');
const PathLengthInput = document.getElementById('PathLength');

const calculateButton = document.getElementById('calculateButton');
const resultParagraph = document.getElementById('result');

// Function to perform the calculation
function calculateSum() {
    const num1 = new Big(A280Input.value);
    const num2 = new Big(DilutionFactorInput.value);
    const num3 = new Big(ExtinctionInput.value);
    const num4 = new Big(PathLengthInput.value);
    const num5 = new Big(MWInput.value);

    if (isNaN(num1) || isNaN(num2) || isNaN(num3)){
        resultParagraph.textContent = 'Please enter valid numbers';
    } else {
        const FinalMicroMolar = (num1 * num2) * 1000000 / (num3 * num4);
        const Finalmgml = (FinalMicroMolar / 1000000) * num5;

        const RoundedFinalMicroMolar = FinalMicroMolar.toFixed(4)
        const RoundedFinalmgml = Finalmgml.toFixed(4)

        resultParagraph.textContent = `Estimated protein concentration: ${RoundedFinalMicroMolar} µM or ${RoundedFinalmgml} mg/ml`;
    }
}

// Add click event listener to the button
calculateButton.addEventListener('click', calculateSum);
