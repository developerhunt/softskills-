document.addEventListener("DOMContentLoaded", function() {
    fetchData();
    document.getElementById("dataForm").addEventListener("submit", submitForm);
});

function fetchData() {
    fetch("https://script.google.com/macros/s/AKfycbw75ol93WXq9ZZxZ1ckPkyT7_Xcxtox_v22KPMZtBIWiosJFpD01muO-6WFcHZhCCnLvw/exec")
        .then(response => response.json())
        .then(data => populateFormOptions(data))
        .catch(error => console.error("Error fetching data:", error));
}

function populateFormOptions(data) {
    const registerSelect = document.getElementById("registerNumber");
    const nameSelect = document.getElementById("name");
    const tableBody = document.getElementById("dataTable");
    
    data.slice(1).forEach((row, index) => {
        let option1 = new Option(row[1], row[1]);
        let option2 = new Option(row[2], row[2]);
        registerSelect.add(option1);
        nameSelect.add(option2);
        
        let newRow = tableBody.insertRow();
        row.forEach(cellData => {
            let cell = newRow.insertCell();
            cell.textContent = cellData;
        });
    });
}

function submitForm(event) {
    event.preventDefault();
    
    const formData = {
        registerNumber: document.getElementById("registerNumber").value,
        name: document.getElementById("name").value,
        telephoneEtiquette: document.getElementById("telephoneEtiquette").value,
        audioListening: document.getElementById("audioListening").value,
        advancedAdzap: document.getElementById("advancedAdzap").value,
        hrInterview: document.getElementById("hrInterview").value,
        powerPointPresentation: document.getElementById("powerPointPresentation").value
    };
    
    fetch("https://script.google.com/macros/s/AKfycbw75ol93WXq9ZZxZ1ckPkyT7_Xcxtox_v22KPMZtBIWiosJFpD01muO-6WFcHZhCCnLvw/exec", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData)
    })
    .then(response => response.text())
    .then(message => {
        document.getElementById("message").textContent = message;
        fetchData();
    })
    .catch(error => console.error("Error submitting data:", error));
}
