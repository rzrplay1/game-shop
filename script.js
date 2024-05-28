function changeCSS() {
    // Get the link element for the CSS file
    var cssLink = document.getElementById("cssFile");
    
    // Check if default.css is currently linked
    if (cssLink.href.includes("dark.css")) {
        // Change the href attribute to link to another CSS file
        cssLink.href = "light.css";
    } else {
        // If another CSS file is currently linked, change it back to default.css
        cssLink.href = "dark.css";
    }
}


// Корзина
let totalPrice = 0;

document.addEventListener('DOMContentLoaded', function() {
    loadCart();
    updateCustomScrollbar();
});

function addToBasket(productName, price) {
    var productList = document.getElementById("productList");
    var product = document.createElement("div");
    product.classList.add("product");

    product.innerHTML = `
        <h3>${productName}</h3>
        <p class="product-price">Price: $${price.toFixed(2)}</p>
        <p>Description: Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
        <button class="removeBtn" onclick="removeFromBasket(this, ${price})">Remove</button>
    `;

    productList.appendChild(product);
    updateBasketState(price);
    saveCart();
    updateCustomScrollbar();
}

function removeFromBasket(button, price) {
    var productToRemove = button.parentElement;
    productToRemove.remove();
    updateBasketState(-price);
    saveCart();
    updateCustomScrollbar();
}

function removeAllFromBasket() {
    var productList = document.getElementById("productList");
    productList.innerHTML = '';
    totalPrice = 0;
    updateBasketState(0);
    saveCart();
    updateCustomScrollbar();
}

function toggleBasket() {
    var basket = document.getElementById("basket");
    basket.classList.toggle("hidden");
    updateBasketState(0);
    updateCustomScrollbar();
}

function updateBasketState(priceChange) {
    updateTotalPrice(priceChange);
    updateTotalItems();
}

function updateTotalPrice(priceChange) {
    totalPrice += priceChange;
    if (totalPrice < 0) totalPrice = 0;
    var totalPriceSpan = document.getElementById("totalPrice");
    totalPriceSpan.textContent = totalPrice.toFixed(2);
}

function updateTotalItems() {
    var totalItemsSpan = document.getElementById("totalItems");
    var totalItemsCompactSpan = document.getElementById("totalItemsCompact");

    var products = document.querySelectorAll(".product");
    var totalItems = products.length;
    totalItemsSpan.textContent = totalItems;
    totalItemsCompactSpan.textContent = totalItems > 9 ? '9+' : totalItems;
}

function updateCustomScrollbar() {
    var productListContainer = document.getElementById("productListContainer");
    var customScrollbar = document.getElementById("customScrollbar");
    var productList = document.getElementById("productList");

    var scrollHeight = productList.scrollHeight;
    var clientHeight = productList.clientHeight;
    var scrollTop = productList.scrollTop;

    if (scrollHeight > clientHeight) {
        customScrollbar.style.display = 'block';
        var scrollbarHeight = (clientHeight / scrollHeight) * 100;
        var scrollbarTop = (scrollTop / scrollHeight) * 100;
        customScrollbar.style.height = scrollbarHeight + '%';
        customScrollbar.style.top = scrollbarTop + '%';
    } else {
        customScrollbar.style.display = 'none';
    }
}

// Save the cart state to local storage
function saveCart() {
    var products = [];
    document.querySelectorAll('.product').forEach(product => {
        var productName = product.querySelector('h3').textContent;
        var productPrice = parseFloat(product.querySelector('.product-price').textContent.replace('Price: $', ''));
        products.push({ name: productName, price: productPrice });
    });

    localStorage.setItem('cart', JSON.stringify({
        products: products,
        totalPrice: totalPrice
    }));
}

// Load the cart state from local storage
function loadCart() {
    var cart = JSON.parse(localStorage.getItem('cart'));
    if (cart) {
        cart.products.forEach(item => {
            addToBasket(item.name, item.price);
        });
        totalPrice = cart.totalPrice;
        updateTotalPrice(0); // To update the total price display
        updateTotalItems(); // To update the total items display
    }
}



