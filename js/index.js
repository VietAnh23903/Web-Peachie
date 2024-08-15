function str(item) {
  return `
  <li>
    <div class="item col-md-4 col-sm-6 col-xs-6">
      <div class="product-block ">
          <div class="image"> <a href="#"><img class="img-responsive" title="T-shirt" alt="T-shirt" src=${
            item.img
          }></a> </div>
          <div class="product-details">
              <div class="product-name">
                <h4><a href="#" style="color: rgb(202, 85, 104);">${
                  item.name
                }</a></h4>
              </div>
              <div class="price"> <span class="price-old">${toMoney(
                item.priceFake
              )}</span> <span class="price-new">${toMoney(
    item.price
  )}</span> </div>
              <div class="product-hov">
                  <ul>
                    <li><button><i class="fa-regular fa-heart"></i></button></li>
                    <li><button onclick="addToCart(${
                      item.id
                    })" class="add-cart" href="#">Thêm vào giỏ hàng</button> </li>
                  </ul>
                  <div class="review"> <span class="rate"> <i class="fa fa-star rated"></i> <i class="fa fa-star rated"></i> <i class="fa fa-star rated"></i> <i class="fa fa-star rated"></i> <i class="fa fa-star"></i> </span> </div>
              </div>
          </div>
      </div>
    </div>
  </li>
  `;
}

let type;
if (document.querySelectorAll(".js-type")) {
  type = document.querySelectorAll(".js-type");
}
// show userName in header-top
const showUserName = () => {
  let userLogin = JSON.parse(localStorage.getItem("userLogin"));
  if (userLogin != null) {
    const userNames = document.querySelectorAll(".userName");
    const firstUserName = userLogin.userName[0].toUpperCase();
    userNames.forEach((e) => {
      e.innerHTML = `<span>${firstUserName}</span>Xin chào ${userLogin.userName}`;
      e.style.color = "#ca5568";
      e.style.fontSize = "16px";
    });
  } else {
    const userNames = document.querySelectorAll(".userName");
    userNames.forEach((e) => {
      e.innerHTML = `<a href="index.html" class="user_name">Đăng nhập</a>`;
      e.style.color = "#ca5568";
    });
  }
};
showUserName();

// toast shoe Click success
function toast({ duration = 3000 }) {
  const main = document.getElementById("toast");
  if (main) {
    const toast = document.createElement("div");

    const autoRemove = setTimeout(function () {
      main.removeChild(toast);
    }, duration + 1000);
    // tgian duration = 3s nhưng cộng thêm 1s vì có 1s nó fadeOut (3000 là 3000ms = 3s)
    toast.onclick = (e) => {
      if (e.target.closest(".toast-close")) {
        main.removeChild(toast);
        clearTimeout(autoRemove);
      }
    };

    const delay = (duration / 1000).toFixed(2);
    toast.classList.add("toast-item");
    toast.style.animation = `slideInLeft ease-in .4s, fadeOut linear 1s ${delay}s forwards`;
    toast.innerHTML = `
      <div class="toast-icon">
          <i class="fa-solid fa-circle-check"></i>
      </div>
      <div class="toast-content">
          <div class="title">
              Thành công!
          </div>
          <div class="desc">
              Đã thêm vào giỏ hàng
          </div>
      </div>
      <div class="toast-close">
          <i class="fa-solid fa-xmark"></i>
      </div>
    `;
    main.appendChild(toast);
  }
}

