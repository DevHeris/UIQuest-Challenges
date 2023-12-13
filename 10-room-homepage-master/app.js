let current = 0;
let isMobile = window.matchMedia("(max-width: 43em)").matches;

const nextBtn = document.querySelectorAll(".next-slide");
const prevBtn = document.querySelectorAll(".prev-slide");
const overviewHeadingEl = document.querySelector(".overview-heading");
const overviewParagraphEl = document.querySelector(".overview-paragraph");
const mobileControl = document.querySelector(".mobile-control");
const desktopControl = document.querySelector(".desktop-control");
const slideImageContainer = document.querySelector(
  ".hero-image-and-navigation"
);

const overviewHeadings = [
  "We are available all across the globe",
  "Discover innovative ways to decorate",
  "Manufactured with the best materials",
];

const overviewParagraphs = [
  `With stores all over the world, it's easy for you to find furniture for your home or place of business. Locally, we're in most major cities throughout the country. Find the branch nearest you using our store locator. Any questions? Don't hesitate to contact us today.`,

  `We provide unmatched quality, comfort, and style for property owners across the country. Our experts combine form and function in bringing your vision to life. Create a room in your own style with our collection and make your property a reflection of you and what you love.`,

  `Our modern furniture store provide a high level of quality. Our company has invested in advanced technology to ensure that every product is made as perfect and as consistent as possible. With three decades of experience in this industry, we understand what customers want for their home and office.`,
];

const updateSlideContent = () => {
  if (current >= overviewHeadings.length) current = 0;
  if (current < 0) current = overviewHeadings.length - 1;

  const imageUrl = isMobile
    ? `url(images/mobile-image-hero-${current + 1}.jpg)`
    : `url(images/desktop-image-hero-${current + 1}.jpg)`;

  slideImageContainer.style.backgroundImage = imageUrl;
  overviewHeadingEl.innerText = overviewHeadings[current];
  overviewParagraphEl.innerText = overviewParagraphs[current];
};

const showNextSlide = () => {
  current++;
  updateSlideContent();
};

const showPrevSlide = () => {
  current--;
  updateSlideContent();
};

// setInterval(showNextSlide, 6000);

if (isMobile) {
  mobileControl.classList.remove("hide");
  desktopControl.classList.add("hide");
} else {
  mobileControl.classList.add("hide");
  desktopControl.classList.remove("hide");
}

document.addEventListener("keydown", (event) => {
  if (event.key === "ArrowRight") showNextSlide();
  if (event.key === "ArrowLeft") showPrevSlide();
});

nextBtn.forEach((btn) => btn.addEventListener("click", showNextSlide));
prevBtn.forEach((btn) => btn.addEventListener("click", showPrevSlide));
