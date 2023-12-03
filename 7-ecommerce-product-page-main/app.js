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
