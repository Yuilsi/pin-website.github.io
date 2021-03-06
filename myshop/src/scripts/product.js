import { db, auth } from "./app";
import { onAuthStateChanged } from "firebase/auth";
import { getProduct } from "./functions/getProduct";
import { getFirebaseCart, createFirebaseCart } from "./functions/cart";
import { getMyLocalCart, addProductToCart, currencyFormat } from "../utils";

const productInfoSection = document.getElementById("productInfo");
const productAssetsSection = document.getElementById("productAssets");

let userLogged = undefined;
let products = [];
let cart = [];

function getParam(param) {
    const url = window.location.search;
    const searchParams = new URLSearchParams(url);
    const productId = searchParams.get(param);
    return productId;
}

async function loadProduct() {
    const productId = getParam("id"); // http://localhost:1234/product.html?id=TXQ9Wf1GIoAOJLkIEMYo&age=20

    const data = await getProduct(productId);

    const product = {
        ...data,
        id: productId, // docSnap.id,
    }

    renderProduct(product);
}

function renderProduct(product) {
    productAssetsSection.innerHTML = `
    <img class="product__mainImage" id="mainImage" src="${product.images[0]}">`;

    const isProductAddedToCart = cart.some((productCart) => productCart.id === product.id);

    productInfoSection.innerHTML = `
    <h1 class="product__name">${product.name}</h1>
    <h2 class="product__category">${product.category}</h2>
    <p class="product__description">${product.description}</p>
    <h3 class="product__price">${currencyFormat(product.price)}</h3> 
    <button class="product__cart">Añadir al carrito</button>`;

    if (product.images.length > 1) {
        createGallery(product.images);
    }

    const productCartButton = document.querySelector(".product__cart");
    productCartButton.addEventListener("click",async (e)=> {
        e.preventDefault(); // evitar que al dar click en el boton, funcione el enlace del padre.
        const currentProductIsAdded = cart.find(product => product.id === product.id);


        const productToAdd = {
            ...product,
            counter: (currentProductIsAdded) ? currentProductIsAdded.counter + 1 : 1,
        }

        if (currentProductIsAdded) {
            const indexElement = cart.findIndex(product => product.id === product.id);
            cart[indexElement] = productToAdd;
        } else {
            cart.push(productToAdd);
        }
      
      
      
        addProductToCart(cart);

        if (userLogged) {
            productCartButton.innerHTML = "producto Añadido";
            productCartButton.disabled = true ;
            setTimeout(()=> {
                productCartButton.innerHTML= "Agregar al carrito";
                productCartButton.disabled =false;
            }, 100);
            createFirebaseCart(db, userLogged.uid, cart);
        }

      //  productCartButton.setAttribute("disabled", true);
      //  productCartButton.innerText = "Producto añadido";
    });
}

function createGallery(images) {
    const mainImage = document.getElementById("mainImage");

    const gallery = document.createElement("div");
    gallery.className = "product__gallery";

    images.forEach(image => {
        gallery.innerHTML += `<img src="${image}">`;
    });

    productAssetsSection.appendChild(gallery);

    const galleryImages = document.querySelector(".product__gallery");

    galleryImages.addEventListener("click", e => {
        if (e.target.tagName === "IMG") {
            mainImage.setAttribute("src", e.target.currentSrc);
        }
    });
}

onAuthStateChanged(auth, async (user) => {
    if (user) {
      // User is signed in, see docs for a list of available properties
      // https://firebase.google.com/docs/reference/js/firebase.User
      userLogged = user;
      cart = await getFirebaseCart(db, userLogged.uid);
      console.log(cart);
      // ...
    } else {
        cart = getMyLocalCart();
      // User is signed out
      // ...
    }

    loadProduct();

  });