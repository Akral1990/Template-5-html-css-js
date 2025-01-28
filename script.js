const bar = document.getElementById("bar");
const close = document.getElementById("close");
const nav = document.getElementById("navbar");

if (bar) {
  bar.addEventListener("click", () => {
    nav.classList.add("active");
  });
}
if (close) {
  close.addEventListener("click", () => {
    nav.classList.remove("active");
  });
}

document.addEventListener("DOMContentLoaded", () => {
  const cart = JSON.parse(localStorage.getItem("cart")) || [];

  const updateCartDisplay = () => {
    const cartDisplay = document.getElementById("cart-display");
    if (!cartDisplay) return;

    cartDisplay.innerHTML = "";
    cart.forEach((product) => {
      const item = document.createElement("div");
      item.className = "cart-item";
      item.innerHTML = `
              <span>${product.name}</span>
              <span>${product.price}</span>
          `;
      cartDisplay.appendChild(item);
    });
  };

  const addToCart = (productId, productName, productPrice) => {
    const product = { id: productId, name: productName, price: productPrice };
    cart.push(product);
    localStorage.setItem("cart", JSON.stringify(cart));
    updateCartDisplay();
  };

  document.querySelectorAll(".add-to-cart").forEach((button) => {
    button.addEventListener("click", (event) => {
      const productElement = event.target.closest(".pro");
      const productId = productElement.getAttribute("data-product-id");
      const productName =
        productElement.querySelector(".product-name").innerText;
      const productPrice =
        productElement.querySelector(".product-price").innerText;
      addToCart(productId, productName, productPrice);
    });
  });

  updateCartDisplay();
});
