let cart = [];

function addToCart(productName, productPrice) {
    const cleanPrice = parseFloat(productPrice.toString().replace(/,/g, '')); // Remove commas and parse as a number
    cart.push({ name: productName, price: cleanPrice });
    localStorage.setItem("cart", JSON.stringify(cart));
    updateCart();
    alert(`${productName} has been added to your cart!`);
}

function updateCart() {
    const cartItemsDiv = document.getElementById("cart-items");
    const totalPriceElem = document.getElementById("total-price");
    cartItemsDiv.innerHTML = "";
    const storedCart = localStorage.getItem("cart");
    if (storedCart) {
        cart = JSON.parse(storedCart);
    }
    let total = 0;
    cart.forEach((item, index) => {
        total += item.price;
        const cartItemDiv = document.createElement("div");
        cartItemDiv.classList.add("cart-item");
        cartItemDiv.innerHTML = `
            <span>${item.name}</span>
            <span>₱${item.price.toLocaleString()}</span>
            <button onclick="removeFromCart(${index})">Remove</button>
        `;
        cartItemsDiv.appendChild(cartItemDiv);
    });
    totalPriceElem.innerText = `Total: ₱${total.toLocaleString()}`;
}

function removeFromCart(index) {
    cart.splice(index, 1);
    localStorage.setItem("cart", JSON.stringify(cart));
    updateCart();
}

document.getElementById("checkout-button").addEventListener("click", () => {
    if (cart.length === 0) {
        alert("Your cart is empty!");
        return;
    }
    const confirmed = confirm("Are you sure you want to check out?");
    if (confirmed) {
        alert("Thank you for your purchase!");
        cart = [];
        localStorage.setItem("cart", JSON.stringify(cart));
        updateCart();
    }
});

updateCart();
