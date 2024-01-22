function showSection(sectionId) {
    // Hide all sections
    document.querySelectorAll('section').forEach(function(section) {
        section.style.display = 'none';
    });

    // Show the selected section
    document.getElementById(sectionId).style.display = 'block';
}

document.addEventListener('DOMContentLoaded', function () {
    var groceryForm = document.getElementById('groceryForm');
    var shoppingCartBody = document.getElementById('shoppingCartBody');
    var totalElement = document.querySelector('.total p');

    groceryForm.addEventListener('submit', function (event) {
        event.preventDefault();

        var formElements = groceryForm.elements;
        var totalCost = 0;
        var cartItems = [];

        for (var i = 0; i < formElements.length; i++) {
            var element = formElements[i];

            if (element.type === 'checkbox' && element.checked) {
                var itemName = element.name.replace("item[", "").replace("][selected]", "");
                var quantity = parseInt(formElements[element.name.replace("[selected]", "[quantity]")].value, 10);
                var price = parseFloat(element.getAttribute('data-price'));
                var itemCost = quantity * price;

                cartItems.push({
                    name: itemName,
                    quantity: quantity,
                    price: price,
                    itemCost: itemCost
                });

                totalCost += itemCost;
            }
        }

        updateCartTable(cartItems);
        updateTotalCost(totalCost);
    });

    function updateCartTable(cartItems) {

        cartItems.forEach(function (item) {
            var row = shoppingCartBody.insertRow();
            var cell1 = row.insertCell(0);
            var cell2 = row.insertCell(1);
            var cell3 = row.insertCell(2);

            cell1.textContent = item.name;
            cell2.textContent = item.quantity;
            cell3.textContent = '$' + item.price.toFixed(2);
        });
    }

    function updateTotalCost(totalCost) {
        totalElement.textContent = 'Total Cost: $' + totalCost.toFixed(2);
    }
});