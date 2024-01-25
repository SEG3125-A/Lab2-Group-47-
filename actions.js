function generateItems(category, items, prices) {
    //Potential failure point: should take a list of lists, not 3 arrays. That way we could sort based on price before rendering to user. Not critical however.
    for (var i = 0; i < items.length; i++) {
        // Create item with info and write it to the DOM
        document.write(`
            <label>
                <input type="checkbox" name="item[${category}][${items[i]}][selected]" value="1" data-price="${prices[i]}">
                ${category} ${items[i]} - $${parseFloat(prices[i]).toFixed(2)}
            </label>
            <label>
                Quantity:
                <input type="number" name="item[${category}][${items[i]}][quantity]" value="1" min="1">
            </label>
        `);
    }
}

function showSection(sectionId) {
    // Hide all sections
    document.querySelectorAll('section').forEach(function(section) {
        section.style.display = 'none';
    });

    // Show the selected section
    document.getElementById(sectionId).style.display = 'block';
}

document.addEventListener('DOMContentLoaded', function () {

    var submitButton = document.getElementById('submitButton');
    var addToCartButton = document.getElementById('addToCartButton');

    var shoppingCartBody = document.getElementById('shoppingCartBody');
    var totalElement = document.querySelector('.total p');

    var veggie = document.querySelector('input[name="veggie"]');
    var gluten = document.querySelector('input[name="gluten"]');
    var organic = document.querySelector('input[name="organic"]');


    submitButton.addEventListener('click', function () {

        if (organic.checked)
        {
            document.getElementById('organicData').style.display = 'block';
            document.getElementById('non-organicData').style.display = 'none';
        }
        else if (!organic.checked)
        {
            document.getElementById('organicData').style.display = 'none';
            document.getElementById('non-organicData').style.display = 'block';
        }

        if (gluten.checked){
            document.getElementById('glutenData').style.display = 'block';
            document.getElementById('non-glutenData').style.display = 'none';
        }
        else if (!gluten.checked){
            document.getElementById('glutenData').style.display = 'none';
            document.getElementById('non-glutenData').style.display = 'block';
        }

        if (veggie.checked){
            document.getElementById('veggieData').style.display = 'block';
            document.getElementById('non-veggieData').style.display = 'none';
        }
        else if (!veggie.checked){
            document.getElementById('veggieData').style.display = 'none';
            document.getElementById('non-veggieData').style.display = 'block';
        }


    });

    addToCartButton.addEventListener('click', function () {

        var formElements = document.getElementById('groceryForm').elements;
        var cartItems = [];
    
        for (var i = 0; i < formElements.length; i++) {
            var element = formElements[i];
    
            if (element.type === 'checkbox' && element.checked) {
                var itemName = element.name.replace("item[", "").replace("][", " ").replace("][selected]", "");
                var quantity = parseInt(formElements[element.name.replace("[selected]", "[quantity]")].value, 10);
                var price = parseFloat(element.getAttribute('data-price'));
                var itemCost = quantity * price;
    
                cartItems.push({
                    name: itemName,
                    quantity: quantity,
                    price: price,
                    itemCost: itemCost
                });
            }
        }

        // Clear the table before updating
        clearCartTable();
    
        // Update the cart table with the new items
        updateCartTable(cartItems);
    
        // Update the total cost
        updateTotalCost(calculateTotalCost(cartItems));
    
        // Switch to the Cart section
        showSection('section3');
    });
    
    // Clear the cart table
    function clearCartTable() {
        var shoppingCartBody = document.getElementById('shoppingCartBody');
        shoppingCartBody.innerHTML = '';
    }
    
    // Calculate the total cost based on the cart items
    function calculateTotalCost(cartItems) {
        return cartItems.reduce(function (total, item) {
            return total + item.itemCost;
        }, 0);
    }
    
    function updateCartTable(cartItems) {

        cartItems.forEach(function (item) {
            var row = shoppingCartBody.insertRow();
            var cell1 = row.insertCell(0);
            var cell2 = row.insertCell(1);
            var cell3 = row.insertCell(2);
            var cell4 = row.insertCell(3);

            cell1.textContent = item.name;
            cell2.textContent = item.quantity;
            cell3.textContent = '$' + item.price.toFixed(2);
            cell4.textContent = '$' + (item.price * item.quantity).toFixed(2);
        });
    }

    function updateTotalCost(totalCost) {
        totalElement.textContent = 'Total Cost: $' + totalCost.toFixed(2);
    }
});