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

// khi cần lấy dữ liệu từ json thì bỏ comments
(getAPI = async () => {
  console.log("1");
  if (!localStorage.getItem("products")) {
    console.log("object");
    let products = await fetch("./products.json")
      .then((res) => res.json())
      .then((data) => data);
    localStorage.setItem("products", JSON.stringify(products));
    return;
  }
  return;
})();
function xulyForm() {
  //neu chua chọn file - file.value.length = 0 - không làm gì cả
  if (!file.value.length) {
    alert("Bạn chưa chọn file!");
    return;
  }
  //tạo một reader object để đọc file
  let reader = new FileReader();
  //Setup the callback event to run when the file is read
  reader.readAsText(file.files[0]); //dọc file đầu tiên
  reader.onload = xulyFile;
}
function xulyFile(e) {
  let noidung = e.target.result;
  let json_noidung = JSON.parse(noidung);
  let products = [];
  if (localStorage.getItem("products"))
    products = JSON.parse(localStorage.getItem("products"));
  products = json_noidung.concat(products).reverse();
  products = [...new Set(products.map((item) => JSON.stringify(item)))].map(
    (item) => JSON.parse(item)
  );
  localStorage.setItem("products", JSON.stringify(products));
  // console.log(json_noidung);
  // console.log(JSON.parse(localStorage.getItem("noidung")));
}
document.getElementById("btnUpLoad").onclick = (e) => {
  e.preventDefault();
  xulyForm();
  alert("Thêm sản phẩm thành công!");
  location.reload();
};

function toMoney(value) {
  return value.toLocaleString("it-IT", { style: "currency", currency: "VND" });
}
function deleteItem(arr, i) {
  // if (index == 0) return arr.slice(1);
  //  return arr.splice(0, index).concat(arr.slice(index));
  const newArr = arr.filter((item, index) => {
    if (index != i) return item;
  });
  return newArr;
}
let products = [];
if (localStorage.getItem("products"))
  products = JSON.parse(localStorage.getItem("products"));
function getProducts(products) {
  const htmls = products.map((product, i) => {
    let color, type;
    if (product.color == "black") color = "Đen";
    if (product.color == "pink") color = "Hồng";
    if (product.color == "white") color = "Trắng";
    if (product.color == "blue") color = "Xanh";
    if (product.color == "purple") color = "Tím";
    if (product.color == "brown") color = "Nâu";
    if (product.color == "yellow") color = "Vàng";
    if (product.type == "clothes") type = "Quần áo";
    if (product.type == "shoes") type = "Giày";
    if (product.type == "bags") type = "Túi";
    if (product.type == "wallets") type = "Ví";
    return `
      <tr class="item${i}">
        <td class="img" style="border: none;">
          <div style="width: 50px;height: 50px;"><img style="width: 50px;height: 50px;" class="thanhthuy1" alt="img"
              src=${product.img}></div>
          <p class="product-name">${product.name}</p>
        </td>
        <td>${toMoney(product.priceFake)}</td>
        <td>${toMoney(product.price)}</td>
        <td>${product.sex == "male" ? "Nam" : "Nữ"}</td>
        <td>${product.total}</td>
        <td>${color}</td>
        <td>${type}</td>
        <td style="display: flex; border: none; gap: 4px; height: 61px; border-bottom: 1px solid #ccc;">
          <div><button onclick="modifyProduct(${
            product.id
          },${i})" class="modify-product">Sửa</button></div>
          <div><button onclick="deleteProduct(${
            product.id
          },${i})">Xóa</button></div>
        </td>
      </tr>
    `;
  });
  document.getElementById("list-product").innerHTML = htmls.join("");
}
getProducts(products);

// show modal add product
const btnAdd = document.querySelector("#btnAdd");
document.querySelector(".title-main button").onclick = () => {
  document.querySelector(".modal-add-product").style.display = "flex";
};
if (document.querySelector(".modal-close")) {
  document.querySelector(".modal-close").onclick = () => {
    document.querySelector(".modal-add-product").style.display = "none";
  };
}
document
  .querySelector(".modal-add-product")
  .addEventListener("click", function () {
    document.querySelector(".modal-add-product").style.display = "none";
  });
document
  .querySelector(".modal-add-product form")
  .addEventListener("click", function (e) {
    e.stopPropagation(); // prevent
  });

// delete product
function deleteProduct(id, i) {
  const isDelete = confirm("Bạn muốn xóa sản phẩm này không ?");
  if (isDelete) {
    // xóa ở giao diện admin
    // tìm ra thẻ cha của thẻ đang onclick
    const item = document.querySelector(`.item${i}`);
    document.getElementById("list-product").removeChild(item);

    // xóa trong local storage
    // Tìm ra index của sản phẩm muốn xóa trong local storage
    const index = products.findIndex((item) => item.id === id);
    // xóa sản phẩm có index tương ứng
    products = deleteItem(products, index);
    // update lại local storage
    localStorage.setItem("products", JSON.stringify(products));
  }
}