function toMoney(value) {
  return value.toLocaleString("it-IT", { style: "currency", currency: "VND" });
}
const products = JSON.parse(localStorage.getItem("products"));
// fetch data show girl.html and man.html
// featch data only have type
const featchValue = ({ type = "", sex = "" }) => {
  const htmls = products.map((item) => {
    if ((item.type == type || item.color == type) && item.sex == sex)
      return str(item);
  });
  document.getElementById("items-js").innerHTML = htmls.join("");
};
for (const item of type) {
  // type là clothes, shoes, bags của girl
  if (item.classList.contains("clothes-girl")) {
    item.onclick = () => {
      featchValue({ type: "clothes", sex: "female" });
    };
  }
  if (item.classList.contains("shoes-girl")) {
    item.onclick = () => {
      featchValue({ type: "shoes", sex: "female" });
    };
  }
  if (item.classList.contains("bags-girl")) {
    item.onclick = () => {
      featchValue({ type: "bags", sex: "female" });
    };
  }
  // type là clothes, shoes, wallets của man
  if (item.classList.contains("clothes-man")) {
    item.onclick = () => {
      featchValue({ type: "clothes", sex: "male" });
    };
  }
  if (item.classList.contains("shoes-man")) {
    item.onclick = () => {
      featchValue({ type: "shoes", sex: "male" });
    };
  }
  if (item.classList.contains("wallets-man")) {
    item.onclick = () => {
      featchValue({ type: "wallets", sex: "male" });
    };
  }
  // type là color của girl
  if (item.classList.contains("white-girl")) {
    item.onclick = () => {
      featchValue({ type: "white", sex: "female" });
    };
  }
  if (item.classList.contains("black-girl")) {
    item.onclick = () => {
      featchValue({ type: "black", sex: "female" });
    };
  }
  if (item.classList.contains("pink-girl")) {
    item.onclick = () => {
      featchValue({ type: "pink", sex: "female" });
    };
  }
  // type là color của man
  if (item.classList.contains("white-man")) {
    item.onclick = () => {
      featchValue({ type: "white", sex: "male" });
    };
  }
  if (item.classList.contains("black-man")) {
    item.onclick = () => {
      featchValue({ type: "black", sex: "male" });
    };
  }
  if (item.classList.contains("blue-man")) {
    item.onclick = () => {
      featchValue({ type: "blue", sex: "male" });
    };
  }
}

// lấy ra số lượng sản phẩm theo màu
(function () {
  let countWhiteGirl = 0,
    countBlackGirl = 0,
    countPinkGirl = 0,
    countWhiteMan = 0,
    countBlackMan = 0,
    countBlueMan = 0;
  products.map((item) => {
    if (item.sex == "female") {
      if (item.color == "white") countWhiteGirl++;
      if (item.color == "black") countBlackGirl++;
      if (item.color == "pink") countPinkGirl++;
    } else {
      if (item.color == "white") countWhiteMan++;
      if (item.color == "black") countBlackMan++;
      if (item.color == "blue") countBlueMan++;
    }
  });
  if (document.getElementById("totalWhite-girl")) {
    document.getElementById(
      "totalWhite-girl"
    ).innerText = `(${countWhiteGirl})`;
    document.getElementById(
      "totalBlack-girl"
    ).innerText = `(${countBlackGirl})`;
    document.getElementById("totalPink-girl").innerText = `(${countPinkGirl})`;
  }
  if (document.getElementById("totalWhite-man")) {
    document.getElementById("totalWhite-man").innerText = `(${countWhiteMan})`;
    document.getElementById("totalBlack-man").innerText = `(${countBlackMan})`;
    document.getElementById("totalBlue-man").innerText = `(${countBlueMan})`;
  }
})();

// add to cart
let productInCart = localStorage.getItem("productsInCart")
  ? JSON.parse(localStorage.getItem("productsInCart"))
  : [];
const addToCart = (id) => {
  // show toast message
  toast({ duration: 3000 });
  // return: boolean: true nếu trong productInCart có id trùng vs id truyền vào ở tham số
  let checkProduct = productInCart.some((value) => value.id === id);
  if (!checkProduct) {
    // lấy ra sản phẩm có id tương ứng trong API và add vào mảng productInCart
    // unshift là add vào đầu mảng, push là add vào cuối mảng
    let product = products.find((item) => item.id === id);
    productInCart.unshift({
      ...product,
      quantity: 1,
    });
    // lưu productInCart vào localstorage có key là products
    localStorage.setItem("productsInCart", JSON.stringify(productInCart));
  } else {
    // nếu onclick vào 1 sản phẩm 2 lần thì ta tăng quantity sp đó lên
    // tạo ra mảng newProductInCart mới
    let newProductInCart = productInCart.map((item) => {
      if (item.id === id) {
        item.quantity++;
      }
      return item;
    });
    // update localStorage
    localStorage.setItem("productsInCart", JSON.stringify(newProductInCart));
  }
};

// lấy ra tổng số lượng phần tử mảng products
// sẽ tương ứng bằng số sản phẩm trong giỏ hàng và số sp mua
// nhằm để show lên giao diện
let total =
  productInCart.length != 0
    ? JSON.parse(localStorage.getItem("productsInCart")).length
    : 0;
// console.log(total);
const totalItem = document.querySelectorAll(".total-cart");
for (const item of totalItem) {
  item.innerText = total;
}

