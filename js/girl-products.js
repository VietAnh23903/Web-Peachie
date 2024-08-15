const productsGirl = JSON.parse(localStorage.getItem('products')).filter(item => {
  if (item.sex == "female" ) return item;
});

const htmls = productsGirl.map(item => {
  return `
    <li>
      <div class="item col-md-4 col-sm-6 col-xs-6">
        <div class="product-block ">
            <div class="image"> <a href="#"><img class="img-responsive" alt="T-shirt" src=${item.img}></a> </div>
            <div class="product-details">
                <div class="product-name">
                  <h4><a href="#" style="color: rgb(202, 85, 104);">${item.name}</a></h4>
                </div>
                <div class="price"> <span class="price-old">${toMoney(item.priceFake)}</span> <span class="price-new">${toMoney(item.price)}</span> </div>
                <div class="product-hov">
                    <ul>
                      <li><button><i class="fa-regular fa-heart"></i></button></li>
                      <li><button onclick="addToCart(${item.id})" class="add-cart" href="#">Thêm vào giỏ hàng</button> </li>
                    </ul>
                    <div class="review"> <span class="rate"> <i class="fa fa-star rated"></i> <i class="fa fa-star rated"></i> <i class="fa fa-star rated"></i> <i class="fa fa-star rated"></i> <i class="fa fa-star"></i> </span> </div>
                </div>
            </div>
        </div>
      </div>
    </li>
  `
})
document.getElementById("items-js").innerHTML = htmls.join('');
function toMoney (value) {
  return value.toLocaleString('it-IT', { style: 'currency', currency: 'VND'})
}
