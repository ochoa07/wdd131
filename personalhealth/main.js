import { healthDimensions } from './dimension.mjs'; // Import the health dimensions array

// Define color schemes for each health dimension
const dimensionColors = {
    "Emotional Health": "#F94144", 
    "Physical Health": "#e2725b", 
    "Mental Health": "#73bfb8", 
    "Spiritual Health": "#43AA8B", 
    "Social Health": "#577590", 
    "Intellectual Health": "#F9C74F", 
    "Environmental Health": "#90BE6D", 
};

// Function to get a unique random health dimension
function getUniqueRandomDimension() {
    let lastDimension = localStorage.getItem("lastDimension");

    // Get a random dimension that is different from the last one
    let availableDimensions = healthDimensions.filter(dim => dim.title !== lastDimension);
    let newDimension = availableDimensions[Math.floor(Math.random() * availableDimensions.length)] || healthDimensions[0];

    // Store new dimension title to avoid immediate repetition
    localStorage.setItem("lastDimension", newDimension.title);

    return newDimension;
}

// Function to dynamically generate the health dimension HTML
function createHealthDimensionHTML(dimension) {
    const backgroundColor = dimensionColors[dimension.title] || "#FFFFFF"; 
    const textColor = "#ffffff";

    return `
        <div class="health-dimension">
            <img src="${dimension.image}" alt="${dimension.title} image" class="di">
            <section class="msg1" style="background-color: ${backgroundColor};">
                <h2>${dimension.title}</h2>
                <div class="tags">
                    ${dimension.tags.map(tag => `<span class="tag">${tag}</span>`).join(' ')}
                </div>
                <p>${dimension.description}</p>
                <p><strong>Tips to Improve:</strong></p>
                <ul>
                    ${dimension.tips.map(tip => `<li>${tip}</li>`).join('')}
                </ul>
                <a class="lm1" href="contactus.html" aria-label="Learn more about ${dimension.title}">Learn More</a>
            </section>
            <section class="quote" style="background-color: ${backgroundColor}; color: ${textColor}; padding: 10px; border-radius: 8px;">
                <blockquote>
                    <p>"${dimension.quote}"</p>
                </blockquote>
            </section>
        </div>
    `;
}

// Function to display a random health dimension
function displayRandomHealthDimension() {
    const container = document.getElementById('health-dimensions-container');
    if (container) {
        container.innerHTML = ''; // Clear any previously displayed dimension
        container.innerHTML = createHealthDimensionHTML(getUniqueRandomDimension()); // Display new random dimension
    }
}

// Function to handle search
function searchHealthDimensions() {
    const searchInput = document.getElementById('search-bar').value.toLowerCase().trim();
    const filteredDimensions = healthDimensions.filter(dimension =>
        dimension.title.toLowerCase().includes(searchInput) ||
        dimension.description.toLowerCase().includes(searchInput) ||
        dimension.tags.some(tag => tag.toLowerCase().includes(searchInput))
    );

    const container = document.getElementById('health-dimensions-container');
    if (container) {
        if (filteredDimensions.length === 0) {
            container.innerHTML = `<p class="no-results" >No results found. Please try a different keyword.</p>`;
        } else {
            container.innerHTML = filteredDimensions.map(createHealthDimensionHTML).join('');
        }
    }
}

// Function to handle the contact form submission
function handleContactForm() {
    const form = document.getElementById("contactForm");
    const responseMessage = document.getElementById("responseMessage");

    if (form && responseMessage) {
        form.addEventListener("submit", function(event) {
            event.preventDefault(); // Prevent form from reloading the page

            // Log to confirm if form is being submitted
            console.log("Form submitted!");

            // Show the response message
            responseMessage.textContent = "Thank you! Your message has been received.";
            responseMessage.style.color = "black"; // Success message color

            // Log to confirm message is displayed
            console.log("Response message displayed");

            form.reset(); // Clears the form fields after submission
        });
    } else {
        console.error('Form or Response Message not found.');
    }
}

// Function to handle the "Click me" button redirection
function handleClickMeButton() {
    const infoButton = document.getElementById('info');
    
    if (infoButton) {
        infoButton.addEventListener('click', function() {
            // Redirect to another page (replace with the desired URL)
            window.location.href = 'https://www.cdc.gov/health-topics.html';  // Change this to your desired URL
        });
    }
}

// Wait for the DOM to load
document.addEventListener('DOMContentLoaded', () => {
    displayRandomHealthDimension(); // Show a random dimension on page load

    const searchBar = document.getElementById('search-bar');
    if (searchBar) {
        searchBar.addEventListener('input', searchHealthDimensions);
    }

    handleContactForm(); // Enable contact form submission handling
    handleClickMeButton(); // Enable the "Click me" button redirection
});