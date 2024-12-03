// header

const nav = document.querySelector('.nav');
const navnone = document.querySelector('.nav i');
const navactive = document.querySelector('.header-img i');

navactive.onclick = () => {
    nav.style.display = 'block';
    
}
navnone.onclick = () => {
    nav.style.display = 'none';
}


const search = document.querySelector('.search');
const searchactive = document.querySelector('.searchac');
const searchnone = document.querySelector('.search i');

searchactive.onclick = () => {
    search.style.display = 'flex';
}
searchnone.onclick = () => {
    search.style.display = 'none';
}



const shoppong = document.querySelector('.shopping');
const headerCart = document.querySelector('.header-cart');
const heeadernone = document.querySelector('.cart-heading i');



shoppong.onclick = () => {
    headerCart.style.display = 'block';
}

heeadernone.onclick = () => {
    headerCart.style.display = 'none';
}

// end header

//active link
const currentPage = window.location.pathname.split('/').pop();

const navLinks = document.querySelectorAll('.nav ul li a');

navLinks.forEach(link => {
  const linkHref = link.getAttribute('href').replace('./', '');
  if (linkHref === currentPage) {
    link.classList.add('active'); 
  } else {
    link.classList.remove('active');
  }
});






   
    

    