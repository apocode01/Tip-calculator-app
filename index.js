const customTipButton = document.getElementById(`custom`);
const tipInput = document.getElementById(`tipInput`);

customTipButton.addEventListener('click', () => {
    customTipButton.style.display = "none";
    tipInput.style.display = "inline-block";
    tipInput.focus();
})

tipInput.addEventListener("focus", () => {
    buttons.forEach(b => b.classList.remove(`active`));
});

const buttons = document.querySelectorAll(`.fixedTipButton`);

buttons.forEach((button) => {
    button.addEventListener('click', () => {
        // Remove all active states
        buttons.forEach(b => b.classList.remove(`active`));
        // Add active state for the button pressed
        button.classList.add(`active`);
    });
});