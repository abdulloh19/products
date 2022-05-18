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

const showDate = function(date) {
  let day = date.getDate();

  let month = date.getMonth() + 1;

  return `${day < 10 ? "0" + day : day}.${month < 10 ? "0" + month : month}.${date.getFullYear()}`
}

const elProductTemplate = document.querySelector(".product-template");

const createProduct = function(product) {
  const { id, title, img, price, model, addedDate, benefits } = product; //<--destrubrikatsiya
  
  const elProductRow = elProductTemplate.cloneNode(true).content;
  console.log(elProductRow);
  const elProductImg = elProductRow.querySelector(".card-img-top");
  elProductImg.src = img;
  const elProductTitle = elProductRow.querySelector(".card-title");
  elProductTitle.textContent = title;
  const elProductMark = elProductRow.querySelector(".card-text");
  elProductMark.textContent = price;
  const elProductModel = elProductRow.querySelector(".bg-success");
  elProductModel.textContent = model;
  const elProductDate = elProductRow.querySelector(".card-text");
  const AddedDate = new Date(addedDate);
  elProductDate.textContent = showDate(AddedDate);

  const elProductList = elProductRow.querySelector("ul", "d-flex flex-wrap list-unstyled");
  for (let j = 0; j < product.benefits.length; j++) {
    const elProductBenefits = document.createElement("li", "badge bg-primary me-1 mb-1", benefits[j])
    elProductList.append(elProductBenefits);
  };
  
  const elProductEditBtn = elProductRow.querySelector(".btn-secondary");
  elProductEditBtn.dataset.id = id;

  const elProductDelete = elProductRow.querySelector(".btn-danger");
  elProductDelete.dataset.id = id;
  
  return elProductRow;
}

const elProductCount = document.querySelector(".student-count");
const elProductAverageMark = document.querySelector(".average-mark")

const productRender = function(productArray = products) {
  elProductCount.textContent = `Count: ${productArray.length}`;

  const productAverge = productArray.reduce(function(acumalator, product) {
    return acumalator + product.price;
  }, 0)

  const productAverageMarks = productAverge / productArray.length;
  elProductAverageMark.textContent = `Average Price: ${productAverageMarks}`

  productArray.forEach(function(product) {
    const elProduct = createProduct(product)
    elProductWrapper.append(elProduct);
  })
}

const eladdProduct = document.querySelector("#add-product-form");
const elAddTitleInput = document.querySelector("#product-title");
const elAddPriceInput = document .querySelector("#price");
const elAddBenefits = document.querySelector("#benefits");
const elAddModal = new bootstrap.Modal(document.querySelector("#add-product-modal"))


productRender()

const elAddManufacturer = document.querySelector("#productManufacturer");
const elProductSelectInput = document.querySelector("#productManufacturers");
const elFilterManufarcturer = document.querySelector("#manufacturer");


for (let k = 0; k < manufacturers.length; k++) {
  const option = createElement("option", "", manufacturers[k].name)
  const editOption = createElement("option", "", manufacturers[k].name)
  const filterManufacturer = createElement("option", "", manufacturers[k].name)
  elAddManufacturer.append(option);
  elProductSelectInput.append(editOption);
  elFilterManufarcturer.append(filterManufacturer)
}

eladdProduct.addEventListener("submit", function(evt) {
  evt.preventDefault();
  
  const titleValue = elAddTitleInput.value;
  const priceValue = elAddPriceInput.value;
  const manufacturerValue = elAddManufacturer.value;
  const benefitsValue = elAddBenefits.value;
  
  if(titleValue.trim() && priceValue.trim() && manufacturerValue && benefitsValue.trim()) {
    const addProduct = {
      id: Math.floor(Math.random() * 1000),
      title: titleValue,
      img: "https://picsum.photos/300/200",
      price: +priceValue,
      model: manufacturerValue,
      benefits: benefitsValue.split(","),
      addedDate: new Date().toDateString()
    }
    
    products.unshift(addProduct)
   const elProduct =  createProduct(addProduct);
   elProductWrapper.prepend(elProduct)

   elAddModal.hide()
   eladdProduct.reset()
  };  
})


