const menuData = [

  /* ÇORBALAR */
  { cat:"Çorbalar", name:"Mercimek Çorbası", price:100 },
  { cat:"Çorbalar", name:"Kelle Çorbası", price:150 },

  /* IZGARA ÇEŞİTLERİ */
  { cat:"Izgara Çeşitleri", name:"Sultanahmet Köfte Porsiyon", price:400 },
  { cat:"Izgara Çeşitleri", name:"Sultanahmet Köfte Ekmek Arası", price:400 },
  { cat:"Izgara Çeşitleri", name:"Tavuk Şiş Porsiyon", price:250 },
  { cat:"Izgara Çeşitleri", name:"Tavuk Şiş Dürüm", price:225 },
  { cat:"Izgara Çeşitleri", name:"Tavuk Kanat Porsiyon", price:250 },
  { cat:"Izgara Çeşitleri", name:"Izgarada Balık Porsiyon", price:300 },

  /* LAHMACUN VE PİDELER */
  { cat:"Lahmacun ve Pideler", name:"Lahmacun", price:100 },
  { cat:"Lahmacun ve Pideler", name:"Karışık Pide", price:300 },
  { cat:"Lahmacun ve Pideler", name:"Kıymalı Pide", price:250 },
  { cat:"Lahmacun ve Pideler", name:"Kıymalı Kaşarlı Pide", price:250 },
  { cat:"Lahmacun ve Pideler", name:"Pizza", price:200 },

  /* TATLILAR VE ÇİĞ KÖFTE */
  { cat:"Tatlılar ve Çiğ Köfte", name:"Sütlaç", price:130 },
  { cat:"Tatlılar ve Çiğ Köfte", name:"Kabak Tatlısı", price:120 },
  { cat:"Tatlılar ve Çiğ Köfte", name:"Pasta Çeşitleri (Dilim)", price:100 },
  { cat:"Tatlılar ve Çiğ Köfte", name:"Çiğ Köfte (Porsiyon)", price:100 },

  /* İÇECEKLER */
  { cat:"İçecekler", name:"Yayık Ayran", price:35 },
  { cat:"İçecekler", name:"Limonata", price:30 },
  { cat:"İçecekler", name:"Osmanlı Şerbeti", price:30 },
  { cat:"İçecekler", name:"Elvan Gazoz", price:35 }

];


let cart = {};

document.addEventListener("DOMContentLoaded", () => {
  const menu = document.getElementById("menu");
  let currentCat = "";

  menuData.forEach((item, i) => {
    if(item.cat !== currentCat){
      currentCat = item.cat;
      menu.innerHTML += `
        <h2 class="cat" onclick="toggleCat(this)">
          ${currentCat} <span>▼</span>
        </h2>
        <div class="cat-body open"></div>
      `;
    }

    const body = menu.querySelector(".cat-body:last-child");
    body.innerHTML += `
      <div class="row">
        <div>
          <div class="name">${item.name}</div>
          <div class="price">${item.price} TL</div>
        </div>
        <div class="qty">
          <button onclick="changeQty(${i},-1)">−</button>
          <span id="q${i}">0</span>
          <button onclick="changeQty(${i},1)">+</button>
        </div>
      </div>
    `;
  });
});

function toggleCat(h){
  const body = h.nextElementSibling;
  body.classList.toggle("open");
}

function changeQty(i, d){
  const item = menuData[i];
  cart[item.name] = (cart[item.name] || 0) + d;
  if(cart[item.name] <= 0) delete cart[item.name];
  document.getElementById("q"+i).innerText = cart[item.name] || 0;
  renderTotal();
}

function renderTotal(){
  let t = 0;
  for(let k in cart){
    const p = menuData.find(x=>x.name===k);
    t += p.price * cart[k];
  }
  total.innerText = t;
}

function sendOrder(){
  const person = document.getElementById("personName").value.trim();
  const table = document.getElementById("tableNo").value;
  const note  = document.getElementById("orderNote").value.trim();
  const totalEl = document.getElementById("total");

  if(!person){
    alert("İsim gerekli");
    return;
  }

  if(!table){
    alert("Masa seçiniz");
    return;
  }

  if(Object.keys(cart).length === 0){
    alert("Sepet boş");
    return;
  }

  document.getElementById("f_person").value = person;
  document.getElementById("f_table").value  = table;
  document.getElementById("f_note").value   = note || "-";

  document.getElementById("f_foods").value =
    Object.entries(cart)
      .map(([name,qty]) => `${name} (${qty})`)
      .join(", ");

  document.getElementById("f_total").value =
    totalEl.innerText + " TL";

  document.getElementById("orderForm").submit();

  document.getElementById("msg").innerText =
    "Sipariş alındı. Ödeme kasada.";

  // 🔄 sıfırla
  cart = {};
  document.querySelectorAll("[id^='q']").forEach(e => e.innerText = "0");
  totalEl.innerText = "0";
}
