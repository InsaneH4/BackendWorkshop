var outputContainer = document.getElementById("output");
var createMode = true;
document.getElementById("toggle-mode").checked = false; 
document
  .getElementById("toggle-mode")
  .addEventListener("change", updateToggleLabel);

function updateToggleLabel() {
  createMode = !this.checked;
  var toggleLabel = document.getElementById("toggle-label");
  toggleLabel.innerText = createMode ? "Create" : "Search";
  console.log("Toggle mode set to " + (createMode ? "Create" : "Search"));
}

updateToggleLabel();

function submitRecipe() {
  let requestType = createMode ? "add" : "search";
  var outputContainer = document.getElementById("output");
  var recipeName = document.getElementById("recipeName").value;
  var ingredient1 = document.getElementById("ingredient1").value.trim();
  var ingredient2 = document.getElementById("ingredient2").value.trim();
  var ingredient3 = document.getElementById("ingredient3").value.trim();
  var ingredient4 = document.getElementById("ingredient4").value.trim();
  var ingredient5 = document.getElementById("ingredient5").value.trim();
  var ingredients = [];
  if (ingredient1) ingredients.push(ingredient1);
  if (ingredient2) ingredients.push(ingredient2);
  if (ingredient3) ingredients.push(ingredient3);
  if (ingredient4) ingredients.push(ingredient4);
  if (ingredient5) ingredients.push(ingredient5);
  //adds recipe to frontend if in create mode
  if (createMode) {
    var newRecipe = document.createElement("div");
    newRecipe.className = "recipe-output";
    newRecipe.innerHTML = `<strong>${recipeName}:</strong> ${ingredients.join(
      ", "
    )}`;
    outputContainer.insertBefore(newRecipe, outputContainer.firstChild);
  } else {
    alert("Searching for recipe!");
  }

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
  var output = document.getElementById("output");
  output.innerHTML = "<h2>Search Results:</h2>";
  results.forEach((result) => {
    var recipeDiv = document.createElement("div");
    recipeDiv.className = "recipe-output";
    recipeDiv.innerHTML = `<strong>${
      result.name
    }:</strong> ${result.ingredients.join(", ")}`;
    output.appendChild(recipeDiv);
  });
}
