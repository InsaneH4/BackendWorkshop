document.addEventListener("DOMContentLoaded", function () {
    var outputContainer = document.getElementById("output");
    var createMode = true; 
    document.getElementById("toggle-mode").addEventListener("change", function () {
        createMode = !this.checked;
        updateToggleLabel(); 
    });
    function updateToggleLabel() {
        var toggleLabel = document.getElementById("toggle-label");
        toggleLabel.innerText = createMode ? "Create" : "Search";
    }

 
    updateToggleLabel();

    function submitRecipe() {
        if (createMode) {
          
        } else {
          
            searchRecipes();
        }
    }

    function searchRecipes() {
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

   
        outputContainer.innerHTML = "";

        fetch('http://127.0.0.1:5000/search', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ ingredients: ingredients }),
        })
            .then(response => response.json())
            .then(data => {
                displaySearchResults(data);
            })
            .catch(error => console.error('Error:', error));
    }

    function displaySearchResults(results) {
        var output = document.getElementById("output");
        output.innerHTML = "<h2>Search Results:</h2>";
        results.forEach(result => {
            var recipeDiv = document.createElement("div");
            recipeDiv.className = "recipe-output";
            recipeDiv.innerHTML = `<strong>${result.name}:</strong> ${result.ingredients.join(", ")}`;
            output.appendChild(recipeDiv);
        });
    }
});
