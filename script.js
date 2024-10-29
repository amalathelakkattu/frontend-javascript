// script.js
const productList = document.getElementById('product-list');
const searchForm = document.getElementById('search-form');
const searchInput = document.getElementById('search-input');

// Fetch products from FakeStore API
async function fetchProducts() {
    try {
        const response = await fetch('https://fakestoreapi.com/products');
        const products = await response.json();
        displayProducts(products);
    } catch (error) {
        console.error('Error fetching products:', error);
    }
}

// Display products dynamically
function displayProducts(products) {
    productList.innerHTML = '';
    products.forEach(product => {
        productList.innerHTML += `
            <div class="col-12 col-sm-6 col-md-4 col-lg-3 mb-4">
                <div class="card h-100">
                    <img src="${product.image}" class="card-img-top product-image" alt="${product.title}">
                    <div class="card-body">
                        <h5 class="card-title">${product.title}</h5>
                        <p class="text-success">$${product.price}</p>
                        <p class="card-text">${product.description.substring(0, 80)}...</p>
                        <button class="btn btn-primary">Add to Cart</button>
                    </div>
                </div>
            </div>
        `;
    });
}

// Search functionality
searchForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const query = searchInput.value.toLowerCase();
    const filteredProducts = Array.from(productList.children).filter(product =>
        product.textContent.toLowerCase().includes(query)
    );
    productList.innerHTML = '';
    filteredProducts.forEach(product => productList.appendChild(product));
});

// Load products on page load
fetchProducts();
