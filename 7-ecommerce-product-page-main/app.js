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
  const isVisible = primaryNav.getAttribute("data-visible") === "true";
  primaryNav.setAttribute("data-visible", isVisible ? "false" : "true");
  navToggle.setAttribute("aria-expanded", isVisible ? "false" : "true");
};

// Initializing variables for slide navigation
let curSlide = 0;
let maxSlide = slides.length - 1;
let SLIDE_WIDTH_PERCENTAGE = 150;

const setInitialSlidePositions = () => {
  slides.forEach((slide, indx) => {
    slide.style.transform = `translateX(${indx * SLIDE_WIDTH_PERCENTAGE}%)`;
  });
};

// Function to update the slide and handle "active" class for thumbnails
const updateSlideAndThumbnails = () => {
  slides.forEach((slide, indx) => {
    slide.style.transform = `translateX(${
      SLIDE_WIDTH_PERCENTAGE * (indx - curSlide)
    }%)`;

    lightBoxThumbnails[indx].classList.toggle("active", indx === curSlide);
  });
};

// Event listeners for next and previous slide buttons
nextSlide.addEventListener("click", () => {
  curSlide = (curSlide + 1) % slides.length;
  updateSlideAndThumbnails();
});

prevSlide.addEventListener("click", () => {
  curSlide = (curSlide - 1 + slides.length) % slides.length;
  updateSlideAndThumbnails();
});

// Function to update the large product image based on the selected thumbnail
const updatelargeImage = (event) => {
  const largeImg = document.querySelector(".large-product");
  const clickedThumbnail = event.currentTarget;

  const { link } = clickedThumbnail.firstElementChild.dataset;

  largeImg.src = `${link}.jpg`;

  // Remove "active" class from all thumbnails
  thumbnails.forEach((thumbnail) => {
    thumbnail.classList.remove("active");
  });

  // Add "active" class to the clicked thumbnail
  clickedThumbnail.classList.add("active");
};

// Event delegation for lighbox thumbnail clicks
document
  .querySelector(".thumbnail-images")
  .addEventListener("click", (event) => {
    // Find the closest ancestor with the class "lightbox-thumbnail"
    const clickedThumbnail = event.target.closest(".lightbox-thumbnail");

    if (clickedThumbnail) {
      // Extract the new source from the clicked thumbnail's dataset
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
  // Toggle the "has-submenu" class on cartLogo
  toggleSubMenuClass();

  // Update "aria-expanded" attribute based on the "has-submenu" class
  updateAriaExpandedAttribute();

  // Handle cart actions (delete and checkout) if not a cart-icon click
  if (!event.target.classList.contains("cart-icon")) {
    handleCartActions(event);
  }

  // Set a timeout to add the "has-submenu" class after 5 seconds
  setSubMenuTimeout();
};

const toggleSubMenuClass = () => {
  cartLogo.classList.toggle("has-submenu");
};

const updateAriaExpandedAttribute = () => {
  const isSubMenuVisible = cartLogo.classList.contains("has-submenu");
  cartLogo.firstElementChild.setAttribute("aria-expanded", isSubMenuVisible);
};

const handleCartActions = (event) => {
  const isDeleteBtn = event.target.alt === "delete from cart";
  const isCheckoutBtn = event.target.classList.contains("checkout-btn");
  const cartContentEl = document.querySelector(".change");

  if (isDeleteBtn && confirm("This will delete all items in the cart.")) {
    clearCartContent(cartContentEl);
  } else if (isCheckoutBtn) {
    clearCartContent(cartContentEl);
    alert("Checkout Successful!");
  }
};

const clearCartContent = (cartContentEl) => {
  cartContentEl.classList.add("empty");
  cartContentEl.classList.remove("cart-content");
  cartContentEl.innerHTML = `<p>Your cart is empty.</p>`;

  chosenQuantity = 0;
  itemCountEl.textContent = chosenQuantity;
  document.querySelector(".item-count").classList.remove("notEmpty");
};

const setSubMenuTimeout = () => {
  const subMenu = document.querySelector(".sub-menu");

  // Set a timeout to add the "has-submenu" class after 5 seconds
  subMenu.addEventListener("mouseleave", () => {
    setTimeout(() => {
      cartLogo.classList.add("has-submenu");
    }, 5000);
  });
};

// Function to check if the viewport is in mobile mode
const isMobile = () => window.matchMedia("(max-width: 43em)").matches;
// Initializing quantity-related variables
let quantity = 0;
let chosenQuantity = 0;

// Function to update the quantity based on button clicks
const updateQuantity = (event) => {
  if (
    event.target.classList.contains("increase-icon") &&
    quantity < Number.MAX_SAFE_INTEGER
  ) {
    quantity++;
  } else if (event.target.classList.contains("decrease-icon") && quantity > 0) {
    quantity--;
  }

  quantityEl.textContent = quantity;
  chosenQuantity = quantity;
};

//Function to update the cart content and reset quantity-related variables
const updateCart = () => {
  // Check if the chosen quantity is greater than 0
  if (chosenQuantity > 0) {
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
  } else {
    // Display a message to the user indicating that they need to choose a quantity
    alert("Please choose a quantity before adding the item to the cart.");
  }
};

// Function to initialize the application
function initApp() {
  // Show/hide the lightbox based on the viewport mode
  lightboxContainer.classList.toggle("hide", !isMobile());

  // Set the initial slide positions
  setInitialSlidePositions();

  // Event listeners for cart, thumbnails, navigation toggle, lightbox, and quantity buttons
  cartLogo.addEventListener("click", toggleCartBoxVisibility);
  thumbnails.forEach((img) => img.addEventListener("click", updatelargeImage));
  navToggle.addEventListener("click", toggleNav);

  // Toggle lightbox visibility on large product image click
  largeProductImage.addEventListener("click", () => {
    lightboxContainer.classList.toggle("hide");
  });

  // Toggle lightbox visibility on close button click
  closeBtn.addEventListener("click", () => {
    lightboxContainer.classList.toggle("hide");
  });

  // Event listener for quantity buttons and add to cart button
  quantityBtns.forEach((btn) => btn.addEventListener("click", updateQuantity));
  addBtn.addEventListener("click", updateCart);
}

// Initialize the application when the DOM is fully loaded
document.addEventListener("DOMContentLoaded", initApp);
