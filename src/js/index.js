import Search from "./models/Search";
import Recipe from "./models/Recipe";
import * as searchView from "./views/SearchView";
import { elements, renderLoader, clearLoader } from "./views/base";

// Global state of the app
// Search object
// Current recipe object
// shopping list object
// Liked recipes

const state = {};

////////////// Search controller /////////////////

const controlSearch = async () => {
  // 1) Get query from view
  const query = searchView.getInput();


  if (query) {
    // 2) New search object and add to state
    state.search = new Search(query);

    // 3) Prepare UI for results
    searchView.clearInput();
    searchView.clearResults();
    renderLoader(elements.searchRes);

    try {
      // 4) Search for recipes
      await state.search.getResults();

      // 5) render reluts on UI
      clearLoader();
      searchView.renderResults(state.search.result);
    } catch (error) {
      console.log(error);
      clearLoader();
    }
  }
};

elements.searchForm.addEventListener("submit", e => {
  e.preventDefault();
  controlSearch();
});

elements.searchResPages.addEventListener("click", e => {
  const btn = e.target.closest(".btn-inline");
  if (btn) {
    const goToPage = parseInt(btn.dataset.goto);
    searchView.clearResults();
    searchView.renderResults(state.search.result, goToPage);
  }
});

////////////// Recipe controller /////////////////

const controlRecipe = async  () => {

  // Get ID from the URL
  const id = window.location.hash.replace("#", "");
  console.log(id);

  if(id) {
    // Prepare UI for changes

    // Create new recipe object
    state.recipe = new Recipe(id);

    try {
      // Get recipe data and parse ingredients
      await state.recipe.getRecipe();
      state.recipe.parseIngredients();

      // Calculate servings and time
      state.recipe.calcTime();
      state.recipe.calcServings();

      // Render recipe
      console.log(state.recipe);
    } catch (error) {
      console.log(error);
    }
  }
};

["hashchange", "load"].forEach(event => window.addEventListener(event, controlRecipe));