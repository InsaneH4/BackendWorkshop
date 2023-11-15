var outputContainer = document.getElementById("output");
function submitIngredients() {
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

    var newRecipe = document.createElement("div");
    newRecipe.className = "recipe-output";
    newRecipe.innerHTML = `<strong>${recipeName}:</strong> ${ingredients.join(", ")}`;
    outputContainer.insertBefore(newRecipe, outputContainer.firstChild);
    
    document.getElementById("recipeName").value = "";
    document.getElementById("ingredient1").value = "";
    document.getElementById("ingredient2").value = "";
    document.getElementById("ingredient3").value = "";
    document.getElementById("ingredient4").value = "";
    document.getElementById("ingredient5").value = "";
    //send ingredients to backend
    fetch('http://127.0.0.1:5000/submit', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({name: recipeName, ingredients: ingredients}),
    })
    console.log('thank fuck')
}