 // Load scholarships from data.json and render them
let scholarships = [];

async function fetchScholarships() {
    try {
        const response = await fetch('data.json');
        scholarships = await response.json();
        renderScholarships();
        populateCountryFilter();
        populateFieldFilter();
    } catch (error) {
        document.getElementById('scholarshipList').innerHTML = '<p>Error loading scholarships.</p>';
    }
}

// Render scholarships based on filters
function renderScholarships() {
    const search = document.getElementById('searchInput').value.toLowerCase();
    const country = document.getElementById('countryFilter').value;
    const level = document.getElementById('levelFilter').value;
    const field = document.getElementById('fieldFilter').value;

    let filtered = scholarships.filter(s => {
        return (
            (!search || s.title.toLowerCase().includes(search) || s.description.toLowerCase().includes(search)) &&
            (!country || s.country === country) &&
            (!level || s.level === level) &&
            (!field || s.field === field)
        );
    });

    const list = document.getElementById('scholarshipList');
    if (filtered.length === 0) {
        list.innerHTML = '<p>No scholarships found.</p>';
        return;
    }

    list.innerHTML = filtered.map(s => `
        <div class="scholarship-card">
            <div class="scholarship-title">${s.title}</div>
            <div class="scholarship-meta">
                <strong>Country:</strong> ${s.country} | 
                <strong>Level:</strong> ${s.level} | 
                <strong>Field:</strong> ${s.field} | 
                <strong>Deadline:</strong> ${s.deadline}
            </div>
            <div class="scholarship-desc">${s.description}</div>
            <a class="scholarship-link" href="${s.link}" target="_blank">Learn More</a>
        </div>
    `).join('');
}

// Populate country filter from data
function populateCountryFilter() {
    const countrySet = new Set(scholarships.map(s => s.country));
    const select = document.getElementById('countryFilter');
    select.innerHTML = '<option value="">All Countries</option>';
    countrySet.forEach(country => {
        select.innerHTML += `<option value="${country}">${country}</option>`;
    });
}

// Populate field filter from data
function populateFieldFilter() {
    const fieldSet = new Set(scholarships.map(s => s.field));
    const select = document.getElementById('fieldFilter');
    select.innerHTML = '<option value="">All Fields</option>';
    fieldSet.forEach(field => {
        select.innerHTML += `<option value="${field}">${field}</option>`;
    });
}

// Attach event listeners
document.getElementById('searchInput').addEventListener('input', renderScholarships);
document.getElementById('countryFilter').addEventListener('change', renderScholarships);
document.getElementById('levelFilter').addEventListener('change', renderScholarships);
document.getElementById('fieldFilter').addEventListener('change', renderScholarships);

// Initial load
fetchScholarships();