document.getElementById("productList").addEventListener('scroll', updateCustomScrollbar);


function sortElements() {
    var container = document.getElementById("container");
    var elements = container.children;
    
    var sortedElements = Array.from(elements).sort((a, b) => {
        var idA = parseInt(a.id.split("-")[1]);
        var idB = parseInt(b.id.split("-")[1]);
        return idA - idB;
    });
    
    // Reorder the elements in the container
    sortedElements.forEach(element => {
        container.appendChild(element);
    });
}
const data = [
    "Nintendo Gameboy Advanced SP",
    "Nintendo DS Lite",
    "New Nintendo 3DS",
    "New Nintendo 3DS XL",
    "New Nintendo 2DS XL",
    "Nintendo Wii",
    "Nintendo Wii U",
    "Nintendo Gamecube",
    "Nintendo N64",
    "Nintendo SNES",
    "Nintendo NES",
    "PlayStation Portal",
    "PlayStation 5",
    "PlayStation 4",
    "PlayStation 3",
    "PlayStation 2",
    "PlayStation Classic",
    "PlayStation Portable",
    "PlayStation Vita",
    "Xbox Original",
    "Xbox 360",
    "Xbox One",
    "Xbox One S",
    "Xbox One X",
    "Joy-Con",
    "Switch Pro Controller",
    "Xbox Series S/X Controller",
    "Xbox Elite Series 2",
    "DualShock",
    "DualShock 2",
    "DualShock 3",
    "DualShock 4",
    "DualSense Edge",
    "DualSense 5",
    "NES Controller",
    "SNES Controller",
    "N64 Controller",
    "Gamecube Controller",
    "Wii Remote",
    "Wii U GamePad",
    "Wii U Pro Controller",
    "Xbox Original Controller",
    "Xbox 360 Controller",
    "Xbox One Controller",
    "Xbox One S/X Controller",
    "Nintendo Switch Oled",
    "Nintendo Switch Lite",
    "Nintendo Switch Rev.2",
    "Xbox Series S",
    "Xbox Series X"
];

const searchInput = document.getElementById("searchInput");
const searchResultsContainer = document.getElementById("searchResultsContainer");
const searchResults = document.getElementById("searchResults");

// Function to perform search and display results
function search() {
    const searchTerm = searchInput.value.toLowerCase();
    
    if (searchTerm.trim() === "") {
        clearResults();
        return;
    }
    
    const filteredData = data.filter(item => item.toLowerCase().includes(searchTerm));
    displayResults(filteredData);
}

// Function to clear search results
function clearResults() {
    searchResults.innerHTML = "";
    searchResultsContainer.style.display = 'none';
}

// Function to display search results
function displayResults(results) {
    searchResults.innerHTML = "";

    if (results.length === 0) {
        const listItem = document.createElement("li");
        listItem.textContent = "No results found";
        searchResults.appendChild(listItem);
    } else {
        results.forEach(result => {
            const listItem = document.createElement("li");
            listItem.textContent = result;
            searchResults.appendChild(listItem);
        });
    }

    searchResultsContainer.style.display = results.length === 0 ? 'none' : 'block';
}

// Event listener for search input
searchInput.addEventListener("input", search);

// Show search results when the search input is clicked
searchInput.addEventListener("focus", () => {
    if (searchResults.innerHTML.trim() !== "") {
        searchResultsContainer.style.display = 'block';
    }
});

// Hide search results when clicking outside
document.addEventListener("click", (event) => {
    if (!searchResultsContainer.contains(event.target) && !searchInput.contains(event.target)) {
        searchResultsContainer.style.display = 'none';
    }
});

// Prevent hiding search results when clicking inside the container
searchResultsContainer.addEventListener("click", (event) => {
    event.stopPropagation();
});
