if (document.readyState == "loading") {
  document.addEventListener("DOMContentLoaded", ready);
} else {
  ready();
}

function ready() {
  const removeCartItemBtns = document.getElementsByClassName("btn-danger");

  // remove items from cart
  for (let i = 0; i < removeCartItemBtns.length; i++) {
    let button = removeCartItemBtns[i];
    button.addEventListener("click", removeCartItem);
  }
  let quantityInputs = document.getElementsByClassName("cart-quantity-input");
  for (let i = 0; i < quantityInputs.length; i++) {
    let input = quantityInputs[i];
    input.addEventListener("change", quantityChanged);
  }

  let addToCartBtns = document.getElementsByClassName("shop-item-btn");
  for (let i = 0; i < addToCartBtns.length; i++) {
    let button = addToCartBtns[i];
    button.addEventListener("click", addToCartClick);
  }
  document.getElementsByClassName('btn-purchase')[0].addEventListener('click', purchaseClicked)

}

function purchaseClicked(){
    alert('Thank you for your purchase')
    let cartItems = document.getElementsByClassName('cart-items')[0]
    while( cartItems.hasChildNodes()){
        cartItems.removeChild(cartItems.firstChild)
    }
    updateCartTotal()
}

// remove Cart Items

function removeCartItem(e) {
  let buttonClicked = e.target;
  buttonClicked.parentElement.parentElement.remove();
  updateCartTotal();
}

// Update the Quantity

function quantityChanged(event) {
  let input = event.target;
  if (isNaN(input.value) || input.value <= 0) {
    input.value = 1;
  }
  updateCartTotal();
}

function addToCartClick(e) {
  let button = e.target;
  let shopItem = button.parentElement.parentElement;
  let title = shopItem.getElementsByClassName("shop-item-title")[0].innerText;
  let price = shopItem.getElementsByClassName("shop-item-price")[0].innerText;
  let imageSrc = shopItem.getElementsByClassName("shop-item-image")[0].src;
  addItemToCart(title, price, imageSrc);
  updateCartTotal()
}

function addItemToCart(title, price, imageSrc) {
  let cartRow = document.createElement("div");
  cartRow.classList.add('cart-row');
  let cartItems = document.getElementsByClassName("cart-items")[0];
  let cartItemNames = cartItems.getElementsByClassName('cart-item-title')
  for (let i = 0; i < cartItemNames.length; i++){
      if (cartItemNames[i].innerText == title){
          alert('This item is already added to the cart')
          return
      }
  }
  let cartRowContent = `
    <div class="cart-item cart-column">
        <img
        src="${imageSrc}"
        alt="SoulFly Hoodie"
        class="cart-item-image"
        />
        <span class="cart-item-title">${title}</span>
    </div>
    <span class="cart-price cart-column">${price}</span>
    <div class="cart-quantity cart-column">
        <input type="number" value="1" class="cart-quantity-input" />
        <button role="button" class="btn btn-danger">REMOVE</button>
    </div>`;
    
  cartRow.innerHTML = cartRowContent 
  cartItems.append(cartRow);
  cartRow.getElementsByClassName('btn-danger')[0].addEventListener('click',removeCartItem)
  cartRow.getElementsByClassName('cart-quantity-input')[0].addEventListener('click', quantityChanged)
}

// Update the total

function updateCartTotal() {
  let cartItemContainer = document.getElementsByClassName("cart-items")[0];
  let cartRows = cartItemContainer.getElementsByClassName("cart-row");
  let total = 0;
  for (let i = 0; i < cartRows.length; i++) {
    let cartRow = cartRows[i];
    let priceElement = cartRow.getElementsByClassName("cart-price")[0];
    let quantityElement = cartRow.getElementsByClassName(
      "cart-quantity-input"
    )[0];
    let price = parseFloat(priceElement.innerText.replace("$", ""));
    let quantity = quantityElement.value;
    total = total + price * quantity;
    // console.log(priceElement, quantityElement)
  }
  total = Math.round(total * 100) / 100;
  document.getElementsByClassName("cart-total-price")[0].innerText = total =
    "$" + total;
}
