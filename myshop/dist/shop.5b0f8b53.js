var e="undefined"!=typeof globalThis?globalThis:"undefined"!=typeof self?self:"undefined"!=typeof window?window:"undefined"!=typeof global?global:{},t={},n={},r=e.parcelRequirede3a;null==r&&((r=function(e){if(e in t)return t[e].exports;if(e in n){var r=n[e];delete n[e];var a={id:e,exports:{}};return t[e]=a,r.call(a.exports,a,a.exports),a.exports}var c=new Error("Cannot find module '"+e+"'");throw c.code="MODULE_NOT_FOUND",c}).register=function(e,t){n[e]=t},e.parcelRequirede3a=r);var a=r("li1Mx"),c=r("1tHc5"),o=r("etBjH");var i=r("hMt9z"),d=r("2EF88");const s=document.getElementById("products"),l=document.getElementById("category"),u=document.getElementById("order");let p,f=[],g=[];async function m(){const e=await async function(e){const t=o.collection(e,"products");try{const{docs:e}=await o.getDocs(t);return e.map((e=>({...e.data(),id:e.id})))}catch(e){console.log(e)}}(a.db);s.innerHTML="",e.forEach((e=>{h(e)})),f=e}function h(e){const t=document.createElement("a");t.className="product",t.setAttribute("href",`./product.html?id=${e.id}`);const n=e.images?e.images[0]:"https://cdn1.iconfinder.com/data/icons/business-company-1/500/image-512.png";g.some((t=>t.id===e.id));t.innerHTML=`\n   \n    <img src="${n}" alt="" class="product__image">\n  \n    <div class="product__info">\n        <p class="product__category">${e.category}</p> \n        <h2 class="product__name">${e.name}</h2>\n        <h3 class="product__price">${d.currencyFormat(e.price)}</h3>\n        <button class="product__cart">Agregar al carrito</button>\n        </div>\n     \n    \n   \n    `,s.appendChild(t);const r=t.querySelector(".product__cart");r.addEventListener("click",(async t=>{t.preventDefault();const n=g.find((t=>t.id===e.id)),c={...e,counter:n?n.counter+1:1};if(n){const t=g.findIndex((t=>t.id===e.id));g[t]=c}else g.push(c);d.addProductToCart(g),p&&(r.innerHTML="producto Añadido",r.disabled=!0,setTimeout((()=>{r.innerHTML="Agregar al carrito",r.disabled=!1}),100),await i.createFirebaseCart(a.db,p.uid,g))}))}function y(){const e=l.value,t=u.value;let n=[];n=""!==e?f.filter((t=>t.category===e)):f,"asc"===t&&(n=n.sort(((e,t)=>t.price-e.price))),"desc"===t&&(n=n.sort(((e,t)=>e.price-t.price))),s.innerHTML="",n.forEach((e=>{h(e)}))}l.addEventListener("change",(e=>{y()})),u.addEventListener("change",(e=>{y()})),c.onAuthStateChanged(a.auth,(async e=>{e?(p=e,g=await i.getFirebaseCart(a.db,p.uid)):g=d.getMyLocalCart(),m()}));
//# sourceMappingURL=shop.5b0f8b53.js.map