// tìm kiếm sản phẩm
const sel = document.querySelector(".sel");
const btnSearch = document.querySelector(".js-btn-seach");
const txtSearch = document.querySelector(".js-txt-search");
const searchHandler = (sel, txt) => {
  if (sel == "Nữ") {
    let productsSearch = products.filter((value) => {
      return value.name.toLowerCase().includes(txt);
    });
    productsSearch = productsSearch.filter((value) => value.sex == "female");
    localStorage.setItem("search", JSON.stringify(productsSearch));
    location.href = "search.html";
  }
  if (sel == "Nam") {
    let productsSearch = products.filter((value) => {
      return value.name.toLowerCase().includes(txt);
    });
    productsSearch = productsSearch.filter((value) => value.sex == "male");
    localStorage.setItem("search", JSON.stringify(productsSearch));
    location.href = "search.html";
  }
};
if (btnSearch) {
  btnSearch.onclick = (e) => {
    e.preventDefault();
    // khởi tạo ban đầu selValue = "Nam";
    let selValue = sel[0].text;
    const selectedIndex = sel.selectedIndex;
    // Sau khi select có thể selValue = "Nữ" hoặc "Nam"
    selValue = sel.options[selectedIndex].text;
    searchHandler(selValue, txtSearch.value);
  };
}

// let name = 'asN1gomanhanh';
// console.log(name.includes("manhanh1"));  // false
// let words = ["đầm", "váy"];
// function checkString({str="",words = new Array()}) {
//   for (const item of words) {
//     let lower = item.toLowerCase();
//     console.log(lower);
//     if (str.includes(lower)) return true;
//   }
// }

// console.log(checkString({str:"Tôi thích mặc Đầm", words:["đầm", "váy"]})); // true
// console.log(checkString({str:"Tôi thích mặc váy", words:["đầm", "váy"]})); // true
// console.log(checkString({str:"Tôi thích mặc", words:["đầm", "váy"]})); // true
// console.log(checkString({str:"Tôi thích mặc đầm và váy", words:["đầm", "váy"]})); // true

// lấy lịch sử đơn hàng theo user
const users = JSON.parse(localStorage.getItem("users"));
const userLogin = JSON.parse(localStorage.getItem("userLogin"));
const productsIncart = JSON.parse(localStorage.getItem("productsInCart"));
let producsBuyUserLogin;
users.filter((item) => {
  if (item.email == userLogin.email)
    producsBuyUserLogin = item.purchasedProduct;
});
let totalProductIncart = 0;
let htmlss = "";
if (producsBuyUserLogin) {
  totalProductIncart = producsBuyUserLogin.reduce(
    (total, item) => total + item.quantity * item.price,
    0
  );
  htmlss = producsBuyUserLogin.map((item) => {
    let color = "";
    if (item.color == "black") color = "Đen";
    if (item.color == "pink") color = "Hồng";
    if (item.color == "white") color = "Trắng";
    if (item.color == "blue") color = "Xanh";
    if (item.color == "purple") color = "Tím";
    if (item.color == "brown") color = "Nâu";
    if (item.color == "yellow") color = "Vàng";
    return `
      <div class="item row">
        <div class="img col-md-2 col-sm-2 col-xs-2">
          <img style="width: 100px;" src=${item.img} alt="">
        </div>
        <div class="desc col-md-6 col-sm-6 col-xs-6">
          <div class="name">${item.name}</div>
          <div class="color">Màu sắc: <span>${color}</span></div>
          <div>x${item.quantity}</div>
        </div>
        <div class="price col-md-4 col-sm-4 col-xs-4">
            <div>${toMoney(item.priceFake)}</div>
            <div>${toMoney(item.price)}</div>
        </div>
      </div>
  `;
  });
  htmlss = htmlss.join("");
  htmlss += `<div class="row done">
            <div>
              <i style="color: #ca5568" class="fa-solid fa-dollar-sign"></i>
              Thành tiền: <span>${toMoney(totalProductIncart)}</span>
            </div>
          </div>`;
}
document.getElementById("buyItem").onclick = (e) => {
  e.preventDefault();
  if (htmlss == "") {
    htmlss = `<div><img style=\"width:100%;margin:-140px auto\" src=\"./assets/images/notfound.png\">
              <div style="text-align: center; font-size: 32px; font-weight: bold; color: #666;">
                Không có đơn hàng nào</div>
              </div>`;
  }
  document.querySelector("#container-modal > .items .list-item").innerHTML =
    htmlss;
  document.getElementById("modal-report").style.display = "flex";
};

document.querySelector(".modal-close").onclick = () => {
  document.getElementById("modal-report").style.display = "none";
};
document.getElementById("modal-report").addEventListener("click", function () {
  document.getElementById("modal-report").style.display = "none";
});
document
  .getElementById("container-modal")
  .addEventListener("click", function (e) {
    e.stopPropagation();
  });
