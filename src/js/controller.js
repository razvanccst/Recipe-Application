import * as model from './model.js';
import recipeView from './views/recipeView.js';
import searchView from './views/searchView.js';
import resultsView from './views/resultsView.js';
import paginationView from './views/paginationView.js';

import 'core-js/stable';
import 'regenerator-runtime/runtime';

const controlRecipes = async function () {
  try {
    // Get the id as url hashID
    const id = window.location.hash.slice(1);
    // Guard Clause
    if (!id) return;
    //Rander Spinner
    recipeView.renderSpinner();
    // Loading Recipe

    await model.loadRecipe(id);

    // Randering Recipe
    recipeView.render(model.state.recipe);
  } catch (err) {
    console.error(err);
    recipeView.renderError();
  }
};

const controlSearchResults = async function () {
  try {
    resultsView.renderSpinner();
    //Get search qurry
    const query = searchView.getQuery();
    if (!query) return;

    //Load search results
    await model.loadSearchResults(`${query}`);

    //Rander results
    resultsView.render(model.getSearchResultsPage());

    //Rander initial pagination buttons
    paginationView.render(model.state.search);
  } catch (err) {
    console.error(err);
  }
};

const controlPagination = function (goToPage) {
  resultsView.render(model.getSearchResultsPage(goToPage));
  paginationView.render(model.state.search);
};

const init = function () {
  recipeView.addHandlerRender(controlRecipes);
  searchView.addHandlerSearch(controlSearchResults);
  paginationView.addHandlerClick(controlPagination);
};
init();
