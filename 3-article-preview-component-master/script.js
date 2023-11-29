const subMenu = document.querySelector(".share-submenu");
const sharebtn = document.querySelector(".share-btn");

// Toggle the submenu and active state of the share button
const toggleMenu = () => {
  subMenu.classList.toggle("active");
  sharebtn.classList.toggle("active");
};

// Attach the click event listener to the share button
sharebtn.addEventListener("click", toggleMenu);
