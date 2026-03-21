const display = document.getElementById("display");
const buttons = document.querySelectorAll(".btn");

let currentInput = "";

function updateDisplay(value) {
  display.textContent = value || "0";
}

function appendValue(value) {
  currentInput += value;
  updateDisplay(currentInput);
}

function clearDisplay() {
  currentInput = "";
  updateDisplay("0");
}

function deleteLast() {
  currentInput = currentInput.slice(0, -1);
  updateDisplay(currentInput);
}

function calculateResult() {
  try {
    // Substitui % por /100 quando usado sozinho ou em expressão simples
    let expression = currentInput.replace(/%/g, "/100");
    let result = eval(expression);

    if (result === undefined || isNaN(result)) {
      updateDisplay("Erro");
      currentInput = "";
      return;
    }

    currentInput = result.toString();
    updateDisplay(currentInput);
  } catch (error) {
    updateDisplay("Erro");
    currentInput = "";
  }
}

buttons.forEach((button) => {
  button.addEventListener("click", () => {
    const value = button.getAttribute("data-value");
    const action = button.getAttribute("data-action");

    if (value !== null) {
      appendValue(value);
    }

    if (action === "clear") {
      clearDisplay();
    }

    if (action === "delete") {
      deleteLast();
    }

    if (action === "calculate") {
      calculateResult();
    }
  });
});
