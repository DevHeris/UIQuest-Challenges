const navToggle = document.querySelector(".mobile-nav-toggle");
const primaryNav = document.getElementById("primary-navigation");
const headerLogo = document.querySelector(".hero-container .logo");

const toggleNav = () => {
  const visibility = primaryNav.getAttribute("data-visible");
  if (visibility === "false") {
    primaryNav.setAttribute("data-visible", true);
    navToggle.setAttribute("aria-expanded", true);
    navToggle.style.position = "fixed";
    headerLogo.style.position = "fixed";
  } else {
    primaryNav.setAttribute("data-visible", false);
    navToggle.setAttribute("aria-expanded", false);
    navToggle.style.position = "absolute";
    headerLogo.style.position = "absolute";
  }
};

navToggle.addEventListener("click", toggleNav);
