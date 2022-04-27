const elProductWrapper = document.querySelector(".product-wrapper");
elProductWrapper.className = "row list-unstyled g-3";

// const producs = {
//     id: 123,
//     title: "Redmi Note 10 Pro",
//     img: "https://picsum.photos/300/200",
//     price: 4300000,
//     model: "Xiaomi",
//     addedDate: new Date("2021-11-12").toISOString(),
//     benefits: ["8gb", "128gb", "Waterproof"]
//   };



for (let i = 0; i < products.length; i++) {
    const elProducts = document.createElement("li");
    elProducts.className = "col-4";
    const elProductItem = document.createElement("div");
    elProductItem.className = "card";
    const elProductImg = document.createElement("img");
    elProductImg.src = products[i].img;
    elProductImg.className = "card-img-top";
    const elPoroductBody = document.createElement("div");
    elPoroductBody.className = "card-body";
    const elProductTitle = document.createElement("p");
    elProductTitle.textContent = products[i].title;
    elProductTitle.className = "card-title";
    const elProductPrice = document.createElement("p");
    elProductPrice.className = "card-text fw-bold";
    const elProductMark = document.createElement("mark");
    elProductMark.textContent = products[i].price;  
    const elProductModel = document.createElement("p");
    elProductModel.textContent = products[i].model;
    elProductModel.className = "badge bg-success";
    const elProductIcons = document.createElement("div");
    elProductIcons.className = "position-absolute top-0 end-0 d-flex";
    const elPoroductDelete = document.createElement("button");
    elPoroductDelete.className = "btn rounded-0 btn-secondary";
    const elPoroductDeleteIcon = document.createElement("i");
    elPoroductDeleteIcon.className = "fa-solid fa-pen";
    const elPoroductEdit = document.createElement("button");
    elPoroductEdit.className = "btn rounded-0 btn-danger";
    const elPoroductEditIcon = document.createElement("i");
    elPoroductEditIcon.className = "fa-solid fa-trash";


    elProducts.append(elProductItem);
  elProductItem.append(elProductImg);
  elProductItem.append(elPoroductBody);
  elPoroductBody.append(elProductTitle)
  elPoroductBody.append(elProductPrice);
  elProductPrice.append(elProductMark);
  elPoroductBody.append(elProductModel);
  elPoroductBody.append(elProductIcons);
  elProductIcons.append(elPoroductDelete);
  elPoroductDelete.append(elPoroductDeleteIcon);
  elProductIcons.append(elPoroductEdit);
  elPoroductEdit.append(elPoroductEditIcon);
  
  elProductWrapper.append(elProducts);
  };

