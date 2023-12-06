const largeProductImage = document.getElementById("large-product-image");
const lightboxContainer = document.getElementById("lightbox-gallery-popup");
const closeBtn = document.querySelector(".close-popup");
const primaryNav = document.querySelector(".primary-navigation");
const navToggle = document.querySelector(".mobile-nav-toggle");
const slides = document.querySelectorAll(".slide");
const prevSlide = document.querySelector(".btn-prev");
const nextSlide = document.querySelector(".btn-next");
const thumbnails = document.querySelectorAll("#thumbnail");
const cartLogo = document.querySelector(".cart");

// ===================================
// Mobile Navigation toggle
// ==================================
const toggleNav = () => {
  const visibility = primaryNav.getAttribute("data-visible");
  if (visibility === "false") {
    primaryNav.setAttribute("data-visible", true);
    navToggle.setAttribute("aria-expanded", true);
  } else if (visibility === "true") {
    primaryNav.setAttribute("data-visible", false);
    navToggle.setAttribute("aria-expanded", false);
  }
};

// ==================================
// Lightbox Image slider
// ==================================
let curSlide = 0;
let maxSlide = slides.length - 1;

slides.forEach((slide, indx) => {
  slide.style.transform = `translateX(${indx * 150}%)`;
});

nextSlide.addEventListener("click", function () {
  if (curSlide === maxSlide) {
    curSlide = 0;
  } else {
    curSlide++;
  }
  slides.forEach((slide, indx) => {
    slide.style.transform = `translateX(${150 * (indx - curSlide)}%)`;
  });
});

prevSlide.addEventListener("click", function () {
  if (curSlide === 0) {
    curSlide = maxSlide;
  } else {
    curSlide--;
  }

  slides.forEach((slide, indx) => {
    slide.style.transform = `translateX(${150 * (indx - curSlide)}%)`;
  });
});

// =================================================================
// Open a lightbox gallery by clicking on the large product image
// ==================================================================
navToggle.addEventListener("click", toggleNav);
largeProductImage.addEventListener("click", () => {
  lightboxContainer.classList.toggle("hide");
});

closeBtn.addEventListener("click", () => {
  lightboxContainer.classList.toggle("hide");
});

// ========================================================================
// Switch the large product image by clicking on the small thumbnail images
// ========================================================================
const updatelargeImage = (event) => {
  const largeImg = document.querySelector(".large-product");
  const clickedImg = event.currentTarget.firstElementChild;
  const newSrc = clickedImg.dataset.link;
  largeImg.src = `${newSrc}.jpg`;

  thumbnails.forEach((thumbnail) => {
    if (thumbnail.classList.contains("active")) {
      thumbnail.classList.remove("active");
    }
  });

  clickedImg.parentElement.classList.add("active");
};

thumbnails.forEach((img) => {
  img.addEventListener("click", updatelargeImage);
});

// ===================
// Show cart on click
// ===================
const toggleCartBoxVisibility = () => {
  if (cartLogo.classList.contains("has-submenu")) {
    cartLogo.firstElementChild.setAttribute("aria-expanded", true);
  } else {
    cartLogo.firstElementChild.setAttribute("aria-expanded", false);
  }

  cartLogo.classList.toggle("has-submenu");
};

cartLogo.addEventListener("click", toggleCartBoxVisibility);
