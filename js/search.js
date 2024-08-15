// console.log((JSON.parse(localStorage.getItem("search"))).length);
if ((JSON.parse(localStorage.getItem("search"))).length) {
  const productSearch = JSON.parse(localStorage.getItem("search"));
  var htmls = productSearch.map(item => {
    return `
    <li>
      <div class="item col-md-4 col-sm-6 col-xs-6">
        <div class="product-block ">
            <div class="image"> <a href="#"><img class="img-responsive" title="T-shirt" alt="T-shirt" src=${item.img}></a> </div>
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
  var html = htmls.join('');
  document.getElementById("items-js").innerHTML = html;
  document.querySelector(".pagination-bar").style.display = "block";

}
else {
  const div1 = document.createElement("div");
  const div2 = document.createElement("div");
  div2.innerHTML = "Không tìm thấy sản phẩm phù hợp !";
  div2.style.fontSize = "18px";
  div2.style.color = "#6C6D70";
  div2.style.textAlign = "center";
  div1.innerHTML = `<img style="width: 500px" src="https://img.freepik.com/free-vector/error-404-concept-illustration_114360-1811.jpg?size=626&ext=jpg&ga=GA1.1.867537814.1697468205&semt=ais" alt="" />`;
  div1.style.textAlign = "center";
  div1.style.marginTop = "16px";
  document.getElementById("items-js").appendChild(div2);
  document.getElementById("items-js").appendChild(div1);
  document.querySelector(".pagination-bar").style.display = "none";x
}