const elProductTitleInput = document.querySelector("#edit-product-title");
const elProductPriceInput = document.querySelector("#edit-price");
const elProductBenefitsInput = document.querySelector("#edit-benefits");
const elEditForm = document.querySelector("#edit-product-form");
const elEditModal = new bootstrap.Modal(document.querySelector("#edit-product-modal"))

elProductWrapper.addEventListener("click", function(evt) {
  if(+evt.target.matches(".btn-danger")) {
    const clickedBtnId = +evt.target.dataset.id;
    const clickedBtnIndex = products.findIndex(function(product) {
     return product.id === clickedBtnId
    })

    products.splice(clickedBtnIndex, 1)
    elProductWrapper.innerHTML = "";
    productRender()
  }

  if (evt.target.matches(".btn-secondary")) 
  {
    const clickedBtnId = +evt.target.dataset.id;
    const clickedBtnElement = products.find(function(product) {
      return product.id === clickedBtnId;
    })

    elProductTitleInput.value = clickedBtnElement.title;
    elProductPriceInput.value = clickedBtnElement.price;
    elProductSelectInput.value = clickedBtnElement.model;
    elProductBenefitsInput.value = clickedBtnElement.benefits;

    elEditForm.dataset.id = clickedBtnId  
  }
})

elEditForm.addEventListener("submit", function(evt) {
evt.preventDefault();

const elEditTitleVal = elProductTitleInput.value;
const elPriceVal = elProductPriceInput.value;
const elSelectVal = elProductSelectInput.value;
const elBenefitsVal = elProductBenefitsInput.value;

if (elEditTitleVal && elPriceVal && elSelectVal && elBenefitsVal) {

  const elEditingProduct = {
    id: +evt.target.dataset.id,
    img: "https://picsum.photos/300/200",
    title: elProductTitleInput.value,
    price: elProductPriceInput.value,
    model: elProductSelectInput.value,
    addedDate: new Date().toISOString(),
    benefits: elProductBenefitsInput.value.split(",")
  }
  
  const elProductIndex = products.findIndex(function(product) {
    return elEditingProduct.id === product.id
  })
  products.splice(elProductIndex, 1, elEditingProduct)
  elProductWrapper.innerHTML = "";
  productRender()
  elEditModal.hide()
}
})

const elFormInput = document.querySelector("#form")
const elSearchInput = document.querySelector("#search");
const elFromInput = document.querySelector("#from");
const elToInput = document.querySelector("#to");
const elSortInput = document.querySelector("#sortby");

elFormInput.addEventListener("submit", function(evt) {
  evt.preventDefault();

  const searchInputValue = elSearchInput.value;
  const elFromValue = elFromInput.value;
  const elToValue = elToInput.value;
  const selectValue = elFilterManufarcturer.value;
  const sortValue = elSortInput.value;

  let filteredProduct = products.filter(function(product) {
    return product.title.toLowerCase().includes(searchInputValue.toLowerCase())
  }).filter(function(product) {
   return product.price >= elFromValue;
  }).filter(function(product) {
    if(elToValue) {
      return product.price <= elToValue;
    }
    return true 
  }).filter(function(product) {
    if (selectValue == "0") {
      return true
    }
    return product.model == selectValue;
  }).sort(function(a, b) {
    switch (sortValue) {
      case "1":
        if (a.title > b.title) {
          return 1
        } else if (a.title < b.title) {
          return -1
        } 
        return 0;
       case "2":
        return a.price - b.price;
        case "3":
          return b.price - a.price
      default:
        return 0
    }
  })

  elProductWrapper.innerHTML = "";
  productRender(filteredProduct);
  })
