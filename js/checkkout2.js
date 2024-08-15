const productsBuy = document.querySelector('.js-product-buy');
// console.log(productInCart);
const totalProductsBuy = productInCart.reduce((total, item) => total + (item.quantity * item.price), 0);
let productsBuyToHTML = productInCart.map(item => {
  return `
    <div class="row" style="margin-bottom: 4px;">
      <div class="col-lg-3 col-md-3 col-sm-3">${item.name}</div>
      <div class="col-lg-3 col-md-3 col-sm-3">${toMoney(item.price)}</div>
      <div style="padding-left: 44px" class="col-lg-3 col-md-3 col-sm-3">${item.quantity}</div>
      <div class="col-lg-3 col-md-3 col-sm-3">${toMoney(item.price * item.quantity)}</div>
    </div>
  ` 
})
productsBuyToHTML = productsBuyToHTML.join('');
productsBuyToHTML += `<div class="col-md-9 col-sm-9">&nbsp;</div><div  class="col-lg-3 col-md-3 col-sm-3">Tổng tiền: ${toMoney(totalProductsBuy)} </div>`
productsBuy.innerHTML = productsBuyToHTML;


const priceTransport = 20000;
function onLoad() {
if (totalProductsBuy < 500000 && totalProductsBuy > 0) {
  document.getElementById('transportPay').innerText = toMoney(priceTransport);
}
else if (totalProductsBuy == 0) {
  document.getElementById('transportPay').innerText = "0 VND";
}
else {
  document.getElementById('transportPay').innerText = "Miễn phí vận chuyển";
}
}
window.onload = onLoad;
document.getElementById("btnPay").onclick = (e) => {
  e.preventDefault();
  alert("Đặt hàng thành công");
}