// modify product
const modifyProduct = (id, i) => {
  // show modal modify product
  document.querySelector(".modal-modify-product").style.display = "flex";
  if (document.querySelectorAll(".modal-close")[1]) {
    document.querySelectorAll(".modal-close")[1].onclick = () => {
      document.querySelector(".modal-modify-product").style.display = "none";
    };
  }
  document
    .querySelector(".modal-modify-product")
    .addEventListener("click", function () {
      document.querySelector(".modal-modify-product").style.display = "none";
    });
  document
    .querySelector(".modal-modify-product form")
    .addEventListener("click", function (e) {
      e.stopPropagation(); // prevent
    });

  // handle logic
  const product = products.find((item) => item.id === id);
  // console.log(product);
  document.getElementById("txtNameModifyP").value = product.name;
  document.getElementById("txtPriceFakeModifyP").value = product.priceFake;
  document.getElementById("txtPriceModifyP").value = product.price;
  document.getElementById("txtImgModifyP").value = product.img;
  product.sex == "male"
    ? (document.getElementById("chkNamModify").checked = true)
    : (document.getElementById("chkNuModify").checked = true);
  document.getElementById("txtTotalModifyP").value = product.total;
  document.getElementById("selColorModify").value = product.color;
  document.getElementById("selTypeModify").value = product.type;

  document.getElementById("btnModify").onclick = (e) => {
    e.preventDefault();
    if (isCheckValueModify()) {
      const newProducts = products.map((item) => {
        if (item.id === id) {
          (item.name = document.getElementById("txtNameModifyP").value),
            (item.priceFake = Number(
              document.getElementById("txtPriceFakeModifyP").value
            )),
            (item.price = Number(
              document.getElementById("txtPriceModifyP").value
            )),
            (item.img = document.getElementById("txtImgModifyP").value),
            (item.sex = document.getElementById("chkNamModify").checked
              ? "male"
              : "female"),
            (item.total = Number(
              document.getElementById("txtTotalModifyP").value
            )),
            (item.sold = 0),
            (item.color = document.getElementById("selColorModify").value),
            (item.type = document.getElementById("selTypeModify").value);
        }
        return item;
      });
      localStorage.setItem("products", JSON.stringify(newProducts));
      alert("Sửa sản phẩm thành công!");
      location.reload();
    }
  };
};

// add sản phẩm
if (btnAdd) {
  btnAdd.onclick = (e) => {
    e.preventDefault();
    if (isCheckValueAdd()) {
      let arrIDProducts = [];
      products.map((item) => {
        arrIDProducts.push(item.id);
      });
      let id_auto = 1;
      while (arrIDProducts.includes(id_auto))
        id_auto = Math.round(Math.random() * 1000);
      const item = {
        id: id_auto,
        name: document.getElementById("txtNameP").value,
        priceFake: Number(document.getElementById("txtPriceFakeP").value),
        price: Number(document.getElementById("txtPriceP").value),
        img: document.getElementById("txtImgP").value,
        sex: document.getElementById("chkNam").checked ? "male" : "female",
        total: Number(document.getElementById("txtTotalP").value),
        sold: 0,
        color: document.getElementById("selColor").value,
        type: document.getElementById("selType").value,
      };
      // console.log(item);
      products.unshift(item);
      localStorage.setItem("products", JSON.stringify(products));
      alert("Thêm sản phẩm thành công!");
      location.reload();
    }
  };
}

// check value khi nhập vào modal add và modal modify
function checkValue(txt, text) {
  if (txt.value == "") {
    alert(text);
    txt.focus();
    return false;
  }
  return true;
}
function checkNumber(txt, text) {
  if (isNaN(txt.value) || txt.value == "") {
    alert(text);
    txt.select();
    return false;
  }
  return true;
}
const isCheckValueAdd = () => {
  const txtNameP = document.getElementById("txtNameP");
  const txtImgP = document.getElementById("txtImgP");
  const priceFakeP = document.getElementById("txtPriceFakeP");
  const priceP = document.getElementById("txtPriceP");
  const totalP = document.getElementById("txtTotalP");
  if (
    !checkValue(txtNameP, "Tên sản phẩm không được bỏ trống. Mời bạn nhập lại!")
  )
    return false;
  if (
    !checkValue(txtImgP, "Link sản phẩm không được bỏ trống. Mời bạn nhập lại!")
  )
    return false;
  if (!checkNumber(priceFakeP, "Giá bán phải là số!")) return false;
  if (!checkNumber(priceP, "Giá khuyến mại phải là số!")) return false;
  if (!checkNumber(totalP, "Số lượng nhập không đúng định dạng!")) return false;
  return true;
};

