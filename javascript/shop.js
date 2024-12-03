


document.addEventListener("DOMContentLoaded", () => {
    const productAll = document.querySelector(".product-all"); 
    const productItems = productAll.querySelectorAll(".box"); 
    const viewMoreButton = document.querySelector(".product-btn"); 

    const incrementCount = 8;
    let currentDisplayCount = 8;

    productItems.forEach((product, index) => {
        product.style.display = index < currentDisplayCount ? "block" : "none";
    });

    viewMoreButton.addEventListener("click", () => {
        currentDisplayCount += incrementCount; 

        productItems.forEach((product, index) => {
            if (index < currentDisplayCount) {
                product.style.display = "block";
            }
        });

        if (currentDisplayCount >= productItems.length) {
            viewMoreButton.style.display = "none";
        }
    });
});
document.addEventListener("DOMContentLoaded", () => {
    const productAll = document.querySelector(".grow"); 
    const productItems = productAll.querySelectorAll(".grow .col-md-6"); 
    const viewMoreButton = document.querySelector(".gload"); 

    const incrementCount = 6;
    let currentDisplayCount = 6;

    productItems.forEach((product, index) => {
        product.style.display = index < currentDisplayCount ? "block" : "none";
    });

    viewMoreButton.addEventListener("click", () => {
        currentDisplayCount += incrementCount; 

        productItems.forEach((product, index) => {
            if (index < currentDisplayCount) {
                product.style.display = "block";
            }
        });

        if (currentDisplayCount >= productItems.length) {
            viewMoreButton.style.display = "none";
        }
    });
});

