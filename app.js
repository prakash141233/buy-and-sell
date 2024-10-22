document.addEventListener('DOMContentLoaded', function () {
    const productList = document.getElementById('product-list');
    const sellForm = document.getElementById('sell-form');
    const categoryFilter = document.getElementById('category-filter');

    // Sample data of available products
    let products = [
        {
            name: 'Laptop',
            price: 400,
            description: 'A used but well-maintained laptop',
            image: 'images/laptop.jpg',
            category: 'electronics' // Category for filtering
        },
        {
            name: 'Phone',
            price: 200,
            description: 'A second-hand smartphone in good condition',
            image: 'images/phone.jpg',
            category: 'electronics'
        },
        {
            name: 'Sofa',
            price: 150,
            description: 'A comfy 3-seater sofa in great condition',
            image: 'images/sofa.jpg',
            category: 'furniture'
        },
        {
            name: 'Book',
            price: 20,
            description: 'A used book in good condition',
            image: 'images/book.jpg',
            category: 'books'
        }
    ];

    // Function to render products based on the filter category
    function renderProducts() {
        const selectedCategory = categoryFilter.value;
        productList.innerHTML = ''; // Clear the product list

        // Filter the products based on the selected category
        const filteredProducts = selectedCategory === 'all' ?
            products : products.filter(product => product.category === selectedCategory);

        // Render the filtered products
        filteredProducts.forEach((product, index) => {
            const productElement = document.createElement('div');
            productElement.classList.add('product');
            productElement.innerHTML = `
                <img src="${product.image}" alt="${product.name}">
                <h3>${product.name}</h3>
                <p class="price">$${product.price}</p>
                <p>${product.description}</p>
                <button class="buy-btn" data-index="${index}">Buy</button>
                <button class="delete-btn" data-index="${index}">Delete</button>
            `;

            productList.appendChild(productElement);
        });
    }

    // Handle form submission (selling a product)
    sellForm.addEventListener('submit', function (event) {
        event.preventDefault();

        // Get values from the form
        const productName = document.getElementById('productName').value;
        const productPrice = document.getElementById('productPrice').value;
        const productDescription = document.getElementById('productDescription').value;
        const productCategory = document.getElementById('productCategory').value;
        const productImage = document.getElementById('productImage').files[0];

        // Check if an image is uploaded
        if (!productImage) {
            alert('Please upload an image.');
            return;
        }

        const imageUrl = URL.createObjectURL(productImage);  // Create a URL for the uploaded image

        // Add the new product to the list
        products.push({
            name: productName,
            price: productPrice,
            description: productDescription,
            category: productCategory,
            image: imageUrl // Use the image URL from the input
        });

        // Reset the form after submission
        sellForm.reset();

        // Re-render the product list
        renderProducts();
    });

    // Handle buying a product
    productList.addEventListener('click', function (event) {
        if (event.target.classList.contains('buy-btn')) {
            const productIndex = event.target.getAttribute('data-index');
            const boughtProduct = products.splice(productIndex, 1)[0];  // Remove product from the list

            // Re-render the product list
            renderProducts();

            alert(`You have bought the ${boughtProduct.name} for $${boughtProduct.price}!`);
        }
    });

    // Handle deleting a product
    productList.addEventListener('click', function (event) {
        if (event.target.classList.contains('delete-btn')) {
            const productIndex = event.target.getAttribute('data-index');
            products.splice(productIndex, 1);  // Remove the product

            // Re-render the updated product list
            renderProducts();

            alert("Product deleted successfully!");
        }
    });

    // Add an event listener to filter products by category
    categoryFilter.addEventListener('change', function () {
        renderProducts();
    });

    // Initial render of the products
    renderProducts();
});
