const elProductWrapper = document.querySelector("ul");

const elProduct = document.createElement("li");
elProduct.className = "col-4";

const elProductWrap = document.createElement("div");
elProductWrap.className = "card";
const elProductImg = document.createElement("img");
elProductImg.src = product.img;
elProductImg.className = "card-img-top";
const elPoroductBody = document.createElement("div");
elPoroductBody.className = "card-body";
const elProductTitle = document.createElement("h3");
elProductTitle.textContent = product.title;
elProductTitle.className = "card-title";
const elProductPrice = document.createElement("p");
elProductPrice.className = "card-text fw-bold";
const elProductMark = document.createElement("mark");
elProductMark.textContent = product.price;  
const elProductModel = document.createElement("p");
elProductModel.textContent = product.model;
elProductModel.className = "badge bg-success";


elProduct.append(elProductWrap);
elProductWrap.append(elProductImg);
elProductWrap.append(elPoroductBody);
elPoroductBody.append(elProductTitle)
elPoroductBody.append(elProductPrice);
elProductPrice.append(elProductMark);
elPoroductBody.append(elProductModel);

console.log(product);

elProductWrapper.append(elProduct);