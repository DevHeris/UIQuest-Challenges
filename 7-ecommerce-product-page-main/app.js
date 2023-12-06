// ===================================
// Mobile Navigation toggle
// ==================================

// Selecting the primary navigation element and the mobile navigation toggle button
const primaryNav = document.querySelector(".primary-navigation");
const navToggle = document.querySelector(".mobile-nav-toggle");

// Function to toggle the visibility of the navigation
const toggleNav = () => {
  // Getting the current visibility state from the "data-visible" attribute
  const visibility = primaryNav.getAttribute("data-visible");

  // Toggling the visibility state and updating ARIA attribute accordingly
  if (visibility === "false") {
    primaryNav.setAttribute("data-visible", true);
    navToggle.setAttribute("aria-expanded", true);
  } else if (visibility === "true") {
    primaryNav.setAttribute("data-visible", false);
    navToggle.setAttribute("aria-expanded", false);
  }
};

// Adding a click event listener to the mobile navigation toggle button
navToggle.addEventListener("click", toggleNav);

// ==================================
// Lightbox Image slider
// ==================================

// Select all slides
const slides = document.querySelectorAll(".slide");

// loop through slides and set each slides translateX property to index * 100%
slides.forEach((slide, indx) => {
  slide.style.transform = `translateX(${indx * 150}%)`;
});

// select next slide button
const nextSlide = document.querySelector(".btn-next");

// current slide counter
let curSlide = 0;
// maximum number of slides
let maxSlide = slides.length - 1;

// add event listener and navigation functionality
nextSlide.addEventListener("click", function () {
  // check if current slide is the last and reset current slide
  if (curSlide === maxSlide) {
    curSlide = 0;
  } else {
    curSlide++;
  }

  //   move slide by -100%
  slides.forEach((slide, indx) => {
    slide.style.transform = `translateX(${150 * (indx - curSlide)}%)`;
  });
});

// select prev slide button
const prevSlide = document.querySelector(".btn-prev");

// add event listener and navigation functionality
prevSlide.addEventListener("click", function () {
  // check if current slide is the first and reset current slide to last
  if (curSlide === 0) {
    curSlide = maxSlide;
  } else {
    curSlide--;
  }

  //   move slide by 100%
  slides.forEach((slide, indx) => {
    slide.style.transform = `translateX(${150 * (indx - curSlide)}%)`;
  });
});

// =================================================================
// Open a lightbox gallery by clicking on the large product image
// ==================================================================
const largeProductImage = document.getElementById("large-product-image");
const lightboxContainer = document.getElementById("lightbox-gallery-popup");
const closeBtn = document.querySelector(".close-popup");

largeProductImage.addEventListener("click", () => {
  lightboxContainer.classList.toggle("hide");
});

closeBtn.addEventListener("click", () => {
  lightboxContainer.classList.toggle("hide");
});
