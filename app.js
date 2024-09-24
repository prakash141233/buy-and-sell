document.addEventListener('DOMContentLoaded', function() {
    const productList = document.getElementById('product-list');
    const sellForm = document.getElementById('sell-form');

    // Sample data of available products
    let products = [
        {
            name: 'Laptop',
            price: 400,
            description: 'A used but well-maintained laptop'
        },
        {
            name: 'Phone',
            price: 200,
            description: 'A second-hand smartphone in good condition'
        }
    ];

    // Function to render the product list
    function renderProducts() {
        productList.innerHTML = '';
        products.forEach((product, index) => {
            const productElement = document.createElement('div');
            productElement.classList.add('product');
            productElement.innerHTML = `
                <h3>${product.name}</h3>
                <p class="price">$${product.price}</p>
                <p>${product.description}</p>
            `;
            productList.appendChild(productElement);
        });
    }

    // Handle product submission
    sellForm.addEventListener('submit', function(event) {
        event.preventDefault();

        // Get the values from the form
        const productName = document.getElementById('productName').value;
        const productPrice = document.getElementById('productPrice').value;
        const productDescription = document.getElementById('productDescription').value;

        // Add the new product to the list
        products.push({
            name: productName,
            price: productPrice,
            description: productDescription
        });

        // Clear the form
        sellForm.reset();

        // Re-render the product list
        renderProducts();
    });

    // Initial rendering of products
    renderProducts();
});