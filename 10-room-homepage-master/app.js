let current = 0;
const nextBtn = document.querySelector(".next-slide");
const prevBtn = document.querySelector(".prev-slide");

const overviewHeadingEl = document.querySelector(".overview-heading");
const overviewParagraphEl = document.querySelector(".overview-paragraph");

const slideImageContainer = document.querySelector(
  ".hero-image-and-navigation"
);

const overviewHeadings = [
  "Discover innovative ways to decorate",
  "We are available all across the globe",
  "Manufactured with the best materials",
];

const overviewParagraphs = [
  `We provide unmatched quality, comfort, and style for property owners across the country. Our experts combine form and function in bringing your vision to life. Create a room in your own style with our collection and make your property a reflection of you and what you love.`,

  `With stores all over the world, it's easy for you to find furniture for your home or place of business. Locally, we're in most major cities throughout the country. Find the branch nearest you using our store locator. Any questions? Don't hesitate to contact us today.`,

  `Our modern furniture store provide a high level of quality. Our company has invested in advanced technology to ensure that every product is made as perfect and as consistent as possible. With three decades of experience in this industry, we understand what customers want for their home and office.`,
];

const showNextSlide = () => {
  if (current >= 3) current = 0;
  current++;

  if (isMobile) {
    slideImageContainer.style.backgroundImage = `url(images/mobile-image-hero-${current}.jpg)`;
  } else {
    slideImageContainer.style.backgroundImage = `url(images/desktop-image-hero-${current}.jpg)`;
  }

  overviewHeadingEl.innerText = overviewHeadings[current - 1];
  overviewParagraphEl.innerText = overviewParagraphs[current - 1];
};

const showPrevSlide = () => {
  if (current <= 1) current = 4;

  current--;

  if (isMobile) {
    slideImageContainer.style.backgroundImage = `url(images/mobile-image-hero-${current}.jpg)`;
  } else {
    slideImageContainer.style.backgroundImage = `url(images/desktop-image-hero-${current}.jpg)`;
  }

  overviewHeadingEl.innerText = overviewHeadings[current - 1];
  overviewParagraphEl.innerText = overviewParagraphs[current - 1];
};

let isMobile = window.matchMedia("(max-width: 43em)").matches;

function initApp() {
  setInterval(showNextSlide, 6000);

  nextBtn.addEventListener("click", showNextSlide);
  prevBtn.addEventListener("click", showPrevSlide);

  document.addEventListener("keydown", (event) => {
    if (event.key === "ArrowRight") showNextSlide();
    if (event.key === "ArrowLeft") showPrevSlide();
  });

  if (isMobile) {
    document.querySelector(".mobile-control").classList.remove("hide");
    document.querySelector(".desktop-control").classList.add("hide");
  } else {
    document.querySelector(".mobile-control").classList.add("hide");
    document.querySelector(".desktop-control").classList.remove("hide");
  }
}

document.addEventListener("DOMContentLoaded", initApp);
