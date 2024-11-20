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

