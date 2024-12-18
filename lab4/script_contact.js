const showClinicsButton = document.getElementById('show-clinics');
showClinicsButton.addEventListener('click', fetchAndDisplayClinics);

async function fetchAndDisplayClinics() {
    const clinicsTbody = document.getElementById('clinics-tbody');
    const clinicsTable = document.getElementById('clinics-table');

    try {
        const response = await fetch('http://127.0.0.1:8000/clinic');
        if (!response.ok) {
            const message = `HTTP error! status: ${response.status} ${await response.text()}`;
            throw new Error(message);
        }
        const clinicsData = await response.json();

        if (!Array.isArray(clinicsData)) {
            throw new Error("Неверный формат данных: ожидается массив объектов.");
        }

        clinicsTbody.innerHTML = '';

        clinicsData.forEach(clinic => {
            if (!clinic.city || !clinic.address) {
                console.warn("Объект клиники не содержит city или address:", clinic);
                return;
            }
            const row = clinicsTbody.insertRow();
            const cityCell = row.insertCell();
            const addressCell = row.insertCell();
            cityCell.textContent = clinic.city;
            addressCell.textContent = clinic.address;
        });

        clinicsTable.style.display = 'block';
    } catch (error) {
        console.error('Ошибка загрузки данных:', error);
        alert(`Ошибка загрузки данных о клиниках: ${error.message}`);
    }
}

