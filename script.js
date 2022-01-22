if (document.readyState == "loading") {
  document.addEventListener('DOMContentLoaded', ready);
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
  let quantityInputs = document.getElementsByClassName('cart-quantity-input')
  for (let i = 0; i < quantityInputs.length; i++) {
      let input = quantityInputs[i]
      input.addEventListener('change', quantityChanged)
  }
}

// remove Cart Items

function removeCartItem(e) {
  let buttonClicked = e.target;
  buttonClicked.parentElement.parentElement.remove();
  updateCartTotal();
}

// Update the Quantity

function quantityChanged(event){
    let input = event.target
    if(isNaN(input.value) || input.value <= 0){
        input.value = 1
    }
    updateCartTotal()
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
    total = total + (price * quantity);
    // console.log(priceElement, quantityElement)
  }
  total = Math.round(total * 100) /100
  document.getElementsByClassName("cart-total-price")[0].innerText = total = "$" + total;
}


