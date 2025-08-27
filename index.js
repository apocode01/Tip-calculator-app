const customTipButton = document.getElementById(`custom`);
const tipInput = document.getElementById(`tipInput`);
const buttons = document.querySelectorAll(`.fixedTipButton`);
const billInput = document.getElementById(`billInput`);
const peopleInput = document.getElementById(`peopleInput`);
const tipAmount = document.querySelector(`.tipAmount`);
const totalAmount = document.querySelector(`.totalAmount`);
const resetButton = document.getElementById(`reset`);
let totalTip = 0;
let bill = 0;
let people = 1;

// Functions

function calculateTip(buttonIndex) {
    const percentages = [5, 10, 15, 25, 50];
    totalTip = bill * (percentages[buttonIndex] / 100);
}

function calculateCustomTip() {
    const tipPercentage = Number(tipInput.value);
    totalTip = bill * (tipPercentage/100);
}

function updateValues() {
    bill = Number(billInput.value);
    people = Number(peopleInput.value); 
    checkValueValidity();
}

function showResults() {
    updateValues();
    const tipPerPerson = (totalTip / people).toFixed(2)
    tipAmount.textContent = `$${tipPerPerson}`;
    const total = ((bill + totalTip) / people).toFixed(2);
    totalAmount.textContent = `$${total}`;
}

function checkValueValidity() {
    let returnValue = false;
    if (bill <= 0) {
        billInput.value = "";
        returnValue = true;
        bill = 0;
    }
    if (people <= 0) {
        peopleInput.value = "";
        returnValue = true;
        people = 1;
    }
}

function reset() {
    // Reset button active states
    buttons.forEach(b => b.classList.remove(`active`));
    // Remove custom tip
    customTipButton.style.display = "inline-block";
    tipInput.style.display = "none";
    // Reset values
    billInput.value = "";
    bill = 0;
    peopleInput.value = "";
    people = 1;
    tipInput.value = "";
    totalTip = 0;
    // Reset results
    tipAmount.textContent = `$0.00`;
    totalAmount.textContent = `$0.00`;
}

// Event listeners

customTipButton.addEventListener('click', () => {
    // Show custom tip
    customTipButton.style.display = "none";
    tipInput.style.display = "inline-block";
    tipInput.focus();
})

tipInput.addEventListener("focus", () => {
    calculateCustomTip();
    showResults();
    buttons.forEach(b => b.classList.remove(`active`));
    tipInput.classList.remove(`active`)
});

tipInput.addEventListener("blur", () => {
    if (tipInput.value.trim() === "") {
        customTipButton.style.display = "inline-block";
        tipInput.style.display = "none";
    }
    else {
        tipInput.classList.add(`active`)
    }
});

buttons.forEach((button, index) => {
    button.addEventListener('click', () => {
        calculateTip(index); 
        showResults();
        // Remove custom tip
        customTipButton.style.display = "inline-block";
        tipInput.style.display = "none";
        // Reset active states
        buttons.forEach(b => b.classList.remove(`active`));
        // Add active state for the button pressed
        button.classList.add(`active`);
    });
});

billInput.addEventListener('input', showResults);
peopleInput.addEventListener('input', showResults);

tipInput.addEventListener('input', () => {
    calculateCustomTip();
    showResults();
});

resetButton.addEventListener('click', reset);