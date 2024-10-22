document.addEventListener('DOMContentLoaded', function () {
    const productList = document.getElementById('product-list');
    const sellForm = document.getElementById('sell-form');
    const categoryFilter = document.getElementById('category-filter');

    // Sample data of available products
    let products = [
        {
            name: 'Smartphone',
            price: 500,
            description: 'A brand new smartphone with all features.',
            image: '"C:\Users\IT_USER5\Pictures\iphone 14.jpeg"',
            category: 'electronics',
            seller: {
                name: 'Alice Johnson',
                phone: '123-456-7890'
            }
        },
        {
            name: 'Leather Jacket',
            price: 100,
            description: 'Stylish leather jacket, great condition.',
            image: "C:\Users\IT_USER5\Pictures\v.jfif",
            category: 'clothing',
            seller: {
                name: 'Bob Smith',
                phone: '987-654-3210'
            }
        }
    ];

    // Function to render products based on category filter
    function renderProducts() {
        const selectedCategory = categoryFilter.value;
        productList.innerHTML = '';

        const filteredProducts = selectedCategory === 'all' ?
            products : products.filter(product => product.category === selectedCategory);

        filteredProducts.forEach((product, index) => {
            const productElement = document.createElement('div');
            productElement.classList.add('product');
            productElement.innerHTML = `
                <img src="${product.image}" alt="${product.name}">
                <h3>${product.name}</h3>
                <p class="price">$${product.price}</p>
                <p>${product.description}</p>
                <p><strong>Seller:</strong> ${product.seller.name} | <strong>Phone:</strong> ${product.seller.phone}</p>
                <button class="buy-btn" data-index="${index}">Buy</button>
            `;
            productList.appendChild(productElement);
        });
    }

    // Handle form submission (selling a product)
    sellForm.addEventListener('submit', function (event) {
        event.preventDefault();

        const sellerName = document.getElementById('sellerName').value;
        const sellerPhone = document.getElementById('sellerPhone').value;
        const productName = document.getElementById('productName').value;
        const productPrice = document.getElementById('productPrice').value;
        const productDescription = document.getElementById('productDescription').value;
        const productCategory = document.getElementById('productCategory').value;
        const productImage = document.getElementById('productImage').files[0];

        // Validate image file
        if (!productImage) {
            alert('Please upload an image for the product.');
            return;
        }

        const imageUrl = URL.createObjectURL(productImage);  // Generate a URL for the image

        // Add the new product to the products array
        products.push({
            name: productName,
            price: productPrice,
            description: productDescription,
            category: productCategory,
            image: imageUrl, // Use the uploaded image URL
            seller: {
                name: sellerName,
                phone: sellerPhone
            }
        });

        // Reset the form after submission
        sellForm.reset();

        // Re-render the product list with the newly added product
        renderProducts();
    });

    // Handle buying a product
    productList.addEventListener('click', function (event) {
        if (event.target.classList.contains('buy-btn')) {
            const productIndex = event.target.getAttribute('data-index');
            const boughtProduct = products.splice(productIndex, 1)[0];  // Remove the product from the list

            // Re-render the product list
            renderProducts();

            alert(`You have successfully bought the ${boughtProduct.name} for $${boughtProduct.price}!`);
        }
    });

    // Add an event listener to filter products by category
    categoryFilter.addEventListener('change', function () {
        renderProducts();
    });

    // Initial render of the products
    renderProducts();
});
