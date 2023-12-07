// Selecting elements from the DOM
const lightBoxThumbnails = document.querySelectorAll(".lightbox-thumbnail");
const lightboxContainer = document.getElementById("lightbox-gallery-popup");
const largeProductImage = document.getElementById("large-product-image");
const primaryNav = document.querySelector(".primary-navigation");
const quantityBtns = document.querySelectorAll(".quantity-btn");
const navToggle = document.querySelector(".mobile-nav-toggle");
const thumbnails = document.querySelectorAll(".thumbnail");
const closeBtn = document.querySelector(".close-popup");
const quantityEl = document.querySelector("#quantity");
const nextSlide = document.querySelector(".btn-next");
const prevSlide = document.querySelector(".btn-prev");
const slides = document.querySelectorAll(".slide");
const addBtn = document.getElementById("add-btn");
const cartLogo = document.querySelector(".cart");
const itemCountEl = document.querySelector(".item-count");

// Function to toggle the visibility of the primary navigation on mobile
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

// Initializing variables for slide navigation
let curSlide = 0;
let maxSlide = slides.length - 1;
const SLIDE_WIDTH_PERCENT = 150;

// Setting initial positions for each slide
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

// Event listeners for next and previous slide buttons
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

// Function to update the large product image based on the selected thumbnail
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

// Function to toggle the visibility of the cart box and update cart items
const toggleCartBoxVisibility = (event) => {
  if (cartLogo.classList.contains("has-submenu")) {
    cartLogo.firstElementChild.setAttribute("aria-expanded", true);
  } else {
    cartLogo.firstElementChild.setAttribute("aria-expanded", false);
  }

  cartLogo.classList.toggle("has-submenu");

  // Delete all cart items on delete icon click
  if (!event.target.classList.contains("cart-icon")) {
    const isDeleteBtn = event.target.alt === "delete from cart";
    const isCheckoutBtn = event.target.classList.contains("checkout-btn");

    const cartContentEl = document.querySelector(".change");
    if (isDeleteBtn) {
      if (confirm("This will delete all items in the cart.")) {
        cartContentEl.classList.add("empty");
        cartContentEl.classList.remove("cart-content");
        cartContentEl.innerHTML = `<p>Your cart is empty.</p>`;

        chosenQuantity = 0;
        itemCountEl.textContent = chosenQuantity;
        document.querySelector(".item-count").classList.remove("notEmpty");
      }
    } else if (isCheckoutBtn) {
      cartContentEl.classList.add("empty");
      cartContentEl.classList.remove("cart-content");
      cartContentEl.innerHTML = `<p>Your cart is empty.</p>`;

      chosenQuantity = 0;
      itemCountEl.textContent = chosenQuantity;
      document.querySelector(".item-count").classList.remove("notEmpty");
      alert("Checkout Successful!");
      2;
    }
  }

  const subMenu = document.querySelector(".sub-menu");

  // Set a timeout to add the "has-submenu" class after 5 seconds
  subMenu.addEventListener("mouseleave", () => {
    setTimeout(() => {
      cartLogo.classList.add("has-submenu");
    }, 5000);
  });
};

// Function to check if the viewport is in mobile mode
function isMobile() {
  return window.matchMedia("(max-width: 43em)").matches;
}

// Initializing quantity-related variables
let quantity = 0;
let chosenQuantity = 0;

// Function to update the quantity based on button clicks
const updateQuantity = (event) => {
  if (event.target.classList.contains("increase-icon")) {
    quantity++;
    quantityEl.textContent = quantity;
  } else if (event.target.classList.contains("decrease-icon")) {
    if (quantity > 0) {
      quantity--;
    }
    quantityEl.textContent = quantity;
  }
  chosenQuantity = quantity;
};

// Function to update the cart content and reset quantity-related variables
const updateCart = () => {
  const cartContentEl = document.querySelector(".change");
  cartContentEl.innerHTML = `
    <div class="shoe-img-container">
      <img src="images/image-product-1-thumbnail.jpg" alt="shoe in cart">
    </div>
    <div>
      <p class="shoe-name">Fall Limited Edition Sneakers</p>
      <p class="total-price-container">
        $125.00 x <span class="chosen-quantity">${chosenQuantity}</span> <span class="total-price">$${
    chosenQuantity * 125
  }.00</span>
      </p>
    </div>
    <div class="delete-icon">
      <img src="images/icon-delete.svg" alt="delete from cart">
    </div>
    <button type="submit" class="checkout-btn">Checkout</button>
  `;

  cartContentEl.classList.remove("empty");
  cartContentEl.classList.add("cart-content");

  quantityEl.textContent = 0;
  quantity = 0;

  itemCountEl.textContent = chosenQuantity;

  document.querySelector(".item-count").classList.add("notEmpty");
};

// Function to initialize the application
function initApp() {
  // Check if the viewport is in mobile mode and show/hide the lightbox accordingly
  if (isMobile()) {
    lightboxContainer.classList.remove("hide");
  } else {
    lightboxContainer.classList.add("hide");
  }

  // Event listeners for cart, thumbnails, navigation toggle, lightbox, and quantity buttons
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

  quantityBtns.forEach((btn) => btn.addEventListener("click", updateQuantity));
  addBtn.addEventListener("click", updateCart);
}

// Initialize the application when the DOM is fully loaded
document.addEventListener("DOMContentLoaded", initApp);
