document.getElementById('calculate-btn').addEventListener('click', function() {
    const weight = parseFloat(document.getElementById('weight').value);
    const height = parseFloat(document.getElementById('height').value);
    
    // Validation (Requirement)
    if (!weight || !height || weight <= 0 || height <= 0) {
        alert("Sila masukkan data yang betul.");
        return;
    }

    // Processing
    const bmi = weight / (height * height);
    let status = "";
    let desc = "";

    // Selection Logic based on your table
    if (bmi < 18.5) { status = "Underweight"; desc = "Berat anda rendah."; }
    else if (bmi < 25.0) { status = "Normal"; desc = "Berat anda ideal."; }
    else if (bmi < 30.0) { status = "Overweight"; desc = "Berat berlebihan."; }
    else if (bmi < 35.0) { status = "Class I Obesity"; desc = "Obesiti Tahap 1."; }
    else if (bmi < 40.0) { status = "Class II Obesity"; desc = "Obesiti Tahap 2."; }
    else { status = "Class III Obesity"; desc = "Obesiti Tahap 3."; }

    // Update UI
    const container = document.getElementById('result-container');
    container.classList.remove('hidden');
    document.getElementById('bmi-value').innerText = bmi.toFixed(1);
    document.getElementById('bmi-status-tag').innerText = status;
    document.getElementById('bmi-description').innerText = desc;

    // Persistence (Local Storage)
    saveRecord(bmi.toFixed(1), status);
});

function saveRecord(val, stat) {
    let history = JSON.parse(localStorage.getItem('records')) || [];
    history.push({ val, stat, date: new Date().toLocaleDateString() });
    localStorage.setItem('records', JSON.stringify(history));
    showHistory();
}

function showHistory() {
    const list = document.getElementById('history-list');
    let history = JSON.parse(localStorage.getItem('records')) || [];
    list.innerHTML = history.reverse().slice(0, 5).map(h => 
        `<li><span>${h.date}</span> <strong>${h.val}</strong> <span>${h.stat}</span></li>`
    ).join('');
}

document.getElementById('clear-btn').addEventListener('click', () => {
    localStorage.removeItem('records');
    showHistory();
});

showHistory();
