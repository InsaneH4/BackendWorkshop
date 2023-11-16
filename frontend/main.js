let outputContainer = document.getElementById("output");

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
      console.log(recipe[1] + " and " + recipe.slice(2, 7).join(","));
      outputContainer.insertBefore(recipeDiv, outputContainer.firstChild);
    });
  });

function submitRecipe() {
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
  let newRecipe = document.createElement("div");
  newRecipe.className = "recipe-output";
  newRecipe.innerHTML = `<strong>${recipeName}:</strong> ${ingredients.join(
    ", "
  )}`;
  outputContainer.insertBefore(newRecipe, outputContainer.firstChild);
  //clears input fields
  document.getElementById("recipeName").value = "";
  document.getElementById("ingredient1").value = "";
  document.getElementById("ingredient2").value = "";
  document.getElementById("ingredient3").value = "";
  document.getElementById("ingredient4").value = "";
  document.getElementById("ingredient5").value = "";
  //send ingredients to backend
  fetch(`http://127.0.0.1:5000/add`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ name: recipeName, ingredients: ingredients }),
  });
  console.log("http request submitted!");
}
