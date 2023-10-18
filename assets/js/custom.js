const fileInput = document.getElementById('csvFile');
const fileNameDisplay = document.getElementById('fileName');

if (fileInput) {
    fileInput.addEventListener('change', (event) => {
        const selectedFile = event.target.files[0]; // get the seleted file details

        if (selectedFile) {
            fileNameDisplay.textContent = `${selectedFile.name}`; // Display the selected filename
            fileNameDisplay.classList.add('mt-2');
        } else {
            fileNameDisplay.textContent = ''; // Reset the label if no file is selected
            fileNameDisplay.classList.remove('mt-2');
        }
    });
}


function searchTable() {
    let input = document.getElementById("keyword").value.toLowerCase(); // Get the user's search input
    let rows = document.querySelectorAll('#bug-list tr');
    let foundedRow = '';
    let found = false;

    for (let i = 0; i < rows.length; i++) {
        let checkActiveRow = rows[i].classList.contains('text-success');
        if (checkActiveRow) {
            rows[i].classList.remove('text-success');
        }
    }
    // Loop through each row in the table
    for (let i = 0; i < rows.length; i++) {
        let rowText = rows[i].textContent.toLowerCase();

        // Check if the cell's text contains the search input
        if (rowText.includes(input)) {
            found = true;
            foundedRow = rows[i];
            break; // Exit the inner loop if a match is found in this row
        }

    }
    if (found) {
        foundedRow.scrollIntoView({ behavior: "smooth", block: "center" }); // Scroll to the row
        foundedRow.classList.add('text-success');
    } else {
        alert('No Search Result Found');
        foundedRow.classList.add('text-success');
    }
}


// let links = document.querySelectorAll('#menu-store-menu .menu-item a');
// for (let i = 0; i < links.length; i++) {
//     links[i].addEventListener('click', (e) => {
//         links[i].scrollIntoView({ behavior: "smooth", block: "center" }); // Scroll to the row
//     });
// }