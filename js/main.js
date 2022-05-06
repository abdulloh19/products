const elProductWrapper = document.querySelector(".product-wrapper");
elProductWrapper.className = "row list-unstyled g-3";

const createElement = function(tagName, className, text) {
  const createdElement = document.createElement(tagName);
  createdElement.className = className;

  if (text) {
    createdElement.textContent = text;
  }

  return createdElement;
}

const createProduct = function(product) {
  const productRow = document.createElement("li");

  for (let i = 0; i < products.length; i++) {
    const carrenProduct = products[i]
    const elProducts = createElement("li", "col-4");
    const elProductItem = createElement("div", "card");
    const elProductImg = createElement("img", "card-img-top");
    elProductImg.src = carrenProduct.img;
    const elPoroductBody = createElement("div", "card-body");
    const elProductTitle = createElement("h3", "card-title", carrenProduct.title);
    const elProductPrice = createElement("p", "card-text fw-bold");
    const elProductMark = createElement("mark");
    elProductMark.textContent = carrenProduct.price;
    const elProductModel = createElement("p", "badge bg-success", carrenProduct.model);
    const addedDate = new Data (carrenProduct.addedDate)
    const elProductData = createElement("p", "card-text", "")
    const elProductList = createElement("ul", "d-flex flex-wrap list-unstyled");

    for (let j = 0; j < carrenProduct.benefits.length; j++) {

      const elProductBenefits = createElement("li", "badge bg-primary me-1 mb-1", carrenProduct.benefits[j])

      elProductList.append(elProductBenefits);
    };

    const elProductIcons = createElement("div", "position-absolute top-0 end-0 d-flex");

    const elPoroductDelete = createElement("button", "btn rounded-0 btn-secondary");
    const elPoroductDeleteIcon = createElement("i", "fa-solid fa-pen");
    elPoroductDelete.append(elPoroductDeleteIcon);
    elProductIcons.append(elPoroductDelete);

    const elPoroductEdit = createElement("button", "btn rounded-0 btn-danger");
    const elPoroductEditIcon = createElement("i", "fa-solid fa-trash");
    elPoroductEdit.append(elPoroductEditIcon);
    elProductIcons.append(elPoroductEdit);

  //   elProducts.append(elProductItem);
  // elProductItem.append(elProductImg);
  // elProductItem.append(elPoroductBody);
  // elPoroductBody.append(elProductTitle);
  // elPoroductBody.append(elProductPrice);
  // elProductPrice.append(elProductMark);
  // elPoroductBody.append(elProductModel);
  // elPoroductBody.append(addedDate);
  // elPoroductBody.append(elProductData);
  // elPoroductBody.append(elProductIcons);
  // elPoroductBody.append(elProductList);

  elProductWrapper.append(elProducts);
  productRow.append(elProductItem, elProductImg, elPoroductBody, elProductTitle, elProductPrice, elProductMark, elProductModel, elProductData. elProductIcons);
  
  };
}




