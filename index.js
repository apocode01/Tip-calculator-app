const customTipButton = document.getElementById(`custom`);
const tipInput = document.getElementById(`tipInput`);
const buttons = document.querySelectorAll(`.fixedTipButton`);
const billInput = document.getElementById(`billInput`);
const peopleInput = document.getElementById(`peopleInput`);
const tipAmount = document.querySelector(`.tipAmount`);
const totalAmount = document.querySelector(`.totalAmount`);
const resetButton = document.getElementById(`reset`);
const warningMessageBill = document.getElementById(`warningMessageBill`);
const warningMessagePeople = document.getElementById(`warningMessagePeople`);
let totalTip = 0;
let bill = 0;
let people = 1;
let validBill = false;
let validPeople = false;

// Functions

function calculateTip(buttonIndex) {
    const percentages = [5, 10, 15, 25, 50];
    totalTip = bill * (percentages[buttonIndex] / 100);
}

function calculateCustomTip() {
    const tipPercentage = Number(tipInput.value);
    totalTip = bill * (tipPercentage/100);
}

function showResults() {
    if (validBill && validPeople) {
        const tipPerPerson = (totalTip / people).toFixed(2)
        tipAmount.textContent = `$${tipPerPerson}`;
        const total = ((bill + totalTip) / people).toFixed(2);
        totalAmount.textContent = `$${total}`; 
        // Turn reset button on
        resetButton.classList.add(`on`);
    }
    else {
        // Clear screen
        tipAmount.textContent = `$0.00`;
        totalAmount.textContent = `$0.00`;
        // Turn reset button off
        resetButton.classList.remove(`on`);
    }
}

function updateAndCheckBillValue() {
    bill = Number(billInput.value);
    if (bill < 0) {
        billInput.value = "";
        bill = 0;
        validBill = false;
    }
    else if (bill === 0) {
        warningMessageBill.textContent = "Can't be zero";
        billInput.classList.add(`invalid`);
        validBill = false;
    }
    else {
        warningMessageBill.textContent = "";
        billInput.classList.remove(`invalid`);
        validBill = true;
    }
}

function updateAndCheckPeopleValue() {
    people = Number(peopleInput.value);
    if (people < 0) {
        peopleInput.value = "";
        people = 1;
        validPeople = false;
    }
    else if (people === 0) {
        warningMessagePeople.textContent = "Can't be zero";
        peopleInput.classList.add(`invalid`);
        people = 1;
        validPeople = false;
    }
    else {
        warningMessagePeople.textContent = "";
        peopleInput.classList.remove(`invalid`);
        validPeople = true;
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
    validBill = false;
    validPeople = false;
    // Clear screen
    tipAmount.textContent = `$0.00`;
    totalAmount.textContent = `$0.00`;
    // Turn reset button off
    resetButton.classList.remove(`on`);
}

// Event listeners

customTipButton.addEventListener('click', () => {
    // Show custom tip
    customTipButton.style.display = "none";
    tipInput.style.display = "inline-block";
    tipInput.focus();
});

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

billInput.addEventListener('input', () => {
    updateAndCheckBillValue();
    showResults();
});

peopleInput.addEventListener('input', () => {
    updateAndCheckPeopleValue();
    showResults();
});

tipInput.addEventListener('input', () => {
    calculateCustomTip();
    showResults();
});

resetButton.addEventListener('click', reset);