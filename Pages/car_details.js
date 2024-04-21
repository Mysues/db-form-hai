// Function to fetch car manufacturers from the backend and populate the dropdown
function populateCarManufacturers() {
    fetch('http://localhost:8080/car_manufacturer')
    .then(response => {
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        return response.json();
    })
        .then(manufacturers => {
            const manufacturerSelect = document.getElementById('car_manufacturer');
            manufacturers.forEach(manufacturer => {
                const option = document.createElement('option');
                option.value = manufacturer;
                option.textContent = manufacturer;
                manufacturerSelect.appendChild(option);
            });
        })
        .catch(error => console.error('Error fetching car manufacturers:', error));
}

// Function to fetch car models based on selected manufacturer and populate the dropdown
function populateCarModels() {
    const manufacturerSelect = document.getElementById('car_manufacturer');
    const modelSelect = document.getElementById('car_model');
    const selectedManufacturer = manufacturerSelect.value;

    fetch(`http://localhost:8080/car_model?manufacturer=${selectedManufacturer}`)
    .then(response => {
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        return response.json();
    })
        .then(models => {
            modelSelect.innerHTML = '<option value="">Select Model</option>';
            models.forEach(model => {
                const option = document.createElement('option');
                option.value = model;
                option.textContent = model;
                modelSelect.appendChild(option);
            });
            modelSelect.disabled = false;
        })
        .catch(error => console.error('Error fetching car models:', error));
}

// Function to fetch car registration numbers based on selected model and manufacturer and populate the dropdown
function populateCarRegistrationNumbers() {
    const registrationNumberSelect = document.getElementById('car_register_number');
    const selectedModel = document.getElementById('car_model').value;
    const selectedManufacturer = document.getElementById('car_manufacturer').value;

    fetch(`http://localhost:8080/registration_number?car_model=${selectedModel}&car_manufacturer=${selectedManufacturer}`)
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then(registrationNumbers => {
            registrationNumberSelect.innerHTML = '<option value="">Select Registration Number</option>';
            registrationNumbers.forEach(registrationNumber => {
                const option = document.createElement('option');
                option.value = registrationNumber;
                option.textContent = registrationNumber;
                registrationNumberSelect.appendChild(option);
            });
            registrationNumberSelect.disabled = false;
        })
        .catch(error => console.error('Error fetching car registration numbers:', error));
}


// Populate car manufacturers on page load
window.onload = function() {
    populateCarManufacturers();
};
