var e="undefined"!=typeof globalThis?globalThis:"undefined"!=typeof self?self:"undefined"!=typeof window?window:"undefined"!=typeof global?global:{},t={},n={},o=e.parcelRequirede3a;null==o&&((o=function(e){if(e in t)return t[e].exports;if(e in n){var o=n[e];delete n[e];var r={id:e,exports:{}};return t[e]=r,o.call(r.exports,r,r.exports),r.exports}var a=new Error("Cannot find module '"+e+"'");throw a.code="MODULE_NOT_FOUND",a}).register=function(e,t){n[e]=t},e.parcelRequirede3a=o);var r=o("li1Mx"),a=o("1tHc5"),c=o("hMt9z"),i=o("2EF88");i=o("2EF88");const l=document.getElementById("cart"),d=document.getElementById("totalSection"),u=document.getElementById("checkoutBtn");let s,f=[];function p(e){let t=0;e.forEach((e=>{!function(e){const t=document.createElement("li");t.className="product",t.innerHTML=`\n    <img src="${e.images[0]}" class="product__image">\n   \n    <h2 class="product__name">${e.name}</h2>\n    <h3 class="product__price">${i.currencyFormat(e.price)}</h3>\n    \n    <h3 class="cart__info"> ${e.counter}</h3>\n    <div>\n    \n    <button class="product__delete">Eliminar</button>\n </div>\n    `,l.appendChild(t),t.addEventListener("click",(t=>{"BUTTON"===t.target.tagName&&(console.log("remove it!"),async function(e){const t=f.filter((t=>t.id!==e));f=t,s&&await c.createFirebaseCart(r.db,s.uid,t);i.addProductToCart(t),l.innerHTML="",p(t)}(e.id))}))}(e),t+=parseInt(e.price)*e.counter})),d.innerText=i.currencyFormat(t)}console.log("estoy"),u.addEventListener("click",(e=>{e.preventDefault(),null==s?alert("Login to continue to checkout"):window.location.href="./checkout.html"})),a.onAuthStateChanged(r.auth,(async e=>{e?(s=e,f=await c.getFirebaseCart(r.db,s.uid)):f=i.getMyLocalCart(),p(f)}));
//# sourceMappingURL=cart.d7ec9313.js.map