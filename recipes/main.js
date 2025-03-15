import { recipes } from './recipes.mjs'; // Import recipes

function getRandomNumber(num) {
    return Math.floor(Math.random() * num);
}

function getRandomRecipe() {
    const randomIndex = getRandomNumber(recipes.length);
    return recipes[randomIndex];
}

function generateRecipeMarkup(recipe) {
    const tagsMarkup = generateTagsMarkup(recipe.tags);
    const ratingMarkup = generateRatingMarkup(recipe.rating);

    return `
        <section>
            <img src="${recipe.image}" alt="Recipe Image" width="350" height="200" loading="lazy">
            <div class="recipe-content">
                <div class="tags">${tagsMarkup}</div>
                <h2>${recipe.name}</h2>
                <div class="rating" role="img" aria-label="Rating: ${recipe.rating} out of 5 stars">
                    ${ratingMarkup}
                </div>
                <div class="description">
                    ${recipe.description}
                </div>
            </div>
        </section>
    `;
}

function generateTagsMarkup(tags) {
    return tags.map(tag => `<span class="tag">${tag}</span>`).join('');
}

function generateRatingMarkup(rating) {
    let stars = '';
    for (let i = 0; i < 5; i++) {
        if (i < rating) {
            stars += '<span aria-hidden="true" class="icon-star">⭐</span>';
        } else {
            stars += '<span aria-hidden="true" class="icon-star-empty">☆</span>';
        }
    }
    return stars;
}

function displayRecipes(filteredRecipes) {
    const recipeMarkup = filteredRecipes.map(generateRecipeMarkup).join('');
    document.getElementById('recipe-container').innerHTML = recipeMarkup;
}

// Filter recipes based on the search input
function filterRecipes(query) {
    const lowerCaseQuery = query.toLowerCase();
    return recipes.filter(recipe => 
        recipe.name.toLowerCase().includes(lowerCaseQuery) || 
        recipe.description.toLowerCase().includes(lowerCaseQuery) ||
        recipe.tags.some(tag => tag.toLowerCase().includes(lowerCaseQuery))
    );
}

// Handle search input and button click events
function init() {
    // Display random recipe on page load
    const randomRecipe = getRandomRecipe();
    const recipeMarkup = generateRecipeMarkup(randomRecipe);
    document.getElementById('recipe-container').innerHTML = recipeMarkup;

    // Event listener for search input
    document.getElementById('search-bar').addEventListener('input', (event) => {
        const query = event.target.value;
        const filteredRecipes = filterRecipes(query);
        displayRecipes(filteredRecipes);
    });

    // Event listener for search button (optional, in case you want a button to trigger the search)
    document.getElementById('search-button').addEventListener('click', () => {
        const query = document.getElementById('search-bar').value;
        const filteredRecipes = filterRecipes(query);
        displayRecipes(filteredRecipes);
    });
}

document.addEventListener('DOMContentLoaded', init); // Ensure the DOM is fully loaded before running the init function