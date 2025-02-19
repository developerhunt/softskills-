document.addEventListener('DOMContentLoaded', function() {
    fetchGoogleSheetData();
    document.getElementById('dataForm').addEventListener('submit', submitForm);
});

function fetchGoogleSheetData() {
    google.script.run.withSuccessHandler(populateFormOptions).getData();
}

function populateFormOptions(data) {
    const registerNumberSelect = document.getElementById('registerNumber');
    const nameSelect = document.getElementById('name');
    const tableBody = document.getElementById('dataTable').getElementsByTagName('tbody')[0];

    data.forEach((row, index) => {
        if (index === 0) return; // Skip header row

        const registerNumberOption = document.createElement('option');
        registerNumberOption.value = row[1];
        registerNumberOption.textContent = row[1];
        registerNumberSelect.appendChild(registerNumberOption);

        const nameOption = document.createElement('option');
        nameOption.value = row[2];
        nameOption.textContent = row[2];
        nameSelect.appendChild(nameOption);

        const newRow = tableBody.insertRow();
        row.forEach(cellData => {
            const cell = newRow.insertCell();
            cell.textContent = cellData;
        });
    });
}

function submitForm(event) {
    event.preventDefault();

    const registerNumber = document.getElementById('registerNumber').value;
    const name = document.getElementById('name').value;
    const telephoneEtiquette = document.getElementById('telephoneEtiquette').value;
    const audioListening = document.getElementById('audioListening').value;
    const advancedAdzap = document.getElementById('advancedAdzap').value;
    const hrInterview = document.getElementById('hrInterview').value;
    const powerPointPresentation = document.getElementById('powerPointPresentation').value;
    const totalMarks = parseInt(telephoneEtiquette) + parseInt(audioListening) + parseInt(advancedAdzap) + parseInt(hrInterview) + parseInt(powerPointPresentation);

    const newRow = [
        '', // S.No will be calculated later
        registerNumber,
        name,
        telephoneEtiquette,
        audioListening,
        advancedAdzap,
        hrInterview,
        powerPointPresentation,
        totalMarks
    ];

    google.script.run.withSuccessHandler(() => {
        addRowToTable(newRow);
        showMessage('Data submitted successfully!', 'success');
    }).setData(newRow);
}

function addRowToTable(newRow) {
    const tableBody = document.getElementById('dataTable').getElementsByTagName('tbody')[0];
    const newRowElement = tableBody.insertRow();

    newRow.forEach((cellData, index) => {
        const cell = newRowElement.insertCell(index);
        cell.textContent = cellData;
    });

    // Calculate and set S.No
    newRowElement.cells[0].textContent = tableBody.rows.length;
}

function showMessage(message, type) {
    const messageDiv = document.getElementById('message');
    messageDiv.textContent = message;
    messageDiv.className = `alert alert-${type}`;
    setTimeout(() => { messageDiv.textContent = ''; messageDiv.className = ''; }, 3000);
}
