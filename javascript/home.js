
// background Slider 
const heroItems = document.getElementById("hero-items");

const images = [
    "./img/hero1.jpg",
    "./img/hero2.jpg",
    "./img/hero3.jpg"
];

let currentIndex = 0;

const changeBackground = () => {
    heroItems.style.backgroundImage = `url(${images[currentIndex]})`;
    currentIndex = (currentIndex + 1) % images.length; 
};

// Change background every 5 seconds
setInterval(changeBackground, 3000);
changeBackground();
// background Slider end


//slide lefi to right
const electronics = document.querySelector('.arrivals-items');
electronics.addEventListener('wheel', (e) => {
    e.preventDefault();
    electronics.scrollLeft += e.deltaY;
});