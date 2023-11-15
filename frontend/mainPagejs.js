function createTextboxes() {
    // Get the user input for the number of ingredients
    var ingredientCountInput = document.getElementById("ingredientCount");
    var ingredientCount = Math.min(ingredientCountInput.value, 5);

    // Clear any existing textboxes
    var textboxesContainer = document.getElementById("textboxes-container");
    textboxesContainer.innerHTML = '';

    // Create new textboxes based on the user input
    for (var i = 1; i <= ingredientCount; i++) {
        var input = document.createElement("input");
        input.type = "text";
        input.placeholder = "Ingredient " + i;
        textboxesContainer.appendChild(input);
    }

    // Add a submit button
    var submitButton = document.createElement("input");
    submitButton.type = "submit";
    submitButton.value = "Submit Ingredients";
    textboxesContainer.appendChild(submitButton);

    // Handle form submission
    textboxesContainer.addEventListener("submit", function(event) {
        event.preventDefault();

        // Collect the ingredient data
        var ingredientData = [];
        for (var i = 1; i <= ingredientCount; i++) {
            var ingredientInput = document.querySelector(`#textboxes-container input:nth-child(${i})`);
            ingredientData.push(ingredientInput.value);
        }

        // Simulate sending data to a server (replace 'https://example.com/submit' with your actual endpoint)
        fetch('https://example.com/submit', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ ingredients: ingredientData }),
        })
        .then(response => response.json())
        .then(data => {
            // Handle the response if needed
            console.log('Server response:', data);
            alert('Data submitted successfully!');
            
            // After submission, clear the textboxes
            textboxesContainer.innerHTML = '';
            ingredientCountInput.value = ''; // Clear the ingredient count input
        })
        .catch(error => {
            console.error('Error submitting data:', error);
            alert('Error submitting data. Please try again.');
        });
    });

    // Prevent the initial form submission
    return false;
}
