const lightBoxThumbnails = document.querySelectorAll(".lightbox-thumbnail");
const lightboxContainer = document.getElementById("lightbox-gallery-popup");
const largeProductImage = document.getElementById("large-product-image");
const primaryNav = document.querySelector(".primary-navigation");
const navToggle = document.querySelector(".mobile-nav-toggle");
const thumbnails = document.querySelectorAll(".thumbnail");
const closeBtn = document.querySelector(".close-popup");
const nextSlide = document.querySelector(".btn-next");
const prevSlide = document.querySelector(".btn-prev");
const slides = document.querySelectorAll(".slide");
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
const SLIDE_WIDTH_PERCENT = 150;

slides.forEach((slide, indx) => {
  slide.style.transform = `translateX(${indx * SLIDE_WIDTH_PERCENT}%)`;
});

// Function to update the slide and handle "active" class for thumbnails
const updateSlideAndThumbnails = () => {
  slides.forEach((slide, indx) => {
    slide.style.transform = `translateX(${
      SLIDE_WIDTH_PERCENT * (indx - curSlide)
    }%)`;

    lightBoxThumbnails.forEach((thumbnail, index) => {
      if (thumbnail.classList.contains("active")) {
        thumbnail.classList.remove("active");
      }
      if (index === curSlide) {
        thumbnail.classList.add("active");
      }
    });
  });
};

nextSlide.addEventListener("click", () => {
  if (curSlide === maxSlide) {
    curSlide = 0;
  } else {
    curSlide++;
  }
  updateSlideAndThumbnails();
});

prevSlide.addEventListener("click", () => {
  if (curSlide === 0) {
    curSlide = maxSlide;
  } else {
    curSlide--;
  }
  updateSlideAndThumbnails();
});

// ========================================================================
// Switch the large product image by clicking on the small thumbnail images
// ========================================================================
const updatelargeImage = (event) => {
  const largeImg = document.querySelector(".large-product");
  const {
    dataset: { link },
  } = event.currentTarget.firstElementChild;

  largeImg.src = `${link}.jpg`;

  thumbnails.forEach((thumbnail) => {
    if (thumbnail.classList.contains("active")) {
      thumbnail.classList.remove("active");
    }
  });

  event.currentTarget.classList.add("active");
};

// Event delegation for lighbox thumbnail clicks
document
  .querySelector(".thumbnail-images")
  .addEventListener("click", (event) => {
    const clickedThumbnail = event.target.closest(".lightbox-thumbnail");

    if (clickedThumbnail) {
      const newSrc = clickedThumbnail.querySelector("img").dataset.link;

      // Update the current slide index
      curSlide = Array.from(lightBoxThumbnails).indexOf(clickedThumbnail);

      // Update the current slide image source
      slides[curSlide].querySelector("img").src = `${newSrc}.jpg`;

      // Update the slide and thumbnails
      updateSlideAndThumbnails();
    }
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

  const subMenu = document.querySelector(".sub-menu");

  subMenu.addEventListener("mouseleave", () => {
    setTimeout(() => {
      cartLogo.classList.add("has-submenu");
    }, 5000);
  });
};

function isMobile() {
  return window.matchMedia("(max-width: 43em)").matches;
}

function initApp() {
  if (isMobile()) {
    lightboxContainer.classList.remove("hide");
  } else {
    lightboxContainer.classList.add("hide");
  }

  cartLogo.addEventListener("click", toggleCartBoxVisibility);
  thumbnails.forEach((img) => {
    img.addEventListener("click", updatelargeImage);
  });

  navToggle.addEventListener("click", toggleNav);
  largeProductImage.addEventListener("click", () => {
    lightboxContainer.classList.toggle("hide");
  });

  closeBtn.addEventListener("click", () => {
    lightboxContainer.classList.toggle("hide");
  });
}

initApp();
