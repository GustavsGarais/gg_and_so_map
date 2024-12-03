function togglePopup() {
    var popup = document.getElementById("myPopup");
    popup.classList.toggle("show");
    setTimeout(() => {
        popup.classList.remove("show");
    }, 3000);
}

document.querySelector('.dropdown-content a[href="#"]').addEventListener('click', function(event) {
    event.preventDefault(); // Prevent default anchor click behavior
    const infoBox = document.getElementById('info-box');
    infoBox.style.display = infoBox.style.display === 'none' ? 'block' : 'none'; // Toggle visibility
});

// Dropdown functionality with toggle transition effect
document.querySelectorAll('.dropdown').forEach(dropdown => {
    dropdown.addEventListener('click', function(event) {
        event.preventDefault();
        const dropdownContent = this.querySelector('.dropdown-content');

        // Toggle class for transition effect
        dropdownContent.classList.toggle('show');
    });
});

// Function to show dropdown content with a toggle effect
function toggleDropdownContent(elementId) {
    const element = document.getElementById(elementId);
    element.style.display = element.style.display === 'block' ? 'none' : 'block';
}

// Elementu atlase
const inputField = document.getElementById("input-field");
const historyList = document.getElementById("history-list");

// Vēstures saglabāšana
let history = JSON.parse(localStorage.getItem("history")) || [];

// Atjauno vēsturi no localStorage
function renderHistory() {
  historyList.innerHTML = "";
  history.forEach((entry, index) => {
    const li = document.createElement("li");
    li.textContent = entry;
    const deleteBtn = document.createElement("button");
    deleteBtn.textContent = "Dzēst";
    deleteBtn.onclick = () => removeHistoryEntry(index);
    li.appendChild(deleteBtn);
    historyList.appendChild(li);
  });
}

// Skaitļu un operatoru pievienošana
function appendValue(value) {
  inputField.value += value;
}

// Dzēš ievadi
function clearInput() {
  inputField.value = "";
}

// Aprēķina rezultātu
function calculate() {
  try {
    const result = eval(inputField.value);
    if (result !== undefined) {
      history.push(`${inputField.value} = ${result}`);
      localStorage.setItem("history", JSON.stringify(history));
      inputField.value = result;
      renderHistory();
    }
  } catch (error) {
    alert("Nepareizs izteiksmes formāts!");
    clearInput();
  }
}

// Dzēš visu vēsturi
function clearHistory() {
  history = [];
  localStorage.setItem("history", JSON.stringify(history));
  renderHistory();
}

// Dzēš vienu vēstures ierakstu
function removeHistoryEntry(index) {
  history.splice(index, 1);
  localStorage.setItem("history", JSON.stringify(history));
  renderHistory();
}

// Sākotnēji atjauno vēsturi
renderHistory();
