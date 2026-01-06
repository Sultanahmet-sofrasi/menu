/* MENÜ */
const menuData = [
  { cat:"Çorbalar", name:"Mercimek Çorbası", price:100 },
  { cat:"Çorbalar", name:"Kelle Çorbası", price:150 },

  { cat:"Izgara Çeşitleri", name:"Sultanahmet Köfte Porsiyon", price:400 },
  { cat:"Izgara Çeşitleri", name:"Sultanahmet Köfte Ekmek Arası", price:350 },
  { cat:"Izgara Çeşitleri", name:"Tavuk Şiş Porsiyon", price:250 },
  { cat:"Izgara Çeşitleri", name:"Tavuk Şiş Dürüm", price:225 },
  { cat:"Izgara Çeşitleri", name:"Tavuk Kanat Porsiyon", price:250 },
  { cat:"Izgara Çeşitleri", name:"Izgarada Balık Porsiyon", price:300 },

  { cat:"Lahmacun ve Pideler", name:"Lahmacun", price:100 },
  { cat:"Lahmacun ve Pideler", name:"Karışık Pide", price:300 },
  { cat:"Lahmacun ve Pideler", name:"Kıymalı Pide", price:250 },
  { cat:"Lahmacun ve Pideler", name:"Kıymalı Kaşarlı Pide", price:250 },
  { cat:"Lahmacun ve Pideler", name:"Pizza", price:200 },

  { cat:"Tatlılar ve Çiğ Köfte", name:"Sütlaç", price:130 },
  { cat:"Tatlılar ve Çiğ Köfte", name:"Kabak Tatlısı", price:120 },
  { cat:"Tatlılar ve Çiğ Köfte", name:"Pasta Çeşitleri (Dilim)", price:100 },
  { cat:"Tatlılar ve Çiğ Köfte", name:"Çiğ Köfte (Porsiyon)", price:100 },

  { cat:"İçecekler", name:"Yayık Ayran", price:35 },
  { cat:"İçecekler", name:"Limonata", price:30 },
  { cat:"İçecekler", name:"Osmanlı Şerbeti", price:30 },
  { cat:"İçecekler", name:"Elvan Gazoz", price:35 }
];

let cart = [];

document.addEventListener("DOMContentLoaded", () => {
  const menu = document.getElementById("menu");
  let currentCat = "";
  let grid;

  menuData.forEach((item, i) => {

    if(item.cat !== currentCat){
      currentCat = item.cat;

      const h = document.createElement("h2");
      h.className = "cat";
      h.innerText = currentCat;
      h.onclick = () => grid.classList.toggle("hide");
      menu.appendChild(h);

      grid = document.createElement("div");
      grid.className = "menu-grid";
      menu.appendChild(grid);
    }

    grid.innerHTML += `
      <div class="menu-item" id="item-${i}">
        <div class="menu-top">
          <div class="menu-name">${item.name}</div>
          <div class="menu-price">${item.price} TL</div>
        </div>

        <div class="qty-box">
          <button onclick="changeQty(${i}, -1)">−</button>
          <span id="qty-${i}">0</span>
          <button onclick="changeQty(${i}, 1)">+</button>
        </div>
      </div>
    `;
  });
});

/* ➕➖ ADET */
function changeQty(index, delta){
  const item = menuData[index];
  let found = cart.find(p => p.name === item.name);

  if(!found && delta > 0){
    cart.push({ name:item.name, price:item.price, qty:1 });
    found = cart.find(p => p.name === item.name);
  }
  else if(found){
    found.qty += delta;
    if(found.qty <= 0){
      cart = cart.filter(p => p.name !== item.name);
      found = null;
    }
  }

  document.getElementById("qty-" + index).innerText = found ? found.qty : 0;

  const card = document.getElementById("item-" + index);
  found ? card.classList.add("selected") : card.classList.remove("selected");

  renderCart();
}

/* 🤍 DESTEK */
function addSupport(){
  let found = cart.find(p => p.name === "Talebe İkram Bedeli");
  if(found) found.qty++;
  else cart.push({ name:"Talebe İkram Bedeli", price:250, qty:1 });
  renderCart();
}

/* 🧺 SEPET – SADE ÖZET */
function renderCart(){
  const box = document.getElementById("cart");
  let total = 0;
  let count = 0;

  cart.forEach(p => {
    total += p.price * p.qty;
    count += p.qty;
  });

  box.innerHTML = `<p>${count} ürün seçildi</p>`;
  document.getElementById("total").innerText = total;
}

/* 📤 GÖNDER */
function sendOrder(){
  const person = personName.value.trim();
  const table = tableNo.value;
  const note = orderNote.value.trim();

  if(!person) return alert("Siparişi giren kişi zorunlu");
  if(!table) return alert("Masa seçiniz");
  if(cart.length === 0) return alert("Sepet boş");

  f_table.value = table;
  f_person.value = person;
  f_foods.value = cart.filter(p=>p.name!=="Talebe İkram Bedeli")
    .map(p=>`${p.name} (${p.qty})`).join(", ");
  f_note.value = note || "-";

  const support = cart.find(p=>p.name==="Talebe İkram Bedeli");
  f_support.value = support ? support.qty*250+" TL" : "-";
  f_total.value = total.innerText + " TL";

  orderForm.submit();

  cart = [];
  renderCart();
  document.querySelectorAll("[id^='qty-']").forEach(e=>e.innerText="0");
  document.querySelectorAll(".menu-item").forEach(e=>e.classList.remove("selected"));
  msg.innerText = "Sipariş alındı. Ödeme kasada.";
}
