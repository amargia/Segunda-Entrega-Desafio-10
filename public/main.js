const renderCounter = () => {
    const counter = document.getElementById("counter");
    const cartId = document.getElementById("cartId").innerHTML;
    const url = `/cart/${cartId}/productos`;

    fetch(url)
        .then((response) => response.json())
        .then((data) => {
            counter.innerHTML = `<p>${res.length}</p>`;
            cartContainer.appendChild(counter);
        })
        .catch((err) => console.log(err));
};
    
renderCounter();

// Add products to cart
const addProduct = async (cartId, productId) => {
    const url = `/cart/${cartId}/productos/${productId}`;
    fetch(url, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        })
        .then((res) => res.json())
        .then((data) => {
            alert("Producto agregado al carrito");
            renderCounter();
            console.log(data);
        })
        .catch((err) => console.log(err));
};

// Render products
const renderProducts = (products) => {
    const productsContainer = document.getElementById("productsContainer");
    const cartId = document.getElementById("cartId").textContent;
    productsContainer.innerHTML = "";
    products.forEach((product) => {
        const productCard = document.createElement("div");
        productCard.className = "productCard";
        productCard.innerHTML = `
            <img src="${product.imagen}" alt="${product.nombre}">
            <h3>${product.nombre}</h3>
            <p>$${product.precio}</p>
            <button id="addProduct" class="btn btn-primary" onclick="addProduct(${cartId}, ${product.id})">Agregar al carrito</button>
        `;
        productsContainer.appendChild(productCard);
    }
    );
};

const url = "/productos";
fetch(url)
    .then((response) => response.json())
    .then((data) => {
        renderProducts(data);
    }
    )
    .catch((err) => console.log(err));

// Search filter
const searchFilter =document.getElementById("searchFilter");
searchFilter.addEventListener("keyup", (e) => {
    const url = "/productos";
    fetch(url)
        .then((response) => response.json())
        .then((data) => {
            const searchValue = e.target.value.toLowerCase();
            const filteredProducts = data.filter((product) => {
                return product.nombre.toLowerCase().includes(searchValue);
            });
            renderProducts(filteredProducts);
        }
        )
        .catch((err) => console.log(err));
});