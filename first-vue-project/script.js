// script.js

let history = JSON.parse(localStorage.getItem("history")) || [];
const inputField = document.getElementById('input-field');

// Function to append values to the input field
function appendValue(value) {
  console.log("Button clicked:", value);  // Debugging statement
  inputField.value += value;
}

// Function to clear the input field
function clearInput() {
  console.log("Clearing input...");  // Debugging statement
  inputField.value = '';
}

// Function to calculate the result of the input expression
function calculate() {
  console.log("Calculating expression:", inputField.value);  // Debugging statement
  try {
    const result = eval(inputField.value); // Evaluate the mathematical expression
    if (result !== undefined) {
      const expression = `${inputField.value} = ${result}`;
      history.push(expression); // Store the calculation in history
      localStorage.setItem("history", JSON.stringify(history)); // Save history to localStorage
      inputField.value = result; // Show the result in the input field
      renderHistory(); // Render the updated history
    }
  } catch (error) {
    console.log("Error calculating expression:", error); // Debugging statement
    alert("Nepareizs izteiksmes formāts!"); // Invalid expression error
    clearInput(); // Clear the input field
  }
}

// Function to calculate advanced mathematical functions
function calculateFunction(func) {
  console.log("Calculating advanced function:", func); // Debugging statement
  try {
    const value = parseFloat(inputField.value); // Convert input to a number
    if (isNaN(value)) throw new Error("Invalid input for advanced function");

    let result;
    switch (func) {
      case "cos":
        result = Math.cos(value);
        break;
      case "sin":
        result = Math.sin(value);
        break;
      case "tan":
        result = Math.tan(value);
        break;
      case "sqrt":
        result = Math.sqrt(value);
        break;
      case "log":
        result = Math.log(value);
        break;
      default:
        throw new Error("Unknown function");
    }

    const expression = `${func}(${value}) = ${result}`;
    history.push(expression); // Add to history
    localStorage.setItem("history", JSON.stringify(history)); // Save history to localStorage
    inputField.value = result; // Show result in the input field
    renderHistory(); // Render the updated history
  } catch (error) {
    console.log("Error in advanced function:", error); // Debugging statement
    alert("Nepareizs formāts vai funkcija!"); // Error message
  }
}

// Function to render the history list
function renderHistory() {
  const historyList = document.getElementById('history-list');
  historyList.innerHTML = ''; // Clear the history list before re-rendering

  history.forEach((entry, index) => {
    const li = document.createElement('li');
    li.innerHTML = `${entry} <button onclick="removeHistoryEntry(${index})">X</button>`;
    historyList.appendChild(li);
  });
}

// Function to clear all history
function clearHistory() {
  console.log("Clearing history...");  // Debugging statement
  history = [];
  localStorage.setItem("history", JSON.stringify(history));
  renderHistory();
}

// Function to remove a specific history entry
function removeHistoryEntry(index) {
  console.log("Removing history entry at index:", index);  // Debugging statement
  history.splice(index, 1);
  localStorage.setItem("history", JSON.stringify(history));
  renderHistory();
}

// Initialize and render the history on page load
renderHistory();

// Initialize and render the history on page load
renderHistory();
