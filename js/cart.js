const jsToTalPrice = document.querySelectorAll('.js-total-price');
const priceTransport = 20000
// lấy ra mảng đã lưu trong localstorage
let productsCart = JSON.parse(localStorage.getItem('productsInCart'));
// lấy ra tổng tiền các item
let totalCart = 0;
if (productsCart == null ) {
  totalCart == 0;
}
else {
  totalCart = productsCart.reduce((total, item) => total + item.price * item.quantity, 0);
}

// conver to money
const toMoney1 = (value) => {
  // const money = value.toLocalString('it-IT', { style: 'currency', currency: 'VND' });
  return new Intl.NumberFormat('it-IT', { style: 'currency', currency: 'VND' }).format(value);
}

// convert money to number
const toNumber = (value) => {
  let arrStr = [];
  value = value.slice(0, -4);
  for (const item of value) {
    if (item != '.') arrStr.push(item);
  }
  return arrStr.join('');
}

// set tổng tiền tất cả phải thanh toán
function onLoad() {
  if (totalCart < 500000 && totalCart > 0) {
    document.getElementById('transport').innerText = toMoney1(priceTransport);
    jsToTalPrice[0].innerText = toMoney1(totalCart);
    jsToTalPrice[1].innerText = toMoney1(totalCart + 20000);
  }
  else if (totalCart == 0) {
    document.getElementById('transport').innerText = toMoney1(0);
    jsToTalPrice[0].innerText = toMoney1(totalCart);
    jsToTalPrice[1].innerText = toMoney1(totalCart);
  }
  else {
    document.getElementById('transport').innerText = "Miễn phí vận chuyển";
    jsToTalPrice[0].innerText = toMoney1(totalCart);
    jsToTalPrice[1].innerText = toMoney1(totalCart);
  }
  
}
window.onload = onLoad;

// render ra giao diện
// cách viết đúng khi dùng `` để render ra giao diện:
// onchange="changeQty(${index}, ${item.id})" với nhiều hơn 1 tham số
// onclick='addToCart(${item.id})' với 1 tham số
// mọi cách khác đều viết sai
var htmls = "";
if (productsCart != null) {
  htmls = productsCart.map((item, index) => {
    return `
      <tr class="Cartproduct">
        <td class="img" >
            <div style="width: 50%;"><img style="width: 100%;" class="thanhthuy1" alt="img" src=${item.img}></div>
            <p class="product-name" style="width: 50%;">
              ${item.name} <br />
              <span style="color: #ccc" >(Còn ${item.total} sản phẩm)</span>
            </p>
        </td>
        <td >
            <div>${toMoney1(item.price)}</div>
        </td>
        <td class="product-quantity">
            <div class="quantity">
                <input onchange="changeQty(${index}, ${item.id})" 
                      style="text-align: center; border: none; outline: none;" type="number"
                      class="input-text qty text a${index}" value=${item.quantity}
                      min="0" max="${item.total}" name="cart">
            </div>
        </td>
        <td  class="price js-price b${index} ">${toMoney1(item.price * item.quantity)}</td>
        <td id="${index}" class="delete"><button onclick="deleteCart(${item.id},${index})" class='delete-btn' title="Delete"> <i style="color: #666" class="glyphicon glyphicon-trash "></i></button></td>
    </tr>
    `
  })
  var html = htmls.join("");
}

document.getElementById('tbody').innerHTML = html;

// lấy ra các thẻ số tiền của từng sản phẩm 
const price = document.querySelectorAll('.js-price');

// xóa 1 phần tử bất kì trong mảng khi biết index (ở đây là i)
function deleteItem(arr, i) {
  // if (index == 0) return arr.slice(1);
  //  return arr.splice(0, index).concat(arr.slice(index));
  const newArr = arr.filter((item, index) => {
    if (index != i) return item;
  })
  return newArr;
}

// xóa 1 sản phẩm cả ở giao diện và ở trong localstorage. Nếu không xóa trong giao diện
// thì phải reload lại trang để cart.html lấy dữ liệu từ localstorage ra 
const deleteCart = (id, i) => {
  const isDelete = confirm("Bạn muốn xóa sản phẩm này không ?");
  if (isDelete) {
    // xóa ở giao diện cart
    // tìm ra thẻ cha của thẻ đang onclick
    const parent = document.getElementById(i).parentElement;
    document.getElementById('tbody').removeChild(parent);

    // xóa trong local storage
    // Tìm ra index của sản phẩm muốn xóa trong local storage
    const index = productsCart.findIndex((item) => item.id === id);
    // xóa sản phẩm có index tương ứng
    productsCart = deleteItem(productsCart, index);
    // update lại local storage
    localStorage.setItem("productsInCart", JSON.stringify(productsCart));
  }
}

// function update số lượng: cả nhập và tăng giảm số lượng
const changeQty = (i, id) => {
  // lấy ra thẻ input (thẻ số lượng)
  const a = document.querySelector(`.a${i}`);
  // console.log(a.value);
  if (a.value != 0) {
    const product = productsCart.find(item => item.id == id);
    if (a.value > Number(product.total)) {
      alert(`Rất tiếc, bạn chỉ có thể mua tối đa ${product.total} sản phẩm này`);
      a.value = product.total;
    }
    // update lại quantity bằng cách set item.quantity = a.value
    // a.value do mình điền hoặc tăng giảm số lượng, hàm changeQty sẽ chạy mỗi khi onchange
    const newProducts = productsCart.map(item => {
      if (item.id === id) item.quantity = Number(a.value);
      return item;
    })
    // update lại localstorage
    localStorage.setItem("productsInCart", JSON.stringify(newProducts));

    // update số tiền trên giao diện = số lượng * đơn giá
    // tìm ra vị trí của sản phẩm mình onchange nhằm lấy ra price của nó để set tổng số tiền
    const index = productsCart.findIndex((item) => item.id === id);
    // lấy ra thẻ số tiền của từng sản phẩm r update bằng innerText
    const b = document.querySelector(`.b${i}`);
    b.innerText = toMoney1(a.value * productsCart[index].price);

    // update tổng số tiền cần thanh toán
    let totalMoney = 0;
    price.forEach(item => {
      totalMoney += Number(toNumber(item.innerText));
    })
    for (const item of jsToTalPrice) {
      item.innerText = toMoney1(totalMoney);
    }
  }
  else {
    // nếu value của số lượng về 0 thì sẽ hiển alert có muốn xóa không ?
    deleteCart(id, i);
    a.value = 1;
  }
}