const isCheckValueModify = () => {
  const txtNameModifyP = document.getElementById("txtNameModifyP");
  const txtImgModifyP = document.getElementById("txtImgModifyP");
  const priceFakeModifyP = document.getElementById("txtPriceFakeModifyP");
  const priceModifyP = document.getElementById("txtPriceModifyP");
  const totalModifyP = document.getElementById("txtTotalModifyP");
  if (
    !checkValue(
      txtNameModifyP,
      "Tên sản phẩm không được bỏ trống. Mời bạn nhập lại!"
    )
  )
    return false;
  if (
    !checkValue(
      txtImgModifyP,
      "Link sản phẩm không được bỏ trống. Mời bạn nhập lại!"
    )
  )
    return false;
  if (!checkNumber(priceFakeModifyP, "Giá bán phải là số!")) return false;
  if (!checkNumber(priceModifyP, "Giá khuyến mại phải là số!")) return false;
  if (!checkNumber(totalModifyP, "Số lượng nhập không đúng định dạng!"))
    return false;
  return true;
};

// export-file
let productsCart = [];
if (localStorage.getItem("productsInCart"))
  productsCart = JSON.parse(localStorage.getItem("productsInCart"));
const toMoney1 = (value) => {
  // const money = value.toLocalString('it-IT', { style: 'currency', currency: 'VND' });
  return new Intl.NumberFormat("it-IT", {
    style: "currency",
    currency: "VND",
  }).format(value);
};
let totalCart = 0;
if (productsCart == null) {
  totalCart == 0;
} else {
  totalCart = productsCart.reduce(
    (total, item) => total + item.quantity * 10 * item.price,
    0
  );
}
const tBody = document.querySelector("#modal-table > tbody");
var tBodyContent = "";
tBodyContent = productsCart.map((item, index) => {
  const slb = item.quantity * 10 > item.total ? item.total : item.quantity * 10;
  const tonKho =
    item.quantity * 10 > item.total ? 0 : item.total - item.quantity * 10;
  return `
    <tr>
      <td>${index + 1}</td>
      <td>${item.name}</td>
      <td>${toMoney1(item.price)}</td>
      <td>${item.total}</td>
      <td>${slb}</td>
      <td>${tonKho}</td>
      <td>${toMoney1(slb * item.price)}</td>
    </tr>
  `;
});
tBodyContent = tBodyContent.join("");
tBodyContent += `<td></td>
                  <td></td>
                  <td></td>
                  <td></td>
                  <td></td>
                  <td style="font-weight: bold">Tổng tiền</td>
                  <td>${toMoney1(totalCart)}</td>`;
tBody.innerHTML = tBodyContent;
// export file to excel
function exportToExcel(fileName, sheetName, table) {
  // if (myData.length === 0) {
  // 	console.error('Chưa có data');
  // 	return;
  // }
  // console.log('exportToExcel', myData);

  let wb;
  if (table && table !== "") {
    wb = XLSX.utils.table_to_book($("#" + table)[0]);
  } else {
    const ws = XLSX.utils.json_to_sheet(myData);
    // console.log('ws', ws);
    wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, sheetName);
  }
  // console.log('wb', wb);
  XLSX.writeFile(wb, `${fileName}.xlsx`);
}
// document.getElementById('btnExport').onclick = () => {
//   exportToExcel('Báo cáo doanh thu 2023', 'Tháng 12', 'modal-table')
// }

// document.getElementById('btnExport').addEventListener("click", () => {
//   exportToExcel('Báo cáo doanh thu 2023', 'Tháng 12', 'modal-table')
// });
let selectedOption = document.getElementById("sel").options[0].text;
// console.log(selectedOption);
document.getElementById("sel").onchange = () => {
  const selectElement = document.getElementById("sel");
  const selectedIndex = selectElement.selectedIndex;
  selectedOption = selectElement.options[selectedIndex].text;
};
document.getElementById("btnExport").addEventListener("click", function () {
  // console.log(selectedOption);
  exportToExcel(
    `Báo cáo doanh thu ${selectedOption}`,
    "Tháng 12",
    "modal-table"
  );
});

// xử lý khi togger vào btn ở header
document.querySelector(".btn-product").onclick = () => {
  document.querySelector(".products").style.display = "block";
  document.querySelector(".export-file").style.display = "none";
};
document.querySelector(".js-show-modal").onclick = () => {
  document.querySelector(".products").style.display = "none";
  document.querySelector(".export-file").style.display = "block";
};
