let outputContainer = document.getElementById("output");
let createMode = true;
//sets switch to create mode when page loads
document.getElementById("toggle-mode").checked = false;
document
  .getElementById("toggle-mode")
  .addEventListener("change", updateToggleLabel);

let dbRecipes = [];
fetch("http://127.0.0.1:5000/load", {
  method: "GET",
})
  .then((response) => response.json())
  .then((data) => {
    dbRecipes = data;
    console.log(dbRecipes);
  })
  .then(() => {
    dbRecipes.forEach((recipe) => {
      let recipeDiv = document.createElement("div");
      recipeDiv.className = "recipe-output";

      recipeDiv.innerHTML = `<strong>${recipe[1]}:</strong> ${recipe
        .slice(2, 7)
        .join(", ")}`;
      console.log(
        recipe[1] + " and " + recipe.slice(2, 7).join(",")
      );
      outputContainer.insertBefore(recipeDiv, outputContainer.firstChild);
    });
  });

function updateToggleLabel() {
  createMode = !this.checked;
  let toggleLabel = document.getElementById("toggle-label");
  toggleLabel.innerText = createMode ? "Create" : "Search";
  console.log("Toggle mode set to " + (createMode ? "Create" : "Search"));
}

updateToggleLabel();

function submitRecipe() {
  let requestType = createMode ? "add" : "search";
  let outputContainer = document.getElementById("output");
  //gets values from input fields
  let recipeName = document.getElementById("recipeName").value;
  let ingredient1 = document.getElementById("ingredient1").value.trim();
  let ingredient2 = document.getElementById("ingredient2").value.trim();
  let ingredient3 = document.getElementById("ingredient3").value.trim();
  let ingredient4 = document.getElementById("ingredient4").value.trim();
  let ingredient5 = document.getElementById("ingredient5").value.trim();
  let ingredients = [];
  //adds ingredients to array if not empty
  if (ingredient1) ingredients.push(ingredient1);
  if (ingredient2) ingredients.push(ingredient2);
  if (ingredient3) ingredients.push(ingredient3);
  if (ingredient4) ingredients.push(ingredient4);
  if (ingredient5) ingredients.push(ingredient5);
  //adds recipe to frontend if in create mode
  if (createMode) {
    let newRecipe = document.createElement("div");
    newRecipe.className = "recipe-output";
    newRecipe.innerHTML = `<strong>${recipeName}:</strong> ${ingredients.join(
      ", "
    )}`;
    outputContainer.insertBefore(newRecipe, outputContainer.firstChild);
  } else {
    alert("Searching for recipe!");
  }
  //clears input fields
  document.getElementById("recipeName").value = "";
  document.getElementById("ingredient1").value = "";
  document.getElementById("ingredient2").value = "";
  document.getElementById("ingredient3").value = "";
  document.getElementById("ingredient4").value = "";
  document.getElementById("ingredient5").value = "";
  //send ingredients to backend
  fetch(`http://127.0.0.1:5000/${requestType}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ name: recipeName, ingredients: ingredients }),
  });
  console.log(`${requestType} request submitted!`);
}

function displaySearchResults(results) {
  let output = document.getElementById("output");
  output.innerHTML = "<h2>Search Results:</h2>";
  results.forEach((result) => {
    let recipeDiv = document.createElement("div");
    recipeDiv.className = "recipe-output";
    recipeDiv.innerHTML = `<strong>${
      result.name
    }:</strong> ${result.ingredients.join(", ")}`;
    output.appendChild(recipeDiv);
  });
}
