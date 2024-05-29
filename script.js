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
let promoCodes = {
    "WEREOPEN": 20,       // 20% discount
    "YOUFOUNDME!": 10,    // 10% discount
    "RZRPLAY": 99         // 99% discount
};
let appliedPromo = null;

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

    let finalPrice = totalPrice;
    if (appliedPromo && promoCodes[appliedPromo]) {
        let discount = promoCodes[appliedPromo];
        finalPrice = totalPrice - (totalPrice * discount / 100);
    }

    var totalPriceSpan = document.getElementById("totalPrice");
    totalPriceSpan.textContent = finalPrice.toFixed(2);
}

function updateTotalItems() {
    var totalItemsSpan = document.getElementById("totalItems");
    var totalItemsCompactSpan = document.getElementById("totalItemsCompact");

    var products = document.querySelectorAll(".product");
    var totalItems = products.length;
    totalItemsSpan.textContent = totalItems;
    totalItemsCompactSpan.textContent = totalItems > 9 ? '9+' : totalItems;

    if (totalItems === 0) {
        document.getElementById("cart").classList.add("hidden");
    }
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

function applyPromoCode() {
    let promoCodeInput = document.getElementById("promoCodeInput").value.trim().toUpperCase();
    let messageElement = document.getElementById("promoCodeMessage");

    if (promoCodes[promoCodeInput]) {
        appliedPromo = promoCodeInput;
        messageElement.textContent = `Promo code applied: ${promoCodeInput}`;
        updateTotalPrice(0);  // Recalculate the total price with the promo code
    } else {
        messageElement.textContent = "Invalid promo code";
        appliedPromo = null;
    }
    saveCart();
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
        totalPrice: totalPrice,
        appliedPromo: appliedPromo
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
        appliedPromo = cart.appliedPromo;
        if (appliedPromo) {
            document.getElementById("promoCodeInput").value = appliedPromo;
            document.getElementById("promoCodeMessage").textContent = `Promo code applied: ${appliedPromo}`;
        }
        updateTotalPrice(0);  // To update the total price display
        updateTotalItems();   // To update the total items display
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
    { name: "Nintendo Switch Oled", id: "nso" },
    { name: "Nintendo Switch Lite", id: "nsl" },
    { name: "Nintendo Switch Rev.2", id: "nsr2" },
    { name: "Xbox Series S", id: "xbss" },
    { name: "Xbox Series X", id: "xbsx" },
    { name: "PlayStation 5", id: "ps5" },
    { name: "Nintendo Gameboy Advanced SP", id: "gba" },
    { name: "Nintendo DS Lite", id: "dsl" },
    { name: "Nintendo 3DS", id: "3ds" },
    { name: "New Nintendo 3DS XL", id: "3dsxl" },
    { name: "New Nintendo 2DS XL", id: "2dsxl" },
    { name: "Nintendo Wii", id: "wii" },
    { name: "Nintendo Wii U", id: "wiiu" },
    { name: "Nintendo Gamecube", id: "gcn" },
    { name: "Nintendo N64", id: "n64" },
    { name: "Nintendo SNES", id: "snes" },
    { name: "Nintendo NES", id: "nes" },
    { name: "PlayStation 4", id: "ps4" },
    { name: "PlayStation 3", id: "ps3" },
    { name: "PlayStation 2", id: "ps2" },
    { name: "PlayStation 1", id: "ps1" },
    { name: "PlayStation Portable", id: "psp" },
    { name: "PlayStation Vita", id: "psv" },
    { name: "Xbox Original", id: "xbox" },
    { name: "Xbox 360", id: "xb360" },
    { name: "Xbox One", id: "xbone" },
    { name: "Xbox One S", id: "xbones" },
    { name: "Xbox One X", id: "xbonex" },
    { name: "DualSense Edge", id: "dsedge" },
    { name: "DualSense 5", id: "dsense" },
    { name: "PlayStation Portal", id: "psportal" },
    { name: "Joy-Con", id: "jcon" },
    { name: "Switch Pro Controller", id: "swpcont" },
    { name: "Xbox Series S/X Controller", id: "xbscont" },
    { name: "Xbox Elite Series 2", id: "xbe2" },
    { name: "DualShock 1", id: "dshock1" },
    { name: "DualShock 2", id: "dshock2" },
    { name: "DualShock 3", id: "dshock3" },
    { name: "DualShock 4", id: "dshock4" },
    { name: "NES Controller", id: "nescont" },
    { name: "SNES Controller", id: "snescont" },
    { name: "N64 Controller", id: "n64cont" },
    { name: "Gamecube Controller", id: "gcncont" },
    { name: "Wii Remote", id: "wiirem" },
    { name: "Wii U Pro Controller", id: "wiiupcont" },
    { name: "Xbox Original Controller", id: "xboxcont" },
    { name: "Xbox 360 Controller", id: "xb360cont" },
    { name: "Xbox One Controller", id: "xbonecont" },
    { name: "Xbox One S/X Controller", id: "xbonescont" }
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

    const filteredData = data.filter(item => item.name.toLowerCase().includes(searchTerm));
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
            const link = document.createElement("a");
            link.href = `catalog.html#${result.id}`;
            link.textContent = result.name;
            listItem.appendChild(link);
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