document.addEventListener("DOMContentLoaded", function () {
    const menuButton = document.querySelector(".menu-button"); 
    const navMenu = document.querySelector("nav ul"); 

    function handleResize() {
        if (window.innerWidth > 1000) {
            navMenu.classList.remove("hide"); 
        } else {
            navMenu.classList.add("hide"); 
        }
    }

    handleResize();

    menuButton.addEventListener("click", function () {
        navMenu.classList.toggle("hide");
    });

    window.addEventListener("resize", handleResize);

    // Modal template function
    function viewerTemplate(pic, alt) {
        return `<div class="viewer">
            <button class="close-viewer">X</button>
            <img src="${pic}" alt="${alt}">
        </div>`;
    }

    // Close viewer function
    function closeViewer() {
        const viewer = document.querySelector(".viewer");
        if (viewer) {
            viewer.remove(); // Remove the viewer div from the DOM
        }
    }

    // View handler function
    function viewHandler(event) {
        const clickedImage = event.target; // Get the clicked image element
        const src = clickedImage.src; // Get the src attribute
        const alt = clickedImage.alt; // Get the alt text
        
        // Construct the new image file name
        const fullImage = src.split("-")[0] + "-full.jpeg"; 
        
        // Insert the viewer template into the DOM
        document.body.insertAdjacentHTML("afterbegin", viewerTemplate(fullImage, alt));

        // Add a listener to the close button (X) that calls the closeViewer function when clicked
        const closeButton = document.querySelector(".close-viewer");
        closeButton.addEventListener("click", closeViewer);
    }

    // Event listener for gallery images
    const gallery = document.querySelector(".gallery");
    gallery.addEventListener("click", function (event) {
        if (event.target.tagName === "IMG") { // Make sure an image was clicked
            viewHandler(event);
        }
    });
});