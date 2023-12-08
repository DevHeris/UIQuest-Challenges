class MyApp {
  constructor() {
    this.lightboxThumbnails = document.querySelectorAll(".lightbox-thumbnail");
    this.lightboxContainer = document.getElementById("lightbox-gallery-popup");
    this.largeProductImage = document.getElementById("large-product-image");
    this.lightboxThumbnailEl = document.querySelector(".thumbnail-images");
    this.primaryNav = document.querySelector(".primary-navigation");
    this.quantityBtns = document.querySelectorAll(".quantity-btn");
    this.navToggle = document.querySelector(".mobile-nav-toggle");
    this.thumbnails = document.querySelectorAll(".thumbnail");
    this.itemCountEl = document.querySelector(".item-count");
    this.closeBtn = document.querySelector(".close-popup");
    this.quantityEl = document.querySelector("#quantity");
    this.nextSlide = document.querySelector(".btn-next");
    this.prevSlide = document.querySelector(".btn-prev");
    this.slides = document.querySelectorAll(".slide");
    this.addBtn = document.getElementById("add-btn");
    this.cartLogo = document.querySelector(".cart");

    this.quantity = 0;
    this.chosenQuantity = 0;

    this.curSlide = 0;
    this.maxSlide = this.slides.length - 1;
    this.slideWidthPercentage = 150;

    this.initApp();
  }

  toggleNav() {
    const isVisible = this.primaryNav.getAttribute("data-visible") === "true";
    this.primaryNav.setAttribute("data-visible", isVisible ? "false" : "true");
    this.navToggle.setAttribute("aria-expanded", isVisible ? "false" : "true");
  }

  setInitialSlidePositions() {
    this.slides.forEach((slide, indx) => {
      slide.style.transform = `translateX(${
        indx * this.slideWidthPercentage
      }%)`;
    });
  }

  updateSlideAndThumbnails() {
    this.slides.forEach((slide, indx) => {
      slide.style.transform = `translateX(${
        this.slideWidthPercentage * (indx - this.curSlide)
      }%)`;
      this.lightboxThumbnails[indx].classList.toggle(
        "active",
        indx === this.curSlide
      );
    });
  }

  updatelargeImage(event) {
    const largeImg = document.querySelector(".large-product");
    const clickedThumbnail = event.currentTarget;
    const { link } = clickedThumbnail.firstElementChild.dataset;

    largeImg.src = `${link}.jpg`;

    this.thumbnails.forEach((thumbnail) => {
      thumbnail.classList.remove("active");
    });

    clickedThumbnail.classList.add("active");
  }

  handleThumbnailClick(event) {
    const clickedThumbnail = event.target.closest(".lightbox-thumbnail");

    if (clickedThumbnail) {
      const newSrc = clickedThumbnail.querySelector("img").dataset.link;

      this.curSlide = Array.from(this.lightboxThumbnails).indexOf(
        clickedThumbnail
      );

      this.slides[this.curSlide].querySelector("img").src = `${newSrc}.jpg`;

      this.updateSlideAndThumbnails();
    }
  }

  toggleCartBoxVisibility(event) {
    this.toggleSubMenuClass();
    this.updateAriaExpandedAttribute();

    if (!event.target.classList.contains("cart-icon")) {
      this.handleCartActions(event);
    }

    this.setSubMenuTimeout();
  }

  toggleSubMenuClass() {
    this.cartLogo.classList.toggle("has-submenu");
  }

  updateAriaExpandedAttribute() {
    const isSubMenuVisible = this.cartLogo.classList.contains("has-submenu");
    this.cartLogo.firstElementChild.setAttribute(
      "aria-expanded",
      isSubMenuVisible
    );
  }

  handleCartActions(event) {
    const isDeleteBtn = event.target.alt === "delete from cart";
    const isCheckoutBtn = event.target.classList.contains("checkout-btn");
    const cartContentEl = document.querySelector(".change");

    if (isDeleteBtn && confirm("This will delete all items in the cart.")) {
      this.clearCartContent(cartContentEl);
    } else if (isCheckoutBtn) {
      this.clearCartContent(cartContentEl);
      alert("Checkout Successful!");
    }
  }

  clearCartContent(cartContentEl) {
    cartContentEl.classList.add("empty");
    cartContentEl.classList.remove("cart-content");
    cartContentEl.innerHTML = `<p>Your cart is empty.</p>`;

    this.chosenQuantity = 0;
    this.itemCountEl.textContent = this.chosenQuantity;
    document.querySelector(".item-count").classList.remove("notEmpty");
  }

  setSubMenuTimeout() {
    const subMenu = document.querySelector(".sub-menu");

    subMenu.addEventListener("mouseleave", () => {
      setTimeout(() => {
        this.cartLogo.classList.add("has-submenu");
      }, 5000);
    });
  }

  isMobile() {
    return window.matchMedia("(max-width: 43em)").matches;
  }

  updateQuantity(event) {
    if (
      event.target.classList.contains("increase-icon") &&
      this.quantity < Number.MAX_SAFE_INTEGER
    ) {
      this.quantity++;
    } else if (
      event.target.classList.contains("decrease-icon") &&
      this.quantity > 0
    ) {
      this.quantity--;
    }

    this.quantityEl.textContent = this.quantity;
    this.chosenQuantity = this.quantity;
  }

  updateCart() {
    if (this.chosenQuantity > 0) {
      const cartContentEl = document.querySelector(".change");

      cartContentEl.innerHTML = `
        <div class="shoe-img-container">
          <img src="images/image-product-1-thumbnail.jpg" alt="shoe in cart">
        </div>
        <div>
          <p class="shoe-name">Fall Limited Edition Sneakers</p>
          <p class="total-price-container">
            $125.00 x <span class="chosen-quantity">${
              this.chosenQuantity
            }</span>
            <span class="total-price">$${this.chosenQuantity * 125}.00</span>
          </p>
        </div>
        <div class="delete-icon">
          <img src="images/icon-delete.svg" alt="delete from cart">
        </div>
        <button type="submit" class="checkout-btn">Checkout</button>
      `;

      cartContentEl.classList.remove("empty");
      cartContentEl.classList.add("cart-content");

      this.quantityEl.textContent = 0;
      this.quantity = 0;
      this.itemCountEl.textContent = this.chosenQuantity;

      document.querySelector(".item-count").classList.add("notEmpty");
    } else {
      alert("Please choose a quantity before adding the item to the cart.");
    }
  }

  initApp() {
    this.lightboxContainer.classList.toggle("hide", !this.isMobile());

    this.setInitialSlidePositions();

    this.cartLogo.addEventListener("click", (event) =>
      this.toggleCartBoxVisibility(event)
    );

    this.thumbnails.forEach((img) =>
      img.addEventListener("click", (event) => this.updatelargeImage(event))
    );

    this.navToggle.addEventListener("click", () => this.toggleNav());

    this.largeProductImage.addEventListener("click", () =>
      this.lightboxContainer.classList.toggle("hide")
    );

    this.closeBtn.addEventListener("click", () =>
      this.lightboxContainer.classList.toggle("hide")
    );

    this.quantityBtns.forEach((btn) =>
      btn.addEventListener("click", (event) => this.updateQuantity(event))
    );

    this.addBtn.addEventListener("click", () => this.updateCart());

    this.nextSlide.addEventListener("click", () => {
      this.curSlide = (this.curSlide + 1) % this.slides.length;
      this.updateSlideAndThumbnails();
    });

    this.prevSlide.addEventListener("click", () => {
      this.curSlide =
        (this.curSlide - 1 + this.slides.length) % this.slides.length;

      this.updateSlideAndThumbnails();
    });

    this.lightboxThumbnailEl.addEventListener("click", (event) => {
      this.handleThumbnailClick(event);
    });
  }
}

// Initialize the application when the DOM is fully loaded
document.addEventListener("DOMContentLoaded", () => new MyApp());
