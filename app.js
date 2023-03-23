//?=======================================================Обьект с продуктами===============================================================//

const menuItems = [
  {
    name: "French Fries with Ketchup",
    price: 2.23,
    image: "./images/plate__french-fries.png",
    alt: "French Fries",
    count: 0,
  },
  {
    name: "Salmon and Vegetables",
    price: 5.12,
    image: "./images/plate__salmon-vegetables.png",
    alt: "Salmon and Vegetables",
    count: 0,
  },
  {
    name: "Spaghetti Meat Sauce",
    price: 7.82,
    image: "./images/plate__spaghetti-meat-sauce.png",
    alt: "Spaghetti with Meat Sauce",
    count: 0,
  },
  {
    name: "Bacon, Eggs, and Toast",
    price: 5.99,
    image: "./images/plate__bacon-eggs.png",
    alt: "Bacon, Eggs, and Toast",
    count: 0,
  },
  {
    name: "Chicken Salad with Parmesan",
    price: 6.98,
    image: "./images/plate__chicken-salad.png",
    alt: "Chicken Salad with Parmesan",
    count: 0,
  },
  {
    name: "Fish Sticks and Fries",
    price: 6.34,
    image: "./images/plate__fish-sticks-fries.png",
    alt: "Fish Sticks and Fries",
    count: 0,
  },
];

//?=======================================================Отображение продуктов из обьекта===============================================================//

const menu = document.querySelector(".menu");

function renderElements() {
  menuItems.forEach((item) => {
    menu.innerHTML += `
        <li>
        <div class="plate">
          <img src="${item.image}" alt="French Fries" class="plate" />
        </div>
        <div class="content">
          <p class="menu-item">${item.name}</p>
          <p class="price">$${item.price}</p>
          <button class="add">
          
           Add to cart
          </button>
        </div>
      </li>
        `;
  });
}

renderElements();

//?==================================================Добавить товар в корзину и Изменение цвета кнопки===============================================================//

const addToCartBtn = document.querySelectorAll(".add");

addToCartBtn.forEach((btn) => {
  btn.addEventListener("click", addToCartOnClick);
});


addToCartBtn.forEach((btn) => {
  btn.addEventListener("click", () => {
    btn.classList.add("in-cart");
    btn.innerHTML = "In Cart";
    const img = document.createElement("img");
    img.src = "images/check.svg";
    btn.prepend(img);
  });
});

addToCartBtn.forEach((btn) => {
    btn.addEventListener("click", updateTotalSum);
  });



function addToCartOnClick(event) {
  target = event.target;
  let shopItem = target.parentElement.parentElement;
  let title = shopItem.querySelectorAll(".menu-item")[0].innerText;
  let price = shopItem.querySelectorAll(".price")[0].innerText;
  let img = shopItem.querySelectorAll(".plate img")[0].src;
  addProductToCart(title, price, img,);
}

function addProductToCart(title, price, img) {
  const cartWindow = document.querySelector(".cart-summary");
  const cartContent = `

    <div class="plate item">
      <img src="${img}" alt="Fish Sticks and Fries" class="plate" />
      <div class="quantity">1</div>
    </div>
    <div class="content">
      <p class="menu-item">${title}</p>
      <p class="price">${price}</p>
    </div>
    <div class="quantity__wrapper">
      <button class="decrease">
        <img src="images/chevron.svg" />
      </button>
      <div class="quantity">${Number(1)}</div>
      <button class="increase plus">
        <img src="images/chevron.svg" />
      </button>
    </div>
    <div class="subtotal">
      ${price}
    </div>
  
    `;

  let cartRow = document.createElement("li");
  cartRow.innerHTML = cartContent;
  cartWindow.append(cartRow);
  cartRow.querySelector(".plate").addEventListener("click", removeElement)
  cartRow.querySelectorAll(".increase")[0].addEventListener("click", function(event) {
    let target = event.target
    let parentRow = target.parentElement.parentElement.parentElement
    let amount = parentRow.querySelectorAll(".quantity")
    amount.forEach(item => {
        item.innerText++
        updateTotalSum()
    })
  
  })
  cartRow.querySelectorAll(".decrease")[0].addEventListener("click", function(event) {
    let target = event.target
    let parentRow = target.parentElement.parentElement.parentElement
    let amount = parentRow.querySelectorAll(".quantity")
    amount.forEach(item => {
        item.innerText--
        updateTotalSum()
    })
  
  })
}



//?=======================================================Удалить продукт из корзины===============================================================//

const removeBtn = document.querySelectorAll(".item");

removeBtn.forEach((btn) => {
  btn.addEventListener("click", removeElement);
});

function removeElement(event) {
  event.target.parentElement.parentElement.remove();
  updateTotalSum()

}


//?========================================================Обновить общую сумму корзины===============================================================//


function updateTotalSum() {
    let cartItemContainer = document.querySelectorAll(".cart-summary")[0]
    let cartItemRow = cartItemContainer.querySelectorAll("li")
    let total = 0;
    let totalSum = 0;
    
    cartItemRow.forEach(item => {
    let priceElement = item.querySelectorAll(".subtotal")[0]
    let quantityElement = item.querySelectorAll(".quantity")[0]
    let price = parseFloat(priceElement.innerHTML.replace('$', "")) 
    let quantity = parseFloat(quantityElement.innerHTML)

    total = total + (price * quantity)
    totalSum = total + 1.05
    })
    
    total = Math.round(total * 100) / 100
    document.querySelectorAll('.amount')[0].innerText = `$ ${total}` 


  
    totalSum = Math.round(totalSum * 100) / 100
    document.querySelectorAll('.totalSum')[0].innerText = `$ ${totalSum}` 
}






//?============================================Увеличить или уменьшить количество продуктов из корзины===============================================================//


let increaseBtns = document.querySelectorAll(".increase")
let decreaseBtns = document.querySelectorAll(".decrease")


// function increase() {
//     increaseBtns.forEach(increaseBtn => {
//         increaseBtn.addEventListener("click", (event) => {
//          let target = event.target
//          let parentCartRow = target.parentElement.parentElement
//           let quantity = parentCartRow.querySelectorAll(".quantity")
//           quantity.forEach(item => {
//             item.innerHTML++
//             updateTotalSum()
//           })
//         })
//     })
    
// }


// function decrease() {
//     decreaseBtns.forEach(decreaseBtn => {
//         decreaseBtn.addEventListener("click", () => {
//           let quantity = document.querySelectorAll(".quantity")
//           quantity.forEach(item => {
//            item.innerHTML--
//             updateTotalSum()
//           })
//         })
//     })
    
// }

// decrease()